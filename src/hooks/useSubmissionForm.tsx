
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { trackFormCompletion, trackTeaSpill } from '@/lib/analytics';

interface SubmissionData {
  tea: string;
  email: string;
  wallet: string;
  category: string;
  evidence_urls: string[];
  isAnonymous: boolean;
}

export const useSubmissionForm = (
  onSubmit: (data: SubmissionData) => Promise<void>,
  isLoading: boolean
) => {
  const [formData, setFormData] = useState<SubmissionData>({
    tea: '',
    email: '',
    wallet: '',
    category: 'general',
    evidence_urls: [],
    isAnonymous: true
  });
  
  const [errors, setErrors] = useState<Partial<SubmissionData>>({});
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: Partial<SubmissionData> = {};

    const trimmedTea = formData.tea.trim();
    
    if (!trimmedTea) {
      newErrors.tea = 'Please share some tea!';
    } else if (trimmedTea.length < 3) {
      newErrors.tea = 'Tea must be at least 3 characters long';
    } else if (trimmedTea.length > 2000) {
      newErrors.tea = 'Tea must be less than 2000 characters';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.wallet.trim() && formData.wallet.trim().length < 10) {
      newErrors.wallet = 'Please enter a valid wallet address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) {
      return;
    }
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors above before submitting.",
        variant: "destructive"
      });
      return;
    }

    try {
      trackFormCompletion('tea_submission');
      await onSubmit(formData);
      trackTeaSpill(formData.category);
      
      // Reset form on successful submission
      setFormData({
        tea: '',
        email: '',
        wallet: '',
        category: 'general',
        evidence_urls: [],
        isAnonymous: true
      });
      setErrors({});
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      toast({
        title: "Submission Failed",
        description: `Couldn't submit your tea: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive"
      });
    }
  };

  const clearError = (field: keyof SubmissionData) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const updateFormData = (updates: Partial<SubmissionData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const isFormValid = formData.tea.trim().length >= 3;

  return {
    formData,
    errors,
    handleSubmit,
    clearError,
    updateFormData,
    isFormValid
  };
};

export type { SubmissionData };
