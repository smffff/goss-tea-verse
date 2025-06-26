
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Coffee, RefreshCw } from 'lucide-react';
import LoadingSpinner from '../../LoadingSpinner';
import { getRandomLoadingMessage } from '@/utils/errorUtils';

interface LoadingScreenProps {
  loadingSteps: number;
  showEmergencyAccess: boolean;
  initError: string | null;
  onEmergencyAccess: () => void;
  onForceRefresh: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  loadingSteps,
  showEmergencyAccess,
  initError,
  onEmergencyAccess,
  onForceRefresh
}) => {
  const getLoadingMessage = () => {
    switch (loadingSteps) {
      case 1: return "Checking your vibe... 💅";
      case 2: return "Brewing the tea... ☕";
      case 3: return "Almost ready bestie... ✨";
      default: return getRandomLoadingMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <LoadingSpinner size="lg" variant="tea" message={getLoadingMessage()} />
        
        {showEmergencyAccess && (
          <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <p className="text-orange-300 text-sm mb-3">
              Taking longer than expected... 😤
            </p>
            <div className="space-y-2">
              <Button
                onClick={onEmergencyAccess}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Emergency Access
              </Button>
              <Button
                onClick={onForceRefresh}
                variant="outline"
                className="w-full border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Page
              </Button>
            </div>
          </div>
        )}

        {initError && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded">
            <p className="text-red-400 text-sm">{initError}</p>
            <Button
              onClick={onEmergencyAccess}
              className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white"
            >
              Access Anyway
            </Button>
          </div>
        )}
        
        <p className="text-xs text-gray-500 mt-4">
          Beta life hits different 💅
        </p>
      </div>
    </div>
  );
};
