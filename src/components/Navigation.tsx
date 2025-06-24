import React from 'react';
import { Button } from '@/components/ui/button';
import TeaCup from './TeaCup';
import UserStats from './UserStats';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Coffee, PlusCircle, TrendingUp } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/feed', label: 'Hot Takes', icon: TrendingUp },
    { path: '/submit', label: 'Spill Tea', icon: PlusCircle }
  ];

  const isActive = (path: string) => location.pathname === path;

  const [darkMode, setDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ctea-dark-mode') === 'true';
    }
    return true;
  });

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ctea-dark-mode', darkMode);
  }, [darkMode]);

  return (
    <header className="border-b border-ctea-teal/30 bg-ctea-darker/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/ctea-logo-icon.svg" alt="CTEA Logo" className="h-8 w-8" style={{ height: 32, width: 32 }} />
            <div>
              <h1 className="text-xl font-bold text-white animate-glow font-montserrat">CTea Newsroom</h1>
              <p className="text-xs text-ctea-teal font-montserrat">Beta • Managed Chaos, Served Hot</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                variant={isActive(path) ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(path)}
                className={`flex items-center gap-2 ${
                  isActive(path) 
                    ? 'bg-gradient-ctea text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-ctea-teal/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </nav>

          {/* User Stats (Desktop) */}
          <div className="hidden lg:block w-80">
            <UserStats />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/feed')}
              className="border-ctea-teal text-ctea-teal"
            >
              Feed
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('/submit')}
              className="bg-gradient-ctea text-white"
            >
              <Coffee className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-ctea-teal data-[state=checked]:to-ctea-pink border-ctea-teal"
              />
              <span className="text-xs text-gray-400">Dark</span>
            </div>
          </div>
        </div>

        {/* Mobile User Stats */}
        <div className="lg:hidden mt-3">
          <UserStats />
        </div>
      </div>
    </header>
  );
};

export default Navigation;
