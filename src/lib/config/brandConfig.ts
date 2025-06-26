
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
    'Finally, utility for your meme portfolio.',
    'Make CTea Great Again.',
    'Built for gossip. Powered by degeneracy.',
    'We made apps for dumber sh*t. Why not gossip?'
  ],
  
  // Brand personality
  personality: {
    voice: 'sassy, mysterious, insider',
    tone: 'gossip-girl meets crypto-twitter',
    style: 'tabloid meets high-tech'
  },
  
  // Visual identity - Updated to match deployment spec
  colors: {
    primary: '#00D8A4',     // neon mint
    accent: '#FF4FB3',      // hot pink
    background: '#100C2A',  // deep night blue
    orange: '#FF9C39',      // retro sunburst
    text: '#FFFFFF',        // white text
    
    // Legacy colors for backwards compatibility
    secondary: '#1c1c1c',
    surface: '#fef7f7',
    purple: '#9333EA',
    teal: '#10B981',
    yellow: '#F59E0B',
    electricBlue: '#00bfff'
  },
  
  // Typography - Updated with retro fonts
  fonts: {
    header: ['Press Start 2P', 'Luckiest Guy', 'Oswald', 'Impact', 'sans-serif'],
    retro: ['Press Start 2P', 'monospace'],
    headline: ['Luckiest Guy', 'Anton', 'Oswald', 'Impact', 'sans-serif'],
    display: ['Playfair Display', 'DM Serif Display', 'Georgia', 'serif'],
    body: ['Inter', 'Nunito Sans', 'system-ui', 'sans-serif']
  },
  
  // Enhanced iconography
  icons: {
    primary: '🫖', // spilling teacup
    secondary: '☕', // regular teacup
    reactions: {
      hot: '🔥',
      cold: '🧊',
      tea: '☕',
      spill: '🫖',
      eyes: '👀',
      crown: '👑',
      drama: '🎭',
      gossip: '🗣️',
      exclusive: '⭐',
      verified: '✅',
      corn: '🌽'
    }
  },
  
  // Enhanced social links
  social: {
    twitter: 'https://twitter.com/cteanews',
    arena: 'https://arena.social/?ref=cteanewsroom',
    discord: 'https://discord.gg/cteanewsroom',
    github: 'https://github.com/cteanewsroom',
    telegram: 'https://t.me/cteanewsroom',
    linktree: 'https://linktr.ee/cteanewsroom'
  },
  
  // Tea Token Configuration
  token: {
    name: 'TEA Token',
    symbol: '$TEA',
    contract: 'tea.cteanews.sol',
    network: 'Solana',
    dex: 'Jupiter'
  },
  
  // Beta access configuration
  beta: {
    testCodes: ['TEA2024', 'CTEA-BETA', 'FREN-ZONE', 'SPILL-ZONE', 'CORN-GANG'],
    reuseLimit: 3,
    expiryDays: 30,
    briberWallet: 'tea.cteanews.sol'
  },
  
  // Contact
  contact: {
    press: 'press@cteanews.com',
    tips: 'tips@cteanews.com',
    general: 'hello@cteanews.com',
    partnerships: 'partners@cteanews.com',
    admin: 'admin@cteanews.com'
  },
  
  // Site metadata
  meta: {
    keywords: ['crypto gossip', 'web3 news', 'anonymous intel', 'AI commentary', 'memecoin culture', 'tea token', 'corn gang'],
    author: 'CTea Newsroom Team',
    siteName: 'CTea Newsroom',
    domain: 'cteanews.com'
  }
};

export const cteaBrandColors = BRAND_CONFIG.colors;

// Theme configuration
export const THEME_CONFIG = {
  dark: {
    background: `linear-gradient(135deg, ${BRAND_CONFIG.colors.background} 0%, #0a0a0a 100%)`,
    surface: 'rgba(28, 28, 28, 0.8)',
    text: BRAND_CONFIG.colors.text,
    muted: '#9ca3af'
  },
  vaporwave: {
    background: `linear-gradient(135deg, ${BRAND_CONFIG.colors.accent} 0%, ${BRAND_CONFIG.colors.primary} 50%, ${BRAND_CONFIG.colors.orange} 100%)`,
    surface: 'rgba(255, 255, 255, 0.1)',
    text: BRAND_CONFIG.colors.text,
    accent: BRAND_CONFIG.colors.accent
  }
};
