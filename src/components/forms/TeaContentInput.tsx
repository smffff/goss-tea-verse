
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

interface TeaContentInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onClearError: () => void;
}

const TeaContentInput: React.FC<TeaContentInputProps> = ({
  value,
  onChange,
  error,
  onClearError
}) => {
  const getCharacterCount = () => {
    const count = value.length;
    const max = 2000;
    const percentage = (count / max) * 100;
    
    if (percentage > 90) return 'text-red-500';
    if (percentage > 75) return 'text-yellow-500';
    return 'text-gray-400';
  };

  return (
    <div>
      <Label htmlFor="tea" className="text-gray-300 flex items-center gap-2">
        Your Tea ☕
        <span className="text-red-400">*</span>
      </Label>
      <Textarea
        id="tea"
        placeholder="Share the hottest crypto gossip, alpha, or meme-fueled take... (minimum 20 characters)"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          onClearError();
        }}
        className={`min-h-[120px] bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none ${
          error ? 'border-red-400' : ''
        }`}
        required
      />
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          {error && (
            <div className="flex items-center gap-1 text-red-400 text-sm">
              <AlertCircle className="w-3 h-3" />
              {error}
            </div>
          )}
        </div>
        <div className={`text-xs ${getCharacterCount()}`}>
          {value.length}/2000
        </div>
      </div>
    </div>
  );
};

export default TeaContentInput;
