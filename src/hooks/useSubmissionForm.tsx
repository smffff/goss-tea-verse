
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { trackFormCompletion, trackTeaSpill } from '@/lib/analytics';
import { sanitizeContent, sanitizeUrls } from '@/utils/securityUtils';

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
    
    if (isLoading || !validateForm()) {
      if (!validateForm()) {
        toast({
          title: "Validation Error",
          description: "Please fix the errors above before submitting.",
          variant: "destructive"
        });
      }
      return;
    }

    try {
      const sanitizedData: SubmissionData = {
        tea: sanitizeContent(formData.tea),
        email: formData.email.trim().toLowerCase(),
        wallet: formData.wallet.trim(),
        category: formData.category,
        evidence_urls: sanitizeUrls(formData.evidence_urls),
        isAnonymous: formData.isAnonymous
      };
      
      trackFormCompletion('tea_submission');
      await onSubmit(sanitizedData);
      trackTeaSpill(sanitizedData.category);
      
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
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
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
