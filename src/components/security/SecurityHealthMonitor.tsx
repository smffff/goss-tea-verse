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

  useEffect(() => {
    const checkSecurityHealth = async () => {
      try {
        const { data: conflictData, error } = await supabase.rpc('detect_policy_conflicts');
        
        if (error) {
          console.error('Failed to check security health:', error);
          setHealthStatus(prev => ({ ...prev, policyStatus: 'warning' }));
          return;
        }

        // Type assertion to handle Supabase Json type
        const typedConflictData = conflictData as PolicyConflictData;
        const conflicts = typedConflictData?.total_potential_conflicts || 0;
        const totalPolicies = typedConflictData?.policy_summary?.length || 0;
        
        setHealthStatus({
          policyConflicts: conflicts,
          lastCheck: new Date().toLocaleTimeString(),
          policyStatus: conflicts > 0 ? 'critical' : 'healthy',
          totalPolicies
        });
      } catch (error) {
        console.error('Security health check failed:', error);
        setHealthStatus(prev => ({ ...prev, policyStatus: 'warning' }));
      } finally {
        setIsLoading(false);
      }
    };

    checkSecurityHealth();
    
    // Check every 5 minutes
    const interval = setInterval(checkSecurityHealth, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

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
            Security Health
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
            Security Health
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
                {healthStatus.policyStatus === 'healthy' ? 'No Conflicts' : `${healthStatus.policyConflicts} Issues`}
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
