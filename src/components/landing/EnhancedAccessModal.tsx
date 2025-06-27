
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface EnhancedAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedAccessModal: React.FC<EnhancedAccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-cyan-500/30">
        <p className="text-gray-300">Enhanced access features coming soon!</p>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedAccessModal;
