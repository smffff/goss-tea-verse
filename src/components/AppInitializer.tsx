
import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';

interface AppInitializerProps {
  children: React.ReactNode;
  onInitialized?: () => void;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ 
  children, 
  onInitialized 
}) => {
  const [isReady, setIsReady] = useState(false);
  const [initMessage, setInitMessage] = useState("Starting CTea...");

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Stage 1: Core systems
        setInitMessage("Brewing your tea...");
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Stage 2: Security check (hidden from user)
        setInitMessage("Warming up the teapot...");
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Clear any debug noise from console for production feel
        if (process.env.NODE_ENV === 'production') {
          console.clear();
          if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🫖 CTea Newsroom - Ready to serve!');
        }
        
        // Stage 3: Ready
        setInitMessage("Almost ready...");
        await new Promise(resolve => setTimeout(resolve, 400));
        
        setIsReady(true);
        onInitialized?.();
        
      } catch (error) {
        if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('App initialization error:', error);
        // Still proceed to avoid blocking user
        setIsReady(true);
        onInitialized?.();
      }
    };

    initializeApp();
  }, [onInitialized]);

  if (!isReady) {
    return <SplashScreen message={initMessage} />;
  }

  return <>{children}</>;
};

export default AppInitializer;
