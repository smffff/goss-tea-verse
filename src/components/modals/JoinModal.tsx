
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
          <div className="p-4 bg-pale-pink border border-vintage-red/20 rounded-lg card-tabloid-hover">
            <div className="flex items-center gap-3 mb-3">
              <UserX className="w-6 h-6 text-tabloid-black" />
              <h3 className="font-bold text-tabloid-black font-display">🕵️ Go Incognito</h3>
            </div>
            <p className="text-sm text-tabloid-black/70 mb-4">
              Spill tea anonymously without revealing your identity. Perfect for sensitive intel that needs protection.
            </p>
            <Button 
              onClick={onAnonymous}
              className="btn-pill w-full bg-tabloid-black hover:bg-tabloid-black/80 text-white font-bold btn-tabloid-hover"
            >
              Spill Tea Anonymously
            </Button>
          </div>

          {/* Sign In Option */}
          <div className="p-4 bg-gradient-to-br from-vintage-red/10 to-pale-pink border border-vintage-red/30 rounded-lg card-tabloid-hover">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-6 h-6 text-vintage-red" />
              <h3 className="font-bold text-tabloid-black font-display">👀 Say It With Your Chest</h3>
            </div>
            <p className="text-sm text-tabloid-black/70 mb-3">
              Log in and say it with your chest! You'll earn spicy badges and leaderboard status. But you can still keep it cute and anonymous if you want.
            </p>
            
            {/* Reward Preview */}
            <div className="bg-white/50 p-3 rounded border border-vintage-red/20 mb-4">
              <h4 className="font-semibold text-tabloid-black mb-2 flex items-center gap-2">
                <Crown className="w-4 h-4 text-vintage-red" />
                Unlock These Perks
              </h4>
              <ul className="text-xs text-tabloid-black/70 space-y-1">
                <li>🏆 Top Spiller badges & street cred</li>
                <li>🤖 AI favorite recognition</li>
                <li>📈 Leaderboard rankings & flex rights</li>
                <li>💰 Future token rewards & governance</li>
              </ul>
            </div>
            
            <Button 
              onClick={onSignIn}
              className="btn-pill btn-pill-red w-full text-white font-bold btn-tabloid-hover"
            >
              <Eye className="w-4 h-4 mr-2" />
              Log In and Say It With Your Chest
            </Button>
          </div>

          {/* Close Button */}
          <Button 
            onClick={onClose}
            variant="outline"
            className="w-full border-tabloid-black/20 text-tabloid-black hover:bg-tabloid-black hover:text-white btn-tabloid-hover"
          >
            Maybe Later
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinModal;
