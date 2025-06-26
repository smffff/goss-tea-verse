
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, CheckCircle, RefreshCw, Download } from 'lucide-react';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

interface SecurityStatus {
  contentValidation: 'healthy' | 'degraded' | 'failed';
  rateLimiting: 'healthy' | 'degraded' | 'failed';
  urlValidation: 'healthy' | 'degraded' | 'failed';
  tokenValidation: 'healthy' | 'degraded' | 'failed';
  lastCheck: Date;
}

const SecurityHealthDashboard: React.FC = () => {
  const [status, setStatus] = useState<SecurityStatus>({
    contentValidation: 'healthy',
    rateLimiting: 'healthy',
    urlValidation: 'healthy',
    tokenValidation: 'healthy',
    lastCheck: new Date()
  });

  const [errorReports, setErrorReports] = useState<any[]>([]);

  useEffect(() => {
    loadErrorReports();
    checkSecurityHealth();
  }, []);

  const loadErrorReports = () => {
    try {
      const stored = localStorage.getItem('ctea_error_report');
      if (stored) {
        const report = JSON.parse(stored);
        setErrorReports([report]);
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Failed to load error reports:', error);
    }
  };

  const checkSecurityHealth = async () => {
    // This would normally ping each service
    // For now, we'll simulate based on recent errors
    const hasErrors = errorReports.length > 0;
    
    setStatus({
      contentValidation: hasErrors ? 'degraded' : 'healthy',
      rateLimiting: hasErrors ? 'degraded' : 'healthy',
      urlValidation: 'healthy',
      tokenValidation: 'healthy',
      lastCheck: new Date()
    });
  };

  const getStatusIcon = (serviceStatus: string) => {
    switch (serviceStatus) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'degraded':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (serviceStatus: string) => {
    switch (serviceStatus) {
      case 'healthy':
        return 'bg-green-400/20 text-green-400 border-green-400/50';
      case 'degraded':
        return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/50';
      case 'failed':
        return 'bg-red-400/20 text-red-400 border-red-400/50';
      default:
        return 'bg-gray-400/20 text-gray-400 border-gray-400/50';
    }
  };

  const exportErrorReports = () => {
    try {
      const allReports = {
        timestamp: new Date().toISOString(),
        reports: errorReports,
        securityStatus: status,
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      const dataStr = JSON.stringify(allReports, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `ctea-error-report-${Date.now()}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Failed to export error reports:', error);
    }
  };

  const clearErrorReports = () => {
    localStorage.removeItem('ctea_error_report');
    setErrorReports([]);
    checkSecurityHealth();
  };

  return (
    <Card className="bg-ctea-dark/60 border-ctea-teal/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Shield className="w-5 h-5 text-ctea-teal" />
          🫖 CTea Security Health
          <BrandedTeacupIcon size="sm" animated />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Service Status */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'contentValidation', label: 'Content Validation' },
            { key: 'rateLimiting', label: 'Rate Limiting' },
            { key: 'urlValidation', label: 'URL Validation' },
            { key: 'tokenValidation', label: 'Token Validation' }
          ].map(service => (
            <div key={service.key} className="flex items-center justify-between p-2 bg-black/20 rounded">
              <span className="text-sm text-gray-300">{service.label}</span>
              <Badge className={getStatusColor(status[service.key as keyof SecurityStatus] as string)}>
                {getStatusIcon(status[service.key as keyof SecurityStatus] as string)}
                {(status[service.key as keyof SecurityStatus] as string).toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>

        {/* Error Reports */}
        {errorReports.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">Error Reports ({errorReports.length})</h4>
            {errorReports.slice(0, 3).map((report, index) => (
              <div key={index} className="bg-red-900/20 border border-red-500/30 rounded p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-300">{report.type}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(report.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-xs text-red-400 mt-1">{report.error}</p>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={checkSecurityHealth}
            size="sm"
            variant="outline"
            className="flex-1 border-ctea-teal/50 text-ctea-teal hover:bg-ctea-teal/10"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Refresh
          </Button>
          
          {errorReports.length > 0 && (
            <>
              <Button
                onClick={exportErrorReports}
                size="sm"
                variant="outline"
                className="border-orange-400/50 text-orange-400 hover:bg-orange-400/10"
              >
                <Download className="w-3 h-3 mr-1" />
                Export
              </Button>
              <Button
                onClick={clearErrorReports}
                size="sm"
                variant="outline"
                className="border-red-400/50 text-red-400 hover:bg-red-400/10"
              >
                Clear
              </Button>
            </>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center">
          Last checked: {status.lastCheck.toLocaleTimeString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default SecurityHealthDashboard;
