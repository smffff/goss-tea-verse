
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { IMAGES, ALT_TEXT } from '@/config/images';

interface User {
  username?: string;
  email?: string;
}

interface UserSectionProps {
  user: User | null;
  onSignOut: () => void;
}

const UserSection: React.FC<UserSectionProps> = ({ user, onSignOut }) => {
  if (!user) {
    return (
      <Link to="/auth" className="hidden md:block">
        <Button 
          variant="outline" 
          size="sm"
          className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background"
        >
          Join the Tea
        </Button>
      </Link>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-3">
      <div className="text-right">
        <p className="text-sm font-semibold text-brand-text">
          {user.username || user.email?.split('@')[0] || 'Anonymous'}
        </p>
        <p className="text-xs text-brand-text-secondary">Tea Spiller</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onSignOut}
        className="text-brand-text-secondary hover:text-brand-text hover:bg-brand-neutral/50"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default UserSection;
