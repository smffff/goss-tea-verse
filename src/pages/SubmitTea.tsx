
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SecurityService } from '@/services/securityService';
import { betaCodeService } from '@/services/betaCodeService';
import { secureLog } from '@/utils/secureLogging';
import { useSubmissionForm } from '@/hooks/useSubmissionForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface SubmissionData {
  tea: string;
  email: string;
  wallet: string;
  category: string;
  evidence_urls: string[];
  isAnonymous: boolean;
}

const SubmitTea = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (data: SubmissionData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Generate anonymous token
      const anonymousToken = await SecurityService.getOrCreateSecureToken();
      
      // Use security service for comprehensive validation
      const securityCheck = await SecurityService.validateSubmissionSecurity(
        data.tea,
        'tea_submission'
      );

      if (!securityCheck.success) {
        throw new Error('Security validation failed');
      }

      const submissionData = {
        content: data.tea,
        category: data.category || 'general',
        evidence_urls: data.evidence_urls.length > 0 ? data.evidence_urls : null,
        anonymous_token: anonymousToken,
        status: 'approved',
        has_evidence: data.evidence_urls.length > 0,
        reactions: { hot: 0, cold: 0, spicy: 0 },
        average_rating: 0,
        rating_count: 0,
        verification_score: 0
      };

      const { data: result, error } = await supabase
        .from('tea_submissions')
        .insert(submissionData)
        .select();

      if (error) {
        throw new Error(`Submission failed: ${error.message}`);
      }

      if (!result || result.length === 0) {
        throw new Error('Submission failed: No data returned');
      }

      // Generate beta code for successful submission
      try {
        const codeResult = await betaCodeService.generateCodeForSpill(result[0].id);
        if (codeResult.success && codeResult.code) {
          toast({
            title: "Tea Spilled Successfully! 🫖",
            description: `Your access code is: ${codeResult.code}`,
            duration: 10000,
          });
        }
      } catch (codeError) {
        secureLog.info('Beta code generation failed', codeError);
        // Don't fail the submission if code generation fails
      }

      toast({
        title: "Tea Spilled Successfully! 🫖",
        description: "Your gossip is brewing and will appear in the feed shortly!",
      });

      navigate('/feed');

    } catch (error) {
      secureLog.error('Submission error', error);
      
      toast({
        title: "Submission Failed",
        description: `${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  const {
    formData,
    errors,
    handleSubmit: onFormSubmit,
    clearError,
    updateFormData,
    isFormValid
  } = useSubmissionForm(handleSubmit, isSubmitting);

  return (
    <Layout>
      <ErrorBoundaryWrapper componentName="SubmitTea">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-tabloid-black mb-4">
                Spill Your Tea ☕
              </h1>
              <p className="text-tabloid-black/70 text-lg">
                Share the latest crypto gossip, rumors, and alpha with the community.
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Tea</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onFormSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="tea">Your Tea</Label>
                    <Textarea
                      id="tea"
                      value={formData.tea}
                      onChange={(e) => {
                        updateFormData({ tea: e.target.value });
                        clearError('tea');
                      }}
                      placeholder="Spill your tea here..."
                      rows={4}
                      className={errors.tea ? 'border-red-500' : ''}
                    />
                    {errors.tea && <p className="text-red-500 text-sm mt-1">{errors.tea}</p>}
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="tech">Tech</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="politics">Politics</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="anonymous"
                      checked={formData.isAnonymous}
                      onCheckedChange={(checked) => updateFormData({ isAnonymous: checked })}
                    />
                    <Label htmlFor="anonymous">Submit anonymously</Label>
                  </div>

                  {!formData.isAnonymous && (
                    <>
                      <div>
                        <Label htmlFor="email">Email (optional)</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            updateFormData({ email: e.target.value });
                            clearError('email');
                          }}
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <Label htmlFor="wallet">Wallet Address (optional)</Label>
                        <Input
                          id="wallet"
                          value={formData.wallet}
                          onChange={(e) => {
                            updateFormData({ wallet: e.target.value });
                            clearError('wallet');
                          }}
                          className={errors.wallet ? 'border-red-500' : ''}
                        />
                        {errors.wallet && <p className="text-red-500 text-sm mt-1">{errors.wallet}</p>}
                      </div>
                    </>
                  )}

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={!isFormValid || isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Tea'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </ErrorBoundaryWrapper>
    </Layout>
  );
};

export default SubmitTea;
