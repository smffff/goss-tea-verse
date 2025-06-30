import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Wallet, Shield, Coffee, Sparkles, Users } from 'lucide-react';
import { useWallet } from '@/components/WalletProvider';
import { useAuth } from '@/hooks/useAuth';

const Auth: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const { user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  if (user) {
    return (
      <Layout 
        pageTitle="Welcome Back"
        pageDescription="You're successfully connected to CTea News"
        showNavigation={false}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card className="bg-brand-neutral border-brand-primary/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-brand-primary" />
                </div>
                <CardTitle className="text-2xl font-anton text-brand-text">
                  Welcome Back! 🫖
                </CardTitle>
                <p className="text-brand-text-secondary">
                  You're successfully connected to CTea News
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-brand-background/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-brand-text-secondary">Wallet Address</span>
                    <Badge variant="outline" className="text-xs">
                      Connected
                    </Badge>
                  </div>
                  <p className="font-mono text-sm text-brand-text">
                    {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                  </p>
                </div>

                <div className="bg-brand-background/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-brand-text-secondary">Token Balance</span>
                    <Sparkles className="w-4 h-4 text-brand-accent-yellow" />
                  </div>
                  <p className="text-lg font-bold text-brand-text">
                    {user.token_balance || 0} $TEA
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={() => window.location.href = '/feed'}
                    className="w-full btn-brand-primary"
                  >
                    <Coffee className="w-4 h-4 mr-2" />
                    Enter the Newsroom
                  </Button>
                  <Button 
                    onClick={handleDisconnect}
                    variant="outline"
                    className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Disconnect Wallet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      pageTitle="Join CTea News"
      pageDescription="Connect your wallet to start spilling tea and earning rewards"
      showNavigation={false}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-anton text-brand-text mb-4">
              Join the Tea Party 🫖
            </h1>
            <p className="text-xl text-brand-text-secondary max-w-2xl mx-auto">
              Connect your wallet to start spilling crypto gossip, earning rewards, and joining the most anonymous community in Web3.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Connection Card */}
            <Card className="bg-brand-neutral border-brand-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-anton text-brand-text text-center flex items-center justify-center gap-2">
                  <Wallet className="w-6 h-6" />
                  Connect Wallet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-brand-text-secondary mb-6">
                    Connect your Web3 wallet to access CTea News and start earning rewards.
                  </p>
                  
                  <Button
                    onClick={handleConnectWallet}
                    disabled={isConnecting}
                    className="w-full btn-brand-primary text-lg py-6"
                  >
                    {isConnecting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet className="w-5 h-5 mr-2" />
                        Connect Wallet
                      </>
                    )}
                  </Button>
                </div>

                <div className="bg-brand-background/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-brand-text mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Secure & Anonymous
                  </h4>
                  <p className="text-sm text-brand-text-secondary">
                    Your wallet connection is secure. You can post anonymously and your identity is protected.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card className="bg-brand-neutral border-brand-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-anton text-brand-text text-center">
                  Why Join CTea?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Coffee className="w-4 h-4 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-text">Spill Anonymous Tea</h4>
                    <p className="text-sm text-brand-text-secondary">
                      Share crypto gossip without revealing your identity
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-accent-yellow/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-brand-accent-yellow" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-text">Earn $TEA Tokens</h4>
                    <p className="text-sm text-brand-text-secondary">
                      Get rewarded for quality submissions and engagement
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-accent-lavender/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-brand-accent-lavender" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-text">Join the Community</h4>
                    <p className="text-sm text-brand-text-secondary">
                      Connect with crypto enthusiasts and stay updated
                    </p>
                  </div>
                </div>

                <div className="bg-brand-background/50 p-4 rounded-lg mt-6">
                  <h4 className="font-semibold text-brand-text mb-2">Early Adopter Bonus</h4>
                  <p className="text-sm text-brand-text-secondary">
                    Connect now and receive 100 $TEA tokens as a welcome bonus!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
