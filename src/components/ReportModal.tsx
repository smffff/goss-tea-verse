import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Flag, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissionId: string | null;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  submissionId
}) => {
  const [reportReason, setReportReason] = useState<string>('');
  const [reportDetails, setReportDetails] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const reportReasons = [
    { value: 'spam', label: 'Spam or Misleading Content', description: 'Promotional content, fake news, or misleading information' },
    { value: 'harassment', label: 'Harassment or Abuse', description: 'Bullying, threats, or targeted harassment' },
    { value: 'inappropriate', label: 'Inappropriate Content', description: 'NSFW content, violence, or graphic material' },
    { value: 'fake', label: 'Fake Information', description: 'False claims, fabricated evidence, or misinformation' },
    { value: 'duplicate', label: 'Duplicate Content', description: 'Already posted or reposted content' },
    { value: 'other', label: 'Other', description: 'Other violations not listed above' }
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

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setReportReason('');
      setReportDetails('');
      setValidationErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!reportReason) {
      errors.reason = 'Please select a reason for reporting';
    }
    
    if (!reportDetails.trim()) {
      errors.details = 'Please provide details about the issue';
    } else if (reportDetails.trim().length < 10) {
      errors.details = 'Please provide at least 10 characters of detail';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Report Submitted! 🚩",
        description: "Thank you for helping keep CTea Newsroom safe. We'll review your report within 24 hours.",
      });
      
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
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-ctea-dark/95 backdrop-blur-md border border-[#00d1c1]/30 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
          aria-describedby="report-modal-description"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#00d1c1]/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Flag className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 id="report-modal-title" className="text-xl font-bold text-white">
                  Report Content
                </h2>
                <p id="report-modal-description" className="text-sm text-gray-400">
                  Help us maintain a safe community
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-ctea-dark/50"
              aria-label="Close report modal"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Report Reason */}
              <div>
                <Label className="text-gray-300 font-medium mb-3 block">
                  Reason for Report *
                </Label>
                <RadioGroup
                  value={reportReason}
                  onValueChange={(value) => {
                    setReportReason(value);
                    if (validationErrors.reason) {
                      setValidationErrors({...validationErrors, reason: ''});
                    }
                  }}
                  className="space-y-3"
                >
                  {reportReasons.map((reason) => (
                    <div key={reason.value} className="flex items-start space-x-3">
                      <RadioGroupItem
                        value={reason.value}
                        id={reason.value}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={reason.value}
                          className="text-white font-medium cursor-pointer"
                        >
                          {reason.label}
                        </Label>
                        <p className="text-sm text-gray-400 mt-1">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                {validationErrors.reason && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {validationErrors.reason}
                  </p>
                )}
              </div>

              {/* Report Details */}
              <div>
                <Label htmlFor="report-details" className="text-gray-300 font-medium mb-3 block">
                  Additional Details *
                </Label>
                <Textarea
                  id="report-details"
                  placeholder="Please provide specific details about why you're reporting this content..."
                  value={reportDetails}
                  onChange={(e) => {
                    setReportDetails(e.target.value);
                    if (validationErrors.details) {
                      setValidationErrors({...validationErrors, details: ''});
                    }
                  }}
                  className={`min-h-[120px] bg-ctea-dark/50 border-[#00d1c1]/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00d1c1]/50 focus:border-[#00d1c1] ${
                    validationErrors.details ? 'border-red-400' : ''
                  }`}
                  required
                />
                {validationErrors.details && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {validationErrors.details}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  {reportDetails.length}/500 characters
                </p>
              </div>

              {/* Submission Info */}
              {submissionId && (
                <div className="bg-ctea-dark/30 border border-[#00d1c1]/20 rounded-lg p-4">
                  <p className="text-sm text-gray-300">
                    <span className="font-medium">Reporting submission:</span> {submissionId}
                  </p>
                </div>
              )}

              {/* Privacy Notice */}
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-300 font-medium mb-1">
                      Privacy & Safety
                    </p>
                    <p className="text-xs text-blue-200">
                      Your report is anonymous and will be reviewed by our moderation team. 
                      We take all reports seriously and will take appropriate action.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Report
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="border-[#00d1c1]/30 text-[#00d1c1] hover:bg-[#00d1c1]/10 py-3 hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#00d1c1]/50 focus:ring-offset-2 focus:ring-offset-transparent"
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