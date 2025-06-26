
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
              🫖 Tea's Getting Cold!
            </h1>
            <p className="text-gray-400 mb-4">
              The CTea Newsroom is taking a quick break. Don't worry, the gossip will be back shortly!
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
              Refresh the Tea
            </Button>
            
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="w-full border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Teahouse
            </Button>
          </div>

          {/* Fun Message */}
          <div className="text-sm text-gray-500 space-y-2">
            <p>💡 Try refreshing the page or check your connection</p>
            <p>🚀 Still not working? The tea might be extra hot today!</p>
          </div>

          {/* Debug Info */}
          <details className="text-left">
            <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-400">
              Debug Info
            </summary>
            <div className="text-xs text-gray-600 mt-2 p-2 bg-gray-900/50 rounded">
              <p>Timestamp: {new Date().toISOString()}</p>
              <p>User Agent: {navigator.userAgent.substring(0, 50)}...</p>
              <p>URL: {window.location.href}</p>
            </div>
          </details>
        </div>
      </Card>
    </div>
  );
};

export default FallbackPage;
