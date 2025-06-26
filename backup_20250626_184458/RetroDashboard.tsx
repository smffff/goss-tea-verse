
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Terminal, Activity, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RetroTerminal from '@/components/ui/RetroTerminal';
import ParallaxElement from '@/components/ui/ParallaxElement';

const RetroDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const terminalMessages = [
    "Initializing CTEA News Matrix...",
    "Loading gossip protocols...",
    "Connecting to blockchain networks...",
    "Scanning for hot tea...",
    "System ready. Welcome to the underground.",
    "Remember: The tea is always brewing..."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-teal-900/20 text-green-400">
      {/* Retro Grid Background */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none"></div>
      
      {/* Header */}
      <ParallaxElement speed={0.1} direction="up">
        <header className="relative z-10 p-6 border-b border-green-400/30">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-green-400 hover:text-green-300 hover:bg-green-400/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Main
            </Button>
            <div className="flex items-center space-x-2">
              <Terminal className="w-6 h-6" />
              <h1 className="text-2xl font-mono font-bold">CTEA_RETRO_DASH</h1>
            </div>
            <div className="text-sm">
              {new Date().toLocaleString()}
            </div>
          </div>
        </header>
      </ParallaxElement>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Stats Cards */}
          <ParallaxElement speed={0.2} direction="up" delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Active Feeds", value: "1,337", icon: Activity, color: "from-green-400 to-teal-400" },
                { title: "Tea Spilled", value: "42.0K", icon: Zap, color: "from-yellow-400 to-orange-400" },
                { title: "Matrix Nodes", value: "256", icon: Terminal, color: "from-purple-400 to-pink-400" }
              ].map((stat, index) => (
                <Card key={index} className="bg-black/60 border-green-400/30 hover:border-green-400/60 transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-green-400 text-sm">
                      <stat.icon className="w-4 h-4 mr-2" />
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-mono font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ParallaxElement>

          {/* Terminal */}
          <ParallaxElement speed={0.3} direction="up" delay={0.4}>
            <div className="space-y-4">
              <h2 className="text-xl font-mono font-bold text-green-400 flex items-center">
                <Terminal className="w-5 h-5 mr-2" />
                LIVE_FEED_TERMINAL
              </h2>
              <RetroTerminal
                messages={terminalMessages}
                className="max-w-4xl"
              />
            </div>
          </ParallaxElement>

          {/* Quick Actions */}
          <ParallaxElement speed={0.4} direction="up" delay={0.6}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "SPILL_TEA", action: () => navigate('/feed') },
                { label: "READ_FEED", action: () => navigate('/feed') },
                { label: "CHECK_STATS", action: () => {} },
                { label: "EXIT_MATRIX", action: () => navigate('/') }
              ].map((button, index) => (
                <Button
                  key={index}
                  onClick={button.action}
                  className="bg-green-400/10 border border-green-400/30 text-green-400 hover:bg-green-400/20 hover:border-green-400/60 font-mono transition-all"
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </ParallaxElement>

        </div>
      </main>
    </div>
  );
};

export default RetroDashboard;
