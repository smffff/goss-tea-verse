
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Snowflake, TrendingUp, Clock, Award } from 'lucide-react';

interface HotTakesFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const HotTakesFilters = ({ activeFilter, onFilterChange, sortBy, onSortChange }: HotTakesFiltersProps) => {
  const filters = [
    { id: 'all', label: 'All Takes', icon: TrendingUp },
    { id: 'hot', label: 'Hot', icon: Flame },
    { id: 'spicy', label: 'Spicy', icon: '🌶️' },
    { id: 'trending', label: 'Trending', icon: Award }
  ];

  const sortOptions = [
    { id: 'latest', label: 'Latest', icon: Clock },
    { id: 'reactions', label: 'Most Reactions', icon: Flame },
    { id: 'controversial', label: 'Controversial', icon: '⚡' }
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Category Filters */}
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-2">Filter by Type</h3>
        <div className="flex flex-wrap gap-2">
          {filters.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeFilter === id ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(id)}
              className={`${
                activeFilter === id 
                  ? 'bg-gradient-ctea text-white' 
                  : 'border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10'
              }`}
            >
              {typeof Icon === 'string' ? (
                <span className="mr-1">{Icon}</span>
              ) : (
                <Icon className="w-3 h-3 mr-1" />
              )}
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-2">Sort by</h3>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={sortBy === id ? "default" : "ghost"}
              size="sm"
              onClick={() => onSortChange(id)}
              className={`${
                sortBy === id 
                  ? 'bg-ctea-purple text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-ctea-purple/20'
              }`}
            >
              {typeof Icon === 'string' ? (
                <span className="mr-1">{Icon}</span>
              ) : (
                <Icon className="w-3 h-3 mr-1" />
              )}
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {(activeFilter !== 'all' || sortBy !== 'latest') && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Active:</span>
          {activeFilter !== 'all' && (
            <Badge variant="outline" className="border-ctea-teal/30 text-ctea-teal">
              {filters.find(f => f.id === activeFilter)?.label}
            </Badge>
          )}
          {sortBy !== 'latest' && (
            <Badge variant="outline" className="border-ctea-purple/30 text-ctea-purple">
              {sortOptions.find(s => s.id === sortBy)?.label}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onFilterChange('all');
              onSortChange('latest');
            }}
            className="text-xs text-gray-500 hover:text-ctea-teal"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default HotTakesFilters;
