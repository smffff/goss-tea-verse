
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-newsprint border-vintage-red/30 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-tabloid font-bold text-tabloid-black mb-2 uppercase tracking-wider">
            Choose Your Chaos Level 🌶️
          </CardTitle>
          <p className="text-tabloid-black/70 font-headline text-lg">
            How shady are we feeling today?
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Anonymous Option */}
          <div className="p-6 bg-pale-pink border-2 border-vintage-red/20 rounded-lg hover:border-vintage-red/40 transition-all hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <UserX className="w-7 h-7 text-tabloid-black" />
              <h3 className="font-bold text-tabloid-black font-tabloid text-xl uppercase">🕵️ Stay Anonymous</h3>
            </div>
            <p className="text-tabloid-black/70 mb-4 font-medium">
              Keep it cute and mysterious. Drop the tea without the receipts. Perfect for when you want to spill but stay protected from the drama.
            </p>
            <div className="bg-vintage-red/10 p-3 rounded border border-vintage-red/20 mb-4">
              <p className="text-vintage-red text-sm font-bold">
                ☕ Anonymous Oracle Mode: Maximum shade, zero accountability
              </p>
            </div>
            <Button 
              onClick={onAnonymous}
              className="w-full bg-tabloid-black hover:bg-tabloid-black/80 text-white font-bold font-headline text-lg py-3 uppercase tracking-wide transition-all hover:scale-105"
            >
              Spill Anonymously
            </Button>
          </div>

          {/* Sign In Option */}
          <div className="p-6 bg-gradient-to-br from-vintage-red/10 to-pale-pink border-2 border-vintage-red/30 rounded-lg hover:border-vintage-red/50 transition-all hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-7 h-7 text-vintage-red" />
              <h3 className="font-bold text-tabloid-black font-tabloid text-xl uppercase">👑 Say It With Your Chest</h3>
            </div>
            <p className="text-tabloid-black/70 mb-3 font-medium">
              Own your drama! Build street cred, earn badges, and climb the leaderboard. For spillers who aren't afraid of the spotlight.
            </p>
            
            {/* Reward Preview */}
            <div className="bg-white/70 p-4 rounded border border-vintage-red/20 mb-4">
              <h4 className="font-semibold text-tabloid-black mb-3 flex items-center gap-2 font-headline uppercase">
                <Crown className="w-5 h-5 text-vintage-red" />
                Unlock These Perks
              </h4>
              <ul className="text-sm text-tabloid-black/70 space-y-2 font-medium">
                <li>🔥 Top Spiller badges & ultimate flex rights</li>
                <li>🤖 AI favorite recognition from CTeaBot</li>
                <li>📈 Leaderboard domination & eternal glory</li>
                <li>💰 Future $TEA rewards & governance power</li>
                <li>👑 Exclusive VIP access to premium tea</li>
              </ul>
            </div>
            
            <Button 
              onClick={onSignIn}
              className="w-full bg-gradient-to-r from-vintage-red to-vintage-red-700 hover:from-vintage-red-600 hover:to-vintage-red-800 text-white font-bold font-headline text-lg py-3 uppercase tracking-wide transition-all hover:scale-105 shadow-lg"
            >
              <Eye className="w-5 h-5 mr-2" />
              Connect & Start Flexing
            </Button>
          </div>

          {/* Close Button */}
          <Button 
            onClick={onClose}
            variant="outline"
            className="w-full border-tabloid-black/20 text-tabloid-black hover:bg-tabloid-black hover:text-white transition-all font-headline uppercase tracking-wide"
          >
            Not Ready to Spill Yet
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinModal;
