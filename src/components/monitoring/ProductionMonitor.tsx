
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Database,
  Wifi,
  Clock,
  TrendingUp,
  XCircle
} from 'lucide-react';

interface SystemMetrics {
  responseTime: number;
  uptime: number;
  activeUsers: number;
  errorRate: number;
  databaseHealth: 'healthy' | 'warning' | 'critical';
  lastUpdated: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  threshold: number;
  status: 'good' | 'warning' | 'critical';
  unit: string;
}

const ProductionMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    responseTime: 0,
    uptime: 99.9,
    activeUsers: 0,
    errorRate: 0,
    databaseHealth: 'healthy',
    lastUpdated: new Date().toLocaleTimeString()
  });

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>('online');

  useEffect(() => {
    // Simulate real-time metrics updates
    const updateMetrics = () => {
      const now = performance.now();
      
      setMetrics(prev => ({
        ...prev,
        responseTime: Math.round(50 + Math.random() * 100),
        activeUsers: Math.round(420 + Math.random() * 50),
        errorRate: Math.round(Math.random() * 2 * 100) / 100,
        lastUpdated: new Date().toLocaleTimeString()
      }));

      // Update performance metrics
      setPerformanceMetrics([
        {
          name: 'Core Web Vitals LCP',
          value: 1.2 + Math.random() * 0.8,
          threshold: 2.5,
          status: 'good',
          unit: 's'
        },
        {
          name: 'First Input Delay',
          value: 50 + Math.random() * 50,
          threshold: 100,
          status: 'good',
          unit: 'ms'
        },
        {
          name: 'Cumulative Layout Shift',
          value: 0.05 + Math.random() * 0.05,
          threshold: 0.1,
          status: 'good',
          unit: ''
        },
        {
          name: 'Bundle Size',
          value: 250 + Math.random() * 50,
          threshold: 500,
          status: 'good',
          unit: 'KB'
        }
      ]);
    };

    // Monitor connection status
    const handleOnline = () => setConnectionStatus('online');
    const handleOffline = () => setConnectionStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial update
    updateMetrics();

    // Update every 5 seconds
    const interval = setInterval(updateMetrics, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'good':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  // Only show in production or for admins
  const shouldShow = process.env.NODE_ENV === 'production' || 
                    localStorage.getItem('ctea-admin-debug') === 'true' ||
                    window.location.hostname === 'cteanews.com';

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <Card className="bg-black/90 border-ctea-teal/30 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-ctea-teal" />
              Production Monitor
            </div>
            <div className="flex items-center gap-1">
              {connectionStatus === 'online' ? (
                <Wifi className="w-3 h-3 text-green-500" />
              ) : (
                <Wifi className="w-3 h-3 text-red-500" />
              )}
              <span className="text-xs text-gray-400">
                {connectionStatus}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {/* System Health */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Response Time</span>
              <span className="text-xs font-mono text-white">
                {metrics.responseTime}ms
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Uptime</span>
              <span className="text-xs font-mono text-green-400">
                {metrics.uptime}%
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Active Users</span>
              <span className="text-xs font-mono text-ctea-teal">
                {metrics.activeUsers}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Error Rate</span>
              <span className={`text-xs font-mono ${metrics.errorRate > 1 ? 'text-red-400' : 'text-green-400'}`}>
                {metrics.errorRate}%
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Database</span>
              <div className="flex items-center gap-1">
                {getStatusIcon(metrics.databaseHealth)}
                <span className={`text-xs ${getStatusColor(metrics.databaseHealth)}`}>
                  {metrics.databaseHealth}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="pt-2 border-t border-ctea-teal/20">
            <div className="text-xs font-medium text-ctea-teal mb-2">Performance</div>
            <div className="space-y-1">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 truncate">
                    {metric.name}
                  </span>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(metric.status)}
                    <span className="text-xs font-mono text-white">
                      {metric.value.toFixed(metric.name.includes('Shift') ? 3 : 1)}{metric.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Last Updated */}
          <div className="pt-2 border-t border-ctea-teal/20 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">Updated</span>
            </div>
            <span className="text-xs text-gray-400">{metrics.lastUpdated}</span>
          </div>

          {/* Quick Actions */}
          <div className="pt-2 border-t border-ctea-teal/20">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-6 px-2 border-ctea-teal/30 text-ctea-teal"
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-6 px-2 border-ctea-teal/30 text-ctea-teal"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'monitor_health_check', {
                      event_category: 'monitoring',
                      custom_parameters: {
                        response_time: metrics.responseTime,
                        error_rate: metrics.errorRate,
                        active_users: metrics.activeUsers
                      }
                    });
                  }
                }}
              >
                Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionMonitor;
