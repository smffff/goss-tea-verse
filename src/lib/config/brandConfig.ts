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
    'We made apps for dumber sh*t. Why not gossip?',
    'Managed chaos, served hot.',
    'Where the alpha is spicy and the memes are hot.'
  ],
  
  // Brand personality
  personality: {
    voice: 'sassy, mysterious, insider',
    tone: 'gossip-girl meets crypto-twitter',
    style: 'retro tabloid meets vaporwave'
  },
  
  // Enhanced Visual Identity - Vaporwave Retro Theme
  colors: {
    primary: '#00D8A4',     // neon mint/teal
    accent: '#FF4FB3',      // hot pink/magenta
    background: '#100C2A',  // deep night blue
    orange: '#FF9C39',      // retro sunburst orange
    text: '#FFFFFF',        // white text
    
    // Vaporwave palette
    neonPink: '#FF4FB3',
    neonTeal: '#00D8A4',
    neonOrange: '#FF9C39',
    deepPurple: '#100C2A',
    darkPurple: '#1a0d26',
    retroBlack: '#0a0a0a',
    
    // Legacy colors for backwards compatibility
    secondary: '#1c1c1c',
    surface: '#fef7f7',
    purple: '#9333EA',
    teal: '#10B981',
    yellow: '#F59E0B',
    electricBlue: '#00bfff'
  },
  
  // Enhanced Typography - Retro Gaming + Modern
  fonts: {
    retro: ['Press Start 2P', 'monospace'],           // 8-bit gaming font
    header: ['Luckiest Guy', 'cursive'],             // Bold display font
    headline: ['Luckiest Guy', 'Anton', 'Oswald', 'Impact', 'sans-serif'],
    display: ['Playfair Display', 'DM Serif Display', 'Georgia', 'serif'],
    body: ['Inter', 'Nunito Sans', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'JetBrains Mono', 'monospace']
  },
  
  // Enhanced iconography with custom emojis
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
      corn: '🌽',
      sassy: '💅',
      mind_blown: '🤯',
      money: '💰',
      rocket: '🚀',
      diamond: '💎'
    }
  },
  
  // Enhanced social links
  social: {
    twitter: 'https://twitter.com/cteanews',
    arena: 'https://arena.social/?ref=CTeaNews',
    discord: 'https://discord.gg/cteanewsroom',
    github: 'https://github.com/cteanewsroom',
    telegram: 'https://t.me/cteanewsroom',
    linktree: 'https://linktr.ee/cteanewsroom',
    tiktok: 'https://tiktok.com/@cteanews',
    instagram: 'https://instagram.com/cteanews'
  },
  
  // Tea Token Configuration
  token: {
    name: 'TEA Token',
    symbol: '$TEA',
    contract: 'tea.cteanews.sol',
    network: 'Solana',
    dex: 'Jupiter',
    totalSupply: '1,000,000,000',
    decimals: 9
  },
  
  // Beta access configuration
  beta: {
    testCodes: ['TEA2024', 'CTEA-BETA', 'FREN-ZONE', 'SPILL-ZONE', 'CORN-GANG', 'DEGEN-ALPHA'],
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
    admin: 'admin@cteanews.com',
    memes: 'memes@cteanews.com'
  },
  
  // Enhanced site metadata
  meta: {
    keywords: [
      'crypto gossip', 'web3 news', 'anonymous intel', 'AI commentary', 
      'memecoin culture', 'tea token', 'corn gang', 'solana', 'defi', 
      'crypto twitter', 'memes', 'vaporwave', 'retro crypto', 'gossip platform'
    ],
    author: 'CTea Newsroom Team',
    siteName: 'CTea Newsroom',
    domain: 'cteanews.com'
  },
  
  // Vaporwave styling configuration
  styling: {
    gridPattern: {
      color: 'rgba(0, 216, 164, 0.3)',
      size: '50px 50px'
    },
    glowEffects: {
      primary: '0 0 40px rgba(0, 216, 164, 0.4)',
      accent: '0 0 40px rgba(255, 79, 179, 0.4)',
      orange: '0 0 40px rgba(255, 156, 57, 0.4)'
    },
    animations: {
      float: 'float 3s ease-in-out infinite',
      pulse: 'pulse 2s ease-in-out infinite',
      glow: 'pulse-glow 2s ease-in-out infinite'
    }
  }
};

export const cteaBrandColors = BRAND_CONFIG.colors;

// Enhanced Theme configuration with vaporwave aesthetics
export const THEME_CONFIG = {
  vaporwave: {
    background: `linear-gradient(135deg, ${BRAND_CONFIG.colors.background} 0%, #1a0d26 50%, #0a0a0a 100%)`,
    surface: 'rgba(16, 12, 42, 0.8)',
    text: BRAND_CONFIG.colors.text,
    accent: BRAND_CONFIG.colors.accent,
    grid: 'linear-gradient(rgba(0, 216, 164, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 216, 164, 0.3) 1px, transparent 1px)',
    glow: {
      primary: `0 0 30px ${BRAND_CONFIG.colors.primary}40`,
      accent: `0 0 30px ${BRAND_CONFIG.colors.accent}40`,
      orange: `0 0 30px ${BRAND_CONFIG.colors.orange}40`
    }
  }
};