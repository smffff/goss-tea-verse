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
import { trackReportSubmission } from '@/lib/analytics';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissionId: string;
  submissionContent: string;
}

interface ReportData {
  category: string;
  reason: string;
  details: string;
  severity: 'low' | 'medium' | 'high';
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  submissionId,
  submissionContent
}) => {
  const [reportData, setReportData] = useState<ReportData>({
    category: '',
    reason: '',
    details: '',
    severity: 'medium'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ReportData>>({});
  const { toast } = useToast();

  const reportCategories = [
    {
      value: 'spam',
      label: 'Spam',
      description: 'Repeated or irrelevant content',
      icon: <MessageSquare className="w-4 h-4" />,
      color: 'text-yellow-500'
    },
    {
      value: 'inappropriate',
      label: 'Inappropriate',
      description: 'Offensive or harmful content',
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'text-red-500'
    },
    {
      value: 'misinformation',
      label: 'Misinformation',
      description: 'False or misleading information',
      icon: <Eye className="w-4 h-4" />,
      color: 'text-orange-500'
    },
    {
      value: 'harassment',
      label: 'Harassment',
      description: 'Targeted abuse or bullying',
      icon: <Shield className="w-4 h-4" />,
      color: 'text-red-600'
    },
    {
      value: 'copyright',
      label: 'Copyright',
      description: 'Unauthorized use of content',
      icon: <Zap className="w-4 h-4" />,
      color: 'text-purple-500'
    },
    {
      value: 'other',
      label: 'Other',
      description: 'Other community guidelines violation',
      icon: <Flag className="w-4 h-4" />,
      color: 'text-gray-500'
    }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low', description: 'Minor issue', color: 'text-green-500' },
    { value: 'medium', label: 'Medium', description: 'Moderate concern', color: 'text-yellow-500' },
    { value: 'high', label: 'High', description: 'Serious violation', color: 'text-red-500' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ReportData> = {};

    if (!reportData.category) {
      newErrors.category = 'Please select a report category';
    }

    if (!reportData.reason) {
      newErrors.reason = 'Please provide a reason for reporting';
    } else if (reportData.reason.length < 10) {
      newErrors.reason = 'Please provide more details (at least 10 characters)';
    }

    if (reportData.details && reportData.details.length > 500) {
      newErrors.details = 'Additional details must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors above before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    trackReportSubmission();

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Report Submitted! 🛡️",
        description: "Thank you for helping keep our community safe. We'll review this submission.",
      });

      // Reset form
      setReportData({
        category: '',
        reason: '',
        details: '',
        severity: 'medium'
      });
      setErrors({});
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

  const getCharacterCount = () => {
    const count = reportData.details.length;
    const max = 500;
    const percentage = (count / max) * 100;
    
    if (percentage > 90) return 'text-red-500';
    if (percentage > 75) return 'text-yellow-500';
    return 'text-gray-400';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-ctea-dark/95 backdrop-blur-md border-ctea-teal/30 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2 text-xl">
            <Flag className="w-6 h-6 text-red-500" />
            Report Submission
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reported Content Preview */}
          <Card className="bg-ctea-dark/30 border-ctea-teal/20 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-300 mb-2">Content Being Reported:</p>
                <div className="bg-ctea-dark/50 rounded p-3 border border-ctea-teal/10">
                  <p className="text-sm text-gray-400 line-clamp-3">
                    {submissionContent.length > 200 
                      ? `${submissionContent.substring(0, 200)}...` 
                      : submissionContent
                    }
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Report Category */}
          <div>
            <Label className="text-gray-300 mb-3 block flex items-center gap-2">
              Report Category
              <Badge variant="outline" className="text-xs border-red-500/30 text-red-500">
                Required
              </Badge>
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {reportCategories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setReportData(prev => ({ ...prev, category: category.value }))}
                  className={`p-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent text-left ${
                    reportData.category === category.value
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-ctea-dark/50 border-ctea-teal/20 text-gray-300 hover:bg-ctea-dark/70 hover:border-ctea-teal/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={category.color}>{category.icon}</span>
                    <span className="font-medium">{category.label}</span>
                  </div>
                  <div className="text-xs text-gray-400">{category.description}</div>
                </button>
              ))}
            </div>
            {errors.category && (
              <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                <AlertCircle className="w-4 h-4" />
                {errors.category}
              </div>
            )}
          </div>

          {/* Severity Level */}
          <div>
            <Label className="text-gray-300 mb-3 block">Severity Level</Label>
            <div className="flex gap-2">
              {severityLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setReportData(prev => ({ ...prev, severity: level.value as 'low' | 'medium' | 'high' }))}
                  className={`flex-1 p-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent ${
                    reportData.severity === level.value
                      ? `bg-${level.value === 'low' ? 'green' : level.value === 'medium' ? 'yellow' : 'red'}-500/20 border-${level.value === 'low' ? 'green' : level.value === 'medium' ? 'yellow' : 'red'}-500 text-${level.value === 'low' ? 'green' : level.value === 'medium' ? 'yellow' : 'red'}-400`
                      : 'bg-ctea-dark/50 border-ctea-teal/20 text-gray-300 hover:bg-ctea-dark/70 hover:border-ctea-teal/30'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium">{level.label}</div>
                    <div className="text-xs opacity-75">{level.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Reason for Report */}
          <div>
            <Label htmlFor="reason" className="text-gray-300 flex items-center gap-2">
              Reason for Report
              <Badge variant="outline" className="text-xs border-red-500/30 text-red-500">
                Required
              </Badge>
            </Label>
            <Textarea
              id="reason"
              placeholder="Please explain why you're reporting this content..."
              value={reportData.reason}
              onChange={(e) => setReportData({...reportData, reason: e.target.value})}
              className={`min-h-[80px] bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent ${
                errors.reason ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.reason && (
              <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                <AlertCircle className="w-4 h-4" />
                {errors.reason}
              </div>
            )}
          </div>

          {/* Additional Details */}
          <div>
            <Label htmlFor="details" className="text-gray-300">
              Additional Details (Optional)
            </Label>
            <Textarea
              id="details"
              placeholder="Any additional context or evidence that would help us understand the issue..."
              value={reportData.details}
              onChange={(e) => setReportData({...reportData, details: e.target.value})}
              className={`min-h-[80px] bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent ${
                errors.details ? 'border-red-500' : ''
              }`}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                {errors.details && (
                  <div className="flex items-center gap-1 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.details}
                  </div>
                )}
              </div>
              <span className={`text-sm ${getCharacterCount()}`}>
                {reportData.details.length}/500
              </span>
            </div>
          </div>

          {/* Privacy Notice */}
          <Card className="bg-ctea-dark/30 border-ctea-teal/20 p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-accent mt-0.5" />
              <div className="text-sm text-gray-300">
                <p className="font-medium mb-1">🛡️ Your report is confidential</p>
                <p>Your identity will not be shared with the reported user. We take all reports seriously and review them promptly.</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-6 py-3 rounded-lg transition-all shadow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Report...
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
              className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10 px-6 py-3 rounded-lg transition-all shadow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal; 