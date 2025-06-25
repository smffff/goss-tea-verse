
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import StatusMessage from './StatusMessages';

const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showStatus && isOnline) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <StatusMessage
        type={isOnline ? 'online' : 'offline'}
        message={isOnline ? "Back Online! 🌐" : "Connection Lost! 📡"}
        details={isOnline ? 
          "Ready to spill more tea!" : 
          "Check your internet - the drama waits for no one!"
        }
        size="sm"
      />
    </div>
  );
};

export default NetworkStatus;
