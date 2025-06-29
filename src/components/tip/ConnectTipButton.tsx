
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
    <Button
      onClick={onConnect}
      disabled={isConnecting}
      className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white"
    >
      {isConnecting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </>
      )}
    </Button>
  );
};

export default ConnectTipButton;
