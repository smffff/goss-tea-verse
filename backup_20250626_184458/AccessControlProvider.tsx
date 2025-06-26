
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { logError } from '@/utils/errorUtils';

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

  // Memoize the upgrade access function to prevent re-renders
  const upgradeAccess = useCallback(() => {
    toast({
      title: "Upgrade Your Access ✨",
      description: "Sign up or enter a beta code for unlimited access to all the tea!",
    });
  }, [toast]);

  // Memoize the permission check function
  const checkPermission = useCallback((requiredLevel: AccessLevel): boolean => {
    return accessHierarchy[accessLevel] >= accessHierarchy[requiredLevel];
  }, [accessLevel]);

  useEffect(() => {
    // Initialize access level from localStorage with robust error handling
    const initializeAccess = () => {
      try {
        const savedLevel = localStorage.getItem('ctea-access-level') as AccessLevel;
        const savedPeekStart = localStorage.getItem('ctea-peek-start');
        
        console.log('Initializing access control with:', { savedLevel, savedPeekStart });
        
        if (savedLevel && ['guest', 'authenticated', 'beta', 'admin'].includes(savedLevel)) {
          if (savedLevel === 'guest' && savedPeekStart) {
            const startTime = parseInt(savedPeekStart);
            if (isNaN(startTime)) {
              // Invalid timestamp, reset
              localStorage.removeItem('ctea-access-level');
              localStorage.removeItem('ctea-peek-start');
              setAccessLevelState('guest');
              return;
            }
            
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const remaining = Math.max(0, 300 - elapsed); // 5 minutes = 300 seconds
            
            if (remaining > 0) {
              setAccessLevelState('guest');
              setTimeRemaining(remaining);
            } else {
              // Preview expired
              localStorage.removeItem('ctea-access-level');
              localStorage.removeItem('ctea-peek-start');
              setAccessLevelState('guest');
              setTimeRemaining(undefined);
            }
          } else {
            setAccessLevelState(savedLevel);
            setTimeRemaining(undefined);
          }
        } else {
          setAccessLevelState('guest');
          setTimeRemaining(undefined);
        }
      } catch (error) {
        logError(error, 'AccessControlProvider initialization');
        setAccessLevelState('guest');
        setTimeRemaining(undefined);
      }
    };

    initializeAccess();
  }, []);

  useEffect(() => {
    // Timer for guest access with cleanup
    if (accessLevel === 'guest' && timeRemaining !== undefined && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev && prev > 1) {
            return prev - 1;
          } else {
            // Time expired
            try {
              localStorage.removeItem('ctea-access-level');
              localStorage.removeItem('ctea-peek-start');
            } catch (error) {
              logError(error, 'AccessControlProvider timer cleanup');
            }
            
            toast({
              title: "Preview Expired 💔",
              description: "Time's up bestie! Sign up or use a beta code for continued access!",
              variant: "destructive"
            });
            
            // Reset to guest without time limit
            setAccessLevelState('guest');
            return undefined;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [accessLevel, timeRemaining, toast]);

  const setAccessLevel = useCallback((level: AccessLevel) => {
    try {
      console.log('Setting access level to:', level);
      setAccessLevelState(level);
      localStorage.setItem('ctea-access-level', level);
      
      if (level === 'guest' && !localStorage.getItem('ctea-peek-start')) {
        localStorage.setItem('ctea-peek-start', Date.now().toString());
        setTimeRemaining(300); // 5 minutes
      } else if (level !== 'guest') {
        localStorage.removeItem('ctea-peek-start');
        setTimeRemaining(undefined);
      }
    } catch (error) {
      logError(error, 'AccessControlProvider setAccessLevel');
      toast({
        title: "Oops! Storage Issue",
        description: "Couldn't save your access level. Try refreshing and we'll sort this out 💅",
        variant: "destructive"
      });
    }
  }, [toast]);

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
