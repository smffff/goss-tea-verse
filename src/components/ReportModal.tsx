import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Flag, 
  AlertTriangle, 
  Shield, 
  CheckCircle, 
  X,
  MessageSquare,
  Eye,
  Heart,
  Zap,
  Users,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackFeedbackSubmission } from '@/lib/analytics';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissionId: string | null;
}

interface ReportData {
  category: string;
  reason: string;
  details: string;
  severity: 'low' | 'medium' | 'high';
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, submissionId }) => {
  const [reportReason, setReportReason] = useState('');
  const [reportComment, setReportComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const reportReasons = [
    { value: 'spam', label: 'Spam or misleading content' },
    { value: 'harassment', label: 'Harassment or bullying' },
    { value: 'fake_news', label: 'Fake news or misinformation' },
    { value: 'personal_info', label: 'Personal information exposure' },
    { value: 'illegal', label: 'Illegal content or activities' },
    { value: 'other', label: 'Other (please specify)' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportReason) {
      toast({
        title: "Reason Required",
        description: "Please select a reason for reporting this content.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Report Submitted! 🚨",
        description: "Thank you for helping keep our community safe. We'll review this content.",
      });

      // Reset form
      setReportReason('');
      setReportComment('');
      onClose();
    } catch (error) {
      toast({
        title: "Report Failed",
        description: "Couldn't submit your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-ctea-dark/95 backdrop-blur-md border border-red-400/30 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-red-400/20">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Flag className="w-5 h-5 text-red-400" />
              Report Content
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-ctea-dark/50"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Warning */}
              <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-medium">Report Inappropriate Content</span>
                </div>
                <p className="text-sm text-gray-300">
                  Help us maintain a safe and respectful community. False reports may result in account restrictions.
                </p>
              </div>

              {/* Reason Selection */}
              <div>
                <Label htmlFor="reason" className="text-gray-300 flex items-center gap-2">
                  Reason for Report
                  <span className="text-red-400">*</span>
                </Label>
                <Select value={reportReason} onValueChange={setReportReason}>
                  <SelectTrigger className="bg-ctea-dark/50 border-ctea-teal/30 text-white focus:ring-2 focus:ring-red-400/50 focus:border-red-400">
                    <SelectValue placeholder="Select a reason..." />
                  </SelectTrigger>
                  <SelectContent className="bg-ctea-dark border-ctea-teal/30">
                    {reportReasons.map((reason) => (
                      <SelectItem key={reason.value} value={reason.value} className="text-white hover:bg-ctea-dark/50">
                        {reason.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Comments */}
              <div>
                <Label htmlFor="comment" className="text-gray-300">
                  Additional Details (Optional)
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Please provide any additional context or details about why you're reporting this content..."
                  value={reportComment}
                  onChange={(e) => setReportComment(e.target.value)}
                  className="min-h-[100px] bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-400/50 focus:border-red-400"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Your report will be reviewed by our moderation team within 24 hours.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !reportReason}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Flag className="w-4 h-4 mr-2" />
                      Submit Report
                    </>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportModal; 