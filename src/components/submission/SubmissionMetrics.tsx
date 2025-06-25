import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award } from 'lucide-react';

interface SubmissionMetricsProps {
  ratingCount: number;
  hasEvidence: boolean;
  boostScore?: number;
  credibilityScore?: number;
}

const SubmissionMetrics: React.FC<SubmissionMetricsProps> = ({
  ratingCount,
  hasEvidence,
  boostScore,
  credibilityScore
}) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <Badge className="bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30">
        <TrendingUp className="w-3 h-3 mr-1" />
        {ratingCount} reactions
      </Badge>
      
      {hasEvidence && (
        <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
          🔍 Verified Evidence
        </Badge>
      )}
      
      {boostScore && boostScore > 0 && (
        <Badge className="bg-ctea-yellow/20 text-ctea-yellow border border-ctea-yellow/30">
          🚀 Boosted
        </Badge>
      )}
      
      {credibilityScore && credibilityScore > 70 && (
        <Badge className="bg-ctea-purple/20 text-ctea-purple border border-ctea-purple/30">
          <Award className="w-3 h-3 mr-1" />
          High Credibility
        </Badge>
      )}
    </div>
  );
};

export default SubmissionMetrics;
