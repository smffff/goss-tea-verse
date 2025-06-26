
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { useSpillTeaForm, SpillData } from '@/hooks/useSpillTeaForm';
import { useAIModeration } from '@/hooks/useAIModeration';
import { useTeaTokens } from '@/hooks/useTeaTokens';
import TopicSelector from '@/components/forms/TopicSelector';
import TeaTextInput from '@/components/forms/TeaTextInput';
import MediaUrlInput from '@/components/forms/MediaUrlInput';
import SpillTeaFormActions from '@/components/forms/SpillTeaFormActions';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SpillTeaFormProps {
  onClose: () => void;
  onSubmit: (data: SpillData) => Promise<void>;
  isLoading?: boolean;
  walletAddress?: string;
  userId?: string;
}

const SpillTeaForm: React.FC<SpillTeaFormProps> = ({
  onClose,
  onSubmit,
  isLoading = false,
  walletAddress,
  userId
}) => {
  const [moderationResult, setModerationResult] = useState<any>(null);
  const [isModerating, setIsModerating] = useState(false);
  
  const { moderateContent, isModerating: aiModerating } = useAIModeration();
  const { awardTokens } = useTeaTokens(walletAddress);

  const {
    formData,
    errors,
    handleSubmit,
    clearError,
    updateFormData,
    isFormValid
  } = useSpillTeaForm(async (data: SpillData) => {
    // Enhanced submit with AI moderation and token rewards
    try {
      setIsModerating(true);
      
      // Step 1: Create the spill first
      const spillId = crypto.randomUUID(); // Generate temporary ID
      
      // Step 2: Run AI moderation (if available)
      let moderation = null;
      try {
        moderation = await moderateContent(
          data.teaText,
          spillId,
          userId,
          walletAddress
        );
        setModerationResult(moderation);
      } catch (error) {
        if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('AI moderation not available, proceeding without it');
      }

      // Step 3: Submit the spill
      await onSubmit(data);
      
      // Step 4: Award tokens for successful spill (if wallet connected)
      if (walletAddress) {
        try {
          await awardTokens(
            walletAddress,
            'spill',
            5, // 5 TEA tokens for approved spill
            spillId,
            {
              content_length: data.teaText.length,
              topic: data.topic,
              has_media: !!data.mediaUrl,
              moderation_score: moderation?.score || 1.0
            }
          );
        } catch (error) {
          if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Error awarding tokens:', error);
          // Don't fail the submission if token award fails
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Submission error:', error);
      throw error;
    } finally {
      setIsModerating(false);
    }
  }, isLoading || isModerating);

  const getModerationStatusIcon = () => {
    if (!moderationResult) return null;
    
    switch (moderationResult.mod_status) {
      case 'clean':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'flagged':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'escalated':
        return <Shield className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getModerationStatusText = () => {
    if (!moderationResult) return '';
    
    switch (moderationResult.mod_status) {
      case 'clean':
        return 'Content Approved';
      case 'flagged':
        return 'Content Flagged for Review';
      case 'escalated':
        return 'Content Escalated';
      default:
        return '';
    }
  };

  const getModerationStatusColor = () => {
    if (!moderationResult) return 'default';
    
    switch (moderationResult.mod_status) {
      case 'clean':
        return 'default';
      case 'flagged':
        return 'secondary';
      case 'escalated':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Card className="bg-pale-pink border-vintage-red/30 shadow-xl">
      <CardHeader>
        <CardTitle className="text-tabloid-black flex items-center gap-2 text-xl font-display">
          <Coffee className="w-6 h-6 text-vintage-red" />
          Spill Your Tea ☕
          {walletAddress && (
            <Badge variant="outline" className="ml-auto text-xs">
              $TEA Rewards Enabled
            </Badge>
          )}
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

          {/* AI Moderation Status */}
          {moderationResult && (
            <Alert className={`border-l-4 ${
              moderationResult.mod_status === 'clean' ? 'border-green-500 bg-green-50' :
              moderationResult.mod_status === 'flagged' ? 'border-yellow-500 bg-yellow-50' :
              'border-red-500 bg-red-50'
            }`}>
              <div className="flex items-center gap-2">
                {getModerationStatusIcon()}
                <AlertDescription className="font-medium">
                  {getModerationStatusText()}
                </AlertDescription>
                <Badge variant={getModerationStatusColor() as any} className="ml-auto">
                  Score: {(moderationResult.score * 100).toFixed(1)}%
                </Badge>
              </div>
              {moderationResult.reason && (
                <p className="text-sm text-gray-600 mt-1">
                  {moderationResult.reason}
                </p>
              )}
              {moderationResult.flagged_categories && moderationResult.flagged_categories.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Flagged categories:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {moderationResult.flagged_categories.map((category: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Alert>
          )}

          {/* Token Reward Info */}
          {walletAddress && !moderationResult && (
            <Alert className="border-blue-500 bg-blue-50">
              <Shield className="w-4 h-4 text-blue-600" />
              <AlertDescription>
                Earn 5 $TEA tokens for approved spills! Your content will be automatically moderated.
              </AlertDescription>
            </Alert>
          )}

          <SpillTeaFormActions
            isSubmitting={isLoading || isModerating || aiModerating}
            isLoading={isLoading || isModerating || aiModerating}
            isFormValid={isFormValid}
            onCancel={onClose}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default SpillTeaForm;
