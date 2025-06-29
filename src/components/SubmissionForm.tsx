import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { validateSecureInput, sanitizeContent } from '@/utils/securityUtils';

const SubmissionForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate content security
      const validation = {
        valid: validateSecureInput(content),
        sanitized: sanitizeContent(content)
      };

      if (!validation.valid) {
        toast({
          title: "Security Error", 
          description: "Content contains potentially harmful elements",
          variant: "destructive"
        });
        return;
      }

      if (!validation.valid) {
        toast({
          title: "Validation Failed",
          description: "Content failed security validation",
          variant: "destructive"
        });
        return;
      }

      // Submit the sanitized content
      // console.log('Submitting:', validation.sanitized);
      
      toast({
        title: "Success",
        description: "Content submitted successfully",
      });
      
      setContent('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit content",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Content</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your content here..."
            rows={4}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmissionForm;
