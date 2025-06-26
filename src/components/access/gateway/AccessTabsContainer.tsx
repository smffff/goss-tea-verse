
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, User, Crown, Wallet } from 'lucide-react';
import SneakPeekTab from './SneakPeekTab';
import EnhancedAuthTab from './EnhancedAuthTab';
import BetaCodeTab from './BetaCodeTab';
import WalletTab from './WalletTab';

interface AccessTabsContainerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAccessGranted: (level: 'guest' | 'authenticated' | 'beta' | 'admin') => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  error: string;
  setError: (error: string) => void;
}

const AccessTabsContainer: React.FC<AccessTabsContainerProps> = ({
  activeTab,
  setActiveTab,
  onAccessGranted,
  isProcessing,
  setIsProcessing,
  error,
  setError
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-ctea-darker">
        <TabsTrigger value="peek" className="text-white data-[state=active]:bg-orange-500">
          <Eye className="w-4 h-4 mr-1" />
          Peek
        </TabsTrigger>
        <TabsTrigger value="login" className="text-white data-[state=active]:bg-ctea-teal">
          <User className="w-4 h-4 mr-1" />
          Login
        </TabsTrigger>
        <TabsTrigger value="beta" className="text-white data-[state=active]:bg-pink-400">
          <Crown className="w-4 h-4 mr-1" />
          Beta
        </TabsTrigger>
        <TabsTrigger value="wallet" className="text-white data-[state=active]:bg-ctea-purple">
          <Wallet className="w-4 h-4 mr-1" />
          Wallet
        </TabsTrigger>
      </TabsList>

      <TabsContent value="peek">
        <SneakPeekTab onAccessGranted={onAccessGranted} />
      </TabsContent>

      <TabsContent value="login">
        <EnhancedAuthTab 
          onAccessGranted={onAccessGranted}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          error={error}
          setError={setError}
        />
      </TabsContent>

      <TabsContent value="beta">
        <BetaCodeTab 
          onAccessGranted={onAccessGranted}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          error={error}
          setError={setError}
        />
      </TabsContent>

      <TabsContent value="wallet">
        <WalletTab />
      </TabsContent>
    </Tabs>
  );
};

export default AccessTabsContainer;
