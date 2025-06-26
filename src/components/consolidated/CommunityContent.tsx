
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, Trophy, Crown, ChevronRight } from 'lucide-react';

interface CommunityContentProps {
  onBetaTabChange: () => void;
}

const CommunityContent: React.FC<CommunityContentProps> = ({ onBetaTabChange }) => {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Users className="w-16 h-16 text-ctea-teal mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-4">Join the Community</h3>
        <p className="text-gray-300 mb-6">
          Connect with thousands of gossip enthusiasts and stay updated with the latest insider news.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-ctea-dark/40 backdrop-blur border border-ctea-teal/20 rounded-lg p-6">
            <MessageSquare className="w-8 h-8 text-ctea-teal mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Share Stories</h4>
            <p className="text-gray-400 text-sm">Submit your insider knowledge</p>
          </div>
          <div className="bg-ctea-dark/40 backdrop-blur border border-pink-400/20 rounded-lg p-6">
            <Trophy className="w-8 h-8 text-pink-400 mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Earn Rewards</h4>
            <p className="text-gray-400 text-sm">Get recognized for quality content</p>
          </div>
          <div className="bg-ctea-dark/40 backdrop-blur border border-ctea-purple/20 rounded-lg p-6">
            <Crown className="w-8 h-8 text-ctea-purple mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Build Reputation</h4>
            <p className="text-gray-400 text-sm">Become a trusted source</p>
          </div>
        </div>
        
        <Button
          onClick={onBetaTabChange}
          className="bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-teal/80 hover:to-ctea-purple/80 text-white px-8 py-3"
        >
          Get Beta Access
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
};

export default CommunityContent;
