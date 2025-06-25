
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { track } from '@/utils/analytics';

interface FeedbackWidgetProps {
  submissionId: string;
  className?: string;
}

const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ submissionId, className = '' }) => {
  const [feedback, setFeedback] = useState<'fresh' | 'stale' | null>(null);

  const handleFeedback = (type: 'fresh' | 'stale') => {
    setFeedback(type);
    track('tea_feedback', { 
      submission_id: submissionId, 
      feedback_type: type 
    });
  };

  return (
    <Card className={`bg-gradient-to-r from-amber-50 to-red-50 border-red-200 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            Was this tea fresh or stale?
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => handleFeedback('fresh')}
              disabled={feedback !== null}
              className={`${
                feedback === 'fresh' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white border border-green-300 text-green-600 hover:bg-green-50'
              }`}
            >
              <ThumbsUp className="w-3 h-3 mr-1" />
              Fresh
            </Button>
            <Button
              size="sm"
              onClick={() => handleFeedback('stale')}
              disabled={feedback !== null}
              className={`${
                feedback === 'stale' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white border border-red-300 text-red-600 hover:bg-red-50'
              }`}
            >
              <ThumbsDown className="w-3 h-3 mr-1" />
              Stale
            </Button>
          </div>
        </div>
        {feedback && (
          <p className="text-xs text-gray-600 mt-2">
            Thanks for the feedback! 🫖
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackWidget;
