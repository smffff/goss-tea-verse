
export type ProposalCategory = 'governance' | 'feature' | 'economic' | 'emergency';

export interface GovernanceProposal {
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
  category: ProposalCategory;
  quorum: number;
  executionDelay: number;
  executedAt?: number;
}

export interface UserVote {
  proposalId: number;
  vote: 'for' | 'against' | 'abstain';
  votingPower: number;
  timestamp: number;
}

export interface NewProposal {
  title: string;
  description: string;
  category: ProposalCategory;
  duration: number;
  quorum: number;
}
