
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EmailOTPFlowProps {
  onSuccess: (email: string) => void;
  onError: (error: string) => void;
}

const EmailOTPFlow: React.FC<EmailOTPFlowProps> = ({ onSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendOTP = async () => {
    if (!email || !email.includes('@')) {
      onError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`
        }
      });

      if (error) throw error;

      toast({
        title: "Magic Link Sent! 📧",
        description: "Check your email for the verification code",
      });
      
      setStep('otp');
    } catch (error: any) {
      onError(error.message || 'Failed to send verification email');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      onError('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });

      if (error) throw error;

      setStep('success');
      toast({
        title: "Email Verified! ✅",
        description: "Welcome to CTea Newsroom!",
      });
      
      setTimeout(() => onSuccess(email), 1500);
    } catch (error: any) {
      onError(error.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {step === 'email' && (
          <motion.div
            key="email"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <Mail className="w-16 h-16 mx-auto mb-4 text-[#00D4AA]" />
              <h3 className="text-xl font-bold mb-2">Magic Link Access</h3>
              <p className="text-white/80 text-sm">
                Enter your email to receive instant access via magic link
              </p>
            </div>
            
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-[#00D4AA]/30 text-white placeholder:text-white/50 text-center"
                onKeyPress={(e) => e.key === 'Enter' && sendOTP()}
              />
              
              <Button
                onClick={sendOTP}
                disabled={isLoading || !email}
                className="w-full bg-gradient-to-r from-[#00D4AA] to-[#FF6B9D] hover:from-[#FF6B9D] hover:to-[#00D4AA] text-white font-bold py-3"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Mail className="w-5 h-5 mr-2" />
                )}
                {isLoading ? 'Sending Magic Link...' : 'Send Magic Link'}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'otp' && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-2">Check Your Email</h3>
              <p className="text-white/80 text-sm">
                We sent a 6-digit code to <span className="font-mono text-[#00D4AA]">{email}</span>
              </p>
            </div>
            
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="bg-white/10 border-[#00D4AA]/30 text-white placeholder:text-white/50 text-center text-2xl font-mono tracking-widest"
                onKeyPress={(e) => e.key === 'Enter' && verifyOTP()}
              />
              
              <Button
                onClick={verifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-green-500 to-[#00D4AA] hover:from-green-600 hover:to-[#00D4AA]/80 text-white font-bold py-3"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <CheckCircle className="w-5 h-5 mr-2" />
                )}
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => setStep('email')}
                className="w-full text-white/60 hover:text-white"
              >
                ← Back to Email
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1 }}
            >
              <CheckCircle className="w-24 h-24 mx-auto mb-4 text-green-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">Welcome Aboard! 🎉</h3>
            <p className="text-white/80">Redirecting to the newsroom...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmailOTPFlow;
