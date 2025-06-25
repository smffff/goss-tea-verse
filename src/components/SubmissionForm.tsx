import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee } from 'lucide-react';
import { useSubmissionForm, SubmissionData } from '@/hooks/useSubmissionForm';
import CategorySelector from '@/components/forms/CategorySelector';
import TeaContentInput from '@/components/forms/TeaContentInput';
import EvidenceUrlInput from '@/components/forms/EvidenceUrlInput';
import ContactFields from '@/components/forms/ContactFields';
import AnonymousCheckbox from '@/components/forms/AnonymousCheckbox';
import SubmissionFormActions from '@/components/forms/SubmissionFormActions';

interface SubmissionFormProps {
  onClose: () => void;
  onSubmit: (data: SubmissionData) => Promise<void>;
  isLoading?: boolean;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const {
    formData,
    errors,
    handleSubmit,
    clearError,
    updateFormData,
    isFormValid
  } = useSubmissionForm(onSubmit, isLoading);

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
            onCategoryChange={(category) => updateFormData({ category })}
          />

          <TeaContentInput
            value={formData.tea}
            onChange={(tea) => updateFormData({ tea })}
            error={errors.tea}
            onClearError={() => clearError('tea')}
          />

          <EvidenceUrlInput
            urls={formData.evidence_urls}
            onUrlsChange={(evidence_urls) => updateFormData({ evidence_urls })}
          />

          <ContactFields
            email={formData.email}
            wallet={formData.wallet}
            emailError={errors.email}
            walletError={errors.wallet}
            onEmailChange={(email) => updateFormData({ email })}
            onWalletChange={(wallet) => updateFormData({ wallet })}
            onClearEmailError={() => clearError('email')}
            onClearWalletError={() => clearError('wallet')}
          />

          <AnonymousCheckbox
            isAnonymous={formData.isAnonymous}
            onChange={(isAnonymous) => updateFormData({ isAnonymous })}
          />

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
