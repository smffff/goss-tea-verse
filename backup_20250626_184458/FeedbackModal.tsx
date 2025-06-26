import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MessageSquare } from 'lucide-react';
import FeedbackForm from '@/components/feedback/FeedbackForm';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'bug' | 'feature' | 'general' | 'error';
  errorDetails?: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  initialType = 'general',
  errorDetails
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-ctea-dark/95 backdrop-blur-md border-ctea-teal/30 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-ctea-teal" />
            Send Feedback
          </DialogTitle>
        </DialogHeader>

        <FeedbackForm
          initialType={initialType}
          errorDetails={errorDetails}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
