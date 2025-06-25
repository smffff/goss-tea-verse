
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee } from 'lucide-react';
import { useSpillTeaForm, SpillData } from '@/hooks/useSpillTeaForm';
import TopicSelector from './forms/TopicSelector';
import TeaTextInput from './forms/TeaTextInput';
import MediaUrlInput from './forms/MediaUrlInput';
import SpillTeaFormActions from './forms/SpillTeaFormActions';

interface SpillTeaFormProps {
  onClose: () => void;
  onSubmit: (data: SpillData) => Promise<void>;
  isLoading?: boolean;
}

const SpillTeaForm: React.FC<SpillTeaFormProps> = ({
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
  } = useSpillTeaForm(onSubmit, isLoading);

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
          <TopicSelector
            selectedTopic={formData.topic}
            onTopicChange={(topic) => updateFormData({ topic })}
          />

          <TeaTextInput
            value={formData.teaText}
            onChange={(teaText) => updateFormData({ teaText })}
            error={errors.teaText}
            onClearError={() => clearError('teaText')}
          />

          <MediaUrlInput
            value={formData.mediaUrl || ''}
            onChange={(mediaUrl) => updateFormData({ mediaUrl })}
            error={errors.mediaUrl}
            onClearError={() => clearError('mediaUrl')}
          />

          <SpillTeaFormActions
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

export default SpillTeaForm;
