import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SecurityHealthData {
  security_score: number;
  policy_conflicts: number;
  missing_functions: string[];
  issues: string[];
  status: 'excellent' | 'good' | 'needs_attention' | 'critical';
  last_check: string;
}

const SecurityHealthDashboard: React.FC = () => {
  const [healthData, setHealthData] = useState<SecurityHealthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchSecurityHealth = async () => {
    try {
      const { data, error } = await supabase.rpc('security_health_check');
      
      if (error) {
        throw error;
      }
      
      // Properly type cast the response
      const typedData = data as SecurityHealthData;
      setHealthData(typedData);
    } catch (error) {
      console.error('Failed to fetch security health:', error);
      toast({
        title: "Error",
        description: "Failed to fetch security health data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchSecurityHealth();
  };

  useEffect(() => {
    fetchSecurityHealth();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'needs_attention': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'good': return <Shield className="w-5 h-5 text-blue-500" />;
      case 'needs_attention': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Health Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span className="ml-2">Loading security health...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!healthData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Health Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-2" />
            <p className="text-red-600">Failed to load security health data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Health Dashboard
          </div>
          <Button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            variant="outline" 
            size="sm"
          >
            {isRefreshing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Status */}
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            {getStatusIcon(healthData.status)}
            <div>
              <h3 className="font-semibold">Overall Security Status</h3>
              <p className="text-sm text-gray-600">
                Score: {healthData.security_score}/100
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(healthData.status)}>
            {healthData.status.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>

        {/* Issues */}
        {healthData.issues.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-red-600">Security Issues</h4>
            <div className="space-y-1">
              {healthData.issues.map((issue, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-700">{issue}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Policy Conflicts */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
          <span className="text-sm font-medium">Policy Conflicts</span>
          <Badge variant={healthData.policy_conflicts > 0 ? "destructive" : "secondary"}>
            {healthData.policy_conflicts}
          </Badge>
        </div>

        {/* Missing Functions */}
        {healthData.missing_functions.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-orange-600">Missing Functions</h4>
            <div className="grid grid-cols-1 gap-1">
              {healthData.missing_functions.map((func, index) => (
                <Badge key={index} variant="outline" className="justify-start">
                  {func}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Last Check */}
        <div className="text-xs text-gray-500 text-center">
          Last checked: {new Date(healthData.last_check).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityHealthDashboard;
