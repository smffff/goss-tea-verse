import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Coffee } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export interface SpillTeaFormProps {
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  walletAddress?: string;
  userId?: string;
}

interface FormData {
  content: string;
  category: string;
  isAnonymous: boolean;
}

interface TeaSubmissionData {
  teaText: string;
  topic: string;
  mediaUrl: string | null;
}

const SpillTeaForm: React.FC<SpillTeaFormProps> = ({
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const [teaText, setTeaText] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Validate form data
      if (!formData.content.trim()) {
        toast({
          title: "Content Required",
          description: "Please enter some tea to spill!",
          variant: "destructive"
        });
        return;
      }

      // Submit the tea
      const result = await onSubmit(formData);
      
      if (result.success) {
        toast({
          title: "Tea Spilled Successfully! 🫖",
          description: "Your gossip is now brewing in the feed!",
        });
        onClose();
      } else {
        throw new Error(result.error || "Failed to submit tea");
      }
    } catch (error) {
      console.error('Tea submission error:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teaText.trim()) return;
    
    const submissionData: TeaSubmissionData = {
      teaText,
      topic: 'general',
      mediaUrl: null
    };
    
    await onSubmit(submissionData);
  };

  return (
    <Card className="bg-pale-pink border-vintage-red/30 shadow-xl">
      <CardHeader>
        <CardTitle className="text-tabloid-black flex items-center gap-2 text-xl font-display">
          <Coffee className="w-6 h-6 text-vintage-red" />
          Spill Your Tea ☕
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <Textarea
              placeholder="What's the tea? Spill it here..."
              value={teaText}
              onChange={(e) => setTeaText(e.target.value)}
              className="min-h-[120px]"
              maxLength={500}
            />
            <div className="text-sm text-gray-500 mt-1">
              {teaText.length}/500 characters
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white font-bold"
              disabled={!teaText.trim() || isSubmitting}
            >
              {isSubmitting ? 'Spilling Tea...' : 'Spill Tea ☕'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SpillTeaForm;
