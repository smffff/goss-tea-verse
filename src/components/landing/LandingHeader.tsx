
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface LandingHeaderProps {
  user: any;
  isAdmin: boolean;
  isModerator: boolean;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ user, isAdmin, isModerator }) => {
  return (
    <div className="bg-ctea-dark/95 backdrop-blur-lg border-b border-ctea-teal/20 px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-ctea-teal text-sm font-medium">
          ☕ The Ultimate Crypto Gossip Platform
        </div>
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-white text-sm hidden sm:block">Welcome back!</span>
              {(isAdmin || isModerator) && (
                <Link to="/admin">
                  <Button size="sm" variant="outline" className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal hover:text-black">
                    Admin Panel
                  </Button>
                </Link>
              )}
              <Link to="/feed">
                <Button size="sm" className="bg-ctea-teal hover:bg-ctea-teal/80 text-black font-bold">
                  Enter App
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/auth">
              <Button size="sm" variant="outline" className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal hover:text-black">
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
