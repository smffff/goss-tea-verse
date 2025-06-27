
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UnifiedSecurityService } from '@/services/unifiedSecurityService';
import { secureLog } from '@/utils/secureLogging';

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

  const validateForm = (): boolean => {
    const newErrors: Partial<SpillData> = {};

    if (!formData.teaText.trim()) {
      newErrors.teaText = 'Please share some tea!';
    } else if (formData.teaText.trim().length < 3) {
      newErrors.teaText = 'Tea must be at least 3 characters long';
    }

    if (formData.mediaUrl && formData.mediaUrl.trim() && !isValidUrl(formData.mediaUrl)) {
      newErrors.mediaUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading || !validateForm()) {
      return;
    }

    try {
      // Use unified security service for validation
      const urls = formData.mediaUrl ? [formData.mediaUrl] : [];
      const securityCheck = await UnifiedSecurityService.validateSubmissionSecurity(
        formData.teaText,
        urls,
        'spill_tea'
      );

      if (!securityCheck.rateLimitCheck.allowed) {
        toast({
          title: "Rate Limit Exceeded",
          description: securityCheck.rateLimitCheck.blockedReason || "Please wait before submitting again.",
          variant: "destructive"
        });
        return;
      }

      if (!securityCheck.contentValidation.valid) {
        toast({
          title: "Content Validation Failed",
          description: `Issues detected: ${securityCheck.contentValidation.threats.join(', ')}`,
          variant: "destructive"
        });
        return;
      }

      const sanitizedData: SpillData = {
        topic: formData.topic,
        teaText: securityCheck.contentValidation.sanitized,
        mediaUrl: securityCheck.urlValidation.valid[0] || undefined
      };
      
      await onSubmit(sanitizedData);
      
      // Reset form on successful submission
      setFormData({
        topic: 'general',
        teaText: '',
        mediaUrl: ''
      });
      setErrors({});
      
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        secureLog.error('Form submission error:', error);
      }
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: "destructive"
      });
    }
  };

  const clearError = (field: keyof SpillData) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const updateFormData = (updates: Partial<SpillData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const isFormValid = formData.teaText.trim().length >= 3;

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
