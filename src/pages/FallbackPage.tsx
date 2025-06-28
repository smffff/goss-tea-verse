
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface FallbackPageProps {
  error?: string;
  onRetry?: () => void;
}

const FallbackPage: React.FC<FallbackPageProps> = ({ 
  error = "Something went wrong. Please try refreshing the page.",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center p-4">
      <Card className="bg-ctea-dark/80 border-red-500/30 max-w-md w-full">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <AlertTriangle className="w-16 h-16 text-red-400" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">🫖 Oops!</h1>
            <p className="text-gray-300">{error}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleRetry}
              className="bg-ctea-teal hover:bg-ctea-teal/80 text-black font-bold"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Go to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FallbackPage;
