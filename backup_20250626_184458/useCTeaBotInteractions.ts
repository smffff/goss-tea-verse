
import { useState, useCallback } from 'react';

interface BotInteraction {
  id: string;
  trigger: 'wallet_connect' | 'og_unlock' | 'demo_mode' | 'admin_mode';
  userStatus?: {
    walletType?: string;
    teaBalance?: number;
    ogTier?: string;
  };
  timestamp: number;
}

export const useCTeaBotInteractions = () => {
  const [activeInteractions, setActiveInteractions] = useState<BotInteraction[]>([]);

  const triggerBotGreeting = useCallback((
    trigger: BotInteraction['trigger'],
    userStatus?: BotInteraction['userStatus']
  ) => {
    const id = `${trigger}-${Date.now()}`;
    const interaction: BotInteraction = {
      id,
      trigger,
      userStatus,
      timestamp: Date.now()
    };

    setActiveInteractions(prev => [...prev, interaction]);
  }, []);

  const dismissInteraction = useCallback((id: string) => {
    setActiveInteractions(prev => prev.filter(interaction => interaction.id !== id));
  }, []);

  const clearAllInteractions = useCallback(() => {
    setActiveInteractions([]);
  }, []);

  return {
    activeInteractions,
    triggerBotGreeting,
    dismissInteraction,
    clearAllInteractions
  };
};
