import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissionId: string;
  submissionContent: string;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  submissionId,
  submissionContent
}) => {
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportReasons = [
    { value: 'spam', label: 'Spam' },
    { value: 'inappropriate', label: 'Inappropriate Content' },
    { value: 'fake_alpha', label: 'Fake Alpha' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'misinformation', label: 'Misinformation' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;

    setIsSubmitting(true);
    try {
      // Log report to console for now
      console.log('Report submitted:', {
        submissionId,
        submissionContent: submissionContent.substring(0, 100) + '...',
        reason,
        comment,
        timestamp: new Date().toISOString()
      });

      // TODO: Send to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setReason('');
      setComment('');
      onClose();
      
      // Show success message (you can use toast here)
      alert('Report submitted successfully. Thank you for helping keep CTea safe!');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
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
        <div className="bg-ctea-dark/95 backdrop-blur-md border border-ctea-teal/30 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-ctea-teal/20">
            <h2 className="text-xl font-bold text-white">Report Submission</h2>
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
              <div>
                <Label htmlFor="reason" className="text-gray-300">Reason for Report</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger className="bg-ctea-dark/50 border-ctea-teal/30 text-white">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent className="bg-ctea-dark border-ctea-teal/30">
                    {reportReasons.map((r) => (
                      <SelectItem key={r.value} value={r.value} className="text-white hover:bg-ctea-dark/50">
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="comment" className="text-gray-300">Additional Details (Optional)</Label>
                <Textarea
                  id="comment"
                  placeholder="Provide more context about why you're reporting this submission..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px] bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400"
                />
              </div>

              <div className="bg-ctea-teal/10 border border-ctea-teal/30 rounded-lg p-4">
                <p className="text-ctea-teal text-sm">
                  💡 Your report helps us maintain a safe and authentic community. All reports are reviewed by our moderation team.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting || !reason}
                  className="flex-1 bg-gradient-ctea text-white font-bold hover:opacity-90 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Report'
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