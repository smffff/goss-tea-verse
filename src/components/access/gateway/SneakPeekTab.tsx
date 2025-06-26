
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AccessLevelIndicator from '../AccessLevelIndicator';

interface SneakPeekTabProps {
  onAccessGranted: (level: 'guest' | 'authenticated' | 'beta' | 'admin') => void;
}

const SneakPeekTab: React.FC<SneakPeekTabProps> = ({ onAccessGranted }) => {
  const { toast } = useToast();

  const handleSneakPeek = () => {
    try {
      localStorage.setItem('ctea-access-level', 'guest');
      localStorage.setItem('ctea-peek-start', Date.now().toString());
      toast({
        title: "Welcome to CTea! ☕",
        description: "Enjoy your 5-minute preview of the hottest crypto gossip!",
      });
      onAccessGranted('guest');
    } catch (error) {
      console.error('Error setting sneak peek:', error);
      toast({
        title: "Oops! Something went sideways",
        description: "Sneak peek couldn't start. Try refreshing and we'll fix this mess 💅",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-4">
        <AccessLevelIndicator level="guest" />
        <h3 className="text-white font-bold">Sneak Peek Mode</h3>
        <p className="text-gray-400 text-sm">
          Get a 5-minute taste of the hottest crypto gossip. Limited access to top stories only.
        </p>
        <Button
          onClick={handleSneakPeek}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Sneak Peek
        </Button>
        <p className="text-xs text-gray-500">
          No signup required • Upgrade anytime for full access
        </p>
      </div>
    </div>
  );
};

export default SneakPeekTab;
