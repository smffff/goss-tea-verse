import React from 'react';
import { AlertTriangle, RefreshCw, Coffee, MessageSquare } from 'lucide-react';
import TabloidButton from '@/components/ui/TabloidButton';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  variant?: 'page' | 'component' | 'api';
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetError,
  variant = 'component' 
}) => {
  const errorMessages = [
    "Even the hottest tea can spill sometimes! 🫖",
    "Drama overload detected! System needs a breather 😤",
    "Plot twist: Something actually broke! 🎭",
    "The gossip network had a glitch in the matrix ⚡",
    "Error 404: Sanity not found (but we're working on it!) 🤷‍♀️"
  ];

  const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];

  const handleFeedback = () => {
    // This would typically open a feedback modal
    console.log('Opening feedback for error:', error?.message);
  };

  if (variant === 'page') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-newsprint to-pale-pink/20 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm border-2 border-vintage-red/30 rounded-xl shadow-2xl max-w-lg w-full p-8 text-center">
          <div className="mb-6">
            <div className="relative inline-block">
              <Coffee className="w-16 h-16 text-vintage-red animate-teacup-shake" />
              <AlertTriangle className="w-6 h-6 text-vintage-red absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          
          <h1 className="font-tabloid text-3xl text-tabloid-black uppercase tracking-wider mb-4">
            {randomMessage}
          </h1>
          
          <p className="text-tabloid-black/70 font-medium text-lg mb-6 leading-relaxed">
            Something went seriously wrong while brewing your tea. Our tech team is probably crying into their keyboards right now.
          </p>
          
          {error && (
            <div className="bg-vintage-red/10 border border-vintage-red/30 rounded-lg p-4 mb-6">
              <p className="text-vintage-red text-sm font-bold mb-2">Technical Drama:</p>
              <p className="text-tabloid-black/70 text-sm font-mono break-all">
                {error.message}
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            <TabloidButton 
              variant="spill" 
              onClick={() => window.location.reload()}
              className="w-full font-bold text-lg py-4"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again (Manifest That Fix!)
            </TabloidButton>
            
            <TabloidButton 
              variant="secondary" 
              onClick={handleFeedback}
              className="w-full font-medium py-3"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Report This Drama
            </TabloidButton>
          </div>
          
          <p className="text-tabloid-black/50 text-sm mt-6">
            If this keeps happening, slide into our DMs. We promise to fix it (eventually).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-vintage-red/10 border-2 border-vintage-red/30 rounded-lg p-6 text-center max-w-md mx-auto">
      <div className="mb-4">
        <AlertTriangle className="w-12 h-12 text-vintage-red mx-auto animate-pulse" />
      </div>
      
      <h3 className="font-tabloid text-xl text-tabloid-black uppercase tracking-wider mb-3">
        Oops! Something Broke 😤
      </h3>
      
      <p className="text-tabloid-black/70 font-medium mb-4">
        {variant === 'api' ? 
          "Our servers are having a moment. Even AI needs therapy sometimes." :
          "This component crashed harder than a crypto portfolio in bear market."
        }
      </p>
      
      {error && (
        <div className="bg-white/70 border border-vintage-red/20 rounded p-3 mb-4">
          <p className="text-xs text-tabloid-black/60 font-mono break-all">
            {error.message}
          </p>
        </div>
      )}
      
      <div className="space-y-3">
        {resetError && (
          <TabloidButton 
            variant="spill" 
            onClick={resetError}
            className="w-full font-bold"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </TabloidButton>
        )}
        
        <TabloidButton 
          variant="secondary" 
          onClick={handleFeedback}
          className="w-full font-medium text-sm"
        >
          Report Bug
        </TabloidButton>
      </div>
    </div>
  );
};

export default ErrorFallback;
