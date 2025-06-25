
import React from 'react';
import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';

interface SubmissionFormActionsProps {
  isSubmitting: boolean;
  isLoading: boolean;
  isFormValid: boolean;
  onCancel: () => void;
}

const SubmissionFormActions: React.FC<SubmissionFormActionsProps> = ({
  isSubmitting,
  isLoading,
  isFormValid,
  onCancel
}) => {
  return (
    <div className="flex gap-3 pt-4">
      <Button
        type="submit"
        disabled={isSubmitting || isLoading || !isFormValid}
        className="flex-1 bg-gradient-to-r from-accent to-accent2 hover:from-accent2 hover:to-accent text-white font-bold uppercase px-6 py-3 rounded-lg transition-all shadow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting || isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Spilling Tea...
          </>
        ) : (
          <>
            <Coffee className="w-4 h-4 mr-2" />
            Spill Tea
          </>
        )}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="border-accent/30 text-accent hover:bg-accent/10 uppercase font-semibold px-6 py-3 rounded-lg transition-all shadow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95"
      >
        Cancel
      </Button>
    </div>
  );
};

export default SubmissionFormActions;
