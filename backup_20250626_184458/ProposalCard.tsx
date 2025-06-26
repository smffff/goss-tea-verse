
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Vote, 
  Zap, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Clock 
} from 'lucide-react';
import { GovernanceProposal, UserVote } from '@/types/governance';

interface ProposalCardProps {
  proposal: GovernanceProposal;
  userVote?: UserVote;
  userVotingPower: number;
  onVote: (proposalId: number, vote: 'for' | 'against' | 'abstain') => void;
  onExecute: (proposalId: number) => void;
  canExecute: boolean;
  getProposalStatus: (proposal: GovernanceProposal) => string;
  getTimeRemaining: (endTime: number) => string;
  getVotePercentage: (votes: number, total: number) => number;
  isLoading: boolean;
}

const ProposalCard: React.FC<ProposalCardProps> = ({
  proposal,
  userVote,
  userVotingPower,
  onVote,
  onExecute,
  canExecute,
  getProposalStatus,
  getTimeRemaining,
  getVotePercentage,
  isLoading
}) => {
  const status = getProposalStatus(proposal);
  const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
  const totalVotingPower = 50000; // Mock total

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'passed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'executed': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'governance': return <Vote className="w-4 h-4" />;
      case 'feature': return <Zap className="w-4 h-4" />;
      case 'economic': return <TrendingUp className="w-4 h-4" />;
      case 'emergency': return <AlertCircle className="w-4 h-4" />;
      default: return <Vote className="w-4 h-4" />;
    }
  };

  return (
    <Card className="p-6 bg-ctea-dark/50 border-ctea-teal/20">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getCategoryIcon(proposal.category)}
              <h3 className="text-lg font-bold text-white">{proposal.title}</h3>
              <Badge className={getStatusColor(status)}>
                {status.toUpperCase()}
              </Badge>
            </div>
            <p className="text-gray-400 text-sm mb-2">{proposal.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>By: {proposal.creator}</span>
              <span>Quorum: {proposal.quorum}%</span>
              <span>{getTimeRemaining(proposal.endTime)}</span>
            </div>
          </div>
        </div>

        {/* Voting Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Voting Progress:</span>
            <span className="text-white font-bold">
              {totalVotes.toLocaleString()} / {totalVotingPower.toLocaleString()} ({getVotePercentage(totalVotes, totalVotingPower).toFixed(1)}%)
            </span>
          </div>
          
          <Progress value={getVotePercentage(totalVotes, totalVotingPower)} className="h-2" />
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-green-400 font-bold">{proposal.votesFor.toLocaleString()}</div>
              <div className="text-gray-400 text-xs">For</div>
            </div>
            <div>
              <div className="text-red-400 font-bold">{proposal.votesAgainst.toLocaleString()}</div>
              <div className="text-gray-400 text-xs">Against</div>
            </div>
            <div>
              <div className="text-yellow-400 font-bold">{proposal.votesAbstain.toLocaleString()}</div>
              <div className="text-gray-400 text-xs">Abstain</div>
            </div>
          </div>
        </div>

        {/* User Vote */}
        {status === 'active' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">Your Vote:</span>
              {userVote && (
                <Badge className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/30">
                  {userVote.vote.toUpperCase()} ({userVote.votingPower.toLocaleString()} power)
                </Badge>
              )}
            </div>
            
            {!userVote && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => onVote(proposal.id, 'for')}
                  disabled={isLoading}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Vote For
                </Button>
                <Button
                  size="sm"
                  onClick={() => onVote(proposal.id, 'against')}
                  disabled={isLoading}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Vote Against
                </Button>
                <Button
                  size="sm"
                  onClick={() => onVote(proposal.id, 'abstain')}
                  disabled={isLoading}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  <Clock className="w-4 h-4 mr-1" />
                  Abstain
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Execute Button */}
        {canExecute && (
          <Button
            onClick={() => onExecute(proposal.id)}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Executing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Execute Proposal
              </>
            )}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProposalCard;
