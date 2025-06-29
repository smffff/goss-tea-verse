
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { track } from '@/lib/analytics';
import { secureLog } from '@/lib/secureLog';
import { UnifiedSecurityService } from '@/services/security/unifiedSecurityService';

const SpillTea: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any): Promise<{ success: boolean; error?: string }> => {
    setIsSubmitting(true);

    try {
      // Perform comprehensive security check
      const securityCheck = await UnifiedSecurityService.performSecurityCheck(
        data?.content || '',
        'tea_submission',
        5, // max 5 submissions per 15 minutes
        15
      );

      if (!securityCheck.allowed) {
        const errorMessage = securityCheck.errors.join('. ');
        toast.error(`Submission blocked: ${errorMessage}`);
        return { success: false, error: errorMessage };
      }

      // Use sanitized content for submission
      const sanitizedData = {
        ...data,
        content: securityCheck.validationResult.sanitized
      };

      // Simulate submission delay with AI moderation
      await new Promise(resolve => setTimeout(resolve, 3000));

      toast.success("Tea Spilled Successfully! 🫖");

      // Track the event with security metrics
      track('tea_spilled', { 
        content_length: sanitizedData?.content?.length || 0,
        security_score: securityCheck.validationResult.securityScore,
        risk_level: securityCheck.validationResult.riskLevel
      });

      // Navigate to feed after submission
      navigate('/feed');

      return { success: true };
    } catch (error) {
      secureLog.error('Submission error:', error);
      toast.error("Submission Failed");
      return { success: false, error: 'Submission failed' };
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Spill Your Tea ☕</h1>
        <div className="bg-gray-800/50 rounded-lg p-6">
          <p className="text-gray-300">
            Tea submission form will be implemented here.
          </p>
          <button
            onClick={() => handleSubmit({ content: 'Test tea' })}
            disabled={isSubmitting}
            className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Spilling...' : 'Spill Tea'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpillTea;
