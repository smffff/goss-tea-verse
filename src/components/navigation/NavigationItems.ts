
import { Home, Coffee, TrendingUp, Trophy, Info, HelpCircle, Users, Map, DollarSign, Settings, User } from 'lucide-react';

export interface NavigationItem {
  path: string;
  label: string;
  icon: any;
  description?: string;
  external?: boolean;
}

// Main navigation items for the app
export const mainNavigationItems: NavigationItem[] = [
  { 
    path: '/', 
    label: 'Home', 
    icon: Home,
    description: 'CTea Newsroom landing page'
  },
  { 
    path: '/feed', 
    label: 'Tea Feed', 
    icon: TrendingUp,
    description: 'Latest crypto gossip and tea'
  },
  { 
    path: '/spill', 
    label: 'Spill Tea', 
    icon: Coffee,
    description: 'Submit anonymous crypto gossip'
  },
  { 
    path: '/leaderboard', 
    label: 'Spillerboard', 
    icon: Trophy,
    description: 'Top tea spillers and community leaders'
  }
];

// Secondary navigation items
export const secondaryNavigationItems: NavigationItem[] = [
  { 
    path: '/about', 
    label: 'About', 
    icon: Info,
    description: 'Learn about CTea Newsroom'
  },
  { 
    path: '/roadmap', 
    label: 'Roadmap', 
    icon: Map,
    description: 'Our development roadmap'
  },
  { 
    path: '/team', 
    label: 'Team', 
    icon: Users,
    description: 'Meet the team behind CTea'
  },
  { 
    path: '/investors', 
    label: 'Investors', 
    icon: DollarSign,
    description: 'Investment information'
  }
];

// Footer navigation items
export const footerNavigationItems: NavigationItem[] = [
  { path: '/faq', label: 'FAQ', icon: HelpCircle },
  { path: '/contact', label: 'Contact', icon: User },
  { path: '/privacy', label: 'Privacy', icon: Info },
  { path: '/terms', label: 'Terms', icon: Info }
];

// User account navigation
export const userNavigationItems: NavigationItem[] = [
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/auth', label: 'Sign In', icon: User }
];

// Mobile navigation (simplified for bottom nav)
export const mobileNavigationItems: NavigationItem[] = [
  { path: '/feed', label: 'Feed', icon: TrendingUp },
  { path: '/spill', label: 'Spill', icon: Coffee },
  { path: '/', label: 'Home', icon: Home },
  { path: '/leaderboard', label: 'Top', icon: Trophy },
  { path: '/about', label: 'About', icon: Users }
];
