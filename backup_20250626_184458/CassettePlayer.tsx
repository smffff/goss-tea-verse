import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface CassettePlayerProps {
  tracks: Array<{
    title: string;
    artist: string;
    duration: string;
    gossip: string;
  }>;
  className?: string;
}

const CassettePlayer: React.FC<CassettePlayerProps> = ({ tracks, className = '' }) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRewinding, setIsRewinding] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && !isRewinding) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, isRewinding]);

  const handlePlayPause = () => {
    if (isRewinding) return;
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    setIsRewinding(true);
    setCurrentTime(0);
    setTimeout(() => setIsRewinding(false), 1000);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTrackData = tracks[currentTrack];

  return (
    <div className={`bg-gradient-to-br from-gray-800 to-black rounded-xl p-6 border-2 border-gray-600 ${className}`}>
      {/* Cassette Design */}
      <div className="relative mb-6">
        <div className="bg-gray-700 rounded-lg p-4 border border-gray-500">
          {/* Cassette Window */}
          <div className="bg-black rounded-md p-3 mb-3 border border-gray-600">
            <div className="flex items-center justify-between text-green-400 text-xs">
              <span>CTEA MIXTAPE</span>
              <span className="animate-pulse">● REC</span>
            </div>
            <div className="text-green-300 text-sm font-mono mt-1">
              {currentTrackData.title}
            </div>
          </div>

          {/* Cassette Reels */}
          <div className="flex justify-between items-center">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center"
            >
              <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
            </motion.div>
            
            <motion.div
              animate={{ rotate: isPlaying ? -360 : 0 }}
              transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center"
            >
              <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
            </motion.div>
          </div>
        </div>

        {/* Rewind Animation */}
        <AnimatePresence>
          {isRewinding && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <RotateCcw className="w-8 h-8 text-yellow-400 animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Track Info */}
      <div className="text-center mb-4">
        <div className="text-green-400 text-sm font-mono mb-1">
          TRACK {currentTrack + 1} OF {tracks.length}
        </div>
        <div className="text-white font-bold text-lg mb-1">
          {currentTrackData.title}
        </div>
        <div className="text-gray-400 text-sm">
          {currentTrackData.artist}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="bg-gray-700 rounded-full h-2 mb-2">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${currentTime}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{formatTime(Math.floor(currentTime * 0.6))}</span>
          <span>{currentTrackData.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          disabled={isRewinding}
        >
          <SkipBack className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={handleRewind}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          disabled={isRewinding}
        >
          <RotateCcw className="w-5 h-5 text-yellow-400" />
        </button>

        <button
          onClick={handlePlayPause}
          className="p-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
          disabled={isRewinding}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </button>

        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          disabled={isRewinding}
        >
          <SkipForward className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Current Gossip Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTrack}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-600"
        >
          <div className="text-green-400 text-xs mb-1">GOSSIP:</div>
          <div className="text-gray-300 text-sm font-mono">
            {currentTrackData.gossip}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CassettePlayer; 