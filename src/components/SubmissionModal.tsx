
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SubmissionForm from '@/components/SubmissionForm';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  isSubmitting?: boolean;
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  isSubmitting = false
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-newsprint border-vintage-red/30 max-w-2xl max-h-[90vh] overflow-y-auto z-modal">
        <DialogHeader>
          <DialogTitle className="sr-only">Submit Tea</DialogTitle>
        </DialogHeader>
        <SubmissionForm
          onClose={onClose}
          onSubmit={onSubmit}
          isLoading={isLoading || isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionModal;
