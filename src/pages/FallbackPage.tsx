
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface FallbackPageProps {
  error?: string;
  onRetry?: () => void;
}

const FallbackPage: React.FC<FallbackPageProps> = ({ 
  error = "Something went wrong. The tea got a bit too hot to handle!",
  onRetry
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const funnyMessages = [
    "REMEMBER, NFA... but this error is definitely not financial advice either!",
    "The tea servers are having a moment - they're not developers either!",
    "Error 500: Tea spilled on the keyboard again",
    "The blockchain is fine, but our code needs some debugging love"
  ];

  const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <Card className="bg-white/95 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <div className="bg-yellow-200 border-4 border-black p-4 rounded-lg transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-black font-bold text-lg">
                {randomMessage}
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-red-500 border-4 border-black p-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <AlertTriangle className="w-12 h-12 text-white mx-auto" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-black p-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-anton text-black">
                $TEA SYSTEM ERROR
              </h2>
            </div>

            <div className="bg-cyan-400 border-4 border-black p-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-black font-bold text-xl">
                CTEANEWS.COM
              </p>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-6 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/lovable-uploads/58c00175-9395-4c1a-b741-60b32e37b93e.png" 
                alt="CTea News Logo" 
                className="w-6 h-6 mr-2 object-contain"
              />
              <span className="text-black font-bold">Arena</span>
            </div>
            <p className="text-2xl font-anton text-black mb-4">
              I'm NOT A DEVELOPER.
            </p>
            <p className="text-gray-700 text-sm">
              {error}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleRetry}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-anton text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry (DYOR)
            </Button>
            
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="bg-cyan-400 hover:bg-cyan-500 text-black font-anton border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Back to Tea House
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FallbackPage;
