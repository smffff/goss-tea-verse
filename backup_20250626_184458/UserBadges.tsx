
import React from 'react';

interface BadgeProps {
  type: 'top-spiller' | 'ai-favorite' | 'anonymous-oracle';
  size?: number;
  className?: string;
}

const UserBadges: React.FC<BadgeProps> = ({ type, size = 32, className = '' }) => {
  const badgeSize = `${size}px`;

  const TopSpillerBadge = () => (
    <div className={`inline-flex items-center justify-center ${className}`} title="🔥 Top Spiller – Your gossip is legendary">
      <svg width={badgeSize} height={badgeSize} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="15" fill="url(#topSpillerGradient)" stroke="#fbbf24" strokeWidth="1"/>
        <polygon points="16,6 18,12 24,12 19,16 21,22 16,18 11,22 13,16 8,12 14,12" fill="#ffffff"/>
        <text x="16" y="27" textAnchor="middle" fontSize="6" fill="#dc2626" fontWeight="bold">TOP</text>
        <defs>
          <radialGradient id="topSpillerGradient">
            <stop offset="0%" stopColor="#fef3c7"/>
            <stop offset="100%" stopColor="#f59e0b"/>
          </radialGradient>
        </defs>
      </svg>
    </div>
  );

  const AIFavoriteBadge = () => (
    <div className={`inline-flex items-center justify-center ${className}`} title="🤖 AI Favorite – CTeaBot loves your content">
      <svg width={badgeSize} height={badgeSize} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="15" fill="url(#aiFavGradient)" stroke="#8b5cf6" strokeWidth="1"/>
        <circle cx="12" cy="12" r="2" fill="#ffffff"/>
        <circle cx="20" cy="12" r="2" fill="#ffffff"/>
        <path d="M10 20 Q16 25 22 20" stroke="#ffffff" strokeWidth="2" fill="none"/>
        <circle cx="8" cy="8" r="1" fill="#fbbf24"/>
        <circle cx="24" cy="8" r="1" fill="#fbbf24"/>
        <circle cx="6" cy="16" r="1" fill="#fbbf24"/>
        <circle cx="26" cy="16" r="1" fill="#fbbf24"/>
        <defs>
          <radialGradient id="aiFavGradient">
            <stop offset="0%" stopColor="#ddd6fe"/>
            <stop offset="100%" stopColor="#8b5cf6"/>
          </radialGradient>
        </defs>
      </svg>
    </div>
  );

  const AnonymousOracleBadge = () => (
    <div className={`inline-flex items-center justify-center ${className}`} title="🕵️ Anonymous Oracle – Master of stealth intel">
      <svg width={badgeSize} height={badgeSize} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="15" fill="url(#oracleGradient)" stroke="#374151" strokeWidth="1"/>
        <path d="M8 20 Q16 12 24 20 Q20 24 16 23 Q12 24 8 20" fill="#1f2937"/>
        <circle cx="14" cy="18" r="1.5" fill="#fbbf24"/>
        <circle cx="18" cy="18" r="1.5" fill="#fbbf24"/>
        <text x="16" y="27" textAnchor="middle" fontSize="5" fill="#ffffff" fontWeight="bold">🕵️</text>
        <defs>
          <radialGradient id="oracleGradient">
            <stop offset="0%" stopColor="#6b7280"/>
            <stop offset="100%" stopColor="#1f2937"/>
          </radialGradient>
        </defs>
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
      return null;
  }
};

export default UserBadges;
