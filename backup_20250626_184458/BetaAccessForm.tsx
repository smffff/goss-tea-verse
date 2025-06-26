
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import ViralCTA from '@/components/ui/ViralCTA';

interface BetaAccessFormProps {
  betaCode: string;
  setBetaCode: (code: string) => void;
  error: string;
  isVerifying: boolean;
  onSubmit: () => void;
}

const BetaAccessForm: React.FC<BetaAccessFormProps> = ({
  betaCode,
  setBetaCode,
  error,
  isVerifying,
  onSubmit
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <Card className="bg-ctea-dark/80 border-ctea-teal/30 backdrop-blur-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-ctea-teal to-ctea-purple rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Beta Access Required</CardTitle>
          <p className="text-gray-400">Enter your exclusive beta code to continue</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter beta code..."
              value={betaCode}
              onChange={(e) => setBetaCode(e.target.value)}
              className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal"
              onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
            />
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm"
              >
                {error}
              </motion.p>
            )}
          </div>
          <ViralCTA
            variant="spill"
            size="md"
            onClick={onSubmit}
            className="w-full"
            showParticles={false}
            shakeOnHover={false}
          >
            {isVerifying ? 'Verifying...' : 'Access The Tea'}
          </ViralCTA>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BetaAccessForm;
