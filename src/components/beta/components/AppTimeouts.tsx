
import { useEffect } from 'react';

interface AppTimeoutsProps {
  isLoading: boolean;
  onEmergencyTimeout: () => void;
  onForceTimeout: (error: string) => void;
}

export const AppTimeouts: React.FC<AppTimeoutsProps> = ({
  isLoading,
  onEmergencyTimeout,
  onForceTimeout
}) => {
  useEffect(() => {
    if (!isLoading) return;

    // Emergency timeout - show emergency access after 5 seconds
    const emergencyTimeout = setTimeout(() => {
      secureLog.warn('⚠️ Emergency timeout triggered');
      onEmergencyTimeout();
    }, 5000);

    // Force timeout - stop loading after 10 seconds
    const forceTimeout = setTimeout(() => {
      secureLog.warn('⚠️ Force timeout - stopping loading');
      onForceTimeout('Loading took too long. Activating emergency access! 🚨');
    }, 10000);

    return () => {
      clearTimeout(emergencyTimeout);
      clearTimeout(forceTimeout);
    };
  }, [isLoading, onEmergencyTimeout, onForceTimeout]);

  return null;
};
