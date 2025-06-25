
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Coffee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackFormCompletion, trackTeaSpill } from '@/lib/analytics';
import CategorySelector from './forms/CategorySelector';
import TeaContentInput from './forms/TeaContentInput';
import EvidenceUrlInput from './forms/EvidenceUrlInput';
import ContactFields from './forms/ContactFields';
import SubmissionFormActions from './forms/SubmissionFormActions';

interface SubmissionFormProps {
  isOpen: boolean;
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
  isOpen,
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateForm = (): boolean => {
    console.log('=== FORM VALIDATION START ===');
    console.log('Form data to validate:', JSON.stringify(formData, null, 2));
    
    const newErrors: Partial<SubmissionData> = {};

    // Validate tea content - minimum 3 characters
    const trimmedTea = formData.tea.trim();
    console.log('Tea content length:', trimmedTea.length);
    console.log('Tea content:', `"${trimmedTea}"`);
    
    if (!trimmedTea) {
      newErrors.tea = 'Please share some tea!';
      console.log('Validation error: Tea content is empty');
    } else if (trimmedTea.length < 3) {
      newErrors.tea = 'Tea must be at least 3 characters long';
      console.log('Validation error: Tea too short');
    } else if (trimmedTea.length > 2000) {
      newErrors.tea = 'Tea must be less than 2000 characters';
      console.log('Validation error: Tea too long');
    }

    // Email validation (optional)
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      console.log('Validation error: Invalid email format');
    }

    // Wallet validation (optional)
    if (formData.wallet.trim() && formData.wallet.trim().length < 10) {
      newErrors.wallet = 'Please enter a valid wallet address';
      console.log('Validation error: Invalid wallet address');
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('Validation result:', isValid ? 'PASSED' : 'FAILED');
    console.log('Validation errors:', newErrors);
    console.log('=== FORM VALIDATION END ===');
    
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('=== FORM SUBMIT START ===');
    console.log('Form submission initiated');
    console.log('Current isSubmitting state:', isSubmitting);
    console.log('Parent isLoading state:', isLoading);
    
    // Prevent multiple submissions
    if (isSubmitting || isLoading) {
      console.log('Submission blocked - already in progress');
      return;
    }
    
    if (!validateForm()) {
      console.log('Form validation failed - aborting submission');
      toast({
        title: "Validation Error",
        description: "Please fix the errors above before submitting.",
        variant: "destructive"
      });
      return;
    }

    console.log('Form validation passed - proceeding with submission');
    setIsSubmitting(true);
    
    try {
      console.log('Tracking form completion...');
      trackFormCompletion('tea_submission');
      
      console.log('Calling parent onSubmit function...');
      await onSubmit(formData);
      
      console.log('Parent onSubmit completed successfully');
      trackTeaSpill(formData.category);
      
      // Reset form on successful submission
      console.log('Resetting form data...');
      setFormData({
        tea: '',
        email: '',
        wallet: '',
        category: 'general',
        evidence_urls: [],
        isAnonymous: true
      });
      setErrors({});
      console.log('Form reset completed');
      
    } catch (error) {
      console.error('=== FORM SUBMISSION ERROR ===');
      console.error('Error in form submission:', error);
      console.error('Error type:', typeof error);
      console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
      
      toast({
        title: "Submission Failed",
        description: `Couldn't submit your tea: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive"
      });
    } finally {
      console.log('Setting form isSubmitting to false');
      setIsSubmitting(false);
      console.log('=== FORM SUBMIT END ===');
    }
  };

  const clearError = (field: keyof SubmissionData) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormValid = formData.tea.trim().length >= 3;
  const isCurrentlySubmitting = isSubmitting || isLoading;

  console.log('Render state - isFormValid:', isFormValid, 'isSubmitting:', isCurrentlySubmitting);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-ctea-dark/95 backdrop-blur-md border-ctea-teal/30 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2 text-xl">
            <Coffee className="w-6 h-6 text-accent" />
            Spill Your Tea ☕
          </DialogTitle>
        </DialogHeader>

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

          {/* Anonymous Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
              className="w-4 h-4 text-accent bg-ctea-dark/50 border-ctea-teal/30 rounded focus:ring-2 focus:ring-accent/50"
            />
            <Label htmlFor="anonymous" className="text-gray-300 text-sm">
              Submit anonymously (recommended for maximum tea spilling)
            </Label>
          </div>

          <SubmissionFormActions
            isSubmitting={isCurrentlySubmitting}
            isLoading={isLoading}
            isFormValid={isFormValid}
            onCancel={onClose}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionForm;
