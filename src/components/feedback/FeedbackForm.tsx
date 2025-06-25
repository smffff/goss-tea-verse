import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import FeedbackTypeSelector from '@/components/feedback/FeedbackTypeSelector';
import PrioritySelector from '@/components/feedback/PrioritySelector';

interface FeedbackFormProps {
  initialType?: 'bug' | 'feature' | 'general' | 'error';
  errorDetails?: string;
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  initialType = 'general',
  errorDetails,
  onClose
}) => {
  const [feedbackType, setFeedbackType] = useState(initialType);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(errorDetails || '');
  const [email, setEmail] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and description",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('feedback_submissions')
        .insert({
          type: feedbackType,
          title: title.trim(),
          description: description.trim(),
          email: email.trim() || null,
          priority,
          user_agent: navigator.userAgent,
          url: window.location.href
        });

      if (error) throw error;

      toast({
        title: "Feedback Submitted! 🙏",
        description: "Thank you for helping us improve CTea. We'll review your feedback soon.",
      });

      // Reset form
      setTitle('');
      setDescription('');
      setEmail('');
      setPriority('medium');
      onClose();

    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Submission Failed",
        description: "Couldn't submit your feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FeedbackTypeSelector 
        selectedType={feedbackType}
        onTypeChange={setFeedbackType}
      />

      <PrioritySelector 
        selectedPriority={priority}
        onPriorityChange={setPriority}
      />

      {/* Title */}
      <div>
        <Label htmlFor="title" className="text-gray-300">
          Title <span className="text-red-400">*</span>
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief description of your feedback"
          className="bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400"
          required
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="text-gray-300">
          Description <span className="text-red-400">*</span>
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of your feedback, including steps to reproduce if it's a bug"
          className="min-h-[120px] bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400"
          required
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="text-gray-300">
          Email (Optional)
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com (for follow-up)"
          className="bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400"
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-ctea-teal to-ctea-purple text-white"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            'Submit Feedback'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
