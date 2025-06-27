
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { EnhancedSecurityService } from '@/services/enhancedSecurityService';
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
          
          EnhancedSecurityService.logSecurityEvent(
            'suspicious_url_detected',
            { url: currentUrl, pattern: pattern.toString() },
            'high'
          );
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
            
            EnhancedSecurityService.logSecurityEvent(
              'suspicious_localstorage_data',
              { key, suspicious: true },
              'critical'
            );
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

    // Periodic security monitoring
    const securityInterval = setInterval(monitorSecurity, 30000); // Every 30 seconds

    // Monitor for suspicious DOM changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.tagName === 'SCRIPT' || element.innerHTML?.includes('<script')) {
                EnhancedSecurityService.logSecurityEvent(
                  'suspicious_dom_injection',
                  { tagName: element.tagName, innerHTML: element.innerHTML?.substring(0, 100) },
                  'critical'
                );
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
