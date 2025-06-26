
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, Play, Users, TrendingUp, Sparkles, Eye, Code } from 'lucide-react';
import { useDemo } from '@/contexts/DemoContext';
import AccessModal from './AccessModal';
import { mockData } from '@/data/mockData';

const EnhancedLandingPage: React.FC = () => {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [selectedPath, setSelectedPath] = useState<'spill' | 'bribe' | 'code' | null>(null);
  const [accessCode, setAccessCode] = useState('');
  const { enableDemo, enablePreview } = useDemo();

  const handleDemoClick = () => {
    enableDemo();
    // Redirect to app
    window.location.href = '/feed';
  };

  const handlePreviewClick = () => {
    enablePreview();
  };

  const handleAccessClick = (path: 'spill' | 'bribe' | 'code') => {
    setSelectedPath(path);
    setShowAccessModal(true);
  };

  const testCodes = ['TEA2024', 'CTEA-BETA', 'FREN-ZONE', 'SPILL-ZONE'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ctea-teal rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo & Title */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-ctea-teal to-pink-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-ctea-dark rounded-full flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-ctea-teal" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-ctea-teal via-pink-400 to-ctea-purple bg-clip-text text-transparent mb-4">
                CTea Newsroom
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 font-light mb-8">
                Where Crypto Twitter Comes to Spill ☕
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <Badge className="bg-ctea-teal/20 text-ctea-teal">AI-Powered</Badge>
                <Badge className="bg-pink-400/20 text-pink-400">Anonymous</Badge>
                <Badge className="bg-ctea-purple/20 text-ctea-purple">Community-Driven</Badge>
                <Badge className="bg-yellow-400/20 text-yellow-400">Beta Access</Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16">
              <Button
                onClick={handleDemoClick}
                size="lg"
                className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-ctea-teal/80 hover:to-pink-400/80 text-white font-bold py-4"
              >
                <Play className="w-5 h-5 mr-2" />
                Try Full Demo
              </Button>
              
              <Button
                onClick={handlePreviewClick}
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 font-bold py-4"
              >
                <Eye className="w-5 h-5 mr-2" />
                Quick Preview
              </Button>
            </div>

            {/* Access Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card 
                className="bg-ctea-dark/80 border-ctea-teal/30 backdrop-blur-lg cursor-pointer hover:border-ctea-teal/60 transition-all"
                onClick={() => handleAccessClick('spill')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-ctea-teal to-green-400 rounded-full flex items-center justify-center">
                    <Coffee className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">🫖 Spill Your Tea</CardTitle>
                  <p className="text-gray-400 text-sm">Share gossip, get access</p>
                </CardHeader>
              </Card>

              <Card 
                className="bg-ctea-dark/80 border-pink-400/30 backdrop-blur-lg cursor-pointer hover:border-pink-400/60 transition-all"
                onClick={() => handleAccessClick('bribe')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">💸 Bribe the Gatekeepers</CardTitle>
                  <p className="text-gray-400 text-sm">Send tip, unlock access</p>
                </CardHeader>
              </Card>

              <Card 
                className="bg-ctea-dark/80 border-yellow-400/30 backdrop-blur-lg cursor-pointer hover:border-yellow-400/60 transition-all"
                onClick={() => handleAccessClick('code')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">🔑 Enter Access Code</CardTitle>
                  <p className="text-gray-400 text-sm">Already have a code?</p>
                </CardHeader>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Test Codes Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Quick Access Codes</h2>
          <p className="text-gray-400 mb-8">
            Try these codes to experience CTea instantly
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {testCodes.map((code) => (
              <Card 
                key={code}
                className="bg-ctea-dark/40 border-ctea-teal/20 cursor-pointer hover:border-ctea-teal/40 transition-all"
                onClick={() => {
                  setAccessCode(code);
                  handleAccessClick('code');
                }}
              >
                <CardContent className="p-4 text-center">
                  <code className="text-ctea-teal font-mono text-sm">{code}</code>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Live Preview Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Live Preview: What's Inside
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sample Tea Spills */}
            <Card className="bg-ctea-dark/80 border-ctea-teal/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Coffee className="w-5 h-5 mr-2 text-ctea-teal" />
                  Hot Tea 🔥
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockData.hotSpills.slice(0, 2).map((spill) => (
                  <div key={spill.id} className="bg-ctea-darker rounded-lg p-3">
                    <p className="text-gray-300 text-sm mb-2">{spill.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>🔥 {spill.heat}% Hot</span>
                      <span>💬 {spill.comments} reactions</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="bg-ctea-dark/80 border-pink-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-pink-400" />
                  Live Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ctea-teal">342</div>
                    <div className="text-xs text-gray-400">Beta Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-400">1,247</div>
                    <div className="text-xs text-gray-400">Tea Spilled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ctea-purple">23</div>
                    <div className="text-xs text-gray-400">Hot Topics</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">+15.7%</div>
                    <div className="text-xs text-gray-400">Daily Growth</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Features Preview */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-ctea-dark/40 backdrop-blur border border-ctea-teal/20 rounded-lg p-6 text-center">
            <Users className="w-8 h-8 text-ctea-teal mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Anonymous & Safe</h3>
            <p className="text-gray-400 text-sm">Share your hottest takes without revealing identity</p>
          </div>
          
          <div className="bg-ctea-dark/40 backdrop-blur border border-pink-400/20 rounded-lg p-6 text-center">
            <TrendingUp className="w-8 h-8 text-pink-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-400 text-sm">Smart commentary and credibility scoring</p>
          </div>
          
          <div className="bg-ctea-dark/40 backdrop-blur border border-ctea-purple/20 rounded-lg p-6 text-center">
            <Sparkles className="w-8 h-8 text-ctea-purple mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-400 text-sm">Vote, react, and curate the best content</p>
          </div>
        </motion.div>
      </div>

      <AccessModal
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        selectedPath={selectedPath}
        accessCode={accessCode}
        onAccessCodeChange={setAccessCode}
        onSubmit={() => {
          // Handle submission logic
          setShowAccessModal(false);
        }}
      />
    </div>
  );
};

export default EnhancedLandingPage;
