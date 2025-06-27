
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TippingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TippingModal: React.FC<TippingModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-cyan-500/30">
        <DialogHeader>
          <DialogTitle className="text-white">Tipping Feature</DialogTitle>
        </DialogHeader>
        <p className="text-gray-300">Coming soon in the next update!</p>
      </DialogContent>
    </Dialog>
  );
};

export default TippingModal;
