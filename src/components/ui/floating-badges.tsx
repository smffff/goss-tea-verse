
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
  { id: 'top-spiller', label: '🫖 Top Spiller', icon: <Crown className="w-3 h-3" />, color: 'bg-amber-500' },
  { id: 'anonymous-oracle', label: '🕵️ Anonymous Oracle', icon: <UserX className="w-3 h-3" />, color: 'bg-gray-600' },
  { id: 'ai-favorite', label: '🔥 AI Favorite', icon: <Flame className="w-3 h-3" />, color: 'bg-red-500' }
];

const FloatingBadges = () => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 space-y-2">
      {badges.map((badge) => (
        <Badge 
          key={badge.id}
          className={`${badge.color} text-white px-2 py-1 text-xs font-bold shadow-lg animate-pulse hover:animate-none transition-all cursor-pointer`}
        >
          {badge.label}
        </Badge>
      ))}
    </div>
  );
};

export default FloatingBadges;
