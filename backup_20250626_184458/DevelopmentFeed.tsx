
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coffee, Bot, Zap, Eye, EyeOff, Sparkles } from 'lucide-react';
import SOAPGatedContent from '@/components/soap/SOAPGatedContent';
import CTeaBot from '@/components/ai/CTeaBot';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';

const DevelopmentFeed: React.FC = () => {
  const [soapBalance, setSOAPBalance] = useState(25);
  const { isFeatureEnabled } = useFeatureFlags();
  
  const mockSpills = [
    {
      id: 1,
      content: "🔥 BREAKING: Major DeFi protocol about to announce partnership with...",
      isSOAPGated: true,
      soapCost: 5,
      credibility: 89,
      reactions: 420,
      timeAgo: "2m ago",
      fullContent: "🔥 BREAKING: Major DeFi protocol about to announce partnership with McDonald's! Source: insider at Uniswap. They're testing crypto payments for Happy Meals. $UNI to the moon! 🍟📈"
    },
    {
      id: 2,
      content: "👀 Anonymous whale just dumped 69M $PEPE... whale tracker shows suspicious activity",
      isSOAPGated: false,
      credibility: 75,
      reactions: 1337,
      timeAgo: "5m ago"
    },
    {
      id: 3,
      content: "💣 Insider tea: That 'diamond hands' influencer has been...",
      isSOAPGated: true,
      soapCost: 10,
      credibility: 92,
      reactions: 2069,
      timeAgo: "12m ago",
      fullContent: "💣 Insider tea: That 'diamond hands' influencer has been secretly paper handing since day 1. Screenshots of private Discord leaked. Guy's been dumping $ETH while telling followers to HODL 📄✋"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* SOAP Balance & CTeaBot */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-ctea-dark/80 border-ctea-teal/30">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">{soapBalance} SOAP</div>
            <div className="text-sm text-gray-400">Unlock hidden content</div>
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/80 border-pink-400/30">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">Live Feed</div>
            <div className="text-sm text-gray-400">Real-time tea spills</div>
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/80 border-green-400/30">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">CTeaBot</div>
            <div className="text-sm text-gray-400">AI-powered insights</div>
          </CardContent>
        </Card>
      </div>

      {/* Live Feed */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Coffee className="w-6 h-6 text-ctea-teal" />
            Live Tea Feed
            <Badge className="bg-green-500/20 text-green-400">
              🔴 LIVE
            </Badge>
          </h2>

          {mockSpills.map((spill, index) => (
            <motion.div
              key={spill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-ctea-dark/80 border border-white/20 hover:border-white/40 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                      <span className="text-white/80 text-sm">Anonymous Sipper</span>
                      <Badge className={`text-xs ${
                        spill.credibility > 85 ? 'bg-green-500/20 text-green-400' :
                        spill.credibility > 70 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {spill.credibility}% Credible
                      </Badge>
                    </div>
                    <span className="text-white/60 text-xs">{spill.timeAgo}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  {spill.isSOAPGated && isFeatureEnabled('enableSOAPGating') ? (
                    <SOAPGatedContent
                      content={spill.content}
                      fullContent={spill.fullContent || spill.content}
                      soapCost={spill.soapCost || 5}
                      userSOAPBalance={soapBalance}
                      onReveal={(cost) => setSOAPBalance(prev => prev - cost)}
                    />
                  ) : (
                    <p className="text-white mb-4">{spill.content}</p>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-red-400">
                        ❤️ {spill.reactions}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-blue-400">
                        💬 Reply
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-green-400">
                        🔄 Share
                      </Button>
                    </div>
                    <Zap className="w-4 h-4 text-ctea-teal" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTeaBot Sidebar */}
        <div className="space-y-6">
          {isFeatureEnabled('enableCTeaBot') && (
            <CTeaBot />
          )}
          
          <Card className="bg-ctea-dark/80 border-ctea-purple/30">
            <CardHeader>
              <CardTitle className="text-white text-lg">🔥 Trending Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80">#DegenWinter</span>
                <Badge className="bg-red-500/20 text-red-400">Hot</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">#SOAPDrop</span>
                <Badge className="bg-orange-500/20 text-orange-400">Rising</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">#CTeaApp</span>
                <Badge className="bg-green-500/20 text-green-400">Viral</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentFeed;
