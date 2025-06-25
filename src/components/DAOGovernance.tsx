import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Vote, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Users,
  BarChart3,
  Calendar,
  Zap,
  Crown,
  Target,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GovernanceProposal {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'failed' | 'pending' | 'executed';
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  startTime: number;
  endTime: number;
  creator: string;
  category: 'governance' | 'feature' | 'economic' | 'emergency';
  quorum: number;
  executionDelay: number;
  executedAt?: number;
}

interface UserVote {
  proposalId: number;
  vote: 'for' | 'against' | 'abstain';
  votingPower: number;
  timestamp: number;
}

const DAOGovernance: React.FC = () => {
  const [proposals, setProposals] = useState<GovernanceProposal[]>([]);
  const [userVotes, setUserVotes] = useState<UserVote[]>([]);
  const [isCreatingProposal, setIsCreatingProposal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userVotingPower, setUserVotingPower] = useState(1000);
  const [totalVotingPower, setTotalVotingPower] = useState(50000);
  const { toast } = useToast();

  // Form state for new proposal
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: 'governance' as const,
    duration: 7, // days
    quorum: 10 // percentage
  });

  useEffect(() => {
    loadProposals();
    loadUserVotes();
  }, []);

  const loadProposals = () => {
    // Mock data - in real implementation, this would fetch from blockchain
    const mockProposals: GovernanceProposal[] = [
      {
        id: 1,
        title: 'Increase Boost Rewards',
        description: 'Proposal to increase the reward rate for staking from 1% to 2% annually. This will incentivize more users to stake their $TEA tokens and participate in governance.',
        status: 'active',
        votesFor: 1250,
        votesAgainst: 320,
        votesAbstain: 45,
        startTime: Date.now() - 3 * 24 * 60 * 60 * 1000,
        endTime: Date.now() + 4 * 24 * 60 * 60 * 1000,
        creator: '0x1234...5678',
        category: 'economic',
        quorum: 10,
        executionDelay: 2 * 24 * 60 * 60 * 1000 // 2 days
      },
      {
        id: 2,
        title: 'Add New Boost Tiers',
        description: 'Introduce new boost tiers with higher visibility multipliers. This will provide more options for users to boost their submissions and increase platform engagement.',
        status: 'pending',
        votesFor: 0,
        votesAgainst: 0,
        votesAbstain: 0,
        startTime: Date.now() + 1 * 24 * 60 * 60 * 1000,
        endTime: Date.now() + 8 * 24 * 60 * 60 * 1000,
        creator: '0x8765...4321',
        category: 'feature',
        quorum: 15,
        executionDelay: 1 * 24 * 60 * 60 * 1000 // 1 day
      },
      {
        id: 3,
        title: 'Emergency Protocol Update',
        description: 'Critical security update to prevent potential vulnerabilities in the smart contract. This is an emergency proposal that requires immediate attention.',
        status: 'passed',
        votesFor: 2100,
        votesAgainst: 150,
        votesAbstain: 25,
        startTime: Date.now() - 10 * 24 * 60 * 60 * 1000,
        endTime: Date.now() - 3 * 24 * 60 * 60 * 1000,
        creator: '0x9999...0000',
        category: 'emergency',
        quorum: 5,
        executionDelay: 0 // No delay for emergency proposals
      }
    ];
    setProposals(mockProposals);
  };

  const loadUserVotes = () => {
    // Mock user votes
    const mockVotes: UserVote[] = [
      { proposalId: 1, vote: 'for', votingPower: 500, timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 },
      { proposalId: 3, vote: 'for', votingPower: 1000, timestamp: Date.now() - 8 * 24 * 60 * 60 * 1000 }
    ];
    setUserVotes(mockVotes);
  };

  const createProposal = async () => {
    if (!newProposal.title.trim() || !newProposal.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Mock proposal creation
      await new Promise(resolve => setTimeout(resolve, 2000));

      const proposal: GovernanceProposal = {
        id: proposals.length + 1,
        title: newProposal.title,
        description: newProposal.description,
        status: 'pending',
        votesFor: 0,
        votesAgainst: 0,
        votesAbstain: 0,
        startTime: Date.now() + 1 * 24 * 60 * 60 * 1000,
        endTime: Date.now() + (newProposal.duration + 1) * 24 * 60 * 60 * 1000,
        creator: '0x1234...5678', // Current user
        category: newProposal.category,
        quorum: newProposal.quorum,
        executionDelay: newProposal.category === 'emergency' ? 0 : 2 * 24 * 60 * 60 * 1000
      };

      setProposals(prev => [proposal, ...prev]);
      setIsCreatingProposal(false);
      setNewProposal({ title: '', description: '', category: 'governance', duration: 7, quorum: 10 });

      toast({
        title: "Proposal Created! 🗳️",
        description: "Your governance proposal has been submitted successfully.",
      });

    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Could not create proposal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const castVote = async (proposalId: number, vote: 'for' | 'against' | 'abstain') => {
    setIsLoading(true);
    try {
      // Mock voting transaction
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userVote: UserVote = {
        proposalId,
        vote,
        votingPower: userVotingPower,
        timestamp: Date.now()
      };

      setUserVotes(prev => [...prev.filter(v => v.proposalId !== proposalId), userVote]);

      // Update proposal votes
      setProposals(prev => prev.map(p => {
        if (p.id === proposalId) {
          const currentVote = userVotes.find(v => v.proposalId === proposalId);
          if (currentVote) {
            // Remove previous vote
            if (currentVote.vote === 'for') p.votesFor -= currentVote.votingPower;
            else if (currentVote.vote === 'against') p.votesAgainst -= currentVote.votingPower;
            else if (currentVote.vote === 'abstain') p.votesAbstain -= currentVote.votingPower;
          }
          // Add new vote
          if (vote === 'for') p.votesFor += userVotingPower;
          else if (vote === 'against') p.votesAgainst += userVotingPower;
          else if (vote === 'abstain') p.votesAbstain += userVotingPower;
        }
        return p;
      }));

      toast({
        title: "Vote Cast! ✅",
        description: `Successfully voted ${vote.toUpperCase()} on proposal #${proposalId}.`,
      });

    } catch (error) {
      toast({
        title: "Vote Failed",
        description: "Could not cast vote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const executeProposal = async (proposalId: number) => {
    setIsLoading(true);
    try {
      // Mock execution
      await new Promise(resolve => setTimeout(resolve, 2000));

      setProposals(prev => prev.map(p => {
        if (p.id === proposalId) {
          return { ...p, status: 'executed', executedAt: Date.now() };
        }
        return p;
      }));

      toast({
        title: "Proposal Executed! 🚀",
        description: "The proposal has been successfully executed.",
      });

    } catch (error) {
      toast({
        title: "Execution Failed",
        description: "Could not execute proposal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProposalStatus = (proposal: GovernanceProposal) => {
    const now = Date.now();
    const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
    const quorumMet = totalVotes >= (totalVotingPower * proposal.quorum / 100);
    const majorityFor = proposal.votesFor > proposal.votesAgainst;

    if (proposal.status === 'executed') return 'executed';
    if (now < proposal.startTime) return 'pending';
    if (now > proposal.endTime) {
      if (!quorumMet) return 'failed';
      if (majorityFor) return 'passed';
      return 'failed';
    }
    return 'active';
  };

  const getTimeRemaining = (endTime: number) => {
    const now = Date.now();
    const remaining = endTime - now;
    
    if (remaining <= 0) return 'Ended';
    
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h remaining`;
  };

  const getVotePercentage = (votes: number, total: number) => {
    if (total === 0) return 0;
    return (votes / total) * 100;
  };

  const getUserVote = (proposalId: number) => {
    return userVotes.find(v => v.proposalId === proposalId);
  };

  const canExecute = (proposal: GovernanceProposal) => {
    const status = getProposalStatus(proposal);
    const now = Date.now();
    return status === 'passed' && 
           now >= proposal.endTime + proposal.executionDelay &&
           proposal.status !== 'executed';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">DAO Governance</h2>
          <p className="text-gray-400">Participate in platform governance and decision-making</p>
        </div>
        
        <Dialog open={isCreatingProposal} onOpenChange={setIsCreatingProposal}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-ctea-teal to-ctea-blue text-white font-bold">
              <Plus className="w-4 h-4 mr-2" />
              Create Proposal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-ctea-darker/95 border-ctea-teal/30 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-2">
                <Vote className="w-5 h-5 text-ctea-teal" />
                Create New Proposal
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 mb-1 block">Proposal Title</label>
                <Input
                  value={newProposal.title}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter proposal title..."
                  className="bg-ctea-dark/50 border-ctea-teal/30 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1 block">Description</label>
                <Textarea
                  value={newProposal.description}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your proposal in detail..."
                  className="bg-ctea-dark/50 border-ctea-teal/30 text-white"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Category</label>
                  <select
                    value={newProposal.category}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, category: e.target.value as 'governance' | 'feature' | 'economic' | 'emergency' }))}
                    className="w-full bg-ctea-dark/50 border border-ctea-teal/30 text-white rounded-md p-2"
                  >
                    <option value="governance">Governance</option>
                    <option value="feature">Feature</option>
                    <option value="economic">Economic</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Duration (days)</label>
                  <Input
                    type="number"
                    value={newProposal.duration}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="bg-ctea-dark/50 border-ctea-teal/30 text-white"
                    min="1"
                    max="30"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={createProposal}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-ctea-teal to-ctea-blue text-white font-bold"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Vote className="w-4 h-4 mr-2" />
                      Create Proposal
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsCreatingProposal(false)}
                  className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Governance Stats */}
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
              <p className="text-white text-2xl font-bold">
                {proposals.filter(p => getProposalStatus(p) === 'active').length}
              </p>
            </div>
            <Vote className="w-8 h-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-ctea-yellow/20 to-ctea-orange/20 border-ctea-yellow/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ctea-yellow text-sm font-medium">Proposals Created</p>
              <p className="text-white text-2xl font-bold">{proposals.length}</p>
            </div>
            <Target className="w-8 h-8 text-ctea-yellow" />
          </div>
        </Card>
      </div>

      {/* Proposals List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-ctea-dark/50">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="executed">Executed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {proposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              userVote={getUserVote(proposal.id)}
              userVotingPower={userVotingPower}
              onVote={castVote}
              onExecute={executeProposal}
              canExecute={canExecute(proposal)}
              getProposalStatus={getProposalStatus}
              getTimeRemaining={getTimeRemaining}
              getVotePercentage={getVotePercentage}
              isLoading={isLoading}
            />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {proposals.filter(p => getProposalStatus(p) === 'active').map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              userVote={getUserVote(proposal.id)}
              userVotingPower={userVotingPower}
              onVote={castVote}
              onExecute={executeProposal}
              canExecute={canExecute(proposal)}
              getProposalStatus={getProposalStatus}
              getTimeRemaining={getTimeRemaining}
              getVotePercentage={getVotePercentage}
              isLoading={isLoading}
            />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {proposals.filter(p => getProposalStatus(p) === 'pending').map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              userVote={getUserVote(proposal.id)}
              userVotingPower={userVotingPower}
              onVote={castVote}
              onExecute={executeProposal}
              canExecute={canExecute(proposal)}
              getProposalStatus={getProposalStatus}
              getTimeRemaining={getTimeRemaining}
              getVotePercentage={getVotePercentage}
              isLoading={isLoading}
            />
          ))}
        </TabsContent>

        <TabsContent value="executed" className="space-y-4">
          {proposals.filter(p => p.status === 'executed').map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              userVote={getUserVote(proposal.id)}
              userVotingPower={userVotingPower}
              onVote={castVote}
              onExecute={executeProposal}
              canExecute={canExecute(proposal)}
              getProposalStatus={getProposalStatus}
              getTimeRemaining={getTimeRemaining}
              getVotePercentage={getVotePercentage}
              isLoading={isLoading}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Proposal Card Component
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

export default DAOGovernance; 