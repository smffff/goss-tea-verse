
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SubmissionForm from '@/components/SubmissionForm';
import { useToast } from '@/hooks/use-toast';

const SubmitTea = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: { content: string; category: string; evidenceUrls: string[] }) => {
    setIsSubmitting(true);
    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Tea Submitted! ☕",
        description: "Your submission is being reviewed. Check back soon!",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Couldn't submit your tea. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Handle close if needed
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Spill Your Tea ☕
          </h1>
          
          <SubmissionForm
            isOpen={true}
            onClose={handleClose}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SubmitTea;
