
import React, { useEffect } from 'react';
import ProductionMonitor from '@/components/monitoring/ProductionMonitor';
import EnhancedSecurityMonitor from '@/components/security/EnhancedSecurityMonitor';

interface AppMonitoringProps {
  isProduction: boolean;
}

const AppMonitoring: React.FC<AppMonitoringProps> = ({ isProduction }) => {
  useEffect(() => {
    if (!isProduction) return;

    // Initialize analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_TRACKING_ID', {
        page_title: 'CTea Newsroom',
        page_location: window.location.href,
      });

      // Track page view
      window.gtag('event', 'page_view', {
        page_title: 'CTea Newsroom - Home',
        page_location: window.location.href,
      });
    }

    // Performance monitoring
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(console.log);
      onFID(console.log);
      onFCP(console.log);
      onLCP(console.log);
      onTTFB(console.log);
    }).catch(() => {
      // web-vitals not available, skip monitoring
    });

    // Error tracking setup
    const handleError = (event: ErrorEvent) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: event.error?.message || 'Unknown error',
          fatal: false,
        });
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: event.reason?.message || 'Unhandled promise rejection',
          fatal: false,
        });
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [isProduction]);

  return (
    <>
      {/* Production Monitoring */}
      {isProduction && <ProductionMonitor />}
      
      {/* Security Monitoring (Development and Production) */}
      <EnhancedSecurityMonitor />
    </>
  );
};

export default AppMonitoring;
