
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const VersionTracker: React.FC = () => {
  const [currentVersion, setCurrentVersion] = useState('1.0.0');
  const [latestVersion, setLatestVersion] = useState('1.0.0');
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [buildStatus, setBuildStatus] = useState<'stable' | 'building' | 'error'>('stable');
  const { toast } = useToast();

  useEffect(() => {
    // Check for version updates periodically
    const checkForUpdates = () => {
      setIsChecking(true);
      
      // Simulate version check (in real app, this would be an API call)
      setTimeout(() => {
        const version = localStorage.getItem('ctea-version') || '1.0.0';
        setCurrentVersion(version);
        
        // Simulate potential update
        const hasUpdate = Math.random() > 0.8;
        if (hasUpdate) {
          setLatestVersion('1.0.1');
          setUpdateAvailable(true);
        }
        
        setIsChecking(false);
      }, 1000);
    };

    // Check on mount
    checkForUpdates();

    // Check every 5 minutes
    const interval = setInterval(checkForUpdates, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Listen for hot reload events
    const handleHotReload = () => {
      setBuildStatus('building');
      toast({
        title: "Building Update...",
        description: "CTea is updating to the latest version",
      });

      setTimeout(() => {
        setBuildStatus('stable');
        toast({
          title: "Update Complete! ✅",
          description: "CTea has been updated successfully",
        });
      }, 2000);
    };

    // Listen for build errors
    const handleBuildError = () => {
      setBuildStatus('error');
      toast({
        title: "Build Error",
        description: "There was an issue updating CTea. Please refresh if needed.",
        variant: "destructive"
      });
    };

    // In development, simulate hot reload detection
    if (process.env.NODE_ENV === 'development') {
      const hotReloadInterval = setInterval(() => {
        if (Math.random() > 0.95) {
          handleHotReload();
        }
      }, 10000);

      return () => clearInterval(hotReloadInterval);
    }
  }, [toast]);

  const handleRefresh = () => {
    localStorage.setItem('ctea-last-refresh', Date.now().toString());
    window.location.reload();
  };

  const handleUpdate = () => {
    setCurrentVersion(latestVersion);
    setUpdateAvailable(false);
    localStorage.setItem('ctea-version', latestVersion);
    toast({
      title: "Updated to " + latestVersion,
      description: "CTea has been updated successfully!",
    });
  };

  if (buildStatus === 'stable' && !updateAvailable) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-4 left-4 z-50"
      >
        <Card className="bg-ctea-dark/95 border-ctea-teal/30 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              {buildStatus === 'building' && (
                <>
                  <RefreshCw className="w-4 h-4 text-orange-400 animate-spin" />
                  <span className="text-orange-400 text-sm font-medium">Building...</span>
                </>
              )}
              
              {buildStatus === 'error' && (
                <>
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm font-medium">Build Error</span>
                  <Button
                    onClick={handleRefresh}
                    size="sm"
                    variant="outline"
                    className="border-red-400/50 text-red-400 hover:bg-red-400/10 text-xs px-2 py-1"
                  >
                    Refresh
                  </Button>
                </>
              )}
              
              {updateAvailable && buildStatus === 'stable' && (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Update Available</span>
                  <Button
                    onClick={handleUpdate}
                    size="sm"
                    className="bg-gradient-to-r from-ctea-teal to-green-400 hover:from-ctea-teal/80 hover:to-green-400/80 text-white text-xs px-2 py-1"
                  >
                    Update
                  </Button>
                </>
              )}
            </div>
            
            <div className="text-xs text-gray-400 mt-1">
              v{currentVersion} {updateAvailable && `→ v${latestVersion}`}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default VersionTracker;
