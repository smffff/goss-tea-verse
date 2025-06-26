
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Wallet, Sparkles } from 'lucide-react';

interface BribeSubmissionProps {
  tipAmount: string;
  setTipAmount: (amount: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
  error: string;
}

const BribeSubmission: React.FC<BribeSubmissionProps> = ({
  tipAmount,
  setTipAmount,
  isLoading,
  onSubmit,
  error
}) => {
  return (
    <>
      <div>
        <Label htmlFor="tip-amount" className="text-white font-semibold">
          Tip Amount (ETH) 💰
        </Label>
        <Input
          id="tip-amount"
          type="number"
          step="0.001"
          min="0.001"
          value={tipAmount}
          onChange={(e) => setTipAmount(e.target.value)}
          placeholder="0.001"
          className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white/60 mt-2"
        />
        <p className="text-xs text-white/70 mt-1">
          Minimum: 0.001 ETH • The gatekeepers appreciate generosity 
        </p>
      </div>
      
      <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
        <p className="text-sm text-white/90 mb-2">💡 <strong>Bribe Benefits:</strong></p>
        <ul className="text-xs text-white/80 space-y-1">
          <li>• Instant access code generation</li>
          <li>• VIP status in the newsroom</li>
          <li>• Early access to premium features</li>
          <li>• Support the tea infrastructure</li>
        </ul>
      </div>
      
      <Button
        onClick={onSubmit}
        disabled={isLoading || !tipAmount}
        className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 backdrop-blur-sm"
      >
        {isLoading ? (
          <>
            <Sparkles className="w-5 h-5 mr-2 animate-spin" />
            Processing Bribe...
          </>
        ) : (
          <>
            <Wallet className="w-5 h-5 mr-2" />
            Send Tip & Get Access
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

export default BribeSubmission;
