import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Volume2, VolumeX } from 'lucide-react';

interface NewsItem {
  id: string;
  headline: string;
  category: 'BREAKING' | 'UPDATE' | 'RUMOR' | 'ALPHA';
  timestamp: string;
}

interface RetroNewsTickerProps {
  news: NewsItem[];
  className?: string;
  autoPlay?: boolean;
}

const RetroNewsTicker: React.FC<RetroNewsTickerProps> = ({
  news,
  className = '',
  autoPlay = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!isPlaying || news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, news.length]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'BREAKING':
        return 'text-red-400 bg-red-900/30 border-red-400';
      case 'UPDATE':
        return 'text-blue-400 bg-blue-900/30 border-blue-400';
      case 'RUMOR':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-400';
      case 'ALPHA':
        return 'text-green-400 bg-green-900/30 border-green-400';
      default:
        return 'text-gray-400 bg-gray-900/30 border-gray-400';
    }
  };

  const currentNews = news[currentIndex];

  return (
    <div className={`bg-black border-2 border-green-400 rounded-lg overflow-hidden ${className}`}>
      {/* News Channel Header */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 p-3 border-b border-green-400">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Radio className="w-5 h-5 text-green-400 animate-pulse" />
            <div className="text-green-400 font-bold text-lg tracking-wider">
              CTEA NEWS NETWORK
            </div>
            <div className="text-green-300 text-sm font-mono">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Scrolling News Ticker */}
      <div className="bg-black p-4 relative overflow-hidden">
        <motion.div
          className="flex items-center space-x-4"
          animate={{ x: [0, -100] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {news.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-3 whitespace-nowrap">
              <div className={`px-2 py-1 text-xs font-bold border rounded ${getCategoryColor(item.category)}`}>
                {item.category}
              </div>
              <span className="text-green-300 font-mono text-sm">
                {item.headline}
              </span>
              <span className="text-green-500 text-xs">
                {item.timestamp}
              </span>
              <span className="text-green-400 text-lg">●</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Current News Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNews?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-4 bg-gray-900 border-t border-green-400/30"
        >
          {currentNews && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className={`px-3 py-1 text-sm font-bold border rounded ${getCategoryColor(currentNews.category)}`}>
                  {currentNews.category}
                </div>
                <div className="text-green-400 text-xs font-mono">
                  {currentNews.timestamp}
                </div>
              </div>
              
              <div className="text-white font-bold text-lg leading-tight">
                {currentNews.headline}
              </div>
              
              <div className="flex items-center justify-between text-xs text-green-400">
                <span>LIVE FROM CTEA NEWSROOM</span>
                <span className="animate-pulse">● LIVE</span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Control Bar */}
      <div className="bg-gray-800 p-2 border-t border-green-400/30">
        <div className="flex items-center justify-between text-xs text-green-400">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="hover:text-green-300 transition-colors"
            >
              {isPlaying ? '⏸️ PAUSE' : '▶️ PLAY'}
            </button>
            <span>NEWS {currentIndex + 1} OF {news.length}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="animate-pulse">📡 SIGNAL STRONG</span>
            <span>CTEA://NEWS.FEED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample news data
export const sampleNews: NewsItem[] = [
  {
    id: '1',
    headline: 'BREAKING: Major DeFi protocol rumored to be launching revolutionary yield farming mechanism',
    category: 'BREAKING',
    timestamp: '2:34 PM'
  },
  {
    id: '2',
    headline: 'UPDATE: NFT marketplace floor prices showing unusual activity patterns',
    category: 'UPDATE',
    timestamp: '2:31 PM'
  },
  {
    id: '3',
    headline: 'RUMOR: Anonymous whale accumulating massive amounts of governance tokens',
    category: 'RUMOR',
    timestamp: '2:28 PM'
  },
  {
    id: '4',
    headline: 'ALPHA: Cross-chain bridge technology breakthrough leaked by insider',
    category: 'ALPHA',
    timestamp: '2:25 PM'
  },
  {
    id: '5',
    headline: 'BREAKING: Exchange listing rumors causing price volatility in memecoin sector',
    category: 'BREAKING',
    timestamp: '2:22 PM'
  }
];

export default RetroNewsTicker; 