
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle } from 'lucide-react';

interface TeaTextInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onClearError: () => void;
}

const TeaTextInput: React.FC<TeaTextInputProps> = ({
  value,
  onChange,
  error,
  onClearError
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (error) onClearError();
    onChange(e.target.value);
  };

  const characterCount = value.length;
  const maxLength = 2000;
  const isNearLimit = characterCount > maxLength * 0.8;

  return (
    <div className="space-y-2">
      <Label htmlFor="teaText" className="text-white font-medium">
        Your Tea ☕ <span className="text-ctea-pink">*</span>
      </Label>
      <Textarea
        id="teaText"
        value={value}
        onChange={handleChange}
        placeholder="Spill the tea... What's the latest gossip, drama, or alpha you've heard? ☕"
        className={`min-h-[120px] bg-ctea-darker border-ctea-teal/30 text-white placeholder:text-gray-500 resize-none ${
          error ? 'border-red-500' : ''
        }`}
        maxLength={maxLength}
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {error && (
            <div className="flex items-center gap-1 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
        <div className={`text-sm ${
          isNearLimit ? 'text-orange-400' : 'text-gray-400'
        }`}>
          {characterCount}/{maxLength}
        </div>
      </div>
      
      <p className="text-xs text-gray-500">
        💡 Tip: Markdown formatting is supported for links, bold text, and more!
      </p>
    </div>
  );
};

export default TeaTextInput;
