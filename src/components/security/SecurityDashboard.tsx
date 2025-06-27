
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { secureLog } from '@/utils/secureLog';

interface SecurityMetrics {
  totalEvents: number;
  criticalEvents: number;
  blockedAttempts: number;
  activeThreats: number;
}

const SecurityDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalEvents: 0,
    criticalEvents: 0,
    blockedAttempts: 0,
    activeThreats: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  const refreshMetrics = async () => {
    setIsLoading(true);
    
    try {
      // Simulate loading security metrics
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics({
        totalEvents: Math.floor(Math.random() * 1000) + 500,
        criticalEvents: Math.floor(Math.random() * 10),
        blockedAttempts: Math.floor(Math.random() * 50) + 10,
        activeThreats: Math.floor(Math.random() * 5)
      });
    } catch (error) {
      secureLog.error('Failed to load security metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshMetrics();
  }, []);

  const getRiskLevel = (criticalEvents: number): 'low' | 'medium' | 'high' | 'critical' => {
    if (criticalEvents === 0) return 'low';
    if (criticalEvents <= 2) return 'medium';
    if (criticalEvents <= 5) return 'high';
    return 'critical';
  };

  const riskLevel = getRiskLevel(metrics.criticalEvents);
  const riskColors = {
    low: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    high: 'text-orange-600 bg-orange-100',
    critical: 'text-red-600 bg-red-100'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Security Dashboard</h2>
        </div>
        <Button
          onClick={refreshMetrics}
          disabled={isLoading}
          size="sm"
          variant="outline"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Security Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Risk Level</p>
                <Badge className={`mt-1 ${riskColors[riskLevel]}`}>
                  {riskLevel.toUpperCase()}
                </Badge>
              </div>
              {riskLevel === 'low' ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold">{metrics.totalEvents}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blocked Attempts</p>
                <p className="text-2xl font-bold">{metrics.blockedAttempts}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Threats</p>
                <p className="text-2xl font-bold">{metrics.activeThreats}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Security Information */}
      <Card>
        <CardHeader>
          <CardTitle>Security Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            All security systems are operational and monitoring for threats.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDashboard;
