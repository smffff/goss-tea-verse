
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserX, User, Crown, Eye } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnonymous: () => void;
  onSignIn: () => void;
}

const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose, onAnonymous, onSignIn }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-newsprint border-vintage-red/30 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-display font-bold text-tabloid-black mb-2">
            How do you want to spill today?
          </CardTitle>
          <p className="text-tabloid-black/70">
            Choose your chaos level 🌶️
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Anonymous Option */}
          <div className="p-4 bg-pale-pink border border-vintage-red/20 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <UserX className="w-6 h-6 text-tabloid-black" />
              <h3 className="font-bold text-tabloid-black font-display">🔒 Stay Anonymous</h3>
            </div>
            <p className="text-sm text-tabloid-black/70 mb-4">
              Spill the tea without revealing your identity. Perfect for sensitive intel.
            </p>
            <Button 
              onClick={onAnonymous}
              className="btn-pill w-full bg-tabloid-black hover:bg-tabloid-black/80 text-white font-bold"
            >
              Spill Anonymously
            </Button>
          </div>

          {/* Sign In Option */}
          <div className="p-4 bg-gradient-to-br from-vintage-red/10 to-pale-pink border border-vintage-red/30 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-6 h-6 text-vintage-red" />
              <h3 className="font-bold text-tabloid-black font-display">🔓 Reveal Yourself 👀</h3>
            </div>
            <p className="text-sm text-tabloid-black/70 mb-3">
              Sign in to earn badges, gain gossip clout, and unlock leaderboard perks.
            </p>
            
            {/* Reward Preview */}
            <div className="bg-white/50 p-3 rounded border border-vintage-red/20 mb-4">
              <h4 className="font-semibold text-tabloid-black mb-2 flex items-center gap-2">
                <Crown className="w-4 h-4 text-vintage-red" />
                Rewards Preview
              </h4>
              <ul className="text-xs text-tabloid-black/70 space-y-1">
                <li>🫖 Top Spiller badges</li>
                <li>🏆 Leaderboard rankings</li>
                <li>🔥 AI favorite recognition</li>
                <li>💰 Future token rewards</li>
              </ul>
            </div>
            
            <Button 
              onClick={onSignIn}
              className="btn-pill btn-pill-red w-full text-white font-bold"
            >
              <Eye className="w-4 h-4 mr-2" />
              Reveal Yourself 👀
            </Button>
          </div>

          {/* Close Button */}
          <Button 
            onClick={onClose}
            variant="outline"
            className="w-full border-tabloid-black/20 text-tabloid-black hover:bg-tabloid-black hover:text-white"
          >
            Maybe Later
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinModal;
