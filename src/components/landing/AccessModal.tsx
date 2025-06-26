
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-[#1b1b1b] to-[#2a1a2a] border-[#00d1c1]/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold" style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            {selectedPath === 'spill' && '🫖 Spill Your Tea'}
            {selectedPath === 'bribe' && '💅 Bribe Accepted'}
            {selectedPath === 'code' && '🔐 Enter Access Code'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {selectedPath === 'code' ? (
            <div>
              <Label htmlFor="access-code" className="text-white">Access Code</Label>
              <Input
                id="access-code"
                value={accessCode}
                onChange={(e) => onAccessCodeChange(e.target.value)}
                placeholder="Enter your code..."
                className="bg-white/10 border-[#00d1c1]/30 text-white placeholder:text-white/50"
              />
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-white/80 mb-4">
                {selectedPath === 'spill' && "Thanks for wanting to spill the tea! Here's your access code:"}
                {selectedPath === 'bribe' && "Your tribute has been noted! Here's your access code:"}
              </p>
              <div className="bg-[#00d1c1]/20 border border-[#00d1c1]/50 rounded-lg p-4">
                <code className="text-[#00d1c1] text-2xl font-bold">TEA</code>
              </div>
            </div>
          )}

          <Button
            onClick={onSubmit}
            className="w-full bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] hover:from-[#ff61a6] hover:to-[#00d1c1] text-white font-bold"
          >
            {selectedPath === 'code' ? 'Submit Code' : 'Enter Newsroom'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessModal;
