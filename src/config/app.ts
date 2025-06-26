
// CTea App Configuration - Main app settings
// Moved from lib/config/app.ts for better organization

export const APP_CONFIG = {
  name: 'CTea Newsroom',
  tagline: 'Where Memes, Gossip, and Crypto Collide — Spill Tea. Get Paid.',
  description: 'Anonymous crypto gossip meets AI-powered reactions. Share alpha, earn credibility, and watch the community decide what\'s hot or cold.',
  url: 'https://cteanews.com',
  
  // Rate limiting
  rateLimits: {
    submissions: 1, // per 5 minutes
    reactions: 10, // per minute
    comments: 5 // per minute
  },
  
  // Features
  features: {
    aiCommentary: true,
    walletConnect: false, // v2 feature
    tokenRewards: false, // v2 feature
    realTimeChat: true,
    moderation: true
  },
  
  // Social links
  social: {
    twitter: 'https://twitter.com/cteanewsroom',
    discord: 'https://discord.gg/cteanewsroom',
    github: 'https://github.com/cteanewsroom'
  }
};

export const BRAND_COLORS = {
  primary: '#FF4C7B', // CTea Pink
  secondary: '#9333EA', // Purple
  accent: '#10B981', // Teal
  warning: '#F59E0B', // Yellow
  dark: '#1a1a1a',
  darker: '#0a0a0a'
};
