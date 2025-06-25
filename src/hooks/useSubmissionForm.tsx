
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

  console.log('useSubmissionForm - Current form data:', formData);
  console.log('useSubmissionForm - Current errors:', errors);
  console.log('useSubmissionForm - isLoading:', isLoading);

  const validateForm = (): boolean => {
    console.log('validateForm - Starting validation');
    const newErrors: Partial<SubmissionData> = {};

    const trimmedTea = formData.tea.trim();
    console.log('validateForm - Trimmed tea content:', trimmedTea);
    
    if (!trimmedTea) {
      newErrors.tea = 'Please share some tea!';
      console.log('validateForm - Error: Empty tea content');
    } else if (trimmedTea.length < 3) {
      newErrors.tea = 'Tea must be at least 3 characters long';
      console.log('validateForm - Error: Tea too short');
    } else if (trimmedTea.length > 2000) {
      newErrors.tea = 'Tea must be less than 2000 characters';
      console.log('validateForm - Error: Tea too long');
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      console.log('validateForm - Error: Invalid email');
    }

    if (formData.wallet.trim() && formData.wallet.trim().length < 10) {
      newErrors.wallet = 'Please enter a valid wallet address';
      console.log('validateForm - Error: Invalid wallet');
    }

    console.log('validateForm - New errors:', newErrors);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('validateForm - Form is valid:', isValid);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit - Form submission started');
    e.preventDefault();
    
    if (isLoading) {
      console.log('handleSubmit - Already loading, preventing duplicate submission');
      return;
    }
    
    if (!validateForm()) {
      console.log('handleSubmit - Validation failed');
      toast({
        title: "Validation Error",
        description: "Please fix the errors above before submitting.",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('handleSubmit - Calling onSubmit with data:', formData);
      trackFormCompletion('tea_submission');
      await onSubmit(formData);
      trackTeaSpill(formData.category);
      
      console.log('handleSubmit - Submission successful, resetting form');
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
      console.error('handleSubmit - Form submission error:', error);
      
      toast({
        title: "Submission Failed",
        description: `Couldn't submit your tea: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive"
      });
    }
  };

  const clearError = (field: keyof SubmissionData) => {
    if (errors[field]) {
      console.log('clearError - Clearing error for field:', field);
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const updateFormData = (updates: Partial<SubmissionData>) => {
    console.log('updateFormData - Updating with:', updates);
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      console.log('updateFormData - New form data:', newData);
      return newData;
    });
  };

  const isFormValid = formData.tea.trim().length >= 3;
  console.log('useSubmissionForm - isFormValid:', isFormValid);

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
