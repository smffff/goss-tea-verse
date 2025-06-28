
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SecurityService } from '@/services/securityService';
import { applySecurityHeaders, generateCSRFToken } from '@/utils/securityHeaders';
import { secureLog } from '@/utils/secureLogging';
import { useToast } from '@/hooks/use-toast';

interface SecurityContextType {
  csrfToken: string;
  isSecurityEnabled: boolean;
  validateSubmission: (content: string, action?: string) => Promise<{
    success: boolean;
    errors: string[];
    sanitizedContent?: string;
  }>;
  createSubmission: (content: string, category?: string) => Promise<{
    success: boolean;
    submissionId?: string;
    error?: string;
  }>;
}

const SecurityContext = createContext<SecurityContextType | null>(null);

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

interface SecurityProviderProps {
  children: React.ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState('');
  const [isSecurityEnabled, setIsSecurityEnabled] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initSecurity = async () => {
      try {
        // Apply security headers
        applySecurityHeaders();

        // Generate CSRF token
        const token = generateCSRFToken();
        setCsrfToken(token);
        sessionStorage.setItem('csrf_token', token);

        setIsSecurityEnabled(true);
      } catch (error) {
        secureLog.error('Security initialization failed', error);
        setIsSecurityEnabled(false);
        
        toast({
          title: "Security Warning",
          description: "Security features may be limited",
          variant: "destructive"
        });
      }
    };

    initSecurity();
  }, [toast]);

  const validateSubmission = async (content: string, action: string = 'submission') => {
    try {
      const result = await SecurityService.validateSubmissionSecurity(content, action);
      return {
        success: result.success,
        errors: result.errors,
        sanitizedContent: result.sanitizedContent
      };
    } catch (error) {
      secureLog.error('Submission validation failed', error);
      return {
        success: false,
        errors: ['Validation service unavailable']
      };
    }
  };

  const createSubmission = async (content: string, category: string = 'general') => {
    return await SecurityService.createSecureSubmission(content, category);
  };

  const value: SecurityContextType = {
    csrfToken,
    isSecurityEnabled,
    validateSubmission,
    createSubmission
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};
