import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Coffee } from 'lucide-react';

interface ConnectTipButtonProps {
  onConnect: () => void;
  isConnecting?: boolean;
}

const ConnectTipButton: React.FC<ConnectTipButtonProps> = ({ 
  onConnect, 
  isConnecting = false 
}) => {
  return (
    <Button onClick={onConnect} disabled={isConnecting} className="flex items-center gap-2 bg-ctea-teal text-white">
      {isConnecting ? (
        <>
          <Wallet className="w-4 h-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </>
      )}
    </Button>
  );
};

export default ConnectTipButton;
