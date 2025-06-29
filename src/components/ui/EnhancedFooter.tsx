import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink, Twitter, MessageSquare, Coins } from 'lucide-react';

const EnhancedFooter: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1b1b1b] via-[#2a1a2a] to-[#1b1b1b] border-t border-[#00D4AA]/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6B9D] to-[#00D4AA] bg-clip-text text-transparent">
              CTea Newsroom
            </h3>
            <p className="text-white/70 text-sm">
              Where Web3 meets TMZ. The ultimate crypto gossip HQ built for degens, not regens.
            </p>
            <div className="flex space-x-3">
              <Button 
                size="sm" 
                className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/80"
                onClick={() => window.open('https://twitter.com/cteanews', '_blank')}
              >
                <Twitter className="w-4 h-4 mr-2" />
                Follow
              </Button>
              <Button 
                size="sm" 
                className="bg-[#5865F2] hover:bg-[#5865F2]/80"
                onClick={() => window.open('https://discord.gg/ctea', '_blank')}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Discord
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="/feed" className="hover:text-[#00D4AA] transition-colors">Latest Spills</a></li>
              <li><a href="/leaderboard" className="hover:text-[#00D4AA] transition-colors">Leaderboard</a></li>
              <li><a href="/submit" className="hover:text-[#00D4AA] transition-colors">Submit Tea</a></li>
              <li><a href="/about" className="hover:text-[#00D4AA] transition-colors">About</a></li>
            </ul>
          </div>

          {/* Token & Economy */}
          <div>
            <h4 className="font-bold text-white mb-4">Token Economy</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="/tokenomics" className="hover:text-[#FF6B9D] transition-colors">$TEA Tokenomics</a></li>
              <li><a href="/claim" className="hover:text-[#FF6B9D] transition-colors">Claim $SOAP</a></li>
              <li><a href="/governance" className="hover:text-[#FF6B9D] transition-colors">DAO Governance</a></li>
              <li><a href="/staking" className="hover:text-[#FF6B9D] transition-colors">Stake & Earn</a></li>
            </ul>
          </div>

          {/* CTA Section */}
          <div>
            <h4 className="font-bold text-white mb-4">Join the Revolution</h4>
            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="w-full bg-gradient-to-r from-[#FF6B9D] to-[#FF9500] hover:from-[#FF9500] hover:to-[#00D4AA] text-white font-bold"
                  onClick={() => window.open('https://dexscreener.com/avalanche/0x116594bd6eb7c16570413e1ccc36f1fed38c0dff', '_blank')}
                >
                  <Coins className="w-4 h-4 mr-2" />
                  Buy $TEA <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </motion.div>
              
              <p className="text-xs text-white/60 text-center">
                "Finally, Utility for Your Meme Portfolio"
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-white/60">
              <span>© 2024 CTea Newsroom</span>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-white/50">
              <span>Gasless Access (Unless You Count Social Gas)</span>
              <span>•</span>
              <span>Proof of Spill, Not Proof of Work</span>
            </div>
          </div>
          
          {/* Meme tagline */}
          <motion.div
            className="text-center mt-4 text-sm text-[#00D4AA]/80 font-mono"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "Make CTea Great Again" 🫖
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
