import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Bug, Lightbulb } from 'lucide-react';
import FeedbackModal from '@/components/FeedbackModal';

const FeedbackWidget: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'general'>('general');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFeedbackClick = (type: 'bug' | 'feature' | 'general') => {
    setFeedbackType(type);
    setShowModal(true);
    setIsExpanded(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col items-end gap-2">
          {/* Expanded Options */}
          {isExpanded && (
            <div className="flex flex-col gap-2 mb-2">
              <Button
                onClick={() => handleFeedbackClick('bug')}
                className="bg-red-500 hover:bg-red-600 text-white shadow-lg"
                size="sm"
              >
                <Bug className="w-4 h-4 mr-2" />
                Report Bug
              </Button>
              <Button
                onClick={() => handleFeedbackClick('feature')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
                size="sm"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Feature Request
              </Button>
              <Button
                onClick={() => handleFeedbackClick('general')}
                className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                size="sm"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                General Feedback
              </Button>
            </div>
          )}

          {/* Main Feedback Button */}
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full w-14 h-14"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <FeedbackModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialType={feedbackType}
      />
    </>
  );
};

export default FeedbackWidget;
