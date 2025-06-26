
import React from 'react';

interface TeacupReactionProps {
  type: 'spill' | 'dead' | 'watching' | 'exposed';
  size?: number;
  className?: string;
  animated?: boolean;
}

const TeacupReactions: React.FC<TeacupReactionProps> = ({ 
  type, 
  size = 32, 
  className = '', 
  animated = false 
}) => {
  const iconSize = `${size}px`;
  const animationClass = animated ? 'animate-teacup-shake' : '';

  const SpillIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" className={`${className} ${animationClass}`}>
      <defs>
        <linearGradient id="spillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cc2b2b" />
          <stop offset="50%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#fca5a5" />
        </linearGradient>
        <linearGradient id="spillLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* Teacup Base */}
      <path d="M8 12 L8 20 C8 22, 10 24, 12 24 L20 24 C22 24, 24 22, 24 20 L24 12 Z" 
            fill="url(#spillGradient)" stroke="#991b1b" strokeWidth="1.5"/>
      {/* Handle */}
      <path d="M24 16 C28 16, 28 20, 24 20" stroke="#cc2b2b" strokeWidth="2" fill="none"/>
      {/* Spilling Tea */}
      <path d="M6 12 Q4 8, 2 10 Q0 12, 2 14 Q4 16, 6 12" fill="url(#spillLiquid)" opacity="0.8"/>
      <circle cx="3" cy="18" r="1.5" fill="#f59e0b" opacity="0.6"/>
      <circle cx="5" cy="20" r="1" fill="#fbbf24" opacity="0.4"/>
      {/* Emoji */}
      <text x="16" y="18" textAnchor="middle" fontSize="8" fill="#ffffff">🫖</text>
    </svg>
  );

  const DeadIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" className={`${className} ${animationClass}`}>
      <defs>
        <linearGradient id="deadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
      </defs>
      {/* Teacup Base */}
      <path d="M8 12 L8 20 C8 22, 10 24, 12 24 L20 24 C22 24, 24 22, 24 20 L24 12 Z" 
            fill="url(#deadGradient)" stroke="#1f2937" strokeWidth="1.5"/>
      {/* Handle */}
      <path d="M24 16 C28 16, 28 20, 24 20" stroke="#374151" strokeWidth="2" fill="none"/>
      {/* Skull */}
      <circle cx="16" cy="16" r="6" fill="#f3f4f6" stroke="#1f2937" strokeWidth="1"/>
      <circle cx="14" cy="15" r="1" fill="#1f2937"/>
      <circle cx="18" cy="15" r="1" fill="#1f2937"/>
      <path d="M13 18 L19 18" stroke="#1f2937" strokeWidth="1.5"/>
      {/* Emoji */}
      <text x="16" y="28" textAnchor="middle" fontSize="6" fill="#6b7280">💀</text>
    </svg>
  );

  const WatchingIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" className={`${className} ${animationClass}`}>
      <defs>
        <linearGradient id="watchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      {/* Teacup Base */}
      <path d="M8 12 L8 20 C8 22, 10 24, 12 24 L20 24 C22 24, 24 22, 24 20 L24 12 Z" 
            fill="url(#watchGradient)" stroke="#1e40af" strokeWidth="1.5"/>
      {/* Handle */}
      <path d="M24 16 C28 16, 28 20, 24 20" stroke="#3b82f6" strokeWidth="2" fill="none"/>
      {/* Eyes Peeking */}
      <ellipse cx="13" cy="14" rx="2" ry="3" fill="#ffffff"/>
      <ellipse cx="19" cy="14" rx="2" ry="3" fill="#ffffff"/>
      <circle cx="13" cy="14" r="1" fill="#1f2937"/>
      <circle cx="19" cy="14" r="1" fill="#1f2937"/>
      {/* Emoji */}
      <text x="16" y="28" textAnchor="middle" fontSize="6" fill="#3b82f6">👀</text>
    </svg>
  );

  const ExposedIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" className={`${className} ${animationClass}`}>
      <defs>
        <linearGradient id="exposedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
      </defs>
      {/* Cracked Teacup */}
      <path d="M8 12 L8 20 C8 22, 10 24, 12 24 L20 24 C22 24, 24 22, 24 20 L24 12 Z" 
            fill="url(#exposedGradient)" stroke="#991b1b" strokeWidth="1.5"/>
      {/* Handle */}
      <path d="M24 16 C28 16, 28 20, 24 20" stroke="#dc2626" strokeWidth="2" fill="none"/>
      {/* Cracks */}
      <path d="M10 14 L14 18 L18 14 L22 18" stroke="#7f1d1d" strokeWidth="1" fill="none"/>
      <path d="M16 12 L16 24" stroke="#7f1d1d" strokeWidth="1" fill="none"/>
      {/* Skull */}
      <circle cx="16" cy="16" r="4" fill="#f3f4f6" stroke="#7f1d1d" strokeWidth="1"/>
      <circle cx="14.5" cy="15" r="0.5" fill="#7f1d1d"/>
      <circle cx="17.5" cy="15" r="0.5" fill="#7f1d1d"/>
      {/* Emoji */}
      <text x="16" y="28" textAnchor="middle" fontSize="6" fill="#dc2626">💀</text>
    </svg>
  );

  switch (type) {
    case 'spill':
      return <SpillIcon />;
    case 'dead':
      return <DeadIcon />;
    case 'watching':
      return <WatchingIcon />;
    case 'exposed':
      return <ExposedIcon />;
    default:
      return <SpillIcon />;
  }
};

export default TeacupReactions;
