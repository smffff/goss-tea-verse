
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LinkIcon, X, AlertCircle } from 'lucide-react';
import { validateUrl } from '@/utils/securityUtils';

interface EvidenceUrlInputProps {
  urls: string[];
  onUrlsChange: (urls: string[]) => void;
}

const EvidenceUrlInput: React.FC<EvidenceUrlInputProps> = ({
  urls,
  onUrlsChange
}) => {
  const [newUrl, setNewUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const addUrl = () => {
    const trimmedUrl = newUrl.trim();
    
    if (!trimmedUrl) {
      setUrlError('Please enter a URL');
      return;
    }

    if (!validateUrl(trimmedUrl)) {
      setUrlError('Please enter a valid HTTP or HTTPS URL');
      return;
    }

    if (urls.includes(trimmedUrl)) {
      setUrlError('This URL has already been added');
      return;
    }

    if (urls.length >= 5) {
      setUrlError('Maximum 5 URLs allowed');
      return;
    }

    onUrlsChange([...urls, trimmedUrl]);
    setNewUrl('');
    setUrlError('');
  };

  const removeUrl = (index: number) => {
    onUrlsChange(urls.filter((_, i) => i !== index));
  };

  const handleUrlChange = (value: string) => {
    setNewUrl(value);
    if (urlError) {
      setUrlError('');
    }
  };

  return (
    <div>
      <Label className="text-gray-300 mb-2 block">Evidence Links (Optional)</Label>
      <div className="space-y-2">
        {urls.map((url, index) => (
          <div key={index} className="flex items-center gap-2 bg-ctea-dark/30 p-2 rounded border border-ctea-teal/20">
            <LinkIcon className="w-4 h-4 text-ctea-teal flex-shrink-0" />
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
              className="text-red-400 hover:bg-red-400/10 p-1 flex-shrink-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
        
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Add evidence URL (https://example.com)..."
              value={newUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              className={`flex-1 bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent ${
                urlError ? 'border-red-400' : ''
              }`}
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
              disabled={!newUrl.trim() || urls.length >= 5}
              className="bg-accent hover:bg-accent2 text-white px-4 disabled:opacity-50"
            >
              Add
            </Button>
          </div>
          
          {urlError && (
            <div className="flex items-center gap-1 text-red-400 text-sm">
              <AlertCircle className="w-3 h-3" />
              {urlError}
            </div>
          )}
          
          {urls.length >= 5 && (
            <div className="text-yellow-400 text-xs">
              Maximum 5 URLs allowed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvidenceUrlInput;
