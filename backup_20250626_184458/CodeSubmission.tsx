
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Code, Eye, EyeOff } from 'lucide-react';

interface CodeSubmissionProps {
  accessCode: string;
  onAccessCodeChange: (code: string) => void;
  showCode: boolean;
  setShowCode: (show: boolean) => void;
  isLoading: boolean;
  onSubmit: () => void;
  error: string;
}

const CodeSubmission: React.FC<CodeSubmissionProps> = ({
  accessCode,
  onAccessCodeChange,
  showCode,
  setShowCode,
  isLoading,
  onSubmit,
  error
}) => {
  return (
    <>
      <div>
        <Label htmlFor="access-code" className="text-white font-semibold">
          Access Code 🔑
        </Label>
        <div className="relative mt-2">
          <Input
            id="access-code"
            type={showCode ? "text" : "password"}
            value={accessCode}
            onChange={(e) => onAccessCodeChange(e.target.value.toUpperCase())}
            placeholder="Enter your secret code..."
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white/60 font-mono text-center pr-12"
            onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
          />
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
          >
            {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-xs text-white/70 mt-1">
          Got your code from spilling tea or tipping? Enter it here
        </p>
      </div>
      
      <Button
        onClick={onSubmit}
        disabled={isLoading || !accessCode.trim()}
        className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 backdrop-blur-sm"
      >
        {isLoading ? (
          <>
            <Code className="w-5 h-5 mr-2 animate-pulse" />
            Verifying...
          </>
        ) : (
          <>
            <Code className="w-5 h-5 mr-2" />
            Unlock Access
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

export default CodeSubmission;
