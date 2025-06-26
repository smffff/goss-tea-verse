
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Settings, Trophy, Zap, Crown, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AvatarSystem from './AvatarSystem';
import UserStats from '../UserStats';

interface EnhancedProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
}

const EnhancedProfileModal: React.FC<EnhancedProfileModalProps> = ({
  isOpen,
  onClose,
  user
}) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState('lady-invisible');
  const [activeTab, setActiveTab] = useState('avatar');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'CTea Newsroom Profile',
        text: `Check out my CTea profile! ${isAnonymous ? 'Anonymous spiller' : 'OG Sipper'} in the gossip game 🫖`,
        url: window.location.href
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-ctea-darker via-ctea-dark to-black border-ctea-teal/30 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <User className="w-5 h-5 text-ctea-teal" />
              Profile Settings
            </span>
            <Button
              onClick={handleShare}
              size="sm"
              variant="ghost"
              className="text-ctea-teal hover:text-ctea-teal/80"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-ctea-dark/50">
            <TabsTrigger value="avatar" className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black">
              <User className="w-4 h-4 mr-2" />
              Avatar
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black">
              <Trophy className="w-4 h-4 mr-2" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="avatar" className="mt-4">
            <AvatarSystem
              isAnonymous={isAnonymous}
              onToggleAnonymous={setIsAnonymous}
              currentAvatar={currentAvatar}
              onAvatarChange={setCurrentAvatar}
            />
          </TabsContent>

          <TabsContent value="stats" className="mt-4">
            <UserStats />
          </TabsContent>

          <TabsContent value="settings" className="mt-4 space-y-4">
            {/* Notification Settings */}
            <div className="p-4 bg-ctea-dark/50 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                Viral Features
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Push notifications for trending spills</span>
                  <Button size="sm" variant="outline" className="text-xs">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Auto-share viral content</span>
                  <Button size="sm" variant="outline" className="text-xs">Setup</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Shake to spill (mobile)</span>
                  <Button size="sm" variant="outline" className="text-xs">Enable</Button>
                </div>
              </div>
            </div>

            {/* OG Status */}
            {user?.token_balance && user.token_balance >= 69 && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold text-white">OG Sipper Status</span>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs">
                    ACTIVE
                  </Badge>
                </div>
                <p className="text-sm text-gray-300">
                  You're part of the exclusive early adopters club! Enjoy premium avatars and priority access.
                </p>
              </motion.div>
            )}

            {/* Privacy Settings */}
            <div className="p-4 bg-ctea-dark/50 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-white mb-3">Privacy & Safety</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Block anonymous tips</span>
                  <Button size="sm" variant="outline" className="text-xs">Off</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Hide from leaderboards</span>
                  <Button size="sm" variant="outline" className="text-xs">Off</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Private spill mode</span>
                  <Button size="sm" variant="outline" className="text-xs">Configure</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Close
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-teal/80 hover:to-ctea-purple/80"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedProfileModal;
