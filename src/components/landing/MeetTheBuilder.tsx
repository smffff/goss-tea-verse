
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Coffee, Sparkles } from 'lucide-react';

const MeetTheBuilder = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-ctea-darker to-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-[#FF4C7B] to-ctea-purple text-white px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Meet the Builder
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              The Vision Behind CTea Newsroom
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built by Stephanie (Lady Invisible), who envisioned a world where 
              emotional intelligence meets memecoin culture in the wild west of Crypto Twitter.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Story Content */}
            <div className="space-y-6">
              <Card className="bg-ctea-dark/30 border border-[#FF4C7B]/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Coffee className="w-6 h-6 text-[#FF4C7B]" />
                  <h3 className="text-xl font-bold text-white">The Mission</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  "Emotional intelligence meets memecoin culture." Stephanie saw the chaos 
                  of Crypto Twitter and realized it needed more than just another social platform—
                  it needed emotional processing, AI insights, and a way to reward quality discourse.
                </p>
              </Card>

              <Card className="bg-ctea-dark/30 border border-ctea-purple/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-ctea-purple" />
                  <h3 className="text-xl font-bold text-white">The Innovation</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  CTea Newsroom isn't just about gossip—it's about processing the emotional 
                  temperature of crypto discourse. AI reactions, credibility scoring, and 
                  anonymous reputation building create a new paradigm for Web3 social interaction.
                </p>
              </Card>

              <Card className="bg-ctea-dark/30 border border-ctea-teal/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ExternalLink className="w-6 h-6 text-ctea-teal" />
                  <h3 className="text-xl font-bold text-white">The Future</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  This is just the beginning. Token integration, Web3 rewards, and expanded 
                  AI capabilities are coming. CTea Newsroom is building the infrastructure 
                  for how crypto communities will process information in the future.
                </p>
              </Card>
            </div>

            {/* Developer Info */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-[#FF4C7B]/10 to-ctea-purple/10 border border-[#FF4C7B]/30 p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF4C7B] to-ctea-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-2xl">S</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Stephanie</h3>
                <p className="text-[#FF4C7B] font-medium mb-4">Lady Invisible • Founder & Visionary</p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Crypto native, emotional intelligence advocate, and chaos interpreter. 
                  Building the future where memes meet meaningful discourse and 
                  gossip gets the AI treatment it deserves.
                </p>
                
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://arena.social/?ref=LadyInvsible', '_blank')}
                    className="border-[#FF4C7B] text-[#FF4C7B] hover:bg-[#FF4C7B] hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Connect on Arena
                  </Button>
                </div>
              </Card>

              <Card className="bg-ctea-dark/30 border border-ctea-yellow/20 p-6">
                <h4 className="text-lg font-bold text-white mb-4">The CTea Philosophy</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FF4C7B] rounded-full"></div>
                    Emotional intelligence in crypto discourse
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-ctea-purple rounded-full"></div>
                    AI-powered reaction and credibility systems
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-ctea-teal rounded-full"></div>
                    Anonymous reputation building through quality
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-ctea-yellow rounded-full"></div>
                    Where memes meet meaningful community interaction
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
