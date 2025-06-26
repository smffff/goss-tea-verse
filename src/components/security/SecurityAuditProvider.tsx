
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SecurityServiceUnified } from '@/services/securityServiceUnified';

interface SecurityAuditContextType {
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  securityScore: number;
  activeThreats: string[];
  logSecurityEvent: (event: string, details: any, severity?: 'low' | 'medium' | 'high' | 'critical') => void;
  isSecurityEnabled: boolean;
}

const SecurityAuditContext = createContext<SecurityAuditContextType | null>(null);

export const useSecurityAudit = () => {
  const context = useContext(SecurityAuditContext);
  if (!context) {
    throw new Error('useSecurityAudit must be used within SecurityAuditProvider');
  }
  return context;
};

interface SecurityAuditProviderProps {
  children: React.ReactNode;
}

export const SecurityAuditProvider: React.FC<SecurityAuditProviderProps> = ({ children }) => {
  const [threatLevel, setThreatLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('low');
  const [securityScore, setSecurityScore] = useState(100);
  const [activeThreats, setActiveThreats] = useState<string[]>([]);
  const [isSecurityEnabled, setIsSecurityEnabled] = useState(true);
  const { toast } = useToast();

  const logSecurityEvent = (event: string, details: any, severity: 'low' | 'medium' | 'high' | 'critical' = 'low') => {
    console.log(`🔐 Security Event [${severity.toUpperCase()}]:`, event, details);
    
    // Update threat level based on severity
    if (severity === 'critical' && threatLevel !== 'critical') {
      setThreatLevel('critical');
      setSecurityScore(prev => Math.max(0, prev - 50));
      toast({
        title: "Critical Security Alert 🚨",
        description: `Security event detected: ${event}`,
        variant: "destructive"
      });
    } else if (severity === 'high' && !['critical', 'high'].includes(threatLevel)) {
      setThreatLevel('high');
      setSecurityScore(prev => Math.max(0, prev - 25));
    } else if (severity === 'medium' && threatLevel === 'low') {
      setThreatLevel('medium');
      setSecurityScore(prev => Math.max(0, prev - 10));
    }

    // Track active threats
    if (severity in ['high', 'critical']) {
      setActiveThreats(prev => [...prev, event].slice(-5)); // Keep last 5 threats
    }

    // Store for reporting
    try {
      const auditLog = JSON.parse(localStorage.getItem('ctea_security_audit') || '[]');
      auditLog.push({
        timestamp: new Date().toISOString(),
        event,
        details,
        severity,
        threatLevel,
        securityScore
      });
      localStorage.setItem('ctea_security_audit', JSON.stringify(auditLog.slice(-50))); // Keep last 50 events
    } catch (error) {
      console.error('Failed to store security audit log:', error);
    }
  };

  // Security monitoring effects
  useEffect(() => {
    // Monitor for suspicious URL patterns
    const checkUrlSecurity = () => {
      const url = window.location.href;
      const suspiciousPatterns = [
        /javascript:/i,
        /data:/i,
        /<script/i,
        /\.\./,
        /\/etc\/passwd/i,
        /union.*select/i
      ];

      for (const pattern of suspiciousPatterns) {
        if (pattern.test(url)) {
          logSecurityEvent('suspicious_url_pattern', {
            url: window.location.href,
            pattern: pattern.toString()
          }, 'high');
          break;
        }
      }
    };

    checkUrlSecurity();

    // Monitor for rapid navigation changes (potential bot behavior)
    let navigationCount = 0;
    const navigationTimer = setInterval(() => {
      if (navigationCount > 10) {
        logSecurityEvent('rapid_navigation_detected', {
          count: navigationCount,
          timeframe: '10_seconds'
        }, 'medium');
      }
      navigationCount = 0;
    }, 10000);

    const handleNavigation = () => {
      navigationCount++;
    };

    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      clearInterval(navigationTimer);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // Threat level auto-recovery
  useEffect(() => {
    if (threatLevel !== 'low') {
      const recoveryTimer = setTimeout(() => {
        setThreatLevel('low');
        setSecurityScore(prev => Math.min(100, prev + 10));
        setActiveThreats([]);
      }, 300000); // 5 minutes

      return () => clearTimeout(recoveryTimer);
    }
  }, [threatLevel]);

  const value: SecurityAuditContextType = {
    threatLevel,
    securityScore,
    activeThreats,
    logSecurityEvent,
    isSecurityEnabled
  };

  return (
    <SecurityAuditContext.Provider value={value}>
      {children}
    </SecurityAuditContext.Provider>
  );
};
