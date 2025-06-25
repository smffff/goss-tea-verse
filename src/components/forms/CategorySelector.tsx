
import React from 'react';
import { Label } from '@/components/ui/label';

interface CategorySelectorProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { value: 'general', label: 'General Tea', icon: '☕' },
  { value: 'defi', label: 'DeFi Drama', icon: '🏦' },
  { value: 'nft', label: 'NFT Gossip', icon: '🖼️' },
  { value: 'memecoin', label: 'Memecoin Alpha', icon: '🚀' },
  { value: 'exchange', label: 'Exchange News', icon: '📊' },
  { value: 'protocol', label: 'Protocol Updates', icon: '⚡' },
  { value: 'celeb', label: 'Crypto Celebrities', icon: '👑' },
  { value: 'regulation', label: 'Regulatory News', icon: '⚖️' }
];

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div>
      <Label className="text-gray-300 mb-3 block">Category</Label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => onCategoryChange(category.value)}
            className={`p-3 rounded-lg border transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent ${
              selectedCategory === category.value
                ? 'bg-accent/20 border-accent text-accent'
                : 'bg-ctea-dark/50 border-ctea-teal/30 text-gray-300 hover:bg-ctea-dark/70 hover:border-accent/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{category.icon}</span>
              <span className="hidden sm:inline">{category.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
