import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flame, TrendingUp, Zap, Clock, Crown } from 'lucide-react';

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
    { id: 'all', label: 'All', icon: <Clock className="w-4 h-4" /> },
    { id: 'hot', label: 'Hot Takes', icon: <Flame className="w-4 h-4" /> },
    { id: 'spicy', label: 'Spicy', icon: <Zap className="w-4 h-4" /> },
    { id: 'trending', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'boosted', label: 'Boosted', icon: <Crown className="w-4 h-4" /> }
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'reactions', label: 'Most Reactions' },
    { value: 'controversial', label: 'Controversial' },
    { value: 'boosted', label: 'Most Boosted' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            size="sm"
            variant={activeFilter === filter.id ? "default" : "outline"}
            onClick={() => onFilterChange(filter.id)}
            className={`flex items-center gap-2 ${
              activeFilter === filter.id
                ? 'bg-gradient-ctea text-white'
                : 'border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10'
            }`}
          >
            {filter.icon}
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">Sort by:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-40 bg-ctea-dark/50 border-ctea-teal/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-ctea-darker border-ctea-teal/30">
            {sortOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-white hover:bg-ctea-teal/20 focus:bg-ctea-teal/20"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HotTakesFilters;
