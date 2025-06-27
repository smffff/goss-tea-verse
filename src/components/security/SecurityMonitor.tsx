
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

interface SecurityStatus {
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  activeThreats: string[];
  securityScore: number;
}

export const SecurityMonitor: React.FC = () => {
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    threatLevel: 'low',
    activeThreats: [],
    securityScore: 100
  });
  const { toast } = useToast();

  useEffect(() => {
    // Monitor for security threats
    const monitorSecurity = () => {
      // Check for suspicious URL patterns
      const currentUrl = window.location.href;
      const suspiciousPatterns = [
        /javascript:/i,
        /data:/i,
        /<script/i,
        /\.\./,
        /\/etc\/passwd/i,
        /union.*select/i
      ];

      const threats: string[] = [];
      let threatLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

      for (const pattern of suspiciousPatterns) {
        if (pattern.test(currentUrl)) {
          threats.push(`Suspicious URL pattern: ${pattern.toString()}`);
          threatLevel = 'high';
          
          // Log security event using server-side function
          supabase.rpc('log_security_event', {
            event_type: 'suspicious_url_detected',
            details: { url: currentUrl, pattern: pattern.toString() }
          }).then(({ error }) => {
            if (error) {
              secureLog.error('Failed to log security event', error);
            }
          });
        }
      }

      // Check localStorage for suspicious data
      try {
        const keys = Object.keys(localStorage);
        for (const key of keys) {
          const value = localStorage.getItem(key) || '';
          if (value.includes('<script') || value.includes('javascript:')) {
            threats.push('Suspicious data in localStorage');
            threatLevel = 'critical';
            
            supabase.rpc('log_security_event', {
              event_type: 'suspicious_localstorage_data',
              details: { key, suspicious: true }
            }).then(({ error }) => {
              if (error) {
                secureLog.error('Failed to log security event', error);
              }
            });
          }
        }
      } catch (error) {
        secureLog.error('Security monitoring error', error);
      }

      // Update security status
      setSecurityStatus({
        threatLevel,
        activeThreats: threats,
        securityScore: Math.max(0, 100 - (threats.length * 25))
      });

      // Show critical alerts
      if (threatLevel === 'critical' && threats.length > 0) {
        toast({
          title: "🚨 Critical Security Alert",
          description: "Suspicious activity detected. Please refresh the page.",
          variant: "destructive"
        });
      }
    };

    // Initial security check
    monitorSecurity();

    // Periodic security monitoring (reduced frequency for performance)
    const securityInterval = setInterval(monitorSecurity, 60000); // Every 60 seconds

    // Monitor for suspicious DOM changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.tagName === 'SCRIPT' || element.innerHTML?.includes('<script')) {
                supabase.rpc('log_security_event', {
                  event_type: 'suspicious_dom_injection',
                  details: { tagName: element.tagName, innerHTML: element.innerHTML?.substring(0, 100) }
                }).then(({ error }) => {
                  if (error) {
                    secureLog.error('Failed to log security event', error);
                  }
                });
              }
            }
          });
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearInterval(securityInterval);
      observer.disconnect();
    };
  }, [toast]);

  // Don't render anything visible - this is a background security monitor
  return null;
};

export default SecurityMonitor;
