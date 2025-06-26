
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Eye, TrendingUp, Users } from 'lucide-react';

interface AppTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AppTabs: React.FC<AppTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsList className="grid w-full grid-cols-4 bg-ctea-dark/50 border border-ctea-teal/30">
      <TabsTrigger 
        value="beta" 
        className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black"
        onClick={() => onTabChange('beta')}
      >
        <Lock className="w-4 h-4 mr-2" />
        Beta Access
      </TabsTrigger>
      <TabsTrigger 
        value="preview" 
        className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black"
        onClick={() => onTabChange('preview')}
      >
        <Eye className="w-4 h-4 mr-2" />
        Preview
      </TabsTrigger>
      <TabsTrigger 
        value="trending" 
        className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black"
        onClick={() => onTabChange('trending')}
      >
        <TrendingUp className="w-4 h-4 mr-2" />
        Trending
      </TabsTrigger>
      <TabsTrigger 
        value="community" 
        className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black"
        onClick={() => onTabChange('community')}
      >
        <Users className="w-4 h-4 mr-2" />
        Community
      </TabsTrigger>
    </TabsList>
  );
};

export default AppTabs;
