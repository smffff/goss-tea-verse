
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, TrendingUp, Heart, MessageSquare } from 'lucide-react';
import ViralCTA from '@/components/ui/ViralCTA';
import StatsDisplay from './StatsDisplay';

interface PreviewContentProps {
  mockData: {
    hotSpills: Array<{
      id: number;
      content: string;
      heat: number;
      comments: number;
    }>;
  };
  stats: {
    totalSpills: number;
    activeUsers: number;
    hotTopics: number;
    dailyGrowth: number;
  };
  onSubmissionModalOpen: () => void;
}

const PreviewContent: React.FC<PreviewContentProps> = ({
  mockData,
  stats,
  onSubmissionModalOpen
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Hot Spills */}
      <Card className="bg-ctea-dark/80 border-pink-400/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Coffee className="w-5 h-5 mr-2 text-pink-400" />
            Hottest Tea ☕
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockData.hotSpills.map((spill) => (
            <div key={spill.id} className="bg-ctea-darker rounded-lg p-4 border border-pink-400/20">
              <p className="text-gray-300 mb-3 text-sm">{spill.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span className="flex items-center">
                    <Heart className="w-3 h-3 mr-1" />
                    {spill.heat}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {spill.comments}
                  </span>
                </div>
                <Badge variant="secondary" className="bg-pink-400/20 text-pink-400">
                  Hot
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Live Stats */}
      <Card className="bg-ctea-dark/80 border-ctea-teal/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-ctea-teal" />
            Live Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <StatsDisplay stats={stats} />
          
          <ViralCTA
            variant="spill"
            size="md"
            onClick={onSubmissionModalOpen}
            className="w-full"
            showParticles={false}
            shakeOnHover={false}
          >
            Spill Some Tea 🫖
          </ViralCTA>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewContent;
