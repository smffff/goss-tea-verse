
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Coffee, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { track } from '@/utils/analytics';

interface TipJarProps {
  contentCreator: string;
  contentId: string;
  placement: 'inline' | 'modal' | 'sidebar';
  className?: string;
}

const TipJar: React.FC<TipJarProps> = ({
  contentCreator,
  contentId,
  placement,
  className = ''
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const { toast } = useToast();
  
  const tipAmounts = [1, 5, 10, 25, 50];

  const handleTip = async (amount: number) => {
    track('tip_initiated', {
      amount,
      content_creator: contentCreator,
      content_id: contentId,
      placement
    });

    // Here you'd integrate with your payment processor
    // For now, we'll simulate the tip
    toast({
      title: "Tip Sent! ☕",
      description: `$${amount} tip sent to ${contentCreator}. Thanks for supporting quality content!`,
    });
  };

  if (placement === 'inline') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Coffee className="w-4 h-4 text-orange-500" />
        <span className="text-sm text-gray-600">Support this tea:</span>
        {tipAmounts.slice(0, 3).map(amount => (
          <Button
            key={amount}
            size="sm"
            variant="outline"
            onClick={() => handleTip(amount)}
            className="text-xs px-2 py-1 h-auto"
          >
            ${amount}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <Card className={`p-4 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200 ${className}`}>
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Heart className="w-8 h-8 text-red-500" />
        </div>
        
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Support Quality Tea ☕</h3>
          <p className="text-sm text-gray-600">
            Tip {contentCreator} for this amazing content
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {tipAmounts.map(amount => (
            <Button
              key={amount}
              size="sm"
              variant={selectedAmount === amount ? "default" : "outline"}
              onClick={() => setSelectedAmount(amount)}
              className="text-sm"
            >
              ${amount}
            </Button>
          ))}
        </div>

        {selectedAmount && (
          <Button
            onClick={() => handleTip(selectedAmount)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Send ${selectedAmount} Tip
          </Button>
        )}
      </div>
    </Card>
  );
};

export default TipJar;
