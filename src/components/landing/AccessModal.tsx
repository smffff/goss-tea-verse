
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { BetaCodeService } from '@/services/betaCodeService';
import { secureLog } from '@/utils/secureLogging';

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccessGranted: () => void;
}

const AccessModal: React.FC<AccessModalProps> = ({ isOpen, onClose, onAccessGranted }) => {
  const [betaCode, setBetaCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleBetaCodeSubmit = async () => {
    if (!betaCode.trim()) {
      toast({
        title: "Beta Code Required",
        description: "Please enter a beta code to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    try {
      const result = await BetaCodeService.validateBetaCode(betaCode.trim());
      secureLog.info('Beta code validation result:', { success: result.success });
      
      if (result.success) {
        localStorage.setItem('ctea-beta-access', 'granted');
        localStorage.setItem('ctea-beta-code', betaCode.trim());
        toast({
          title: "Access Granted! 🎉",
          description: "Welcome to CTea Beta! You now have full access.",
        });
        onAccessGranted();
        onClose();
      } else {
        toast({
          title: "Invalid Beta Code",
          description: result.message || "The beta code you entered is not valid.",
          variant: "destructive"
        });
      }
    } catch (error) {
      secureLog.error('Beta code validation error:', error);
      toast({
        title: "Validation Error",
        description: "Unable to verify beta code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDemoAccess = async () => {
    try {
      secureLog.info('Demo access granted');
      localStorage.setItem('ctea-demo-mode', 'true');
      toast({
        title: "Demo Access Granted! 🎉",
        description: "Welcome to CTea Demo! Explore the app with sample data.",
      });
      onAccessGranted();
      onClose();
    } catch (error) {
      secureLog.error('Demo access error:', error);
      toast({
        title: "Demo Access Error",
        description: "Unable to grant demo access. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-ctea-dark border-ctea-teal/30">
        <DialogHeader>
          <DialogTitle className="text-white">Access CTea</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="beta-code" className="text-white">Beta Code</Label>
            <Input
              id="beta-code"
              type="text"
              value={betaCode}
              onChange={(e) => setBetaCode(e.target.value)}
              placeholder="Enter your beta code"
              className="bg-ctea-darker border-ctea-teal/30 text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleBetaCodeSubmit()}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleBetaCodeSubmit}
              disabled={isVerifying}
              className="w-full bg-gradient-to-r from-ctea-teal to-ctea-purple text-white"
            >
              {isVerifying ? 'Verifying...' : 'Submit Beta Code'}
            </Button>
            <Button
              onClick={handleDemoAccess}
              variant="outline"
              className="w-full border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
            >
              Try Demo Mode
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessModal;
