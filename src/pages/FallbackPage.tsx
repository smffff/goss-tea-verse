
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Home, AlertTriangle, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FallbackPageProps {
  onRetry?: () => void;
  error?: string;
}

const FallbackPage: React.FC<FallbackPageProps> = ({ onRetry, error }) => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    navigate('/');
    window.location.reload();
  };

  const funnyPageMessages = [
    "Give me a min I'm not a dev I'm just a lady ok 💅",
    "The website is having main character energy and decided to take a break",
    "Currently debugging with the power of friendship and caffeine",
    "This page ghosted us harder than my last situationship",
    "Error 503: Service temporarily unavailable (just like my motivation)",
    "The servers are in their feelings right now, please stand by",
    "Loading failed successfully - task failed successfully vibes",
    "The code is on a mental health break, we respect that",
    "Oopsie daisy! Something went sideways faster than my life plans",
    "Technical difficulties aka me vs. technology and technology is winning"
  ];

  const randomMessage = funnyPageMessages[Math.floor(Math.random() * funnyPageMessages.length)];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      <Card className="max-w-md w-full p-8 bg-ctea-dark/90 border-ctea-teal/30 backdrop-blur-lg">
        <div className="text-center space-y-6">
          {/* Icon with Animation */}
          <div className="relative">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto animate-pulse" />
            <Coffee className="w-8 h-8 text-ctea-teal absolute -top-2 -right-2 animate-bounce" />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {randomMessage}
            </h1>
            <p className="text-gray-400 mb-4">
              Beta life is messy but we're serving looks anyway ✨
            </p>
            {error && (
              <p className="text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded p-2">
                {error}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleRefresh}
              className="w-full bg-ctea-teal hover:bg-ctea-teal/80 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again (With Love)
            </Button>
            
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="w-full border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Take Me Home Country Roads
            </Button>
          </div>

          {/* Fun Messages */}
          <div className="text-sm text-gray-500 space-y-2">
            <p>💡 This is beta software, expect some spicy chaos</p>
            <p>🚀 Thanks for testing! You're the real MVP</p>
            <p>☕ The developer is probably stress-eating cookies right now</p>
          </div>

          {/* Debug Info */}
          <details className="text-left">
            <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-400">
              Debug Info (For The Brave)
            </summary>
            <div className="text-xs text-gray-600 mt-2 p-2 bg-gray-900/50 rounded">
              <p>Timestamp: {new Date().toISOString()}</p>
              <p>User Agent: {navigator.userAgent.substring(0, 50)}...</p>
              <p>URL: {window.location.href}</p>
              <p className="mt-1 italic">*Definitely not the developer's fault* 👀</p>
            </div>
          </details>
        </div>
      </Card>
    </div>
  );
};

export default FallbackPage;
