import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SubmissionForm from '@/components/SubmissionForm';
import { useToast } from '@/hooks/use-toast';
import BetaDisclaimer from '@/components/BetaDisclaimer';
import EarlyAccessGate from '@/components/EarlyAccessGate';

interface SubmissionData {
  tea: string;
  email: string;
  wallet: string;
  category: string;
  evidence_urls: string[];
  isAnonymous: boolean;
}

const SubmitTea = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (data: SubmissionData) => {
    setIsSubmitting(true);
    try {
      // Simulate submission
      setTimeout(() => {
        toast({
          title: "Tea Submitted! ☕",
          description: "Your submission is being reviewed. Check back soon!",
        });
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Couldn't submit your tea. Please try again.",
        variant: "destructive"
      });
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Spill Your Tea ☕
            </h1>
            <BetaDisclaimer variant="inline" className="justify-center mb-4" />
            <p className="text-gray-400">
              Share the latest crypto gossip, rumors, and alpha with the community
            </p>
          </div>
          
          <EarlyAccessGate
            requiredTeaAmount={500}
            fallbackContent={
              <SubmissionForm
                isOpen={true}
                onClose={handleClose}
                onSubmit={handleSubmit}
                isLoading={isSubmitting}
              />
            }
          >
            <SubmissionForm
              isOpen={true}
              onClose={handleClose}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          </EarlyAccessGate>
        </div>
      </div>
    </Layout>
  );
};

export default SubmitTea;
