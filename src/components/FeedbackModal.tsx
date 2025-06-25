
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Bug, Lightbulb, MessageSquare, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'bug' | 'feature' | 'general' | 'error';
  errorDetails?: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  initialType = 'general',
  errorDetails
}) => {
  const [feedbackType, setFeedbackType] = useState(initialType);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(errorDetails || '');
  const [email, setEmail] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const feedbackTypes = [
    { id: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-400' },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'text-yellow-400' },
    { id: 'general', label: 'General Feedback', icon: MessageSquare, color: 'text-blue-400' },
    { id: 'error', label: 'Error Report', icon: Star, color: 'text-orange-400' }
  ];

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-ctea-dark/95 backdrop-blur-md border-ctea-teal/30 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-ctea-teal" />
            Send Feedback
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Feedback Type */}
          <div>
            <Label className="text-gray-300 mb-3 block">Feedback Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {feedbackTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFeedbackType(type.id as any)}
                    className={`p-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
                      feedbackType === type.id
                        ? 'bg-ctea-teal/20 border-ctea-teal text-white'
                        : 'bg-ctea-dark/50 border-ctea-teal/30 text-gray-300 hover:bg-ctea-dark/70'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${type.color}`} />
                      <span>{type.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority */}
          <div>
            <Label className="text-gray-300 mb-2 block">Priority</Label>
            <div className="flex gap-2">
              {['low', 'medium', 'high'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p as any)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    priority === p
                      ? 'bg-ctea-teal text-white border-ctea-teal'
                      : 'text-gray-400 border-gray-600 hover:border-ctea-teal/50'
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

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
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
