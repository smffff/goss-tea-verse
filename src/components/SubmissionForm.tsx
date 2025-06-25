
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
  onSubmit: (data: SubmissionData) => void;
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
    const newErrors: Partial<SubmissionData> = {};

    // Validate tea content - minimum 20 characters
    if (!formData.tea.trim()) {
      newErrors.tea = 'Please share some tea!';
    } else if (formData.tea.trim().length < 20) {
      newErrors.tea = 'Tea must be at least 20 characters long';
    } else if (formData.tea.length > 2000) {
      newErrors.tea = 'Tea must be less than 2000 characters';
    }

    // Email is optional for anonymous submissions
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate wallet (optional but if provided, should be valid format)
    if (formData.wallet.trim() && !/^[0-9a-zA-Z]{26,35}$|^0x[a-fA-F0-9]{40}$/.test(formData.wallet)) {
      newErrors.wallet = 'Please enter a valid wallet address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors above before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    trackFormCompletion('tea_submission');

    try {
      onSubmit(formData);
      trackTeaSpill(formData.category);
      
      // Reset form
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
      toast({
        title: "Submission Failed",
        description: "Couldn't submit your tea. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = (field: keyof SubmissionData) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormValid = formData.tea.trim().length >= 20;

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
            isSubmitting={isSubmitting}
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
