import { Home, Coffee, TrendingUp, Trophy, Info, HelpCircle, Users, Map, DollarSign } from 'lucide-react';

export const navigationItems = [
  { path: '/', label: 'The Teahouse', icon: Home },
  { path: '/spill', label: 'Spill the Tea', icon: Coffee },
  { path: '/feed', label: 'Tea Feed', icon: TrendingUp },
  { path: '/leaderboard', label: 'Spillerboard', icon: Trophy },
  { path: '/about', label: 'About', icon: Info },
  { path: '/roadmap', label: 'Roadmap', icon: Map },
  { path: '/team', label: 'Team', icon: Users },
  { path: '/investors', label: 'Investors', icon: DollarSign },
  { path: '/faq', label: 'FAQ', icon: HelpCircle },
];
