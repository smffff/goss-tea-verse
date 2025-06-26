
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useSecurityAudit } from './SecurityAuditProvider';
import { Card, CardContent } from '@/components/ui/card';

interface SecurityStatus {
  level: 'secure' | 'warning' | 'danger' | 'critical';
  message: string;
  details: string[];
}

const EnhancedSecurityMonitor: React.FC = () => {
  const { threatLevel, securityScore, activeThreats } = useSecurityAudit();
  const [status, setStatus] = useState<SecurityStatus>({
    level: 'secure',
    message: 'All systems secure',
    details: []
  });

  useEffect(() => {
    // Update security status based on threat level and score
    if (threatLevel === 'critical' || securityScore < 30) {
      setStatus({
        level: 'critical',
        message: 'Critical security issues detected',
        details: activeThreats.slice(0, 3)
      });
    } else if (threatLevel === 'high' || securityScore < 50) {
      setStatus({
        level: 'danger',
        message: 'High security risk detected',
        details: activeThreats.slice(0, 2)
      });
    } else if (threatLevel === 'medium' || securityScore < 80) {
      setStatus({
        level: 'warning',
        message: 'Security monitoring active',
        details: ['Enhanced monitoring enabled']
      });
    } else {
      setStatus({
        level: 'secure',
        message: 'All systems secure',
        details: ['Security score: ' + securityScore + '%']
      });
    }
  }, [threatLevel, securityScore, activeThreats]);

  const getStatusIcon = () => {
    switch (status.level) {
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'danger':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'warning':
        return <Shield className="w-5 h-5 text-yellow-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status.level) {
      case 'critical':
        return 'border-red-500/50 bg-red-500/10';
      case 'danger':
        return 'border-orange-500/50 bg-orange-500/10';
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-500/10';
      default:
        return 'border-green-500/50 bg-green-500/10';
    }
  };

  // Only show monitor in development or when there are active threats
  if (process.env.NODE_ENV === 'production' && status.level === 'secure') {
    return null;
  }

  return (
    <AnimatePresence>
      {(process.env.NODE_ENV === 'development' || status.level !== 'secure') && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <Card className={`${getStatusColor()} border-2`}>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon()}
                <span className="text-sm font-semibold text-white">
                  {status.message}
                </span>
              </div>
              
              {status.details.length > 0 && (
                <div className="text-xs text-gray-300 space-y-1">
                  {status.details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              )}

              {process.env.NODE_ENV === 'development' && (
                <div className="mt-2 pt-2 border-t border-gray-600">
                  <div className="text-xs text-gray-400">
                    Security Score: {securityScore}% | Threat Level: {threatLevel}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedSecurityMonitor;
