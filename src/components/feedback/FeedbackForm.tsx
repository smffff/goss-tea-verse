
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
        title: "Missing the Drama! 📝",
        description: "Give us both a title and the full tea. We need all the details!",
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
        title: "Feedback Spilled Successfully! 🫖",
        description: "Thank you for helping us improve CTea. We're brewing on your suggestions!",
      });

      // Reset form
      setTitle('');
      setDescription('');
      setEmail('');
      setPriority('medium');
      onClose();

    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Error submitting feedback:', error);
      toast({
        title: "Submission Failed 😤",
        description: "Couldn't submit your feedback. Even our systems have drama sometimes...",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-tabloid text-xl text-tabloid-black uppercase tracking-wider mb-2">
          Spill Your Feedback
        </h3>
        <p className="text-tabloid-black/60 font-medium">
          Found a bug? Want a feature? Just here to complain? We're listening! 👂
        </p>
      </div>

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
          <Label htmlFor="title" className="text-tabloid-black font-bold font-headline uppercase tracking-wide">
            What's This About? <span className="text-vintage-red">*</span>
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give us a juicy headline for your feedback..."
            className="bg-white border-vintage-red/30 text-tabloid-black placeholder-tabloid-black/50 focus:border-vintage-red"
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-tabloid-black font-bold font-headline uppercase tracking-wide">
            Spill All the Details <span className="text-vintage-red">*</span>
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us everything! What went wrong? What do you want to see? Don't hold back - we can handle the truth! Include steps to reproduce if it's a bug."
            className="min-h-[120px] bg-white border-vintage-red/30 text-tabloid-black placeholder-tabloid-black/50 focus:border-vintage-red resize-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-tabloid-black font-bold font-headline uppercase tracking-wide">
            Email (Optional but Appreciated)
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com (for follow-up drama)"
            className="bg-white border-vintage-red/30 text-tabloid-black placeholder-tabloid-black/50 focus:border-vintage-red"
          />
          <p className="text-xs text-tabloid-black/50 mt-1">
            Leave your email if you want updates on your feedback (we promise not to spam)
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-vintage-red to-vintage-red-700 hover:from-vintage-red-600 hover:to-vintage-red-800 text-white font-bold font-headline uppercase tracking-wide"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              'Send Feedback'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-vintage-red/30 text-vintage-red hover:bg-vintage-red hover:text-white font-headline uppercase tracking-wide"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
