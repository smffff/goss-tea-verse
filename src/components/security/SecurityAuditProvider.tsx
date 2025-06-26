import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SecurityServiceUnified } from '@/services/securityServiceUnified';
import { supabase } from '@/integrations/supabase/client';
import type { PolicyConflictData } from '@/types/security';

interface SecurityAuditContextType {
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  securityScore: number;
  activeThreats: string[];
  logSecurityEvent: (event: string, details: any, severity?: 'low' | 'medium' | 'high' | 'critical') => void;
  isSecurityEnabled: boolean;
  policyHealth: 'healthy' | 'warning' | 'critical';
  refreshSecurityHealth: () => Promise<void>;
}

const SecurityAuditContext = createContext<SecurityAuditContextType | null>(null);

export const useSecurityAudit = () => {
  const context = useContext(SecurityAuditContext);
  if (!context) {
    throw new Error('useSecurityAudit must be used within SecurityAuditProvider');
  }
  return context;
};

interface SecurityAuditProviderProps {
  children: React.ReactNode;
}

export const SecurityAuditProvider: React.FC<SecurityAuditProviderProps> = ({ children }) => {
  const [threatLevel, setThreatLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('low');
  const [securityScore, setSecurityScore] = useState(100);
  const [activeThreats, setActiveThreats] = useState<string[]>([]);
  const [isSecurityEnabled, setIsSecurityEnabled] = useState(true);
  const [policyHealth, setPolicyHealth] = useState<'healthy' | 'warning' | 'critical'>('healthy');
  const { toast } = useToast();

  const refreshSecurityHealth = async () => {
    try {
      const { data: healthData, error } = await supabase.rpc('detect_policy_conflicts');
      
      if (error) {
        console.error('Failed to check policy health:', error);
        setPolicyHealth('warning');
        return;
      }

      // Type assertion to handle Supabase Json type
      const typedHealthData = healthData as PolicyConflictData;
      const conflicts = typedHealthData?.total_potential_conflicts || 0;
      setPolicyHealth(conflicts > 0 ? 'critical' : 'healthy');
      
      if (conflicts > 0) {
        logSecurityEvent('policy_conflicts_detected', {
          conflict_count: conflicts,
          policy_summary: typedHealthData?.policy_summary
        }, 'critical');
      }
    } catch (error) {
      console.error('Security health check failed:', error);
      setPolicyHealth('warning');
    }
  };

  const logSecurityEvent = (event: string, details: any, severity: 'low' | 'medium' | 'high' | 'critical' = 'low') => {
    console.log(`🔐 Security Event [${severity.toUpperCase()}]:`, event, details);
    
    // Update threat level based on severity
    if (severity === 'critical' && threatLevel !== 'critical') {
      setThreatLevel('critical');
      setSecurityScore(prev => Math.max(0, prev - 50));
      toast({
        title: "Critical Security Alert 🚨",
        description: `Security event detected: ${event}`,
        variant: "destructive"
      });
    } else if (severity === 'high' && !['critical', 'high'].includes(threatLevel)) {
      setThreatLevel('high');
      setSecurityScore(prev => Math.max(0, prev - 25));
    } else if (severity === 'medium' && threatLevel === 'low') {
      setThreatLevel('medium');
      setSecurityScore(prev => Math.max(0, prev - 10));
    }

    // Track active threats
    if (['high', 'critical'].includes(severity)) {
      setActiveThreats(prev => [...prev, event].slice(-5)); // Keep last 5 threats
    }

    // Store for reporting
    try {
      const auditLog = JSON.parse(localStorage.getItem('ctea_security_audit') || '[]');
      auditLog.push({
        timestamp: new Date().toISOString(),
        event,
        details,
        severity,
        threatLevel,
        securityScore,
        policyHealth
      });
      localStorage.setItem('ctea_security_audit', JSON.stringify(auditLog.slice(-50))); // Keep last 50 events
    } catch (error) {
      console.error('Failed to store security audit log:', error);
    }
  };

  // Security monitoring effects
  useEffect(() => {
    // Initial security health check
    refreshSecurityHealth();
    
    // Monitor for suspicious URL patterns
    const checkUrlSecurity = () => {
      const url = window.location.href;
      const suspiciousPatterns = [
        /javascript:/i,
        /data:/i,
        /<script/i,
        /\.\./,
        /\/etc\/passwd/i,
        /union.*select/i
      ];

      for (const pattern of suspiciousPatterns) {
        if (pattern.test(url)) {
          logSecurityEvent('suspicious_url_pattern', {
            url: window.location.href,
            pattern: pattern.toString()
          }, 'high');
          break;
        }
      }
    };

    checkUrlSecurity();

    // Monitor for rapid navigation changes (potential bot behavior)
    let navigationCount = 0;
    const navigationTimer = setInterval(() => {
      if (navigationCount > 10) {
        logSecurityEvent('rapid_navigation_detected', {
          count: navigationCount,
          timeframe: '10_seconds'
        }, 'medium');
      }
      navigationCount = 0;
    }, 10000);

    const handleNavigation = () => {
      navigationCount++;
    };

    window.addEventListener('popstate', handleNavigation);
    
    // Check policy health every 10 minutes
    const healthInterval = setInterval(refreshSecurityHealth, 10 * 60 * 1000);
    
    return () => {
      clearInterval(navigationTimer);
      clearInterval(healthInterval);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // Threat level auto-recovery
  useEffect(() => {
    if (threatLevel !== 'low') {
      const recoveryTimer = setTimeout(() => {
        setThreatLevel('low');
        setSecurityScore(prev => Math.min(100, prev + 10));
        setActiveThreats([]);
      }, 300000); // 5 minutes

      return () => clearTimeout(recoveryTimer);
    }
  }, [threatLevel]);

  const value: SecurityAuditContextType = {
    threatLevel,
    securityScore,
    activeThreats,
    logSecurityEvent,
    isSecurityEnabled,
    policyHealth,
    refreshSecurityHealth
  };

  return (
    <SecurityAuditContext.Provider value={value}>
      {children}
    </SecurityAuditContext.Provider>
  );
};
