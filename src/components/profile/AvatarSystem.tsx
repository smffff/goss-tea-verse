
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { UserX, User, Shuffle, Crown, Ghost, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AvatarSystemProps {
  isAnonymous: boolean;
  onToggleAnonymous: (anonymous: boolean) => void;
  currentAvatar?: string;
  onAvatarChange: (avatar: string) => void;
}

const cryptoPersonas = [
  { id: 'lady-invisible', name: 'Lady Invisible', emoji: '👤', color: 'from-purple-500 to-pink-500' },
  { id: 'crypto-karen', name: 'Crypto Karen', emoji: '💅', color: 'from-yellow-500 to-orange-500' },
  { id: 'degen-dave', name: 'Degen Dave', emoji: '🤡', color: 'from-blue-500 to-cyan-500' },
  { id: 'hodl-helen', name: 'HODL Helen', emoji: '💎', color: 'from-green-500 to-teal-500' },
  { id: 'paper-hands-pete', name: 'Paper Hands Pete', emoji: '📄', color: 'from-red-500 to-rose-500' },
  { id: 'whale-watcher', name: 'Whale Watcher', emoji: '🐋', color: 'from-indigo-500 to-purple-500' },
];

const ogAvatars = [
  { id: 'teacup-king', name: 'Teacup King', emoji: '👑', premium: true },
  { id: 'gossip-goddess', name: 'Gossip Goddess', emoji: '✨', premium: true },
  { id: 'spill-master', name: 'Spill Master', emoji: '🫖', premium: true },
  { id: 'chaos-commander', name: 'Chaos Commander', emoji: '⚡', premium: true },
];

const AvatarSystem: React.FC<AvatarSystemProps> = ({
  isAnonymous,
  onToggleAnonymous,
  currentAvatar = 'lady-invisible',
  onAvatarChange
}) => {
  const [selectedPersona, setSelectedPersona] = useState(currentAvatar);
  const [showPremium, setShowPremium] = useState(false);

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId);
    onAvatarChange(personaId);
  };

  const randomizePersona = () => {
    const randomPersona = cryptoPersonas[Math.floor(Math.random() * cryptoPersonas.length)];
    handlePersonaSelect(randomPersona.id);
  };

  const currentPersona = cryptoPersonas.find(p => p.id === selectedPersona) || cryptoPersonas[0];

  return (
    <Card className="p-6 bg-gradient-to-br from-ctea-dark/90 to-ctea-darker/90 border-ctea-teal/30 backdrop-blur-lg">
      <div className="space-y-6">
        {/* Anonymous Mode Toggle */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: isAnonymous ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isAnonymous ? <Ghost className="w-6 h-6 text-purple-400" /> : <User className="w-6 h-6 text-teal-400" />}
            </motion.div>
            <div>
              <h3 className="font-bold text-white">Ghost Mode</h3>
              <p className="text-sm text-gray-400">
                {isAnonymous ? 'Maximum stealth activated' : 'Identity visible to community'}
              </p>
            </div>
          </div>
          <Switch
            checked={isAnonymous}
            onCheckedChange={onToggleAnonymous}
            className="data-[state=checked]:bg-purple-500"
          />
        </div>

        {/* Current Avatar Display */}
        <div className="text-center space-y-4">
          <motion.div
            key={selectedPersona}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative mx-auto w-24 h-24"
          >
            <div className={`w-full h-full rounded-full bg-gradient-to-br ${currentPersona.color} p-1`}>
              <div className="w-full h-full rounded-full bg-ctea-dark flex items-center justify-center">
                <span className="text-3xl">{currentPersona.emoji}</span>
              </div>
            </div>
            {isAnonymous && (
              <motion.div
                className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Ghost className="w-8 h-8 text-purple-400" />
              </motion.div>
            )}
          </motion.div>
          
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAnonymous ? 'Anonymous Spiller' : currentPersona.name}
            </h3>
            <Badge variant="outline" className="mt-1 border-ctea-teal text-ctea-teal">
              {isAnonymous ? 'Stealth Mode' : 'Public Profile'}
            </Badge>
          </div>
        </div>

        {/* Avatar Selection */}
        <AnimatePresence>
          {!isAnonymous && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">Choose Your Persona</h4>
                <Button
                  onClick={randomizePersona}
                  size="sm"
                  variant="outline"
                  className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal hover:text-black"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Random
                </Button>
              </div>

              {/* Crypto Personas Grid */}
              <div className="grid grid-cols-3 gap-3">
                {cryptoPersonas.map((persona) => (
                  <motion.button
                    key={persona.id}
                    onClick={() => handlePersonaSelect(persona.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedPersona === persona.id
                        ? 'border-ctea-teal bg-ctea-teal/20'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${persona.color} p-0.5 mb-2`}>
                      <div className="w-full h-full rounded-full bg-ctea-dark flex items-center justify-center">
                        <span className="text-lg">{persona.emoji}</span>
                      </div>
                    </div>
                    <p className="text-xs text-white font-medium truncate">{persona.name}</p>
                  </motion.button>
                ))}
              </div>

              {/* OG Premium Avatars */}
              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    OG Sipper Exclusives
                  </h4>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black">
                    69+ $TEA
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {ogAvatars.map((avatar) => (
                    <motion.button
                      key={avatar.id}
                      className="p-3 rounded-lg border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 hover:from-yellow-500/20 hover:to-orange-500/20 transition-all"
                      whileHover={{ scale: 1.05 }}
                      disabled
                    >
                      <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 p-0.5 mb-2">
                        <div className="w-full h-full rounded-full bg-ctea-dark flex items-center justify-center">
                          <span className="text-lg">{avatar.emoji}</span>
                        </div>
                      </div>
                      <p className="text-xs text-white font-medium truncate">{avatar.name}</p>
                      <p className="text-xs text-yellow-400">Locked</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Anonymous Features */}
        {isAnonymous && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-white">Stealth Features Active</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>Anonymous tip jar enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <Ghost className="w-4 h-4 text-purple-400" />
                <span>Identity scrambling active</span>
              </div>
              <div className="flex items-center gap-2">
                <UserX className="w-4 h-4 text-purple-400" />
                <span>Untraceable spills mode</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default AvatarSystem;
