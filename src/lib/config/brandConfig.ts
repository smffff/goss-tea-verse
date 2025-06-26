
export const BRAND_CONFIG = {
  // Core Brand Identity
  name: 'CTea Newsroom',
  tagline: 'Spill Tea. Stack Clout. Stay Shady.',
  description: 'Web3\'s anonymous crypto gossip feed with AI-powered commentary and token rewards',
  
  // Alternative taglines for variety
  taglines: [
    'Spill Tea. Stack Clout. Stay Shady.',
    'Where Memes, Gossip, and Crypto Collide',
    'Web3\'s Anonymous Crypto Gossip Feed',
    'The ultimate crypto gossip platform where anonymous intel meets AI-powered insights'
  ],
  
  // Brand personality
  personality: {
    voice: 'sassy, mysterious, insider',
    tone: 'gossip-girl meets crypto-twitter',
    style: 'tabloid meets high-tech'
  },
  
  // Visual identity
  colors: {
    // Primary palette - Vintage tabloid inspired
    primary: '#cc2b2b', // vintage-red
    secondary: '#1c1c1c', // tabloid-black
    accent: '#ff1493', // neon-pink for highlights
    background: '#fdf7f2', // newsprint
    surface: '#fef7f7', // pale-pink
    
    // Extended palette
    purple: '#9333EA',
    teal: '#10B981',
    yellow: '#F59E0B',
    electricBlue: '#00bfff'
  },
  
  // Typography
  fonts: {
    headline: ['Anton', 'Oswald', 'Impact', 'sans-serif'],
    tabloid: ['Oswald', 'Anton', 'Impact', 'sans-serif'],
    display: ['Playfair Display', 'DM Serif Display', 'Georgia', 'serif'],
    body: ['Inter', 'system-ui', 'sans-serif']
  },
  
  // Iconography
  icons: {
    primary: '☕', // teacup
    reactions: {
      hot: '🔥',
      cold: '🧊',
      tea: '☕',
      spill: '🫖',
      eyes: '👀',
      crown: '👑'
    }
  },
  
  // Social links
  social: {
    twitter: 'https://twitter.com/cteanewsroom',
    arena: 'https://arena.social/?ref=cteanewsroom',
    discord: 'https://discord.gg/cteanewsroom',
    github: 'https://github.com/cteanewsroom'
  },
  
  // Contact
  contact: {
    press: 'press@cteanews.com',
    tips: 'tips@cteanews.com',
    general: 'hello@cteanews.com'
  }
};

// Theme configuration
export const THEME_CONFIG = {
  dark: {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
    surface: 'rgba(28, 28, 28, 0.8)',
    text: '#ffffff',
    muted: '#9ca3af'
  },
  light: {
    background: 'linear-gradient(135deg, #fdf7f2 0%, #fef7f7 100%)',
    surface: 'rgba(255, 255, 255, 0.9)',
    text: '#1c1c1c',
    muted: '#6b7280'
  }
};
