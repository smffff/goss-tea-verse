
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation } from 'react-router-dom';
import { useUserProgression } from '@/hooks/useUserProgression';
import { BrandLogo } from '@/components/brand/BrandElements';
import { mobileNavigationItems } from '@/components/navigation/NavigationItems';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

const MobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { progression, currentLevel } = useUserProgression();

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tabloid-black-900 via-tabloid-black-800 to-black">
      {/* Top Bar */}
      <div className="bg-tabloid-black-900/90 backdrop-blur-lg border-b border-vintage-red/20 p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BrandLogo size="sm" variant="subtle" />
            <span className="font-bold text-lg text-white font-headline">
              {BRAND_CONFIG.name}
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Badge className="bg-vintage-red/20 text-vintage-red border border-vintage-red/30 text-xs">
              L{currentLevel.level}
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs">
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
      <div className="fixed bottom-0 left-0 right-0 bg-tabloid-black-900/95 backdrop-blur-lg border-t border-vintage-red/20 p-2 z-50">
        <div className="flex items-center justify-around">
          {mobileNavigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <Link key={item.path} to={item.path} aria-label={`Navigate to ${item.label}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 transition-all duration-200 ${
                    isActive 
                      ? 'text-vintage-red bg-vintage-red/10 scale-110' 
                      : 'text-gray-400 hover:text-white hover:scale-105'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
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
