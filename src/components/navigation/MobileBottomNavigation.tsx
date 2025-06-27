
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Coffee, TrendingUp, Trophy, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAccess } from '@/hooks/useAdminAccess';

const MobileBottomNavigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { hasAdminAccess } = useAdminAccess();

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/feed', label: 'Feed', icon: TrendingUp },
    { path: '/spill', label: 'Spill', icon: Coffee, badge: 'Hot' },
    { path: '/leaderboard', label: 'Board', icon: Trophy },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-tabloid-black-900/95 backdrop-blur-lg border-t border-vintage-red/20 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link key={item.path} to={item.path} className="flex-1">
              <Button
                variant="ghost"
                size="sm"
                className={`w-full flex flex-col items-center gap-1 h-auto py-2 px-1 transition-all duration-200 ${
                  active 
                    ? 'text-vintage-red bg-vintage-red/10 scale-105' 
                    : 'text-gray-400 hover:text-white hover:scale-105'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && (
                    <Badge className="absolute -top-2 -right-2 scale-75 bg-vintage-red/20 text-vintage-red border-vintage-red/30 text-xs px-1">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium leading-none">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNavigation;
