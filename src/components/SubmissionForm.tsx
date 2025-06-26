
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EnhancedSecurityService } from '@/services/enhancedSecurityService';

interface SubmissionFormProps {
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const [data, setData] = useState({
    tea: '',
    email: '',
    wallet: '',
    category: 'general',
    evidence_urls: [''],
    isAnonymous: true
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setData(prev => ({ ...prev, isAnonymous: checked }));
  };

  const handleSelectChange = (value: string) => {
    setData(prev => ({ ...prev, category: value }));
  };

  const addEvidenceUrl = () => {
    setData(prev => ({ ...prev, evidence_urls: [...prev.evidence_urls, ''] }));
  };

  const updateEvidenceUrl = (index: number, value: string) => {
    const updatedUrls = [...data.evidence_urls];
    updatedUrls[index] = value;
    setData(prev => ({ ...prev, evidence_urls: updatedUrls }));
  };

  const removeEvidenceUrl = (index: number) => {
    const updatedUrls = [...data.evidence_urls];
    updatedUrls.splice(index, 1);
    setData(prev => ({ ...prev, evidence_urls: updatedUrls }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !data.tea.trim()) return;

    try {
      // Enhanced security validation
      const securityCheck = await EnhancedSecurityService.validateSubmissionSecurity(
        data.tea,
        data.evidence_urls,
        'tea_submission'
      );

      // Check if validation failed
      if (!securityCheck.overallValid) {
        const errors = [];
        
        if (!securityCheck.contentValidation.valid) {
          errors.push(...securityCheck.contentValidation.threats);
        }
        
        if (!securityCheck.rateLimitCheck.allowed) {
          errors.push(securityCheck.rateLimitCheck.blockedReason || 'Rate limit exceeded');
        }
        
        if (securityCheck.urlValidation.invalid.length > 0) {
          errors.push(`Invalid URLs: ${securityCheck.urlValidation.invalid.join(', ')}`);
        }

        toast({
          title: "Submission Failed",
          description: `Security validation failed: ${errors.join(', ')}`,
          variant: "destructive"
        });

        // Log security violation
        await EnhancedSecurityService.logSecurityEvent('submission_blocked', {
          reasons: errors,
          content_length: data.tea.length,
          risk_level: securityCheck.contentValidation.riskLevel
        }, 'high');

        return;
      }

      // Use sanitized content
      const sanitizedData = {
        ...data,
        tea: securityCheck.contentValidation.sanitized,
        evidence_urls: securityCheck.urlValidation.valid
      };

      await onSubmit(sanitizedData);

      // Log successful submission
      await EnhancedSecurityService.logSecurityEvent('secure_submission_created', {
        content_length: sanitizedData.tea.length,
        evidence_count: sanitizedData.evidence_urls.length,
        security_score: securityCheck.contentValidation.securityScore
      }, 'low');

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: "destructive"
      });

      // Log submission error
      await EnhancedSecurityService.logSecurityEvent('submission_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        content_length: data.tea.length
      }, 'medium');
    }
  };

  return (
    <Card className="bg-white/90 border-vintage-red/30 shadow-lg">
      <CardHeader>
        <CardTitle className="text-tabloid-black">Spill The Tea</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="tea">Tea</Label>
            <Textarea
              id="tea"
              name="tea"
              placeholder="What's the gossip?"
              value={data.tea}
              onChange={handleInputChange}
              rows={4}
              required
              className="bg-stone-100"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full bg-stone-100">
                <SelectValue placeholder="General" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="exchanges">Exchanges</SelectItem>
                <SelectItem value="defi">DeFi</SelectItem>
                <SelectItem value="nfts">NFTs</SelectItem>
                <SelectItem value="regulation">Regulation</SelectItem>
                <SelectItem value="memecoins">Memecoins</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Evidence (Optional)</Label>
            {data.evidence_urls.map((url, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  type="url"
                  placeholder="Link to evidence"
                  value={url}
                  onChange={(e) => updateEvidenceUrl(index, e.target.value)}
                  className="bg-stone-100"
                />
                {data.evidence_urls.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEvidenceUrl(index)}
                    className="text-red-500 hover:bg-red-100"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            {data.evidence_urls.length < 5 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addEvidenceUrl}
                className="w-full justify-center border-vintage-red text-vintage-red hover:bg-vintage-red/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Evidence
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAnonymous"
              checked={data.isAnonymous}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="isAnonymous">Post Anonymously</Label>
          </div>

          {!data.isAnonymous && (
            <div className="space-y-2">
              <div>
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  value={data.email}
                  onChange={handleInputChange}
                  className="bg-stone-100"
                />
              </div>
              <div>
                <Label htmlFor="wallet">Wallet Address</Label>
                <Input
                  type="text"
                  id="wallet"
                  name="wallet"
                  placeholder="Your wallet address"
                  value={data.wallet}
                  onChange={handleInputChange}
                  className="bg-stone-100"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-tabloid-black hover:bg-stone-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-vintage-red text-white hover:bg-vintage-red/90"
            >
              {isLoading ? (
                <>
                  Submitting...
                </>
              ) : (
                'Submit Tea'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmissionForm;
