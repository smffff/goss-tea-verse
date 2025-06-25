
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, UserX, Flame } from 'lucide-react';

interface FloatingBadge {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const badges: FloatingBadge[] = [
  { id: 'top-spiller', label: '🫖 Top Spiller', icon: <Crown className="w-3 h-3" />, color: 'bg-vintage-red' },
  { id: 'anonymous-oracle', label: '🕵️ Anonymous Oracle', icon: <UserX className="w-3 h-3" />, color: 'bg-tabloid-black' },
  { id: 'ai-favorite', label: '🔥 AI Favorite', icon: <Flame className="w-3 h-3" />, color: 'bg-gradient-to-r from-vintage-red to-tabloid-black' }
];

const FloatingBadges = () => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-floating-badges space-y-2 hidden lg:block">
      {badges.map((badge) => (
        <Badge 
          key={badge.id}
          className={`${badge.color} text-white px-3 py-2 text-xs font-bold shadow-xl animate-pulse hover:animate-none transition-all cursor-pointer border border-white/20`}
        >
          {badge.label}
        </Badge>
      ))}
    </div>
  );
};

export default FloatingBadges;
