
import React from 'react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Coffee, X } from 'lucide-react';

interface SpillTeaFormActionsProps {
  isSubmitting: boolean;
  isLoading: boolean;
  isFormValid: boolean;
  onCancel: () => void;
}

const SpillTeaFormActions: React.FC<SpillTeaFormActionsProps> = ({
  isSubmitting,
  isLoading,
  isFormValid,
  onCancel
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
        disabled={isLoading}
      >
        <X className="w-4 h-4 mr-2" />
        Cancel
      </Button>
      
      <Button
        type="submit"
        className="flex-1 bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white font-bold"
        disabled={!isFormValid || isLoading}
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner className="w-4 h-4 mr-2" />
            Spilling Tea...
          </>
        ) : (
          <>
            <Coffee className="w-4 h-4 mr-2" />
            Spill Tea ☕
          </>
        )}
      </Button>
    </div>
  );
};

export default SpillTeaFormActions;
