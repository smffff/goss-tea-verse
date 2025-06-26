
import { useState, useEffect, useMemo } from 'react';

interface HumorContent {
  message: string;
  emoji: string;
  context: string;
  rarity: 'common' | 'rare' | 'legendary';
}

interface CryptoHumorState {
  currentMessage: HumorContent | null;
  easterEggs: HumorContent[];
  loadingMessages: HumorContent[];
}

const HUMOR_DATABASE: Record<string, HumorContent[]> = {
  loading: [
    { message: "Checking if your bags are heavy enough...", emoji: "💰", context: "loading", rarity: "common" },
    { message: "Consulting the ape council...", emoji: "🦍", context: "loading", rarity: "common" },
    { message: "Diamond hands verification in progress...", emoji: "💎", context: "loading", rarity: "rare" },
    { message: "Summoning Satoshi's ghost...", emoji: "👻", context: "loading", rarity: "legendary" }
  ],
  success: [
    { message: "WAGMI! Welcome to the tea party", emoji: "🫖", context: "success", rarity: "common" },
    { message: "Probably nothing... just alpha", emoji: "🚀", context: "success", rarity: "rare" },
    { message: "GM! Time to touch grass... digitally", emoji: "🌱", context: "success", rarity: "common" }
  ],
  error: [
    { message: "Rekt by smart contracts again", emoji: "💥", context: "error", rarity: "common" },
    { message: "Error 404: Lambo not found", emoji: "🏎️", context: "error", rarity: "rare" },
    { message: "This is why we can't have nice things", emoji: "🤷", context: "error", rarity: "common" }
  ],
  beta: [
    { message: "Only diamond hands allowed", emoji: "💎", context: "beta", rarity: "common" },
    { message: "Exclusive alpha leak zone", emoji: "🕵️", context: "beta", rarity: "rare" },
    { message: "Welcome to the inner circle, anon", emoji: "🎭", context: "beta", rarity: "legendary" }
  ],
  spill: [
    { message: "Spill it like it's hot", emoji: "🌶️", context: "spill", rarity: "common" },
    { message: "Time to expose some rugs", emoji: "🎪", context: "spill", rarity: "rare" },
    { message: "Whisper sweet alpha to me", emoji: "👂", context: "spill", rarity: "common" }
  ]
};

export const useCryptoHumor = (context: string = 'general') => {
  const [state, setState] = useState<CryptoHumorState>({
    currentMessage: null,
    easterEggs: [],
    loadingMessages: HUMOR_DATABASE.loading || []
  });

  const getRandomMessage = (contextKey: string): HumorContent | null => {
    const messages = HUMOR_DATABASE[contextKey];
    if (!messages || messages.length === 0) return null;
    
    // Weight by rarity (legendary: 5%, rare: 20%, common: 75%)
    const weights = { legendary: 0.05, rare: 0.2, common: 0.75 };
    const random = Math.random();
    
    let filteredMessages = messages;
    if (random < weights.legendary) {
      filteredMessages = messages.filter(m => m.rarity === 'legendary');
    } else if (random < weights.legendary + weights.rare) {
      filteredMessages = messages.filter(m => m.rarity === 'rare');
    }
    
    if (filteredMessages.length === 0) filteredMessages = messages;
    
    return filteredMessages[Math.floor(Math.random() * filteredMessages.length)];
  };

  const generateContextMessage = (contextKey: string) => {
    const message = getRandomMessage(contextKey);
    setState(prev => ({ ...prev, currentMessage: message }));
    return message;
  };

  const generateEasterEgg = () => {
    const allMessages = Object.values(HUMOR_DATABASE).flat();
    const legendaryMessages = allMessages.filter(m => m.rarity === 'legendary');
    const message = legendaryMessages[Math.floor(Math.random() * legendaryMessages.length)];
    
    setState(prev => ({
      ...prev,
      easterEggs: [...prev.easterEggs.slice(-4), message] // Keep last 5
    }));
    
    return message;
  };

  const memoizedUtils = useMemo(() => ({
    generateContextMessage,
    generateEasterEgg,
    getRandomLoadingMessage: () => getRandomMessage('loading'),
    getRandomSuccessMessage: () => getRandomMessage('success'),
    getRandomErrorMessage: () => getRandomMessage('error'),
    getBetaMessage: () => getRandomMessage('beta'),
    getSpillMessage: () => getRandomMessage('spill')
  }), []);

  return {
    ...state,
    ...memoizedUtils
  };
};
