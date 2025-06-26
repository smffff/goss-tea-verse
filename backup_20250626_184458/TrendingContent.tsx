
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Crown, Heart } from 'lucide-react';

interface TrendingContentProps {
  mockData: {
    trendingTopics: Array<{
      name: string;
      count: number;
      trend: string;
    }>;
    recentSpills: Array<{
      id: number;
      content: string;
      author: string;
      time: string;
      reactions: number;
    }>;
  };
}

const TrendingContent: React.FC<TrendingContentProps> = ({ mockData }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-ctea-dark/80 border-ctea-purple/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Star className="w-5 h-5 mr-2 text-ctea-purple" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockData.trendingTopics.map((topic, index) => (
            <div key={topic.name} className="flex items-center justify-between p-3 bg-ctea-darker rounded-lg border border-ctea-purple/20">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-ctea-purple/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-ctea-purple">#{index + 1}</span>
                </div>
                <div>
                  <div className="text-white font-medium">{topic.name}</div>
                  <div className="text-sm text-gray-400">{topic.count} mentions</div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-400/20 text-green-400">
                {topic.trend}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-ctea-dark/80 border-yellow-400/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Crown className="w-5 h-5 mr-2 text-yellow-400" />
            Recent Spills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockData.recentSpills.map((spill) => (
            <div key={spill.id} className="p-3 bg-ctea-darker rounded-lg border border-yellow-400/20">
              <p className="text-gray-300 text-sm mb-2">{spill.content}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>by {spill.author}</span>
                <div className="flex items-center space-x-3">
                  <span>{spill.time}</span>
                  <span className="flex items-center">
                    <Heart className="w-3 h-3 mr-1" />
                    {spill.reactions}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendingContent;
