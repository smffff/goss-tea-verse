import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee, Mail, Lock, User, Sparkles, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      navigate('/');
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Fix: signUp only takes email and password
    const { error } = await signUp(email, password);
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F003B] via-[#0E0E16] to-[#29001C] flex items-center justify-center p-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link to="/" className="flex items-center justify-center space-x-3 mb-6">
            <motion.img 
              src="/assets/logo-ctea-spill.svg"
              alt="CTea"
              className="w-12 h-12 filter drop-shadow-lg"
              animate={{ 
                y: [0, -4, 0],
                rotate: [0, 1, -1, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="text-3xl font-retro font-bold bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
              CTEA NEWS
            </span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-retro font-bold text-brand mb-2">
            Join the CTea Underground
          </h1>
          <p className="text-text/70 font-cyber">
            Your inbox is sacred. No spam, just scandal.
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-[#14141f]/80 backdrop-blur-lg border-2 border-accent/20">
            <CardHeader className="text-center">
              <CardTitle className="text-text font-retro text-xl">Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-bg/50 border border-accent/30">
                  <TabsTrigger 
                    value="signin" 
                    className="text-text data-[state=active]:bg-brand data-[state=active]:text-bg font-retro text-sm"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="text-text data-[state=active]:bg-accent data-[state=active]:text-bg font-retro text-sm"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="mt-6">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-3">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-text/50" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-bg/50 border-accent/30 text-text placeholder-text/50 focus:border-accent focus:ring-accent/20 font-cyber"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-text/50" />
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 bg-bg/50 border-accent/30 text-text placeholder-text/50 focus:border-accent focus:ring-accent/20 font-cyber"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-brand hover:bg-accent text-bg font-bold py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_#00FFE0] font-retro"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <Sparkles className="w-4 h-4 animate-spin mr-2" />
                          Signing in...
                        </div>
                      ) : (
                        '🚀 Sign In'
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="mt-6">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-3">
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-text/50" />
                        <Input
                          type="text"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10 bg-bg/50 border-accent/30 text-text placeholder-text/50 focus:border-accent focus:ring-accent/20 font-cyber"
                          required
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-text/50" />
                        <Input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="pl-10 bg-bg/50 border-accent/30 text-text placeholder-text/50 focus:border-accent focus:ring-accent/20 font-cyber"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-text/50" />
                        <Input
                          type="email"
                          placeholder="Enter your burner email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-bg/50 border-accent/30 text-text placeholder-text/50 focus:border-accent focus:ring-accent/20 font-cyber"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-text/50" />
                        <Input
                          type="password"
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 bg-bg/50 border-accent/30 text-text placeholder-text/50 focus:border-accent focus:ring-accent/20 font-cyber"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-brand text-bg font-bold py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_#FF4EAF] font-retro"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <Sparkles className="w-4 h-4 animate-spin mr-2" />
                          Creating account...
                        </div>
                      ) : (
                        '🚀 Get Access'
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link to="/" className="text-accent hover:text-brand transition-colors font-cyber">
            ← Back to Home
          </Link>
          <p className="text-xs text-text/50 mt-4 font-cyber">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="underline text-accent hover:text-brand">
              terms
            </Link>
            {' '}and{' '}
            <Link to="/privacy" className="underline text-accent hover:text-brand">
              privacy policy
            </Link>
          </p>
        </motion.div>

        {/* Security Badge */}
        <motion.div 
          className="flex items-center justify-center mt-6 text-text/60 font-cyber text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Shield className="w-4 h-4 mr-2 text-accent" />
          Military-grade encryption • Anonymous by design
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
