import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home, Coffee, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeedbackModal from '@/components/FeedbackModal';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  componentName?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetErrorBoundary, 
  componentName = 'Unknown' 
}) => {
  const navigate = useNavigate();
  const [showFeedbackModal, setShowFeedbackModal] = React.useState(false);

  const errorId = React.useMemo(() => 
    `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, 
    []
  );

  const handleGoHome = () => {
    navigate('/');
    resetErrorBoundary();
  };

  const handleReload = () => {
    window.location.reload();
  };

  const errorDetails = `Error ID: ${errorId}\nComponent: ${componentName}\nError: ${error.message}\n\nStack Trace:\n${error.stack || 'No stack trace'}`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      <Card className="max-w-lg w-full p-8 bg-ctea-dark/90 border-red-500/30 backdrop-blur-lg">
        <div className="text-center space-y-6">
          {/* Error Icon with Animation */}
          <div className="relative">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto animate-pulse" />
            <Coffee className="w-8 h-8 text-ctea-teal absolute -top-2 -right-2 animate-bounce" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-400 mb-2">
              We encountered an unexpected error. Don't worry, your data is safe.
            </p>
            <p className="text-sm text-gray-500">
              Error ID: {errorId}
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-left">
            <p className="text-sm text-red-300 font-mono break-words">
              {error.message || 'Unknown error occurred'}
            </p>
            {componentName && (
              <p className="text-xs text-red-400 mt-2">
                Component: {componentName}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={resetErrorBoundary}
              variant="outline"
              className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
            >
              Try Again
            </Button>
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>

          <Button
            onClick={handleReload}
            className="w-full bg-ctea-teal hover:bg-ctea-teal/80"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload Page
          </Button>

          <Button
            onClick={() => setShowFeedbackModal(true)}
            variant="outline"
            className="w-full border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Report This Error
          </Button>
        </div>
      </Card>

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        initialType="error"
        errorDetails={errorDetails}
      />
    </div>
  );
};

export default ErrorFallback;
