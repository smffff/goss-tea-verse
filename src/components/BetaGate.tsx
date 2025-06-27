
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Clock, Sparkles } from 'lucide-react';
import { secureLog } from '@/utils/secureLogging';

interface BetaGateProps {
  onAccessGranted: () => void;
  children?: React.ReactNode;
}

const BetaGate: React.FC<BetaGateProps> = ({ onAccessGranted, children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    checkBetaAccess();
  }, []);

  const checkBetaAccess = async () => {
    try {
      setIsChecking(true);
      secureLog.info('Checking beta access...');
      
      // Check for existing beta access
      const betaAccess = localStorage.getItem('ctea-beta-access');
      const demoMode = localStorage.getItem('ctea-demo-mode');
      
      if (betaAccess || demoMode) {
        setHasAccess(true);
        onAccessGranted();
      } else {
        setHasAccess(false);
      }
    } catch (error) {
      secureLog.error('Beta access check failed:', error);
      setHasAccess(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleEmergencyAccess = () => {
    try {
      secureLog.info('Emergency access granted');
      localStorage.setItem('ctea-demo-mode', 'true');
      setHasAccess(true);
      onAccessGranted();
    } catch (error) {
      secureLog.error('Emergency access failed:', error);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <Card className="bg-ctea-dark/80 border-ctea-teal/30 p-8">
          <CardContent className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-ctea-teal border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white">Checking access...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <Card className="bg-ctea-dark/80 border-ctea-teal/30 max-w-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-ctea-teal" />
              Beta Access Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              This feature is currently in beta. Please request access or try the demo mode.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleEmergencyAccess}
                className="bg-ctea-teal hover:bg-ctea-teal/80 text-black font-bold"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Demo Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default BetaGate;
