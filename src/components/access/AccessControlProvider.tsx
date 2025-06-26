
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export type AccessLevel = 'guest' | 'authenticated' | 'beta' | 'admin';

interface AccessControlState {
  accessLevel: AccessLevel;
  isAuthenticated: boolean;
  isBeta: boolean;
  isAdmin: boolean;
  timeRemaining?: number;
  setAccessLevel: (level: AccessLevel) => void;
  upgradeAccess: () => void;
  checkPermission: (requiredLevel: AccessLevel) => boolean;
}

const AccessControlContext = createContext<AccessControlState | undefined>(undefined);

export const useAccessControl = () => {
  const context = useContext(AccessControlContext);
  if (!context) {
    throw new Error('useAccessControl must be used within AccessControlProvider');
  }
  return context;
};

interface AccessControlProviderProps {
  children: React.ReactNode;
}

export const AccessControlProvider: React.FC<AccessControlProviderProps> = ({ children }) => {
  const [accessLevel, setAccessLevelState] = useState<AccessLevel>('guest');
  const [timeRemaining, setTimeRemaining] = useState<number | undefined>();
  const { toast } = useToast();

  // Access level hierarchy (higher number = more access)
  const accessHierarchy = {
    guest: 1,
    authenticated: 2,
    beta: 3,
    admin: 4
  };

  useEffect(() => {
    // Initialize access level from localStorage
    const savedLevel = localStorage.getItem('ctea-access-level') as AccessLevel || 'guest';
    const savedPeekStart = localStorage.getItem('ctea-peek-start');
    
    if (savedLevel === 'guest' && savedPeekStart) {
      const elapsed = Math.floor((Date.now() - parseInt(savedPeekStart)) / 1000);
      const remaining = Math.max(0, 300 - elapsed);
      
      if (remaining > 0) {
        setAccessLevelState('guest');
        setTimeRemaining(remaining);
      } else {
        // Preview expired
        localStorage.removeItem('ctea-access-level');
        localStorage.removeItem('ctea-peek-start');
        setAccessLevelState('guest');
      }
    } else {
      setAccessLevelState(savedLevel);
    }
  }, []);

  useEffect(() => {
    // Timer for guest access
    if (accessLevel === 'guest' && timeRemaining !== undefined) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev && prev > 0) {
            return prev - 1;
          } else {
            // Time expired
            localStorage.removeItem('ctea-access-level');
            localStorage.removeItem('ctea-peek-start');
            toast({
              title: "Preview Expired",
              description: "Sign up or use a beta code for continued access!",
              variant: "destructive"
            });
            return undefined;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [accessLevel, timeRemaining, toast]);

  const setAccessLevel = (level: AccessLevel) => {
    setAccessLevelState(level);
    localStorage.setItem('ctea-access-level', level);
    
    if (level === 'guest') {
      localStorage.setItem('ctea-peek-start', Date.now().toString());
      setTimeRemaining(300);
    } else {
      localStorage.removeItem('ctea-peek-start');
      setTimeRemaining(undefined);
    }
  };

  const upgradeAccess = () => {
    // This would typically trigger a modal or redirect to upgrade flow
    toast({
      title: "Upgrade Your Access",
      description: "Sign up or enter a beta code for unlimited access!",
    });
  };

  const checkPermission = (requiredLevel: AccessLevel): boolean => {
    return accessHierarchy[accessLevel] >= accessHierarchy[requiredLevel];
  };

  const value: AccessControlState = {
    accessLevel,
    isAuthenticated: accessLevel !== 'guest',
    isBeta: accessLevel === 'beta' || accessLevel === 'admin',
    isAdmin: accessLevel === 'admin',
    timeRemaining,
    setAccessLevel,
    upgradeAccess,
    checkPermission
  };

  return (
    <AccessControlContext.Provider value={value}>
      {children}
    </AccessControlContext.Provider>
  );
};
