
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter } from 'lucide-react';
import { useWallet } from '@/components/WalletProvider';

interface FeedCTAProps {
  variant?: 'default' | 'enhanced';
  className?: string;
}

const FeedCTA = ({ variant = 'default', className = '' }: FeedCTAProps) => {
  const navigate = useNavigate();
  const { wallet } = useWallet();

  const spillButtonText = variant === 'enhanced' ? 'Spill Now' : 'Spill Tea';
  const campaignButtonText = variant === 'enhanced' ? 'View Campaigns' : 'View Campaigns';
  const buttonClass = variant === 'enhanced' 
    ? 'bg-gradient-ctea text-white font-bold'
    : 'bg-gradient-to-r from-ctea-teal to-ctea-purple text-white font-bold';

  return (
    <Card className={`bg-gradient-to-br from-ctea-pink/20 to-ctea-purple/20 border-ctea-pink/30 mb-8 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold text-white mb-2">Got Some Tea to Spill? ☕</h3>
          <p className="text-gray-300">Share your hottest takes and earn $TEA points for viral content!</p>
          {wallet.isConnected && (
            <div className="flex gap-2 mt-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Wallet Connected
              </Badge>
              <Badge className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/30">
                Earning Enabled
              </Badge>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button 
            className={`w-full sm:w-auto ${buttonClass}`}
            onClick={() => navigate('/submit')}
          >
            <Plus className="w-4 h-4 mr-2" />
            {spillButtonText}
          </Button>
          <Button 
            variant="outline"
            className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 w-full sm:w-auto"
            onClick={() => navigate('/campaigns')}
          >
            <Filter className="w-4 h-4 mr-2" />
            {campaignButtonText}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FeedCTA;
