
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, TrendingUp, Users, Shield, Zap, Twitter, ExternalLink } from 'lucide-react';
import { SOCIAL_CONFIG } from '@/config/social';
import FooterSocialLinks from '@/components/footer/FooterSocialLinks';

const EnhancedLandingPage: React.FC = () => {
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-ctea-dark/95 backdrop-blur-lg border-b border-ctea-teal/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🫖</div>
              <h1 className="text-xl font-bold text-white font-cyber">CTea Newsroom</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                onClick={() => openLink(SOCIAL_CONFIG.twitter.url)}
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                <Twitter className="w-4 h-4 mr-2" />
                {SOCIAL_CONFIG.twitter.handle}
              </Button>
              
              <Link to="/feed">
                <Button className="bg-ctea-teal hover:bg-ctea-teal/80 text-black font-bold">
                  Enter App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <div className="text-8xl mb-6 animate-dramatic-float">🫖</div>
            <h1 className="hero-title text-6xl font-bold text-white font-cyber animate-chaos-glow">
              CTea Newsroom
            </h1>
            <p className="hero-subtitle text-2xl text-gray-300 font-gothic">
              We Don't Report the News. We Stir It.
            </p>
          </div>
          
          <div className="space-y-6">
            <Badge className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/30 px-6 py-3 text-lg font-medium animate-viral-pulse">
              🚀 Now Live - Anonymous Crypto Gossip Platform
            </Badge>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Where Web3 meets TMZ. On-chain gossip meets meme warfare. 
              CTea News is where rumors get receipts and the tea is always hot. ☕
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/feed">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white font-bold px-8 py-4 text-lg"
                >
                  <Coffee className="w-5 h-5 mr-2" />
                  Start Spilling Tea
                </Button>
              </Link>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => openLink(SOCIAL_CONFIG.arena.url)}
                className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10 px-8 py-4 text-lg"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Join Arena Social
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card className="bg-ctea-dark/50 border-ctea-teal/20 hover:border-ctea-teal/40 transition-all duration-300 glass-morphism">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 text-ctea-teal mx-auto mb-4" />
                <h3 className="text-white font-semibold text-xl mb-3 font-cyber">Anonymous & Secure</h3>
                <p className="text-gray-400">Share crypto gossip safely with military-grade anonymity</p>
              </CardContent>
            </Card>

            <Card className="bg-ctea-dark/50 border-ctea-purple/20 hover:border-ctea-purple/40 transition-all duration-300 glass-morphism">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-ctea-purple mx-auto mb-4" />
                <h3 className="text-white font-semibold text-xl mb-3 font-cyber">Community Driven</h3>
                <p className="text-gray-400">Vote, verify, and validate crypto news together</p>
              </CardContent>
            </Card>

            <Card className="bg-ctea-dark/50 border-ctea-orange/20 hover:border-ctea-orange/40 transition-all duration-300 glass-morphism">
              <CardContent className="p-8 text-center">
                <Zap className="w-12 h-12 text-ctea-orange mx-auto mb-4" />
                <h3 className="text-white font-semibold text-xl mb-3 font-cyber">Real-time Updates</h3>
                <p className="text-gray-400">Breaking crypto drama as it happens</p>
              </CardContent>
            </Card>
          </div>

          {/* Token Information */}
          <div className="mt-16 p-8 bg-gradient-to-r from-ctea-teal/10 to-ctea-purple/10 rounded-2xl border border-ctea-teal/30">
            <h3 className="text-2xl font-bold text-white mb-4 font-cyber">
              Powered by {SOCIAL_CONFIG.token.symbol} Token
            </h3>
            <p className="text-gray-300 mb-6">
              Built on {SOCIAL_CONFIG.token.network} for fast, cheap transactions. 
              Earn {SOCIAL_CONFIG.token.symbol} tokens for quality tea submissions and community participation.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white font-bold"
              onClick={() => openLink('https://traderjoexyz.com')}
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Trade {SOCIAL_CONFIG.token.symbol} on Avalanche
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">🫖</div>
                  <span className="text-xl font-bold text-white font-cyber">CTea Newsroom</span>
                </div>
                <p className="text-gray-400 mb-6">
                  The ultimate platform for anonymous crypto news sharing. 
                  Brewing truth, one story at a time.
                </p>
                <FooterSocialLinks />
              </div>
              
              <div className="space-y-6">
                <h4 className="text-white font-bold text-lg font-cyber">Quick Links</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/feed" className="text-gray-400 hover:text-ctea-teal transition-colors">
                    Tea Feed
                  </Link>
                  <Link to="/newsroom" className="text-gray-400 hover:text-ctea-teal transition-colors">
                    Newsroom
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                © 2024 CTea Newsroom. Emotional intelligence meets memecoin culture ☕
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLandingPage;
