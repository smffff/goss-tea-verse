
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GovernanceProposal, UserVote, NewProposal } from '@/types/governance';
import GovernanceStats from '@/components/governance/GovernanceStats';
import CreateProposalDialog from '@/components/governance/CreateProposalDialog';
import ProposalCard from '@/components/governance/ProposalCard';

const DAOGovernance: React.FC = () => {
  const [proposals, setProposals] = useState<GovernanceProposal[]>([]);
  const [userVotes, setUserVotes] = useState<UserVote[]>([]);
  const [isCreatingProposal, setIsCreatingProposal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userVotingPower, setUserVotingPower] = useState(1000);
  const [totalVotingPower, setTotalVotingPower] = useState(50000);
  const { toast } = useToast();

  // Form state for new proposal
  const [newProposal, setNewProposal] = useState<NewProposal>({
    title: '',
    description: '',
    category: 'governance',
    duration: 7,
    quorum: 10
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
      setNewProposal({ 
        title: '', 
        description: '', 
        category: 'governance', 
        duration: 7, 
        quorum: 10 
      });

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
          <CreateProposalDialog
            isOpen={isCreatingProposal}
            onClose={() => setIsCreatingProposal(false)}
            newProposal={newProposal}
            setNewProposal={setNewProposal}
            onSubmit={createProposal}
            isLoading={isLoading}
          />
        </Dialog>
      </div>

      {/* Governance Stats */}
      <GovernanceStats
        userVotingPower={userVotingPower}
        totalVotingPower={totalVotingPower}
        activeProposalsCount={proposals.filter(p => getProposalStatus(p) === 'active').length}
        totalProposalsCount={proposals.length}
      />

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

export default DAOGovernance;
