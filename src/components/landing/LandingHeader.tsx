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
    <div className="bg-black/95 backdrop-blur-lg border-b-4 border-red-600 px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-red-500 text-sm font-medium">
          ☕ The Ultimate Crypto Gossip Platform
        </div>
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-white text-sm hidden sm:block">Welcome back!</span>
              {(isAdmin || isModerator) && (
                <Link to="/admin">
                  <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                    Admin Panel
                  </Button>
                </Link>
              )}
              <Link to="/feed">
                <Button size="sm" className="bg-red-600 hover:bg-black text-white font-bold">
                  Enter App
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/auth">
              <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
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
