
import React from 'react';
import { Card } from '@/components/ui/card';
import { Crown, Users, Vote, Target } from 'lucide-react';

interface GovernanceStatsProps {
  userVotingPower: number;
  totalVotingPower: number;
  activeProposalsCount: number;
  totalProposalsCount: number;
}

const GovernanceStats: React.FC<GovernanceStatsProps> = ({
  userVotingPower,
  totalVotingPower,
  activeProposalsCount,
  totalProposalsCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-6 bg-gradient-to-br from-ctea-teal/20 to-ctea-blue/20 border-ctea-teal/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-ctea-teal text-sm font-medium">Your Voting Power</p>
            <p className="text-white text-2xl font-bold">{userVotingPower.toLocaleString()}</p>
          </div>
          <Crown className="w-8 h-8 text-ctea-teal" />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-ctea-purple text-sm font-medium">Total Voting Power</p>
            <p className="text-white text-2xl font-bold">{totalVotingPower.toLocaleString()}</p>
          </div>
          <Users className="w-8 h-8 text-ctea-purple" />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-400 text-sm font-medium">Active Proposals</p>
            <p className="text-white text-2xl font-bold">{activeProposalsCount}</p>
          </div>
          <Vote className="w-8 h-8 text-green-400" />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-ctea-yellow/20 to-ctea-orange/20 border-ctea-yellow/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-ctea-yellow text-sm font-medium">Total Proposals</p>
            <p className="text-white text-2xl font-bold">{totalProposalsCount}</p>
          </div>
          <Target className="w-8 h-8 text-ctea-yellow" />
        </div>
      </Card>
    </div>
  );
};

export default GovernanceStats;
