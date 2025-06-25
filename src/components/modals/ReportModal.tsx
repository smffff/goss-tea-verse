
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Flag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId?: string;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, contentId }) => {
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const reasons = [
    'Spam or misleading content',
    'Harassment or bullying',
    'Hate speech',
    'Violence or threats',
    'False information',
    'Copyright violation',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason) {
      toast({
        title: "Please select a reason",
        description: "You must select a reason for reporting this content",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    console.log('Report submitted:', {
      contentId,
      reason,
      comment: comment.trim(),
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Submitted",
        description: "Thank you for helping keep our community safe. We'll review this content.",
      });
      
      // Reset form
      setReason('');
      setComment('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-lg mx-4 bg-ctea-dark/95 border-red-500/30 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <Flag className="w-5 h-5 text-red-400" />
            Report Content
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Why are you reporting this content? *
              </label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger className="bg-ctea-darker/50 border-red-500/30 text-white">
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent className="bg-ctea-dark border-red-500/30">
                  {reasons.map((reasonOption) => (
                    <SelectItem 
                      key={reasonOption} 
                      value={reasonOption}
                      className="text-white hover:bg-red-500/10"
                    >
                      {reasonOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Additional Details (Optional)
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Provide any additional context that might help our moderators..."
                className="bg-ctea-darker/50 border-red-500/30 text-white placeholder-gray-400"
                rows={4}
              />
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
              <p className="text-red-300 text-sm">
                <strong>Note:</strong> False reports may result in restrictions to your account. 
                Only report content that genuinely violates our community guidelines.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
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
                disabled={!reason || isSubmitting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportModal;
