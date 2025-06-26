
import React from 'react';

interface ReactionIconProps {
  type: 'flame' | 'ice' | 'teacup';
  size?: number;
  className?: string;
}

const ReactionIcons: React.FC<ReactionIconProps> = ({ type, size = 24, className = '' }) => {
  const iconSize = `${size}px`;

  const FlameIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" className={className}>
      <path
        fill="url(#flameGradient)"
        d="M12.5 2c0 0-5 4.5-5 10.5 0 3.03 2.47 5.5 5.5 5.5s5.5-2.47 5.5-5.5c0-2.5-2-4.5-2-4.5s1 1.5 1 3c0 1.1-.9 2-2 2s-2-.9-2-2c0-2.5-1-9-1-9z"
        stroke="#dc2626"
        strokeWidth="1"
      />
      <defs>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
    </svg>
  );

  const IceIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" className={className}>
      <path
        fill="url(#iceGradient)"
        d="M12 2L9.5 7h5L12 2zm0 20l2.5-5h-5L12 22zm10-10l-5 2.5v-5L22 12zM2 12l5-2.5v5L2 12zm15.5-3.5L15 11h2.5l2.5-2.5zm-11 0L4 11h2.5L9 8.5zm11 7L15 13h2.5l2.5 2.5zm-11 0L4 13h2.5L9 15.5z"
        stroke="#0ea5e9"
        strokeWidth="0.5"
      />
      <defs>
        <linearGradient id="iceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
    </svg>
  );

  const TeacupIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" className={className}>
      <path
        fill="url(#teacupGradient)"
        d="M3 17h16l-1-4H4l-1 4zm1-6h14l-2-8H6l-2 8zm15-5v2h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2z"
        stroke="#8b5cf6"
        strokeWidth="0.5"
      />
      <circle cx="7" cy="15" r="1" fill="#fbbf24" />
      <circle cx="11" cy="15" r="1" fill="#fbbf24" />
      <circle cx="15" cy="15" r="1" fill="#fbbf24" />
      <defs>
        <linearGradient id="teacupGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="50%" stopColor="#d1d5db" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>
      </defs>
    </svg>
  );

  switch (type) {
    case 'flame':
      return <FlameIcon />;
    case 'ice':
      return <IceIcon />;
    case 'teacup':
      return <TeacupIcon />;
    default:
      return null;
  }
};

export default ReactionIcons;
