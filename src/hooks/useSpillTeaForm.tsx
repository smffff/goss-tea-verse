import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { sanitizeContent } from '@/utils/securityUtils';

interface SpillData {
  topic: string;
  teaText: string;
  mediaUrl?: string;
}

export const useSpillTeaForm = (
  onSubmit: (data: SpillData) => Promise<void>,
  isLoading: boolean
) => {
  const [formData, setFormData] = useState<SpillData>({
    topic: 'general',
    teaText: '',
    mediaUrl: ''
  });
  
  const [errors, setErrors] = useState<Partial<SpillData>>({});
  const { toast } = useToast();

  console.log('useSpillTeaForm - Current form data:', formData);
  console.log('useSpillTeaForm - Current errors:', errors);
  console.log('useSpillTeaForm - isLoading:', isLoading);

  const validateForm = (): boolean => {
    console.log('validateForm - Starting validation');
    const newErrors: Partial<SpillData> = {};

    const trimmedTeaText = formData.teaText.trim();
    console.log('validateForm - Trimmed tea text:', trimmedTeaText);
    
    if (!trimmedTeaText) {
      newErrors.teaText = 'Please share some tea!';
      console.log('validateForm - Error: Empty tea text');
    } else if (trimmedTeaText.length < 3) {
      newErrors.teaText = 'Tea must be at least 3 characters long';
      console.log('validateForm - Error: Tea too short');
    } else if (trimmedTeaText.length > 2000) {
      newErrors.teaText = 'Tea must be less than 2000 characters';
      console.log('validateForm - Error: Tea too long');
    }

    // Validate media URL if provided
    if (formData.mediaUrl && formData.mediaUrl.trim()) {
      const urlPattern = /^https?:\/\/.+/;
      if (!urlPattern.test(formData.mediaUrl.trim())) {
        newErrors.mediaUrl = 'Please enter a valid URL starting with http:// or https://';
        console.log('validateForm - Error: Invalid media URL');
      }
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
      console.log('handleSubmit - Sanitizing content before submission');
      
      // Sanitize all user inputs before submission
      const sanitizedData: SpillData = {
        topic: formData.topic,
        teaText: sanitizeContent(formData.teaText),
        mediaUrl: formData.mediaUrl?.trim() || undefined
      };
      
      console.log('handleSubmit - Calling onSubmit with sanitized data:', sanitizedData);
      await onSubmit(sanitizedData);
      
      console.log('handleSubmit - Submission successful, resetting form');
      // Reset form on successful submission
      setFormData({
        topic: 'general',
        teaText: '',
        mediaUrl: ''
      });
      setErrors({});
      
    } catch (error) {
      console.error('handleSubmit - Form submission error:', error);
      
      // Show error toast here since parent might not handle it
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: "destructive"
      });
    }
  };

  const clearError = (field: keyof SpillData) => {
    if (errors[field]) {
      console.log('clearError - Clearing error for field:', field);
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const updateFormData = (updates: Partial<SpillData>) => {
    console.log('updateFormData - Updating with:', updates);
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      console.log('updateFormData - New form data:', newData);
      return newData;
    });
  };

  const isFormValid = formData.teaText.trim().length >= 3;
  console.log('useSpillTeaForm - isFormValid:', isFormValid);

  return {
    formData,
    errors,
    handleSubmit,
    clearError,
    updateFormData,
    isFormValid
  };
};

export type { SpillData };
