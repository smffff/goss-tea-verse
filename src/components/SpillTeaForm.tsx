
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { secureLog } from '@/utils/secureLogging';

interface SpillTeaFormProps {
  onSubmit: (content: string) => Promise<void>;
  isLoading?: boolean;
}

const SpillTeaForm: React.FC<SpillTeaFormProps> = ({ onSubmit, isLoading = false }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Empty Tea Cup",
        description: "Please add some content before spilling!",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      secureLog.info('Submitting tea spill...');
      await onSubmit(content.trim());
      setContent('');
      toast({
        title: "Tea Spilled! ☕",
        description: "Your submission has been added to the queue.",
      });
    } catch (error) {
      secureLog.error('Failed to submit tea:', error);
      toast({
        title: "Spill Failed",
        description: "Could not submit your tea. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-ctea-dark/80 border-ctea-teal/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-ctea-teal" />
          Spill the Tea
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's the tea? Share your crypto gossip, market insights, or hot takes..."
            className="min-h-[120px] bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-400 resize-none"
            disabled={isLoading || isSubmitting}
          />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {content.length}/500 characters
            </span>
            <Button
              type="submit"
              disabled={isLoading || isSubmitting || !content.trim()}
              className="bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white font-bold"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Spilling...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Spill Tea
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SpillTeaForm;
