
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const topics = [
  { value: 'general', label: 'General Tea' },
  { value: 'tech', label: 'Tech Drama' },
  { value: 'crypto', label: 'Crypto Gossip' },
  { value: 'defi', label: 'DeFi Drama' },
  { value: 'nft', label: 'NFT Tea' },
  { value: 'web3', label: 'Web3 Rumors' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'politics', label: 'Politics' },
  { value: 'business', label: 'Business' },
];

interface TopicSelectorProps {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({
  selectedTopic,
  onTopicChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="topic" className="text-white font-medium">
        Topic Category
      </Label>
      <Select value={selectedTopic} onValueChange={onTopicChange}>
        <SelectTrigger className="bg-ctea-darker border-ctea-teal/30 text-white">
          <SelectValue placeholder="Select a topic category" />
        </SelectTrigger>
        <SelectContent className="bg-ctea-darker border-ctea-teal/30">
          {topics.map((topic) => (
            <SelectItem 
              key={topic.value} 
              value={topic.value}
              className="text-white hover:bg-ctea-teal/20"
            >
              {topic.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TopicSelector;
