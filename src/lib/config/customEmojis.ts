
export const CTEA_CUSTOM_EMOJIS = {
  // Core CTea Emojis
  teacup: {
    unicode: '🫖',
    custom: 'ctea-teacup',
    description: 'CTea spilling teacup',
    category: 'brand'
  },
  coffee: {
    unicode: '☕',
    custom: 'ctea-coffee',
    description: 'CTea hot coffee',
    category: 'brand'
  },
  
  // Reaction Emojis
  fire: {
    unicode: '🔥',
    custom: 'ctea-fire',
    description: 'Hot tea reaction',
    category: 'reactions'
  },
  eyes: {
    unicode: '👀',
    custom: 'ctea-eyes',
    description: 'Tea watching eyes',
    category: 'reactions'
  },
  crown: {
    unicode: '👑',
    custom: 'ctea-crown',
    description: 'Tea royalty crown',
    category: 'reactions'
  },
  drama: {
    unicode: '🎭',
    custom: 'ctea-drama',
    description: 'Drama masks',
    category: 'reactions'
  },
  
  // Crypto Emojis
  coin: {
    unicode: '💰',
    custom: 'ctea-coin',
    description: 'TEA token',
    category: 'crypto'
  },
  rocket: {
    unicode: '🚀',
    custom: 'ctea-rocket',
    description: 'To the moon',
    category: 'crypto'
  },
  diamond: {
    unicode: '💎',
    custom: 'ctea-diamond',
    description: 'Diamond hands',
    category: 'crypto'
  },
  
  // Corn Gang Emojis
  corn: {
    unicode: '🌽',
    custom: 'ctea-corn',
    description: 'Corn gang',
    category: 'corn'
  },
  
  // Vibe Emojis
  sparkles: {
    unicode: '✨',
    custom: 'ctea-sparkles',
    description: 'CTea sparkles',
    category: 'vibes'
  },
  nail_care: {
    unicode: '💅',
    custom: 'ctea-nails',
    description: 'Sassy vibes',
    category: 'vibes'
  }
};

// Discord/Telegram emoji mappings
export const DISCORD_EMOJIS = {
  ':ctea:': CTEA_CUSTOM_EMOJIS.teacup,
  ':teaspill:': CTEA_CUSTOM_EMOJIS.teacup,
  ':hottea:': CTEA_CUSTOM_EMOJIS.fire,
  ':teaeyes:': CTEA_CUSTOM_EMOJIS.eyes,
  ':teacrown:': CTEA_CUSTOM_EMOJIS.crown,
  ':corngang:': CTEA_CUSTOM_EMOJIS.corn,
  ':teacoin:': CTEA_CUSTOM_EMOJIS.coin
};

// Emoji utility functions
export const getEmojiByCategory = (category: string) => {
  return Object.values(CTEA_CUSTOM_EMOJIS).filter(emoji => emoji.category === category);
};

export const getRandomEmoji = (category?: string) => {
  const emojis = category 
    ? getEmojiByCategory(category)
    : Object.values(CTEA_CUSTOM_EMOJIS);
  
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const formatEmojiForPlatform = (emoji: any, platform: 'discord' | 'telegram' | 'web' = 'web') => {
  switch (platform) {
    case 'discord':
      return `<:${emoji.custom}:${emoji.custom}>`;
    case 'telegram':
      return emoji.unicode;
    default:
      return emoji.unicode;
  }
};
