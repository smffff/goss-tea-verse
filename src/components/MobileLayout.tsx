import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Plus, 
  TrendingUp, 
  Trophy, 
  Coins, 
  Vote, 
  Menu, 
  X,
  User,
  Settings,
  Bell
} from 'lucide-react';
import { useUserProgression } from '@/hooks/useUserProgression';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userProgression } = useUserProgression();
  const isMobile = useIsMobile();

  const navigationItems = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/feed', label: 'Feed', icon: <TrendingUp className="w-5 h-5" /> },
    { path: '/submit', label: 'Submit', icon: <Plus className="w-5 h-5" /> },
    { path: '/campaigns', label: 'Leaderboard', icon: <Trophy className="w-5 h-5" /> },
    { path: '/token', label: 'Token', icon: <Coins className="w-5 h-5" /> },
    { path: '/governance', label: 'Governance', icon: <Vote className="w-5 h-5" /> }
  ];

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLogoClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-dark to-ctea-darker">
      {/* Mobile Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-ctea-darker/95 backdrop-blur-md border-b border-ctea-teal/30' 
          : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLogoClick}
          >
            <img 
              src="/ctea-logo-icon.svg" 
              alt="CTEA Logo" 
              className="w-8 h-8" 
            />
            <h1 className="text-lg font-bold text-white">
              CTea
            </h1>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {userProgression && (
              <Badge className="bg-gradient-to-r from-ctea-yellow to-ctea-orange text-ctea-dark font-bold text-xs">
                {userProgression.tea_points} $TEA
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-ctea-teal/20 p-2"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className="absolute top-16 left-0 right-0 bg-ctea-darker/95 backdrop-blur-md border-b border-ctea-teal/30 animate-slide-down">
            <div className="p-4">
              {/* User Info */}
              {userProgression && (
                <div className="flex items-center gap-3 p-4 bg-ctea-dark/50 rounded-lg border border-ctea-teal/20 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-ctea-teal to-ctea-blue rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">CTea User</p>
                    <p className="text-ctea-teal text-sm">{userProgression.tea_points} $TEA</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-ctea-teal">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Navigation Items */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className={`w-full justify-start gap-3 h-12 ${
                      isActive(item.path)
                        ? 'bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30'
                        : 'text-gray-300 hover:text-white hover:bg-ctea-dark/50'
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Button>
                ))}
              </nav>

              {/* Additional Actions */}
              <div className="mt-6 pt-6 border-t border-ctea-teal/20 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-12 text-gray-300 hover:text-white hover:bg-ctea-dark/50"
                >
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">Notifications</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-12 text-gray-300 hover:text-white hover:bg-ctea-dark/50"
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-ctea-darker/95 backdrop-blur-md border-t border-ctea-teal/30">
        <div className="flex items-center justify-around h-16 px-2">
          {navigationItems.slice(1, 5).map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-12 w-12 p-0 ${
                isActive(item.path)
                  ? 'text-ctea-teal'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout; 