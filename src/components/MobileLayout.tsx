
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coffee, TrendingUp, Users, Plus, Award } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUserProgression } from '@/hooks/useUserProgression';

const MobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { progression, currentLevel } = useUserProgression();

  const navItems = [
    { path: '/feed', label: 'Feed', icon: TrendingUp },
    { path: '/submit', label: 'Submit', icon: Plus },
    { path: '/', label: 'Home', icon: Coffee },
    { path: '/governance', label: 'Vote', icon: Users },
    { path: '/token', label: 'Token', icon: Award },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Top Bar */}
      <div className="bg-ctea-dark/90 backdrop-blur-lg border-b border-ctea-teal/20 p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-ctea-teal to-ctea-purple rounded-lg flex items-center justify-center">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white">CTEA NEWS</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Badge className="bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30 text-xs">
              L{currentLevel.level}
            </Badge>
            <Badge className="bg-ctea-yellow/20 text-ctea-yellow border border-ctea-yellow/30 text-xs">
              {progression.tea_points}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-ctea-dark/95 backdrop-blur-lg border-t border-ctea-teal/20 p-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                    isActive 
                      ? 'text-ctea-teal bg-ctea-teal/10' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
