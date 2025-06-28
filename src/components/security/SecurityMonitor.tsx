
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

export const SecurityMonitor: React.FC = () => {
  const { toast } = useToast();

  useEffect(() => {
    let threatDetected = false;

    const monitorSecurity = () => {
      // Only run security check once per session to avoid performance impact
      if (threatDetected) return;

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
            threatDetected = true;
            
            // Log security event
            supabase.rpc('log_security_event', {
              event_type: 'suspicious_url_detected',
              details: { url: currentUrl.substring(0, 100) }
            }).catch(error => {
              secureLog.error('Failed to log security event', error);
            });

            toast({
              title: "🚨 Security Alert",
              description: "Suspicious activity detected. Refreshing page...",
              variant: "destructive"
            });

            // Redirect to safe page
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
            
            break;
          }
        }
      } catch (error) {
        secureLog.error('Security monitoring error', error);
      }
    };

    // Initial security check
    monitorSecurity();

    // Periodic check (reduced frequency for better performance)
    const securityTimeout = setTimeout(monitorSecurity, 30000);

    return () => {
      clearTimeout(securityTimeout);
    };
  }, [toast]);

  return null; // Background monitor - no UI
};

export default SecurityMonitor;
