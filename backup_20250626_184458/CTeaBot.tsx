
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Coffee, Zap, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  mode?: 'spicy' | 'meme' | 'neutral';
}

const CTeaBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "☕ Hey there, beta sipper! I'm CTeaBot, your AI chaos companion. I can help you navigate the tea, rate spills, and generate spicy takes. What's brewing?",
      isBot: true,
      timestamp: new Date(),
      mode: 'neutral'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [botMode, setBotMode] = useState<'spicy' | 'meme' | 'neutral'>('neutral');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userInput: string, mode: 'spicy' | 'meme' | 'neutral'): string => {
    const spicyResponses = [
      "🌶️ That's some HOT tea! Credibility score: 85%. This could shake up the whole ecosystem if true.",
      "🔥 SPICY TAKE DETECTED! I'm seeing correlation with recent whale movements. This one's got legs.",
      "💀 Oh honey, that's not just tea - that's a whole damn tsunami! Rating: NUCLEAR ☢️",
      "🌶️ My AI sensors are tingling... this has main character energy. Buckle up, degenerates!"
    ];

    const memeResponses = [
      "💎🙌 Sir, this is a Wendy's... but also this tea is BUSSIN no cap fr fr 📈",
      "🤖 *processes gossip* ... *generates meme* ... WAGMI but also NGMI energy detected 🎭",
      "🐸☕ Kermit voice: But that's none of my business... JK IT TOTALLY IS! *sips tea aggressively*",
      "💀 Not me analyzing blockchain data at 3AM to verify this gossip... but here we are 🤡",
      "🦍 Ape brain says buy the rumor, sell the news. Galaxy brain says: screenshot everything 📸"
    ];

    const neutralResponses = [
      "🤖 Interesting perspective! I'm cross-referencing this with on-chain data and recent social sentiment.",
      "☕ That's worth investigating. Have you seen any supporting evidence or sources?",
      "📊 Based on my analysis, this falls into the 'plausible but needs verification' category.",
      "🔍 I'm tracking similar discussions across 47 channels. This narrative is gaining traction."
    ];

    const responses = mode === 'spicy' ? spicyResponses : 
                     mode === 'meme' ? memeResponses : neutralResponses;
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(input, botMode),
        isBot: true,
        timestamp: new Date(),
        mode: botMode
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Card className="bg-ctea-dark/80 border-green-400/30 h-[600px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold">CTeaBot</div>
              <div className="text-xs text-gray-400">AI Gossip Analyst</div>
            </div>
          </div>
          <Badge className={`${
            botMode === 'spicy' ? 'bg-red-500/20 text-red-400' :
            botMode === 'meme' ? 'bg-purple-500/20 text-purple-400' :
            'bg-blue-500/20 text-blue-400'
          }`}>
            {botMode.toUpperCase()} MODE
          </Badge>
        </CardTitle>

        {/* Mode Selector */}
        <div className="flex gap-2">
          <Button
            variant={botMode === 'neutral' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBotMode('neutral')}
            className="text-xs"
          >
            <Coffee className="w-3 h-3 mr-1" />
            Neutral
          </Button>
          <Button
            variant={botMode === 'spicy' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBotMode('spicy')}
            className="text-xs"
          >
            🌶️ Spicy
          </Button>
          <Button
            variant={botMode === 'meme' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBotMode('meme')}
            className="text-xs"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Meme
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.isBot
                    ? `bg-gradient-to-r ${
                        message.mode === 'spicy' ? 'from-red-500/20 to-orange-500/20 border border-red-500/30' :
                        message.mode === 'meme' ? 'from-purple-500/20 to-pink-500/20 border border-purple-500/30' :
                        'from-green-500/20 to-teal-500/20 border border-green-500/30'
                      }`
                    : 'bg-white/10 border border-white/20'
                }`}>
                  <p className="text-white text-sm leading-relaxed">{message.text}</p>
                  <div className="text-xs text-gray-400 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-green-500/20 border border-green-500/30 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span className="text-green-400 text-xs">CTeaBot is analyzing...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about the tea..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CTeaBot;
