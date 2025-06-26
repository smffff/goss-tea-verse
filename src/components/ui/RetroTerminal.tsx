
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RetroTerminalProps {
  messages: string[];
  className?: string;
  autoScroll?: boolean;
  typingSpeed?: number;
}

const RetroTerminal: React.FC<RetroTerminalProps> = ({
  messages,
  className = '',
  autoScroll = true,
  typingSpeed = 50
}) => {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (messages.length === 0) return;

    const typeMessage = async (message: string) => {
      setIsTyping(true);
      setCurrentMessage('');
      
      for (let i = 0; i < message.length; i++) {
        setCurrentMessage(prev => prev + message[i]);
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
      }
      
      setIsTyping(false);
      setDisplayedMessages(prev => [...prev, message]);
      setCurrentIndex(prev => prev + 1);
    };

    if (currentIndex < messages.length) {
      typeMessage(messages[currentIndex]);
    }
  }, [currentIndex, messages, typingSpeed]);

  const getRandomColor = () => {
    const colors = ['#00ff00', '#00ffff', '#ff00ff', '#ffff00', '#ff0080'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className={`bg-black border-2 border-green-400 rounded-lg p-4 font-mono text-sm ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 text-green-400 border-b border-green-400/30 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div className="text-xs">CTEA_NEWS_TERMINAL v1.0</div>
        <div className="text-xs">{new Date().toLocaleTimeString()}</div>
      </div>

      {/* Terminal Content */}
      <div className="h-64 overflow-y-auto space-y-1">
        <AnimatePresence>
          {displayedMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start space-x-2"
            >
              <span className="text-green-400 text-xs">{'>'}</span>
              <span 
                className="text-green-300"
                style={{ color: getRandomColor() }}
              >
                {message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current typing message */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start space-x-2"
          >
            <span className="text-green-400 text-xs animate-pulse">{'>'}</span>
            <span className="text-green-300">
              {currentMessage}
              <span className="animate-pulse">█</span>
            </span>
          </motion.div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="mt-4 pt-2 border-t border-green-400/30 text-green-400 text-xs">
        <div className="flex justify-between">
          <span>READY</span>
          <span>CTEA://GOSSIP.FEED</span>
          <span>{displayedMessages.length} MESSAGES LOADED</span>
        </div>
      </div>
    </div>
  );
};

export default RetroTerminal;
