
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircle, Link } from 'lucide-react';

interface MediaUrlInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onClearError: () => void;
}

const MediaUrlInput: React.FC<MediaUrlInputProps> = ({
  value,
  onChange,
  error,
  onClearError
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) onClearError();
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="mediaUrl" className="text-white font-medium flex items-center gap-2">
        <Link className="w-4 h-4" />
        Media URL (Optional)
      </Label>
      <Input
        id="mediaUrl"
        type="url"
        value={value}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg or https://twitter.com/user/status/123..."
        className={`bg-ctea-darker border-ctea-teal/30 text-white placeholder:text-gray-500 ${
          error ? 'border-red-500' : ''
        }`}
      />
      
      {error && (
        <div className="flex items-center gap-1 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      
      <p className="text-xs text-gray-500">
        📷 Add a link to an image, video, tweet, or any supporting media
      </p>
    </div>
  );
};

export default MediaUrlInput;
