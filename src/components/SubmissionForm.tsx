
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackFormCompletion, trackTeaSpill } from '@/lib/analytics';
import CategorySelector from './forms/CategorySelector';
import TeaContentInput from './forms/TeaContentInput';
import EvidenceUrlInput from './forms/EvidenceUrlInput';
import ContactFields from './forms/ContactFields';
import SubmissionFormActions from './forms/SubmissionFormActions';

interface SubmissionFormProps {
  onClose: () => void;
  onSubmit: (data: SubmissionData) => Promise<void>;
  isLoading?: boolean;
}

interface SubmissionData {
  tea: string;
  email: string;
  wallet: string;
  category: string;
  evidence_urls: string[];
  isAnonymous: boolean;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({
  onClose,
  onSubmit,
  isLoading = false
}) => {
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

  const isFormValid = formData.tea.trim().length >= 3;

  return (
    <Card className="bg-ctea-dark/95 backdrop-blur-md border-ctea-teal/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-xl">
          <Coffee className="w-6 h-6 text-accent" />
          Spill Your Tea ☕
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <CategorySelector
            selectedCategory={formData.category}
            onCategoryChange={(category) => setFormData(prev => ({ ...prev, category }))}
          />

          <TeaContentInput
            value={formData.tea}
            onChange={(tea) => setFormData(prev => ({ ...prev, tea }))}
            error={errors.tea}
            onClearError={() => clearError('tea')}
          />

          <EvidenceUrlInput
            urls={formData.evidence_urls}
            onUrlsChange={(evidence_urls) => setFormData(prev => ({ ...prev, evidence_urls }))}
          />

          <ContactFields
            email={formData.email}
            wallet={formData.wallet}
            emailError={errors.email}
            walletError={errors.wallet}
            onEmailChange={(email) => setFormData(prev => ({ ...prev, email }))}
            onWalletChange={(wallet) => setFormData(prev => ({ ...prev, wallet }))}
            onClearEmailError={() => clearError('email')}
            onClearWalletError={() => clearError('wallet')}
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
              className="w-4 h-4 text-accent bg-ctea-dark/50 border-ctea-teal/30 rounded focus:ring-2 focus:ring-accent/50"
            />
            <label htmlFor="anonymous" className="text-gray-300 text-sm">
              Submit anonymously (recommended for maximum tea spilling)
            </label>
          </div>

          <SubmissionFormActions
            isSubmitting={isLoading}
            isLoading={isLoading}
            isFormValid={isFormValid}
            onCancel={onClose}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmissionForm;
