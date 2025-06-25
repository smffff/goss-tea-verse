
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, UserX, User, Trophy, Star, TrendingUp } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnonymous: () => void;
  onSignIn: () => void;
}

const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  onAnonymous,
  onSignIn
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-md mx-4 bg-gradient-to-br from-amber-50 to-red-50 border-red-300 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-red-200">
          <CardTitle className="text-gray-900 font-bold text-xl">
            How do you want to spill today?
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-4">
          {/* Anonymous Option */}
          <div className="p-4 border-2 border-gray-300 rounded-lg hover:border-red-400 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <UserX className="w-6 h-6 text-gray-600" />
              <h3 className="font-bold text-gray-900">🔒 Stay Anonymous</h3>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Quick and dirty. No strings attached. Pure chaos mode.
            </p>
            <Button 
              onClick={onAnonymous}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold"
            >
              Spill Anonymously
            </Button>
          </div>

          {/* Sign In Option */}
          <div className="p-4 border-2 border-red-300 rounded-lg bg-gradient-to-br from-red-50 to-amber-50">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-6 h-6 text-red-600" />
              <h3 className="font-bold text-gray-900">🔓 Sign in for rewards</h3>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Earn badges, gain gossip clout, and unlock leaderboard perks
            </p>
            
            {/* Reward Preview */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center p-2 bg-white/50 rounded">
                <Trophy className="w-4 h-4 mx-auto text-amber-600 mb-1" />
                <span className="text-xs font-bold text-gray-700">Badges</span>
              </div>
              <div className="text-center p-2 bg-white/50 rounded">
                <Star className="w-4 h-4 mx-auto text-yellow-600 mb-1" />
                <span className="text-xs font-bold text-gray-700">Clout</span>
              </div>
              <div className="text-center p-2 bg-white/50 rounded">
                <TrendingUp className="w-4 h-4 mx-auto text-green-600 mb-1" />
                <span className="text-xs font-bold text-gray-700">Perks</span>
              </div>
            </div>

            <Button 
              onClick={onSignIn}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold"
            >
              Connect & Earn Rewards
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinModal;
