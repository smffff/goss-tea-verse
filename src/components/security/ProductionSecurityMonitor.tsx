
import { useEffect } from 'react';
import { secureLog } from '@/utils/secureLogging';
import { supabase } from '@/integrations/supabase/client';

export const ProductionSecurityMonitor: React.FC = () => {
  useEffect(() => {
    // Only run in production or when explicitly enabled
    if (process.env.NODE_ENV !== 'production' && !process.env.ENABLE_SECURITY_MONITORING) {
      return;
    }

    let isMonitoring = true;

    const monitorSecurity = async () => {
      if (!isMonitoring) return;

      try {
        // Check for suspicious URL patterns
        const currentUrl = window.location.href;
        const suspiciousPatterns = [
          /javascript:/i,
          /data:/i,
          /<script/i,
          /\.\./,
          /\/etc\/passwd/i
        ];

        for (const pattern of suspiciousPatterns) {
          if (pattern.test(currentUrl)) {
            secureLog.security('suspicious_url_detected', {
              url: currentUrl.substring(0, 100),
              pattern: pattern.source
            }, 'high');

            // Redirect to safe page
            setTimeout(() => {
              window.location.href = '/';
            }, 1000);
            
            return;
          }
        }

        // Monitor for rapid consecutive requests (potential bot activity)
        const rapidRequestKey = 'security_rapid_requests';
        const now = Date.now();
        const stored = sessionStorage.getItem(rapidRequestKey);
        
        if (stored) {
          const data = JSON.parse(stored);
          if (now - data.lastRequest < 100) { // Less than 100ms between requests
            data.rapidCount = (data.rapidCount || 0) + 1;
            if (data.rapidCount > 10) {
              secureLog.security('rapid_request_pattern_detected', {
                rapidCount: data.rapidCount,
                timeframe: '100ms'
              }, 'medium');
            }
          } else {
            data.rapidCount = 0;
          }
          data.lastRequest = now;
          sessionStorage.setItem(rapidRequestKey, JSON.stringify(data));
        } else {
          sessionStorage.setItem(rapidRequestKey, JSON.stringify({ 
            lastRequest: now, 
            rapidCount: 0 
          }));
        }

      } catch (error) {
        secureLog.error('Security monitoring error:', error);
      }
    };

    // Run initial check
    monitorSecurity();

    // Set up periodic monitoring (every 30 seconds to avoid performance impact)
    const monitoringInterval = setInterval(monitorSecurity, 30000);

    // Monitor page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        secureLog.security('page_hidden', { timestamp: new Date().toISOString() }, 'low');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMonitoring = false;
      clearInterval(monitoringInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null; // Background monitor - no UI
};

export default ProductionSecurityMonitor;
