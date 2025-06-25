
import React from 'react';

interface AnimatedBadgeProps {
  type: 'top-spiller' | 'ai-favorite' | 'anonymous-oracle';
  size?: number;
  className?: string;
  animated?: boolean;
}

const AnimatedBadges: React.FC<AnimatedBadgeProps> = ({ 
  type, 
  size = 48, 
  className = '', 
  animated = true 
}) => {
  const badgeSize = `${size}px`;
  const animationClass = animated ? 'animate-float' : '';

  const TopSpillerBadge = () => (
    <div className={`inline-flex items-center justify-center ${className} ${animationClass}`} 
         title="🔥 Top Spiller – Your gossip is legendary">
      <svg width={badgeSize} height={badgeSize} viewBox="0 0 64 64">
        <defs>
          <radialGradient id="topSpillerGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#cc2b2b" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Badge Circle */}
        <circle cx="32" cy="32" r="30" fill="url(#topSpillerGrad)" stroke="#cc2b2b" strokeWidth="2" filter="url(#glow)"/>
        
        {/* Teacup with Flames */}
        <path d="M20 28 L20 36 C20 38, 22 40, 24 40 L40 40 C42 40, 44 38, 44 36 L44 28 Z" 
              fill="#ffffff" stroke="#cc2b2b" strokeWidth="1.5"/>
        <path d="M44 32 C48 32, 48 36, 44 36" stroke="#cc2b2b" strokeWidth="2" fill="none"/>
        
        {/* Flames */}
        <path d="M26 26 Q28 20, 26 24 Q24 28, 26 26" fill="#ff4500"/>
        <path d="M32 25 Q34 18, 32 22 Q30 26, 32 25" fill="#ffa500"/>
        <path d="M38 26 Q40 20, 38 24 Q36 28, 38 26" fill="#ff4500"/>
        
        {/* Crown */}
        <polygon points="28,18 32,12 36,18 40,15 36,22 32,16 28,22 24,15" fill="#ffd700" stroke="#cc2b2b" strokeWidth="1"/>
        
        {/* Text */}
        <text x="32" y="55" textAnchor="middle" fontSize="8" fill="#cc2b2b" fontFamily="Anton" fontWeight="bold">TOP</text>
      </svg>
    </div>
  );

  const AIFavoriteBadge = () => (
    <div className={`inline-flex items-center justify-center ${className} ${animationClass}`} 
         title="🤖 AI Favorite – CTeaBot loves your content">
      <svg width={badgeSize} height={badgeSize} viewBox="0 0 64 64">
        <defs>
          <radialGradient id="aiFavGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ddd6fe" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#5b21b6" />
          </radialGradient>
        </defs>
        
        {/* Badge Circle */}
        <circle cx="32" cy="32" r="30" fill="url(#aiFavGrad)" stroke="#8b5cf6" strokeWidth="2"/>
        
        {/* Robot Teacup */}
        <path d="M20 28 L20 36 C20 38, 22 40, 24 40 L40 40 C42 40, 44 38, 44 36 L44 28 Z" 
              fill="#ffffff" stroke="#5b21b6" strokeWidth="1.5"/>
        <path d="M44 32 C48 32, 48 36, 44 36" stroke="#5b21b6" strokeWidth="2" fill="none"/>
        
        {/* Robot Face */}
        <rect x="26" y="30" width="4" height="4" fill="#8b5cf6" rx="1"/>
        <rect x="34" y="30" width="4" height="4" fill="#8b5cf6" rx="1"/>
        <rect x="29" y="36" width="6" height="2" fill="#8b5cf6" rx="1"/>
        
        {/* Circuit Pattern */}
        <circle cx="20" cy="20" r="2" fill="#fbbf24"/>
        <circle cx="44" cy="20" r="2" fill="#fbbf24"/>
        <path d="M20 20 L32 20 L32 28" stroke="#fbbf24" strokeWidth="1" fill="none"/>
        <path d="M44 20 L32 20" stroke="#fbbf24" strokeWidth="1" fill="none"/>
        
        {/* AI Sparkles */}
        <polygon points="16,12 17,15 20,16 17,17 16,20 15,17 12,16 15,15" fill="#fbbf24"/>
        <polygon points="48,12 49,15 52,16 49,17 48,20 47,17 44,16 47,15" fill="#fbbf24"/>
        
        <text x="32" y="55" textAnchor="middle" fontSize="7" fill="#5b21b6" fontFamily="Oswald" fontWeight="bold">AI♥</text>
      </svg>
    </div>
  );

  const AnonymousOracleBadge = () => (
    <div className={`inline-flex items-center justify-center ${className} ${animationClass}`} 
         title="🕵️ Anonymous Oracle – Master of stealth intel">
      <svg width={badgeSize} height={badgeSize} viewBox="0 0 64 64">
        <defs>
          <radialGradient id="oracleGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="50%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1f2937" />
          </radialGradient>
        </defs>
        
        {/* Badge Circle */}
        <circle cx="32" cy="32" r="30" fill="url(#oracleGrad)" stroke="#374151" strokeWidth="2"/>
        
        {/* Spy Teacup */}
        <path d="M20 28 L20 36 C20 38, 22 40, 24 40 L40 40 C42 40, 44 38, 44 36 L44 28 Z" 
              fill="#1f2937" stroke="#6b7280" strokeWidth="1.5"/>
        <path d="M44 32 C48 32, 48 36, 44 36" stroke="#6b7280" strokeWidth="2" fill="none"/>
        
        {/* Fedora Hat */}
        <ellipse cx="32" cy="22" rx="16" ry="4" fill="#1f2937"/>
        <ellipse cx="32" cy="20" rx="12" ry="6" fill="#374151"/>
        <ellipse cx="32" cy="18" rx="8" ry="3" fill="#1f2937"/>
        
        {/* Sunglasses */}
        <ellipse cx="28" cy="30" rx="4" ry="3" fill="#000000"/>
        <ellipse cx="36" cy="30" rx="4" ry="3" fill="#000000"/>
        <path d="M32 30 L34 30" stroke="#1f2937" strokeWidth="2"/>
        
        {/* Mystery Eyes */}
        <circle cx="28" cy="30" r="1.5" fill="#fbbf24" opacity="0.8"/>
        <circle cx="36" cy="30" r="1.5" fill="#fbbf24" opacity="0.8"/>
        
        {/* Shadow Effect */}
        <path d="M16 45 Q32 50 48 45" stroke="#000000" strokeWidth="2" opacity="0.3" fill="none"/>
        
        <text x="32" y="55" textAnchor="middle" fontSize="6" fill="#fbbf24" fontFamily="Oswald" fontWeight="bold">ORACLE</text>
      </svg>
    </div>
  );

  switch (type) {
    case 'top-spiller':
      return <TopSpillerBadge />;
    case 'ai-favorite':
      return <AIFavoriteBadge />;
    case 'anonymous-oracle':
      return <AnonymousOracleBadge />;
    default:
      return <TopSpillerBadge />;
  }
};

export default AnimatedBadges;
