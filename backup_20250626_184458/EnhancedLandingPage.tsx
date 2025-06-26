import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Sparkles, Settings, Code } from 'lucide-react';
import WalletGatedHero from './WalletGatedHero';
import BribeButton from './BribeButton';
import EnhancedSpillSubmission from './EnhancedSpillSubmission';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';
import { AccessLevel } from '@/services/accessControlService';

const EnhancedLandingPage: React.FC = () => {
  const [showBribeModal, setShowBribeModal] = useState(false);
  const [showSpillModal, setShowSpillModal] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessLevel, setAccessLevel] = useState<AccessLevel | null>(null);

  const hasBetaAccess = localStorage.getItem('ctea-beta-access') === 'granted';
  const isDevelopment = process.env.NODE_ENV === 'development';

  const handleAccessGranted = (access: AccessLevel) => {
    setAccessLevel(access);
    setHasAccess(true);
    setShowBribeModal(false);
    setShowSpillModal(false);
  };

  const enableDevRoutes = () => {
    localStorage.setItem('ENABLE_DEV_ROUTES', 'true');
    window.location.href = '/dev/feed';
  };

  // Check for existing access on load
  React.useEffect(() => {
    const existingAccess = localStorage.getItem('ctea_access_method');
    if (existingAccess) {
      setHasAccess(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black relative overflow-hidden">
      {/* Development Mode Banner */}
      {isDevelopment && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-b border-yellow-500/30 p-2">
          <div className="container mx-auto flex items-center justify-between">
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
              🛠️ DEVELOPMENT MODE
            </Badge>
            {(hasBetaAccess || isDevelopment) && (
              <Button
                onClick={enableDevRoutes}
                size="sm"
                className="bg-gradient-to-r from-ctea-teal to-green-400 hover:from-green-400 hover:to-ctea-teal text-black font-bold"
              >
                <Code className="w-4 h-4 mr-2" />
                Access Dev Routes
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ctea-teal rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-ctea-purple rounded-full blur-xl animate-pulse delay-2000"></div>
        
        {/* Floating teacup particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              rotate: 0 
            }}
            animate={{
              y: [null, -100, null],
              rotate: [0, 360, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            <BrandedTeacupIcon size="md" variant="steaming" />
          </motion.div>
        ))}
      </div>

      <div className={`relative z-10 container mx-auto px-4 ${isDevelopment ? 'pt-20' : 'py-12'}`}>
        {/* Main Hero Section */}
        <div className="min-h-screen flex items-center justify-center">
          <WalletGatedHero
            onAccessGranted={handleAccessGranted}
            onShowBribe={() => setShowBribeModal(true)}
            onShowSpill={() => setShowSpillModal(true)}
          />
        </div>

        {/* Beta Access Notice for Development */}
        {isDevelopment && (hasBetaAccess || hasAccess) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Card className="bg-gradient-to-r from-ctea-teal/20 to-green-400/20 border-ctea-teal/50">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-ctea-teal" />
                  <h3 className="text-xl font-bold text-white">Beta User Detected!</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  You have beta access to CTea Newsroom. Want to explore the development features?
                </p>
                <Button
                  onClick={enableDevRoutes}
                  className="bg-gradient-to-r from-ctea-teal to-green-400 hover:from-green-400 hover:to-ctea-teal text-black font-bold"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Enter Development Environment
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-4 gap-6 mb-20"
        >
          <Card className="bg-ctea-dark/40 border-ctea-teal/20 text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-ctea-teal mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">420</div>
              <div className="text-sm text-gray-400">Beta OGs</div>
            </CardContent>
          </Card>
          
          <Card className="bg-ctea-dark/40 border-pink-400/20 text-center">
            <CardContent className="p-6">
              <BrandedTeacupIcon size="lg" variant="spilling" className="mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">1,337</div>
              <div className="text-sm text-gray-400">Tea Spills</div>
            </CardContent>
          </Card>
          
          <Card className="bg-ctea-dark/40 border-ctea-purple/20 text-center">
            <CardContent className="p-6">
              <TrendingUp className="w-8 h-8 text-ctea-purple mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">69</div>
              <div className="text-sm text-gray-400">Hot Topics</div>
            </CardContent>
          </Card>
          
          <Card className="bg-ctea-dark/40 border-yellow-400/20 text-center">
            <CardContent className="p-6">
              <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">+25%</div>
              <div className="text-sm text-gray-400">Daily Chaos</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center justify-center gap-3">
            Where Crypto Twitter Comes to Spill 
            <BrandedTeacupIcon size="lg" variant="steaming" animated />
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-ctea-teal to-green-400 rounded-full flex items-center justify-center">
                <BrandedTeacupIcon size="lg" variant="spilling" />
              </div>
              <h3 className="text-xl font-bold text-white">Anonymous Intel</h3>
              <p className="text-gray-400">
                Share your hottest takes without revealing identity. Perfect for industry insiders.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">AI-Powered Chaos</h3>
              <p className="text-gray-400">
                Smart commentary, credibility scoring, and meme generation. Let the AI amplify your drama.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Earn & Govern</h3>
              <p className="text-gray-400">
                Stack $TEA tokens for quality content. Vote on platform direction. Become a meme legend.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hashtag Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center space-y-4"
        >
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="border-ctea-teal/50 text-ctea-teal">
              #CTeaApp
            </Badge>
            <Badge variant="outline" className="border-pink-400/50 text-pink-400">
              #TEAToken
            </Badge>
            <Badge variant="outline" className="border-ctea-purple/50 text-ctea-purple">
              #OnChainGossip
            </Badge>
            <Badge variant="outline" className="border-yellow-400/50 text-yellow-400">
              #SOAPDrop
            </Badge>
          </div>
          
          <p className="text-sm text-gray-500 max-w-2xl mx-auto flex items-center justify-center gap-2">
            Built for degeneracy, powered by chaos, fueled by your hottest takes.
            <BrandedTeacupIcon size="xs" />
            <br />
            Join the revolution. Spill the tea. Stack the clout.
          </p>
        </motion.div>
      </div>

      {/* Bribe Modal */}
      <Dialog open={showBribeModal} onOpenChange={setShowBribeModal}>
        <DialogContent className="bg-transparent border-none p-0 max-w-none">
          <BribeButton
            onBribeAccepted={handleAccessGranted}
            onClose={() => setShowBribeModal(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Spill Modal */}
      <Dialog open={showSpillModal} onOpenChange={setShowSpillModal}>
        <DialogContent className="bg-transparent border-none p-0 max-w-none">
          <EnhancedSpillSubmission
            onSpillAccepted={handleAccessGranted}
            onClose={() => setShowSpillModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedLandingPage;
