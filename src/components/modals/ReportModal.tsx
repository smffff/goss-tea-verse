
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Flag, AlertTriangle } from 'lucide-react';
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
    'Hate speech or discrimination',
    'Violence or threats',
    'False information or lies',
    'Copyright violation',
    'NSFW content',
    'Doxxing or personal info',
    'Other rule violation'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason) {
      toast({
        title: "Pick a Reason! 🚨",
        description: "You gotta tell us why you're snitching. What did they do?",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('Report submitted:', {
      contentId,
      reason,
      comment: comment.trim(),
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Filed! 🚔",
        description: "Thanks for keeping the community clean. We'll review this drama ASAP.",
      });
      
      // Reset form
      setReason('');
      setComment('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-lg mx-4 bg-newsprint border-vintage-red/30 max-h-[90vh] overflow-y-auto shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-vintage-red/20">
          <CardTitle className="flex items-center gap-3">
            <Flag className="w-6 h-6 text-vintage-red" />
            <div>
              <span className="font-tabloid text-2xl text-tabloid-black uppercase tracking-wider">
                Report Content
              </span>
              <p className="text-sm text-tabloid-black/60 font-medium normal-case tracking-normal">
                Time to snitch responsibly
              </p>
            </div>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-tabloid-black/60 hover:text-tabloid-black hover:bg-vintage-red/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <AlertTriangle className="w-12 h-12 text-vintage-red mx-auto mb-3 animate-pulse" />
            <p className="text-tabloid-black/70 font-medium">
              Found something that breaks the rules? Don't just scroll past - report it! We take community standards seriously.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-tabloid-black font-bold font-headline uppercase tracking-wide mb-3 block">
                Why Are You Reporting This? *
              </label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger className="bg-white border-vintage-red/30 text-tabloid-black focus:border-vintage-red">
                  <SelectValue placeholder="Select your reason for snitching..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-vintage-red/30">
                  {reasons.map((reasonOption) => (
                    <SelectItem 
                      key={reasonOption} 
                      value={reasonOption}
                      className="text-tabloid-black hover:bg-vintage-red/10 focus:bg-vintage-red/10"
                    >
                      {reasonOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-tabloid-black font-bold font-headline uppercase tracking-wide mb-3 block">
                Give Us the Full Story (Optional)
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Spill all the details about why this content is problematic. The more context you give us, the better we can handle it..."
                className="bg-white border-vintage-red/30 text-tabloid-black placeholder-tabloid-black/50 focus:border-vintage-red resize-none"
                rows={4}
              />
            </div>

            <div className="bg-vintage-red/10 border border-vintage-red/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-vintage-red mt-0.5" />
                <div>
                  <p className="text-vintage-red font-bold text-sm mb-1">
                    False Reports = Bad Karma
                  </p>
                  <p className="text-tabloid-black/70 text-sm">
                    Only report content that actually violates our rules. False reports may result in restrictions to your account. Don't be that person.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-tabloid-black/30 text-tabloid-black hover:bg-tabloid-black hover:text-white font-headline uppercase tracking-wide"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!reason || isSubmitting}
                className="flex-1 bg-vintage-red hover:bg-vintage-red-700 text-white font-bold font-headline uppercase tracking-wide"
              >
                {isSubmitting ? 'Filing Report...' : 'Submit Report'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportModal;
