
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Coffee, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { accessControlService, AccessLevel } from '@/services/accessControlService';

interface EnhancedSpillSubmissionProps {
  onSpillAccepted: (accessLevel: AccessLevel) => void;
  onClose: () => void;
}

const EnhancedSpillSubmission: React.FC<EnhancedSpillSubmissionProps> = ({
  onSpillAccepted,
  onClose
}) => {
  const [spill, setSpill] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const spillPrompts = [
    "👀 Seen any suspicious activity in the DeFi space?",
    "🚀 Know about any upcoming token launches?", 
    "💸 Heard whispers about major partnerships?",
    "🎭 Got intel on influencer drama?",
    "🔮 Predict the next memecoin to moon?"
  ];

  const handleSubmit = async () => {
    if (!spill.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate submission processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate access code
      const code = `TEA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setGeneratedCode(code);
      
      // Store submission
      localStorage.setItem('ctea_spill_submission', spill);
      localStorage.setItem('ctea_access_code', code);
      localStorage.setItem('ctea_access_method', 'spill');
      
      setShowSuccess(true);
      
      setTimeout(() => {
        const accessLevel = accessControlService.checkSubmissionAccess(true);
        onSpillAccepted(accessLevel);
      }, 3000);
      
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Spill submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-6"
      >
        <div className="text-6xl">🫖</div>
        <h3 className="text-2xl font-bold text-ctea-teal">Tea Accepted!</h3>
        <p className="text-gray-300">
          Your gossip was absolutely *chef's kiss*.
          <br />
          Welcome to the inner circle! ☕
        </p>
        
        <Card className="bg-ctea-teal/20 border-ctea-teal/50 max-w-sm mx-auto">
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-400 mb-2">Your Access Code:</div>
            <div className="font-mono text-xl text-ctea-teal font-bold bg-ctea-darker rounded px-3 py-2">
              {generatedCode}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Saved for future access
            </div>
          </CardContent>
        </Card>

        <div className="animate-pulse">
          <Badge className="bg-gradient-to-r from-ctea-teal to-green-400 text-black font-bold">
            🎫 GOSSIP LORD ACCESS GRANTED
          </Badge>
        </div>
      </motion.div>
    );
  }

  return (
    <Card className="bg-ctea-dark/95 border-ctea-teal/30 max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-white flex items-center justify-center gap-2">
          <Coffee className="w-5 h-5 text-ctea-teal" />
          Spill Some Tea
        </CardTitle>
        <p className="text-center text-gray-400 text-sm">
          Share your hottest gossip, alpha, or drama for instant access.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Prompts */}
        <div className="space-y-2">
          <div className="text-sm text-gray-400 mb-2">Need inspiration? Try these:</div>
          <div className="space-y-1">
            {spillPrompts.slice(0, 3).map((prompt, i) => (
              <div key={i} className="text-xs text-gray-500 bg-ctea-darker/50 rounded px-2 py-1">
                {prompt}
              </div>
            ))}
          </div>
        </div>

        {/* Main Spill Input */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Your Hot Take / Gossip / Alpha</label>
          <Textarea
            placeholder="Spill your tea here... The juicier, the better! 🫖"
            value={spill}
            onChange={(e) => setSpill(e.target.value)}
            rows={4}
            className="bg-ctea-darker border-ctea-teal/30 text-white resize-none"
          />
          <div className="text-xs text-gray-500 text-right">
            {spill.length}/500 characters
          </div>
        </div>

        {/* Optional Contact */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Contact (Optional)</label>
          <Input
            placeholder="Twitter @, Telegram, or email..."
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="bg-ctea-darker border-ctea-teal/30 text-white"
          />
          <div className="text-xs text-gray-500">
            For follow-ups if your tea is legendary 🏆
          </div>
        </div>

        {/* Submission Info */}
        <div className="bg-ctea-darker/50 rounded-lg p-3">
          <div className="text-xs text-gray-400 space-y-1">
            <div>✅ All submissions reviewed by human mods</div>
            <div>✅ Good tea = instant access code</div>
            <div>✅ Great tea = potential rewards & recognition</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleSubmit}
            disabled={!spill.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-ctea-teal to-green-400 hover:from-ctea-teal/80 hover:to-green-400/80 text-white font-bold py-3"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Brewing Tea...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Tea ☕
              </>
            )}
          </Button>
          
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full text-gray-400 hover:text-white"
          >
            Maybe Later
          </Button>
        </div>

        <div className="text-xs text-center text-gray-500">
          💡 Quality over quantity. One great spill beats ten boring ones.
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedSpillSubmission;
