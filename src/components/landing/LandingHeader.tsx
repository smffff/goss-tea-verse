import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Moon, Sun } from 'lucide-react';

interface LandingHeaderProps {
  user: any;
  isAdmin: boolean;
  isModerator: boolean;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ user, isAdmin, isModerator }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add dark mode toggle logic here
  };

  return (
    <div className="bg-brand-background/95 backdrop-blur-lg border-b border-brand-primary/20 px-4 py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <img 
            src="/assets/logo-teacup-drip.svg" 
            alt="CTea News" 
            className="h-8 w-8 logo animate-wiggle"
          />
          <div className="text-brand-text font-bold text-lg">
            CTea News
          </div>
        </div>

        {/* Navigation and Actions */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="text-brand-text hover:bg-brand-primary/10 transition-all duration-200"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-brand-text text-sm hidden sm:block">Welcome back!</span>
              {(isAdmin || isModerator) && (
                <Link to="/admin">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background transition-all duration-200"
                  >
                    Admin Panel
                  </Button>
                </Link>
              )}
              <Link to="/feed">
                <Button 
                  size="sm" 
                  className="btn-brand-primary"
                >
                  Enter the Newsroom
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/auth">
              <Button 
                size="sm" 
                variant="outline" 
                className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background transition-all duration-200"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
