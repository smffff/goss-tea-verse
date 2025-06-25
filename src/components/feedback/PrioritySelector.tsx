
import React from 'react';
import { Label } from '@/components/ui/label';

interface PrioritySelectorProps {
  selectedPriority: 'low' | 'medium' | 'high';
  onPriorityChange: (priority: 'low' | 'medium' | 'high') => void;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selectedPriority,
  onPriorityChange
}) => {
  return (
    <div>
      <Label className="text-gray-300 mb-2 block">Priority</Label>
      <div className="flex gap-2">
        {['low', 'medium', 'high'].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPriorityChange(p as any)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              selectedPriority === p
                ? 'bg-ctea-teal text-white border-ctea-teal'
                : 'text-gray-400 border-gray-600 hover:border-ctea-teal/50'
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrioritySelector;
