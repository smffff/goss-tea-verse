
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Twitter, Github, Coffee, Sparkles } from 'lucide-react';

const MeetTheBuilder = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-ctea-darker to-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-ctea-pink to-ctea-purple text-white px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Meet the Builder
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              The Story Behind CTea Newsroom
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built by ladyinvsible, a crypto enthusiast who saw the need for anonymous, 
              community-driven gossip in the Web3 space.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Story Content */}
            <div className="space-y-6">
              <Card className="bg-ctea-dark/30 border border-ctea-teal/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Coffee className="w-6 h-6 text-ctea-teal" />
                  <h3 className="text-xl font-bold text-white">The Vision</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  After years in crypto Twitter, ladyinvsible noticed something missing: 
                  a place where people could share alpha, gossip, and hot takes without 
                  fear of doxxing or retaliation. The community needed a gossip column, 
                  not another whitepaper.
                </p>
              </Card>

              <Card className="bg-ctea-dark/30 border border-ctea-purple/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-ctea-purple" />
                  <h3 className="text-xl font-bold text-white">The Journey</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  What started as a simple idea evolved into a full-featured platform. 
                  Built with modern web technologies, CTea Newsroom combines the best 
                  of social media with the privacy and decentralization that Web3 promises.
                </p>
              </Card>

              <Card className="bg-ctea-dark/30 border border-ctea-pink/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ExternalLink className="w-6 h-6 text-ctea-pink" />
                  <h3 className="text-xl font-bold text-white">The Community</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  CTea Newsroom isn't just about the tech—it's about building a community 
                  where every voice matters. From anonymous tea spillers to crypto whales, 
                  everyone has a place in the conversation.
                </p>
              </Card>
            </div>

            {/* Developer Info */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-ctea-teal/10 to-ctea-purple/10 border border-ctea-teal/30 p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-ctea-teal to-ctea-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-2xl">L</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">ladyinvsible</h3>
                <p className="text-ctea-teal font-medium mb-4">Founder & Developer</p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Crypto enthusiast, meme connoisseur, and chaos agent. 
                  Building the future of Web3 gossip, one spilled tea at a time.
                </p>
                
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://arena.social/?ref=LadyInvsible', '_blank')}
                    className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal hover:text-black"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Arena Social
                  </Button>
                </div>
              </Card>

              <Card className="bg-ctea-dark/30 border border-ctea-yellow/20 p-6">
                <h4 className="text-lg font-bold text-white mb-4">Why CTea Newsroom?</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-ctea-teal rounded-full"></div>
                    Anonymous by design, secure by default
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-ctea-purple rounded-full"></div>
                    Community-driven content curation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-ctea-pink rounded-full"></div>
                    Rewards for quality contributions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-ctea-yellow rounded-full"></div>
                    Built for the crypto community
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheBuilder;
