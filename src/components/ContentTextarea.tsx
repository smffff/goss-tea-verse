
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ContentTextareaProps {
  content: string;
  onContentChange: (content: string) => void;
}

const ContentTextarea = ({ content, onContentChange }: ContentTextareaProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="content" className="text-white font-medium">
        Spill the Details (Be Spicy 🌶️)
      </Label>
      <Textarea
        id="content"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Drop the hottest tea you've got... Don't hold back! 💀"
        className="min-h-[120px] bg-ctea-darker/50 border-ctea-teal/30 text-white placeholder:text-gray-400 focus:border-ctea-pink resize-none"
        maxLength={2000}
      />
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Be anonymous, be bold!</span>
        <span className="text-gray-400">{content.length}/2000</span>
      </div>
    </div>
  );
};

export default ContentTextarea;
