
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { secureLog } from '@/utils/secureLogging';

export const useSubmissionModal = () => {
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const { toast } = useToast();

  const handleSubmissionSubmit = async (data: { content: string; wallet?: string; email?: string }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Spill Submitted! 🫖",
        description: "Your tea has been added to our review queue.",
      });
      
      setShowSubmissionModal(false);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        secureLog.error('Submission error:', error);
      }
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  return {
    showSubmissionModal,
    setShowSubmissionModal,
    handleSubmissionSubmit
  };
};
