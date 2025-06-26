
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
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
        if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Failed to check policy health:', error);
        setPolicyHealth('warning');
        setSecurityScore(70);
        setThreatLevel('medium');
        return;
      }

      const typedHealthData = healthData as unknown as PolicyConflictData;
      const conflicts = typedHealthData?.total_potential_conflicts || 0;
      
      if (conflicts === 0) {
        setPolicyHealth('healthy');
        setSecurityScore(100);
        setThreatLevel('low');
        setActiveThreats([]);
      } else if (conflicts < 3) {
        setPolicyHealth('warning');
        setSecurityScore(80);
        setThreatLevel('medium');
        setActiveThreats(['Minor policy conflicts detected']);
      } else {
        setPolicyHealth('critical');
        setSecurityScore(50);
        setThreatLevel('high');
        setActiveThreats(['Critical policy conflicts detected']);
        
        logSecurityEvent('policy_conflicts_detected', {
          conflict_count: conflicts,
          policy_summary: typedHealthData?.policy_summary
        }, 'critical');
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Security health check failed:', error);
      setPolicyHealth('warning');
      setSecurityScore(60);
      setThreatLevel('medium');
    }
  };

  const logSecurityEvent = (event: string, details: any, severity: 'low' | 'medium' | 'high' | 'critical' = 'low') => {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info(`🔐 Security Event [${severity.toUpperCase()}]:`, event, details);
    
    // Only show critical alerts to avoid spam
    if (severity === 'critical') {
      toast({
        title: "Critical Security Alert 🚨",
        description: `Security event detected: ${event}`,
        variant: "destructive"
      });
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
      localStorage.setItem('ctea_security_audit', JSON.stringify(auditLog.slice(-50)));
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Failed to store security audit log:', error);
    }
  };

  // Security monitoring effects
  useEffect(() => {
    // Initial security health check
    refreshSecurityHealth();
    
    // Check policy health every 10 minutes
    const healthInterval = setInterval(refreshSecurityHealth, 10 * 60 * 1000);
    
    return () => {
      clearInterval(healthInterval);
    };
  }, []);

  // Threat level auto-recovery
  useEffect(() => {
    if (threatLevel !== 'low') {
      const recoveryTimer = setTimeout(() => {
        if (policyHealth === 'healthy') {
          setThreatLevel('low');
          setSecurityScore(100);
          setActiveThreats([]);
        }
      }, 300000); // 5 minutes

      return () => clearTimeout(recoveryTimer);
    }
  }, [threatLevel, policyHealth]);

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
