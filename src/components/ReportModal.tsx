import React, { useState, useEffect } from 'react';
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
    { value: 'spam', label: 'Spam or misleading content', icon: '🚫' },
    { value: 'harassment', label: 'Harassment or bullying', icon: '⚠️' },
    { value: 'fake_news', label: 'Fake news or misinformation', icon: '📰' },
    { value: 'personal_info', label: 'Personal information exposure', icon: '🔒' },
    { value: 'illegal', label: 'Illegal content or activities', icon: '⚖️' },
    { value: 'other', label: 'Other (please specify)', icon: '❓' }
  ];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

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
      // Track report submission
      trackFeedbackSubmission();

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
                        <div className="flex items-center gap-2">
                          <span>{reason.icon}</span>
                          <span>{reason.label}</span>
                        </div>
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
                  className="min-h-[100px] bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-400/50 focus:border-red-400 resize-none"
                  maxLength={500}
                />
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-400">
                    Your report will be reviewed by our moderation team within 24 hours.
                  </p>
                  <p className="text-xs text-gray-400">
                    {reportComment.length}/500
                  </p>
                </div>
              </div>

              {/* Report Guidelines */}
              <div className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-medium">Report Guidelines</span>
                </div>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Only report content that violates our community guidelines</li>
                  <li>• Provide specific details to help us understand the issue</li>
                  <li>• False reports may result in account restrictions</li>
                  <li>• We review all reports within 24 hours</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !reportReason}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10 transition-colors duration-200"
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