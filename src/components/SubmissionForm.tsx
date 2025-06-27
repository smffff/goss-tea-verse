
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Send, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { secureLog } from '@/utils/secureLogging';
import { validateContentSecurity } from '@/utils/securityUtils';

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
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    isAnonymous: true,
    sources: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: 'general', label: 'General Tea', icon: '☕' },
    { value: 'defi', label: 'DeFi Drama', icon: '🏦' },
    { value: 'nft', label: 'NFT Gossip', icon: '🖼️' },
    { value: 'exchange', label: 'Exchange News', icon: '📊' },
    { value: 'celeb', label: 'Crypto Celebs', icon: '👑' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be under 100 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    } else if (formData.content.length > 2000) {
      newErrors.content = 'Content must be under 2000 characters';
    }

    // Security validation
    const titleSecurity = validateContentSecurity(formData.title);
    const contentSecurity = validateContentSecurity(formData.content);

    if (!titleSecurity.isValid) {
      newErrors.title = 'Title contains potentially harmful content';
    }

    if (!contentSecurity.isValid) {
      newErrors.content = 'Content contains potentially harmful content';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors and try again",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize data before submission
      const sanitizedData = {
        ...formData,
        title: validateContentSecurity(formData.title).sanitized,
        content: validateContentSecurity(formData.content).sanitized,
        timestamp: new Date().toISOString()
      };

      await onSubmit(sanitizedData);

      toast({
        title: "Tea Spilled Successfully! ☕",
        description: "Your submission has been added to the queue",
      });

      onClose();
    } catch (error) {
      secureLog.error('Submission failed:', error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="bg-ctea-dark/95 border-ctea-teal/30 max-w-2xl w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          🫖 Spill Some Tea
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label className="text-white">Category</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleInputChange('category', category.value)}
                  className={`p-3 rounded-lg border transition-all text-sm font-medium ${
                    formData.category === category.value
                      ? 'bg-ctea-teal/20 border-ctea-teal text-ctea-teal'
                      : 'bg-ctea-dark/50 border-ctea-teal/30 text-gray-300 hover:bg-ctea-dark/70'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Title *
              <Badge className="ml-2 bg-orange-500/20 text-orange-400 border-orange-500/30">
                Hot Take Alert
              </Badge>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="What's the tea? (e.g., 'Major DeFi Protocol Drama Unfolds')"
              className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500"
              maxLength={100}
            />
            {errors.title && (
              <p className="text-red-400 text-sm flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors.title}
              </p>
            )}
            <p className="text-xs text-gray-500">
              {formData.title.length}/100 characters
            </p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-white">
              Your Tea *
              <Badge className="ml-2 bg-red-500/20 text-red-400 border-red-500/30">
                Spill Responsibly
              </Badge>
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Spill the tea... What's really happening? Include details, context, and any evidence you have."
              className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 min-h-[120px]"
              maxLength={2000}
            />
            {errors.content && (
              <p className="text-red-400 text-sm flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors.content}
              </p>
            )}
            <p className="text-xs text-gray-500">
              {formData.content.length}/2000 characters
            </p>
          </div>

          {/* Sources (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="sources" className="text-white">
              Sources (Optional)
              <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                Credibility Boost
              </Badge>
            </Label>
            <Input
              id="sources"
              value={formData.sources}
              onChange={(e) => handleInputChange('sources', e.target.value)}
              placeholder="Links, screenshots, or references (helps with credibility)"
              className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500"
            />
          </div>

          {/* Anonymous Toggle */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-red-500/20 rounded-lg">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.isAnonymous}
              onChange={(e) => handleInputChange('isAnonymous', e.target.checked.toString())}
              className="w-4 h-4 text-ctea-teal bg-ctea-dark border-ctea-teal/30 rounded focus:ring-2 focus:ring-ctea-teal/50"
            />
            <Label htmlFor="anonymous" className="text-gray-300 cursor-pointer">
              🥸 Submit anonymously (recommended for maximum tea protection)
            </Label>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <p className="text-amber-200 text-xs leading-relaxed">
              <strong>⚠️ Disclaimer:</strong> This platform is for entertainment and discussion purposes only. 
              Please verify information independently and be responsible with your submissions. 
              We do not endorse unverified claims.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="flex-1 bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-teal/80 hover:to-ctea-purple/80 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Spilling Tea...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Spill The Tea
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmissionForm;
