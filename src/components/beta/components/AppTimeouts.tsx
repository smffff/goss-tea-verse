
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { secureLog } from '@/utils/secureLog';

const AppTimeouts: React.FC = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Set up global error handling
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      secureLog.error('Unhandled promise rejection', event.reason);
      toast({
        title: "Something went wrong",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    };

    const handleError = (event: ErrorEvent) => {
      secureLog.error('Global error caught', event.error);
      toast({
        title: "Application Error",
        description: "An error occurred. Please refresh the page if issues persist.",
        variant: "destructive"
      });
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, [toast]);

  return null;
};

export default AppTimeouts;
