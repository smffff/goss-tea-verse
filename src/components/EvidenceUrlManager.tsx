
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Link2 } from 'lucide-react';

interface EvidenceUrlManagerProps {
  evidenceUrls: string[];
  onUrlsChange: (urls: string[]) => void;
}

const EvidenceUrlManager = ({ evidenceUrls, onUrlsChange }: EvidenceUrlManagerProps) => {
  const addEvidenceField = () => {
    onUrlsChange([...evidenceUrls, '']);
  };

  const updateEvidenceUrl = (index: number, value: string) => {
    const newUrls = [...evidenceUrls];
    newUrls[index] = value;
    onUrlsChange(newUrls);
  };

  const removeEvidenceField = (index: number) => {
    if (evidenceUrls.length > 1) {
      onUrlsChange(evidenceUrls.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Camera className="w-4 h-4 text-ctea-teal" />
        <Label className="text-white font-medium">Evidence (Optional)</Label>
        <Badge variant="outline" className="border-ctea-yellow text-ctea-yellow text-xs">+5 Bonus Points</Badge>
      </div>
      {evidenceUrls.map((url, index) => (
        <div key={index} className="flex gap-2">
          <div className="flex-1 flex items-center gap-2">
            <Link2 className="w-4 h-4 text-gray-400" />
            <Input
              value={url}
              onChange={(e) => updateEvidenceUrl(index, e.target.value)}
              placeholder="Paste link to screenshots, tweets, etc..."
              className="bg-ctea-darker/50 border-ctea-teal/30 text-white placeholder:text-gray-400"
            />
          </div>
          {evidenceUrls.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeEvidenceField(index)}
              className="border-ctea-pink/30 text-ctea-pink hover:bg-ctea-pink/10"
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addEvidenceField}
        className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
      >
        + Add More Evidence
      </Button>
    </div>
  );
};

export default EvidenceUrlManager;
