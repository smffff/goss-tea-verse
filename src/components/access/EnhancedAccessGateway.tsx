
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee, Lock, Play, Eye, User, Wallet, Timer, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { betaCodeService } from '@/services/betaCodeService';
import { useAuth } from '@/hooks/useAuth';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';
import AccessLevelIndicator from './AccessLevelIndicator';
import SneakPeekTimer from './SneakPeekTimer';

interface EnhancedAccessGatewayProps {
  onAccessGranted: (accessLevel: 'guest' | 'authenticated' | 'beta' | 'admin') => void;
}

const EnhancedAccessGateway: React.FC<EnhancedAccessGatewayProps> = ({ onAccessGranted }) => {
  const [activeTab, setActiveTab] = useState<'peek' | 'login' | 'beta' | 'wallet'>('peek');
  const [betaCode, setBetaCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [showTestCodes, setShowTestCodes] = useState(false);
  const { toast } = useToast();
  const { signIn, signUp, user } = useAuth();

  useEffect(() => {
    if (user) {
      onAccessGranted('authenticated');
    }
  }, [user, onAccessGranted]);

  const handleSneakPeek = () => {
    localStorage.setItem('ctea-access-level', 'guest');
    localStorage.setItem('ctea-peek-start', Date.now().toString());
    toast({
      title: "Welcome to CTea! ☕",
      description: "Enjoy your 5-minute preview of the hottest crypto gossip!",
    });
    onAccessGranted('guest');
  };

  const handleBetaCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!betaCode.trim()) {
      setError('Please enter a beta code');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const result = await betaCodeService.validateCode(betaCode, true);
      
      if (result.valid) {
        localStorage.setItem('ctea-access-level', 'beta');
        localStorage.setItem('ctea-beta-code', betaCode);
        toast({
          title: "Beta Access Granted! 🚀",
          description: "Welcome to the exclusive CTea beta experience!",
        });
        onAccessGranted('beta');
      } else {
        setError('Invalid beta code. Need access? Try other options below!');
      }
    } catch (error) {
      console.error('Beta verification error:', error);
      setError('Verification failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const { error: signInError } = await signIn(email, password);
      if (!signInError) {
        localStorage.setItem('ctea-access-level', 'authenticated');
        toast({
          title: "Welcome back! ☕",
          description: "You're now logged into CTea Newsroom",
        });
        onAccessGranted('authenticated');
      } else {
        setError(signInError.message);
      }
    } catch (error: any) {
      setError(error.message || 'Login failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const { error: signUpError } = await signUp(email, password);
      if (!signUpError) {
        toast({
          title: "Account Created! 🎉",
          description: "Welcome to CTea! Check your email to verify your account.",
        });
        localStorage.setItem('ctea-access-level', 'authenticated');
        onAccessGranted('authenticated');
      } else {
        setError(signUpError.message);
      }
    } catch (error: any) {
      setError(error.message || 'Signup failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWalletConnect = () => {
    toast({
      title: "Wallet Connect Coming Soon! 🔗",
      description: "Token ownership verification will be available soon. Try other access methods for now!",
    });
  };

  const handleTestCode = (code: string) => {
    setBetaCode(code);
    setShowTestCodes(false);
    setActiveTab('beta');
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
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
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

              <TabsContent value="peek" className="space-y-4">
                <div className="text-center space-y-4">
                  <AccessLevelIndicator level="guest" />
                  <h3 className="text-white font-bold">Sneak Peek Mode</h3>
                  <p className="text-gray-400 text-sm">
                    Get a 5-minute taste of the hottest crypto gossip. Limited access to top stories only.
                  </p>
                  <Button
                    onClick={handleSneakPeek}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Sneak Peek
                  </Button>
                  <p className="text-xs text-gray-500">
                    No signup required • Upgrade anytime for full access
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="login" className="space-y-4">
                <AccessLevelIndicator level="authenticated" />
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-ctea-darker/50">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-ctea-darker border-ctea-teal/30 text-white"
                        required
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-ctea-darker border-ctea-teal/30 text-white"
                        required
                      />
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-ctea-teal hover:bg-ctea-teal/80"
                      >
                        {isProcessing ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-ctea-darker border-ctea-teal/30 text-white"
                        required
                      />
                      <Input
                        type="password"
                        placeholder="Password (min 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-ctea-darker border-ctea-teal/30 text-white"
                        minLength={6}
                        required
                      />
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-ctea-purple hover:bg-ctea-purple/80"
                      >
                        {isProcessing ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="beta" className="space-y-4">
                <AccessLevelIndicator level="beta" />
                <form onSubmit={handleBetaCode} className="space-y-4">
                  <Input
                    placeholder="Enter your beta code..."
                    value={betaCode}
                    onChange={(e) => setBetaCode(e.target.value)}
                    className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal font-mono text-center"
                  />
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-ctea-teal/80 hover:to-pink-400/80"
                  >
                    {isProcessing ? 'Verifying...' : 'Access Beta'}
                  </Button>
                </form>

                {process.env.NODE_ENV === 'development' && (
                  <div className="pt-4 border-t border-ctea-teal/20">
                    <Button
                      variant="ghost"
                      onClick={() => setShowTestCodes(!showTestCodes)}
                      className="w-full text-ctea-teal hover:bg-ctea-teal/10 text-xs"
                    >
                      <Eye className="w-3 h-3 mr-2" />
                      {showTestCodes ? 'Hide' : 'Show'} Test Codes
                    </Button>

                    {showTestCodes && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 space-y-2"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {betaCodeService.getTestCodes().map((code) => (
                            <Badge
                              key={code}
                              variant="outline"
                              className="cursor-pointer border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10 font-mono text-xs justify-center py-1"
                              onClick={() => handleTestCode(code)}
                            >
                              {code}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="wallet" className="space-y-4">
                <AccessLevelIndicator level="authenticated" />
                <div className="text-center space-y-4">
                  <h3 className="text-white font-bold">Token Ownership Verification</h3>
                  <p className="text-gray-400 text-sm">
                    Connect your wallet to verify $TEA token ownership for instant access.
                  </p>
                  <Button
                    onClick={handleWalletConnect}
                    className="w-full bg-gradient-to-r from-ctea-purple to-pink-400 hover:from-ctea-purple/80 hover:to-pink-400/80"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet (Coming Soon)
                  </Button>
                  <p className="text-xs text-gray-500">
                    MetaMask, WalletConnect, and more supported
                  </p>
                </div>
              </TabsContent>
            </Tabs>

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
