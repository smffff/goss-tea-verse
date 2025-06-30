
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import EnhancedTeaCup from '@/components/ui/EnhancedTeaCup';

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          toast({
            title: "Authentication Error",
            description: "There was an issue confirming your email. Please try again.",
            variant: "destructive"
          });
          navigate('/auth');
          return;
        }

        if (data.session) {
          toast({
            title: "Welcome to CTea News! ☕",
            description: "Your email has been confirmed. Welcome to the newsroom!",
          });
          navigate('/feed');
        } else {
          // Handle email confirmation without immediate session
          const type = searchParams.get('type');
          const tokenHash = searchParams.get('token_hash');
          
          if (type === 'signup' && tokenHash) {
            toast({
              title: "Email Confirmed! ☕",
              description: "Your email has been confirmed. You can now sign in to CTea News.",
            });
            navigate('/auth?confirmed=true');
          } else {
            navigate('/auth');
          }
        }
      } catch (error) {
        console.error('Callback processing error:', error);
        navigate('/auth');
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [navigate, toast, searchParams]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-background via-brand-neutral to-brand-darker flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <EnhancedTeaCup size="xl" variant="steaming" animated={true} className="mx-auto mb-6" />
          <motion.h2 
            className="text-2xl font-bold text-brand-text mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Brewing Your Access...
          </motion.h2>
          <p className="text-brand-text-secondary">
            Confirming your email and setting up your account
          </p>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
