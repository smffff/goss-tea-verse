
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';
import AccessTabsContainer from './gateway/AccessTabsContainer';

type TabType = 'peek' | 'login' | 'beta' | 'wallet';

interface EnhancedAccessGatewayProps {
  onAccessGranted: (accessLevel: 'guest' | 'authenticated' | 'beta' | 'admin') => void;
}

const EnhancedAccessGateway: React.FC<EnhancedAccessGatewayProps> = ({ onAccessGranted }) => {
  const [activeTab, setActiveTab] = useState<TabType>('peek');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log('User authenticated, granting access');
      onAccessGranted('authenticated');
    }
  }, [user, onAccessGranted]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as TabType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ctea-teal rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-ctea-purple rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative z-10"
      >
        <Card className="bg-ctea-dark/90 border-ctea-teal/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-ctea-teal to-pink-400 rounded-full flex items-center justify-center mb-4">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
              CTea Newsroom
              <BrandedTeacupIcon size="sm" animated />
            </CardTitle>
            <p className="text-gray-400">Choose Your Access Level ☕</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <AccessTabsContainer
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              onAccessGranted={onAccessGranted}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              error={error}
              setError={setError}
            />

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded p-2"
              >
                {error}
              </motion.p>
            )}

            {/* Help Section */}
            <div className="pt-4 border-t border-ctea-teal/20 text-center">
              <p className="text-xs text-gray-400 mb-2">New to CTea?</p>
              <p className="text-xs text-ctea-teal">
                Start with a sneak peek, then upgrade for full gossip access!
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EnhancedAccessGateway;
