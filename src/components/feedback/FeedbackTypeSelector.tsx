
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Bug, Lightbulb, MessageSquare, Star } from 'lucide-react';

interface FeedbackTypeSelectorProps {
  selectedType: 'bug' | 'feature' | 'general' | 'error';
  onTypeChange: (type: 'bug' | 'feature' | 'general' | 'error') => void;
}

const FeedbackTypeSelector: React.FC<FeedbackTypeSelectorProps> = ({
  selectedType,
  onTypeChange
}) => {
  const feedbackTypes = [
    { id: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-400' },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'text-yellow-400' },
    { id: 'general', label: 'General Feedback', icon: MessageSquare, color: 'text-blue-400' },
    { id: 'error', label: 'Error Report', icon: Star, color: 'text-orange-400' }
  ];

  return (
    <div>
      <Label className="text-gray-300 mb-3 block">Feedback Type</Label>
      <div className="grid grid-cols-2 gap-2">
        {feedbackTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onTypeChange(type.id as any)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
                selectedType === type.id
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
  );
};

export default FeedbackTypeSelector;
