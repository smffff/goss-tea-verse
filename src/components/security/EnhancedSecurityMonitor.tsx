import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSecurityAudit } from './SecurityAuditProvider';
import SecurityHealthMonitor from './SecurityHealthMonitor';

const EnhancedSecurityMonitor: React.FC = () => {
  const { 
    threatLevel, 
    securityScore, 
    activeThreats, 
    policyHealth,
    refreshSecurityHealth 
  } = useSecurityAudit();
  const [isVisible, setIsVisible] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<string>('');

  const getThreatColor = () => {
    switch (threatLevel) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  const getThreatBadge = () => {
    switch (threatLevel) {
      case 'critical': return <Badge variant="destructive">Critical</Badge>;
      case 'high': return <Badge variant="secondary" className="bg-orange-100 text-orange-800">High</Badge>;
      case 'medium': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      default: return <Badge variant="secondary" className="bg-green-100 text-green-800">Low</Badge>;
    }
  };

  const handleRefreshHealth = async () => {
    await refreshSecurityHealth();
    setLastRefresh(new Date().toLocaleTimeString());
  };

  // Only show in development AND if specifically enabled
  useEffect(() => {
    const shouldShow = process.env.NODE_ENV === 'development' && 
                     localStorage.getItem('ctea-show-security-debug') === 'true';
    setIsVisible(shouldShow);
  }, []);

  // Completely hidden in production - no DOM output at all
  if (process.env.NODE_ENV === 'production' || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {/* Security Health Monitor */}
      <SecurityHealthMonitor />
      
      {/* Enhanced Security Monitor */}
      <Card className="w-80">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Shield className={`w-4 h-4 ${getThreatColor()}`} />
              Security Monitor (DEV)
            </div>
            <div className="flex items-center gap-2">
              {getThreatBadge()}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="h-6 w-6 p-0"
              >
                <EyeOff className="w-3 h-3" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Security Score</span>
              <span className={`text-sm font-bold ${securityScore >= 80 ? 'text-green-600' : securityScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                {securityScore}/100
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Policy Health</span>
              <Badge variant={policyHealth === 'healthy' ? 'secondary' : 'destructive'} className="text-xs">
                {policyHealth}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Threats</span>
              <span className="text-sm font-medium">{activeThreats.length}</span>
            </div>
          </div>

          {activeThreats.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-700">Recent Threats:</div>
              {activeThreats.slice(-2).map((threat, index) => (
                <div key={index} className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                  {threat}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshHealth}
              className="text-xs"
            >
              Refresh Health
            </Button>
            {lastRefresh && (
              <span className="text-xs text-gray-500">
                {lastRefresh}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSecurityMonitor;
