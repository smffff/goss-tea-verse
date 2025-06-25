
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LinkIcon, X } from 'lucide-react';

interface EvidenceUrlInputProps {
  urls: string[];
  onUrlsChange: (urls: string[]) => void;
}

const EvidenceUrlInput: React.FC<EvidenceUrlInputProps> = ({
  urls,
  onUrlsChange
}) => {
  const [newUrl, setNewUrl] = useState('');

  const addUrl = () => {
    if (newUrl.trim() && !urls.includes(newUrl.trim())) {
      onUrlsChange([...urls, newUrl.trim()]);
      setNewUrl('');
    }
  };

  const removeUrl = (index: number) => {
    onUrlsChange(urls.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Label className="text-gray-300 mb-2 block">Evidence Links (Optional)</Label>
      <div className="space-y-2">
        {urls.map((url, index) => (
          <div key={index} className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-ctea-teal" />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent2 text-sm underline flex-1 truncate"
            >
              {url}
            </a>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeUrl(index)}
              className="text-red-400 hover:bg-red-400/10 p-1"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
        
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Add evidence URL..."
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="flex-1 bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addUrl();
              }
            }}
          />
          <Button
            type="button"
            onClick={addUrl}
            disabled={!newUrl.trim()}
            className="bg-accent hover:bg-accent2 text-white px-4 disabled:opacity-50"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EvidenceUrlInput;
