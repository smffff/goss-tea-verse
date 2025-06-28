
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

interface SecurityThreat {
  type: 'xss' | 'sql_injection' | 'rate_limit' | 'token_validation' | 'policy_violation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface SecurityMetrics {
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  securityScore: number;
  activeThreats: SecurityThreat[];
  policyHealth: 'healthy' | 'warning' | 'critical';
  lastCheck: string;
}

export class SecurityMonitoringService {
  private static threats: SecurityThreat[] = [];
  private static maxThreats = 100; // Keep last 100 threats

  /**
   * Logs a security event with proper categorization
   */
  static async logSecurityEvent(
    type: SecurityThreat['type'],
    severity: SecurityThreat['severity'],
    description: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    const threat: SecurityThreat = {
      type,
      severity,
      description,
      timestamp: new Date().toISOString(),
      metadata
    };

    // Add to local threat tracking
    this.threats.unshift(threat);
    if (this.threats.length > this.maxThreats) {
      this.threats = this.threats.slice(0, this.maxThreats);
    }

    // Log to server
    try {
      await supabase.rpc('log_security_event', {
        event_type: `security_threat_${type}`,
        details: {
          severity,
          description,
          metadata: metadata || {},
          client_timestamp: threat.timestamp
        }
      });
    } catch (error) {
      secureLog.error('Failed to log security event to server:', error);
    }

    // Store locally for offline capability
    try {
      const existingThreats = JSON.parse(localStorage.getItem('ctea_security_threats') || '[]');
      existingThreats.unshift(threat);
      localStorage.setItem('ctea_security_threats', JSON.stringify(existingThreats.slice(0, 50)));
    } catch (error) {
      secureLog.error('Failed to store security threat locally:', error);
    }
  }

  /**
   * Gets current security metrics
   */
  static async getSecurityMetrics(): Promise<SecurityMetrics> {
    // Calculate threat level based on recent threats
    const recentThreats = this.threats.filter(
      threat => new Date(threat.timestamp) > new Date(Date.now() - 5 * 60 * 1000) // Last 5 minutes
    );

    const criticalThreats = recentThreats.filter(t => t.severity === 'critical').length;
    const highThreats = recentThreats.filter(t => t.severity === 'high').length;
    const mediumThreats = recentThreats.filter(t => t.severity === 'medium').length;

    let threatLevel: SecurityMetrics['threatLevel'] = 'low';
    let securityScore = 100;

    if (criticalThreats > 0) {
      threatLevel = 'critical';
      securityScore = Math.max(0, 100 - (criticalThreats * 50));
    } else if (highThreats > 2) {
      threatLevel = 'high';
      securityScore = Math.max(20, 100 - (highThreats * 20));
    } else if (mediumThreats > 5) {
      threatLevel = 'medium';
      securityScore = Math.max(50, 100 - (mediumThreats * 10));
    }

    // Check policy health
    let policyHealth: SecurityMetrics['policyHealth'] = 'healthy';
    try {
      const { data: healthData } = await supabase.rpc('detect_policy_conflicts');
      if (healthData && typeof healthData === 'object') {
        const conflicts = (healthData as any).total_potential_conflicts || 0;
        if (conflicts > 3) {
          policyHealth = 'critical';
        } else if (conflicts > 0) {
          policyHealth = 'warning';
        }
      }
    } catch (error) {
      secureLog.error('Failed to check policy health:', error);
      policyHealth = 'warning';
    }

    return {
      threatLevel,
      securityScore,
      activeThreats: recentThreats,
      policyHealth,
      lastCheck: new Date().toISOString()
    };
  }

  /**
   * Monitors for suspicious patterns in real-time
   */
  static startSecurityMonitoring(): void {
    // Monitor for suspicious DOM changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName === 'SCRIPT' || element.innerHTML?.includes('<script')) {
              this.logSecurityEvent(
                'xss',
                'critical',
                'Suspicious script injection detected',
                { tagName: element.tagName, innerHTML: element.innerHTML?.substring(0, 100) }
              );
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Monitor for suspicious URL patterns
    const currentUrl = window.location.href;
    const suspiciousPatterns = [
      /javascript:/i,
      /data:/i,
      /<script/i,
      /\.\./,
      /\/etc\/passwd/i,
      /union.*select/i
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(currentUrl)) {
        this.logSecurityEvent(
          'xss',
          'high',
          'Suspicious URL pattern detected',
          { url: currentUrl, pattern: pattern.toString() }
        );
        break;
      }
    }

    // Monitor localStorage for suspicious data
    try {
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        const value = localStorage.getItem(key) || '';
        if (value.includes('<script') || value.includes('javascript:')) {
          this.logSecurityEvent(
            'xss',
            'critical',
            'Suspicious data in localStorage',
            { key, suspicious: true }
          );
        }
      }
    } catch (error) {
      secureLog.error('Security monitoring error:', error);
    }

    secureLog.info('Security monitoring started');
  }

  /**
   * Gets threat history
   */
  static getThreatHistory(): SecurityThreat[] {
    return [...this.threats];
  }

  /**
   * Clears old threats
   */
  static clearOldThreats(): void {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    this.threats = this.threats.filter(
      threat => new Date(threat.timestamp) > oneHourAgo
    );
  }
}
