
import React from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface CategorySelectorProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySelector = ({ selectedCategory, onCategoryChange }: CategorySelectorProps) => {
  const categories = [
    { id: 'gossip', label: 'Hot Gossip', emoji: '☕' },
    { id: 'drama', label: 'Pure Drama', emoji: '🎭' },
    { id: 'rumors', label: 'Wild Rumors', emoji: '👂' },
    { id: 'exposed', label: 'Exposed', emoji: '👀' },
    { id: 'memes', label: 'Meme Drama', emoji: '🐸' }
  ];

  return (
    <div className="space-y-3">
      <Label className="text-white font-medium">Choose Your Drama Category</Label>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Badge
            key={cat.id}
            className={`cursor-pointer transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-ctea-pink to-ctea-purple text-white'
                : 'bg-ctea-dark border-ctea-teal/30 text-gray-300 hover:bg-ctea-teal/20'
            }`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.emoji} {cat.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
