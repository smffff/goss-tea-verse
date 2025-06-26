
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

interface SecurityFallbackDisplayProps {
  type: 'validation' | 'rate_limit' | 'general';
  message?: string;
  onRetry?: () => void;
  onReportIssue?: () => void;
}

const SecurityFallbackDisplay: React.FC<SecurityFallbackDisplayProps> = ({
  type,
  message,
  onRetry,
  onReportIssue
}) => {
  const getDisplayContent = () => {
    switch (type) {
      case 'validation':
        return {
          icon: <Shield className="w-6 h-6 text-orange-400" />,
          title: '🫖 Security Check in Progress',
          description: 'Our tea security is brewing... Using backup validation for now.',
          color: 'border-orange-400/30 bg-orange-400/5'
        };
      case 'rate_limit':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-yellow-400" />,
          title: '🫖 Tea Pace Control Active',
          description: 'Slow down there, eager sipper! Rate limiting engaged.',
          color: 'border-yellow-400/30 bg-yellow-400/5'
        };
      default:
        return {
          icon: <Shield className="w-6 h-6 text-blue-400" />,
          title: '🫖 CTea Security System',
          description: 'Security features are temporarily running in backup mode.',
          color: 'border-blue-400/30 bg-blue-400/5'
        };
    }
  };

  const content = getDisplayContent();

  const handleReportIssue = () => {
    try {
      const errorReport = {
        type: 'security_fallback_display',
        fallbackType: type,
        timestamp: new Date().toISOString(),
        message: message || 'No specific message',
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      localStorage.setItem('ctea_error_report', JSON.stringify(errorReport));
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🫖 CTea Error Report created:', errorReport);
      
      if (onReportIssue) {
        onReportIssue();
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Failed to create error report:', error);
    }
  };

  return (
    <Card className={`${content.color} border-2`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {content.icon}
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-white text-sm">{content.title}</h3>
              <BrandedTeacupIcon size="xs" animated />
            </div>
            <p className="text-gray-300 text-xs mb-3">
              {content.description}
            </p>
            {message && (
              <p className="text-gray-400 text-xs mb-3 font-mono bg-black/20 rounded p-2">
                {message}
              </p>
            )}
            <div className="flex gap-2">
              {onRetry && (
                <Button
                  onClick={onRetry}
                  size="sm"
                  variant="outline"
                  className="text-xs border-ctea-teal/50 text-ctea-teal hover:bg-ctea-teal/10"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Retry
                </Button>
              )}
              <Button
                onClick={handleReportIssue}
                size="sm"
                variant="outline"
                className="text-xs border-orange-400/50 text-orange-400 hover:bg-orange-400/10"
              >
                Report Issue
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityFallbackDisplay;
