
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Coffee } from 'lucide-react';
import { BetaCodeService } from '@/services/betaCodeService';
import { useToast } from '@/hooks/use-toast';

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPath: 'spill' | 'bribe' | 'code' | null;
  accessCode: string;
  onAccessCodeChange: (code: string) => void;
  onSubmit: () => void;
}

const AccessModal: React.FC<AccessModalProps> = ({
  isOpen,
  onClose,
  selectedPath,
  accessCode,
  onAccessCodeChange,
  onSubmit
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (selectedPath === 'code') {
      if (!accessCode.trim()) {
        setError('Please enter an access code');
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const result = await BetaCodeService.validateCode(accessCode, true);
        
        if (result.valid) {
          localStorage.setItem('ctea-beta-access', 'granted');
          localStorage.setItem('ctea-beta-code', result.code || accessCode);
          toast({
            title: "Access Granted! ☕",
            description: "Welcome to CTea Newsroom!",
          });
          onSubmit();
        } else {
          setError(result.error || 'Invalid access code');
        }
      } catch (error) {
        setError('Verification failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // For spill and bribe paths, generate a code
      if (selectedPath === 'spill') {
        const mockSubmissionId = crypto.randomUUID();
        const result = await BetaCodeService.generateCodeForSpill(mockSubmissionId);
        if (result.success && result.code) {
          setGeneratedCode(result.code);
          onAccessCodeChange(result.code);
        }
      } else if (selectedPath === 'bribe') {
        const testCodes = BetaCodeService.getTestCodes();
        const randomCode = testCodes[Math.floor(Math.random() * testCodes.length)];
        setGeneratedCode(randomCode);
        onAccessCodeChange(randomCode);
      }
    }
  };

  const handleUseGeneratedCode = async () => {
    if (!generatedCode) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await BetaCodeService.validateCode(generatedCode, true);
      
      if (result.valid) {
        localStorage.setItem('ctea-beta-access', 'granted');
        localStorage.setItem('ctea-beta-code', result.code || generatedCode);
        toast({
          title: "Access Granted! ☕",
          description: "Welcome to CTea Newsroom!",
        });
        onSubmit();
      } else {
        setError('Failed to validate generated code');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-[#1b1b1b] to-[#2a1a2a] border-[#00d1c1]/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2" style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            <Coffee className="w-6 h-6 text-[#00d1c1]" />
            {selectedPath === 'spill' && 'Spill Your Tea'}
            {selectedPath === 'bribe' && 'Bribe Accepted'}
            {selectedPath === 'code' && 'Enter Access Code'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {selectedPath === 'code' ? (
            <div>
              <Label htmlFor="access-code" className="text-white">Access Code</Label>
              <Input
                id="access-code"
                value={accessCode}
                onChange={(e) => onAccessCodeChange(e.target.value.toUpperCase())}
                placeholder="Enter your code..."
                className="bg-white/10 border-[#00d1c1]/30 text-white placeholder:text-white/50 font-mono text-center"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              {error && (
                <Alert className="border-red-500 bg-red-500/10 mt-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <AlertDescription className="text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          ) : generatedCode ? (
            <div className="text-center py-4">
              <p className="text-white/80 mb-4">
                {selectedPath === 'spill' && "Thanks for spilling the tea! Here's your access code:"}
                {selectedPath === 'bribe' && "Your tribute has been noted! Here's your access code:"}
              </p>
              <div className="bg-[#00d1c1]/20 border border-[#00d1c1]/50 rounded-lg p-4">
                <code className="text-[#00d1c1] text-2xl font-bold font-mono">{generatedCode}</code>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-white/80 mb-4">
                {selectedPath === 'spill' && "Ready to spill some tea and get access?"}
                {selectedPath === 'bribe' && "Ready to tip the gatekeepers for access?"}
              </p>
            </div>
          )}

          <Button
            onClick={generatedCode ? handleUseGeneratedCode : handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] hover:from-[#ff61a6] hover:to-[#00d1c1] text-white font-bold"
          >
            {isLoading ? 'Processing...' : 
             generatedCode ? 'Enter Newsroom' :
             selectedPath === 'code' ? 'Submit Code' : 
             selectedPath === 'spill' ? 'Generate Code' : 'Get Access Code'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessModal;
