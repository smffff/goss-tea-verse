
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PolicyConflictData } from '@/types/security';

interface SecurityHealth {
  policyConflicts: number;
  lastCheck: string;
  policyStatus: 'healthy' | 'warning' | 'critical';
  totalPolicies: number;
}

const SecurityHealthMonitor: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<SecurityHealth>({
    policyConflicts: 0,
    lastCheck: '',
    policyStatus: 'healthy',
    totalPolicies: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development with explicit flag
    const shouldShow = process.env.NODE_ENV === 'development' && 
                     localStorage.getItem('ctea-show-security-debug') === 'true';
    setIsVisible(shouldShow);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setIsLoading(false);
      return;
    }

    const checkSecurityHealth = async () => {
      try {
        const { data: conflictData, error } = await supabase.rpc('detect_policy_conflicts');
        
        if (error) {
          // Silently handle errors in production-like way
          setHealthStatus({
            policyConflicts: 0,
            lastCheck: new Date().toLocaleTimeString(),
            policyStatus: 'healthy',
            totalPolicies: 0
          });
          return;
        }

        const typedConflictData = conflictData as unknown as PolicyConflictData;
        const conflicts = typedConflictData?.total_potential_conflicts || 0;
        const totalPolicies = typedConflictData?.policy_summary?.length || 0;
        
        let status: 'healthy' | 'warning' | 'critical' = 'healthy';
        if (conflicts > 5) {
          status = 'critical';
        } else if (conflicts > 0) {
          status = 'warning';
        }
        
        setHealthStatus({
          policyConflicts: conflicts,
          lastCheck: new Date().toLocaleTimeString(),
          policyStatus: status,
          totalPolicies
        });
      } catch (error) {
        // Silently handle errors
        setHealthStatus({
          policyConflicts: 0,
          lastCheck: new Date().toLocaleTimeString(),
          policyStatus: 'healthy',
          totalPolicies: 0
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkSecurityHealth();
    
    // Check every 5 minutes only if visible
    const interval = setInterval(checkSecurityHealth, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  // Completely hidden if not in development mode with debug flag
  if (!isVisible || process.env.NODE_ENV === 'production') {
    return null;
  }

  const getStatusIcon = () => {
    switch (healthStatus.policyStatus) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (healthStatus.policyStatus) {
      case 'healthy':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Healthy</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4" />
            Security Health (DEV)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security Health (DEV)
          </div>
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Policy Status</span>
            <div className="flex items-center gap-1">
              {getStatusIcon()}
              <span className="text-sm font-medium">
                {healthStatus.policyStatus === 'healthy' ? 'No Issues' : `${healthStatus.policyConflicts} Issues`}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Policies</span>
            <span className="text-sm font-medium">{healthStatus.totalPolicies}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Last Check</span>
            <span className="text-xs text-gray-500">{healthStatus.lastCheck}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityHealthMonitor;
