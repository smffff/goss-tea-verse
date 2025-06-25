
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Flame, Snowflake, Zap, Eye, Bot, ChefHat, Target } from 'lucide-react';

interface HotTakesFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const HotTakesFilters: React.FC<HotTakesFiltersProps> = ({
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange
}) => {
  const filters = [
    { id: 'all', label: 'All Tea', icon: TrendingUp, color: 'text-white' },
    { id: 'hot', label: 'Hot', icon: Flame, color: 'text-red-400' },
    { id: 'cold', label: 'Cold', icon: Snowflake, color: 'text-blue-400' },
    { id: 'spicy', label: 'Spicy', icon: ChefHat, color: 'text-orange-400' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, color: 'text-yellow-400' },
    { id: 'verified', label: 'Verified', icon: Eye, color: 'text-green-400' },
    { id: 'ai-commented', label: 'AI Rated', icon: Bot, color: 'text-purple-400' },
    // New AI rating filters
    { id: 'spiciest', label: 'Spiciest (8+)', icon: Flame, color: 'text-red-500' },
    { id: 'chaotic', label: 'Chaotic (8+)', icon: Zap, color: 'text-orange-500' },
    { id: 'relevant', label: 'Relevant (8+)', icon: Target, color: 'text-green-500' },
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'reactions', label: 'Most Reactions' },
    { value: 'spiciest', label: 'Spiciest First' },
    { value: 'chaotic', label: 'Most Chaotic' },
    { value: 'relevant', label: 'Most Relevant' },
    { value: 'boosted', label: 'Boosted' },
    { value: 'controversial', label: 'Controversial' },
  ];

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          
          return (
            <Button
              key={filter.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter.id)}
              className={`
                ${isActive 
                  ? 'bg-gradient-to-r from-ctea-teal to-ctea-purple text-white border-0' 
                  : 'border-ctea-teal/30 text-gray-300 hover:bg-ctea-teal/10 hover:text-white hover:border-ctea-teal'
                }
                transition-all duration-200
              `}
            >
              <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : filter.color}`} />
              {filter.label}
              {(filter.id === 'spiciest' || filter.id === 'chaotic' || filter.id === 'relevant') && (
                <Badge className="ml-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs">
                  AI
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">Sort by:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-48 bg-ctea-dark border-ctea-teal/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-ctea-dark border-ctea-teal/30">
            {sortOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="text-white hover:bg-ctea-teal/20 focus:bg-ctea-teal/20"
              >
                {option.label}
                {(option.value === 'spiciest' || option.value === 'chaotic' || option.value === 'relevant') && (
                  <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs">
                    AI
                  </Badge>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filter Info */}
      {activeFilter !== 'all' && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Filtering by:</span>
          <Badge className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/30">
            {filters.find(f => f.id === activeFilter)?.label}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange('all')}
            className="text-gray-400 hover:text-white h-6 px-2"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default HotTakesFilters;
