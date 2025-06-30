
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Home, TrendingUp } from 'lucide-react';

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavigationItemsProps {
  isActive: (path: string) => boolean;
}

const NavigationItems: React.FC<NavigationItemsProps> = ({ isActive }) => {
  const navigationItems: NavigationItem[] = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/home', label: 'Dashboard', icon: TrendingUp },
  ];

  return (
    <div className="hidden md:flex items-center space-x-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className="group relative"
          >
            <motion.div
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                isActive(item.path)
                  ? 'bg-brand-primary/20 text-brand-primary'
                  : 'text-brand-text-secondary hover:text-brand-text hover:bg-brand-neutral/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <Badge className="bg-brand-primary/20 text-brand-primary border-brand-primary/30 text-xs">
                  {item.badge}
                </Badge>
              )}
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationItems;
