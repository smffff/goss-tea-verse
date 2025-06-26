
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Send } from 'lucide-react';
import SpillingTeaCup from '@/components/ui/SpillingTeaCup';

interface SpillSubmissionProps {
  spillContent: string;
  setSpillContent: (content: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
  error: string;
}

const SpillSubmission: React.FC<SpillSubmissionProps> = ({
  spillContent,
  setSpillContent,
  isLoading,
  onSubmit,
  error
}) => {
  return (
    <>
      <div>
        <Label htmlFor="spill-content" className="text-white font-semibold">
          What's the tea? ☕
        </Label>
        <Textarea
          id="spill-content"
          value={spillContent}
          onChange={(e) => setSpillContent(e.target.value)}
          placeholder="Spill the hottest crypto gossip here... Who's dumping? Which project is actually a scam? What insider info do you have?"
          className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white/60 mt-2 min-h-[120px] resize-none"
          maxLength={500}
        />
        <div className="text-xs text-white/60 text-right mt-1">
          {spillContent.length}/500 characters
        </div>
      </div>
      
      <Button
        onClick={onSubmit}
        disabled={isLoading || !spillContent.trim()}
        className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 backdrop-blur-sm"
      >
        {isLoading ? (
          <>
            <SpillingTeaCup size="sm" className="mr-2" animated />
            Brewing your code...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Spill the Tea & Get Code
          </>
        )}
      </Button>

      {error && (
        <Alert className="border-red-400 bg-red-400/10 backdrop-blur-sm">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <AlertDescription className="text-red-400">
            {error}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default SpillSubmission;
