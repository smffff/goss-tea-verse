import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Wallet, 
  Coins, 
  TrendingUp, 
  Lock, 
  Unlock, 
  Vote, 
  Award,
  Zap,
  Users,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TokenBalance {
  balance: string;
  staked: string;
  pendingRewards: string;
  totalSupply: string;
  circulatingSupply: string;
}

interface GovernanceProposal {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'failed' | 'pending';
  votesFor: number;
  votesAgainst: number;
  endTime: number;
  creator: string;
}

const TokenIntegration: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [proposals, setProposals] = useState<GovernanceProposal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    setTokenBalance({
      balance: '1,250.50',
      staked: '500.00',
      pendingRewards: '12.75',
      totalSupply: '100,000,000',
      circulatingSupply: '45,250,000'
    });

    setProposals([
      {
        id: 1,
        title: 'Increase Boost Rewards',
        description: 'Proposal to increase the reward rate for staking from 1% to 2% annually.',
        status: 'active',
        votesFor: 1250,
        votesAgainst: 320,
        endTime: Date.now() + 7 * 24 * 60 * 60 * 1000,
        creator: '0x1234...5678'
      },
      {
        id: 2,
        title: 'Add New Boost Tiers',
        description: 'Introduce new boost tiers with higher visibility multipliers.',
        status: 'pending',
        votesFor: 0,
        votesAgainst: 0,
        endTime: Date.now() + 14 * 24 * 60 * 60 * 1000,
        creator: '0x8765...4321'
      }
    ]);
  }, []);

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setWalletAddress(account);
        setIsConnected(true);
        
        toast({
          title: "Wallet Connected! 🎉",
          description: `Connected to ${account.slice(0, 6)}...${account.slice(-4)}`,
        });
      } else {
        toast({
          title: "MetaMask Not Found",
          description: "Please install MetaMask to use token features.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setTokenBalance(null);
    toast({
      title: "Wallet Disconnected",
      description: "You have been disconnected from your wallet.",
    });
  };

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to stake.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Mock staking transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Staking Successful! 🔒",
        description: `Successfully staked ${stakeAmount} $TEA tokens.`,
      });
      
      setStakeAmount('');
      // Update balance (in real implementation, this would come from blockchain)
      
    } catch (error) {
      toast({
        title: "Staking Failed",
        description: "Could not stake tokens. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to unstake.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Mock unstaking transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Unstaking Successful! 🔓",
        description: `Successfully unstaked ${unstakeAmount} $TEA tokens.`,
      });
      
      setUnstakeAmount('');
      
    } catch (error) {
      toast({
        title: "Unstaking Failed",
        description: "Could not unstake tokens. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimRewards = async () => {
    setIsLoading(true);
    try {
      // Mock claim transaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Rewards Claimed! 🎁",
        description: `Successfully claimed ${tokenBalance?.pendingRewards} $TEA tokens.`,
      });
      
    } catch (error) {
      toast({
        title: "Claim Failed",
        description: "Could not claim rewards. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (proposalId: number, support: boolean) => {
    setIsLoading(true);
    try {
      // Mock voting transaction
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Vote Cast! ✅",
        description: `Successfully voted ${support ? 'FOR' : 'AGAINST'} proposal #${proposalId}.`,
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

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getTimeRemaining = (endTime: number) => {
    const now = Date.now();
    const remaining = endTime - now;
    
    if (remaining <= 0) return 'Ended';
    
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h remaining`;
  };

  const getVotePercentage = (forVotes: number, againstVotes: number) => {
    const total = forVotes + againstVotes;
    if (total === 0) return 0;
    return (forVotes / total) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">$TEA Token</h2>
          <p className="text-gray-400">Manage your tokens, stake for rewards, and participate in governance</p>
        </div>
        
        {!isConnected ? (
          <Button
            onClick={connectWallet}
            disabled={isLoading}
            className="bg-gradient-to-r from-ctea-yellow to-ctea-orange text-ctea-dark font-bold"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ctea-dark mr-2"></div>
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </>
            )}
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Connected: {formatAddress(walletAddress)}
            </Badge>
            <Button
              variant="outline"
              onClick={disconnectWallet}
              className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
            >
              Disconnect
            </Button>
          </div>
        )}
      </div>

      {isConnected && tokenBalance && (
        <>
          {/* Token Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6 bg-gradient-to-br from-ctea-yellow/20 to-ctea-orange/20 border-ctea-yellow/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-ctea-yellow text-sm font-medium">Balance</p>
                  <p className="text-white text-2xl font-bold">{tokenBalance.balance} $TEA</p>
                </div>
                <Coins className="w-8 h-8 text-ctea-yellow" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-ctea-purple text-sm font-medium">Staked</p>
                  <p className="text-white text-2xl font-bold">{tokenBalance.staked} $TEA</p>
                </div>
                <Lock className="w-8 h-8 text-ctea-purple" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">Pending Rewards</p>
                  <p className="text-white text-2xl font-bold">{tokenBalance.pendingRewards} $TEA</p>
                </div>
                <Award className="w-8 h-8 text-green-400" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-ctea-teal/20 to-ctea-blue/20 border-ctea-teal/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-ctea-teal text-sm font-medium">Total Supply</p>
                  <p className="text-white text-lg font-bold">{tokenBalance.totalSupply}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-ctea-teal" />
              </div>
            </Card>
          </div>

          {/* Token Management Tabs */}
          <Tabs defaultValue="staking" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-ctea-dark/50">
              <TabsTrigger value="staking">Staking</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="info">Token Info</TabsTrigger>
            </TabsList>

            <TabsContent value="staking" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stake Tokens */}
                <Card className="p-6 bg-ctea-dark/50 border-ctea-teal/20">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-ctea-purple" />
                    Stake Tokens
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Amount to Stake</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="bg-ctea-darker border-ctea-teal/30 text-white"
                      />
                    </div>
                    <Button
                      onClick={handleStake}
                      disabled={isLoading || !stakeAmount}
                      className="w-full bg-gradient-to-r from-ctea-purple to-ctea-pink text-white font-bold"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Staking...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Stake Tokens
                        </>
                      )}
                    </Button>
                  </div>
                </Card>

                {/* Unstake Tokens */}
                <Card className="p-6 bg-ctea-dark/50 border-ctea-teal/20">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Unlock className="w-5 h-5 text-ctea-yellow" />
                    Unstake Tokens
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Amount to Unstake</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={unstakeAmount}
                        onChange={(e) => setUnstakeAmount(e.target.value)}
                        className="bg-ctea-darker border-ctea-teal/30 text-white"
                      />
                    </div>
                    <Button
                      onClick={handleUnstake}
                      disabled={isLoading || !unstakeAmount}
                      className="w-full bg-gradient-to-r from-ctea-yellow to-ctea-orange text-ctea-dark font-bold"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ctea-dark mr-2"></div>
                          Unstaking...
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4 mr-2" />
                          Unstake Tokens
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Claim Rewards */}
              <Card className="p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Claim Rewards</h3>
                    <p className="text-gray-300">You have {tokenBalance.pendingRewards} $TEA in pending rewards</p>
                  </div>
                  <Button
                    onClick={handleClaimRewards}
                    disabled={isLoading || parseFloat(tokenBalance.pendingRewards) <= 0}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Claiming...
                      </>
                    ) : (
                      <>
                        <Award className="w-4 h-4 mr-2" />
                        Claim Rewards
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="governance" className="space-y-4">
              <Card className="p-6 bg-ctea-dark/50 border-ctea-teal/20">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Vote className="w-5 h-5 text-ctea-teal" />
                  Active Proposals
                </h3>
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className="p-4 bg-ctea-darker/50 rounded-lg border border-ctea-teal/20">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-white font-bold">{proposal.title}</h4>
                          <p className="text-gray-400 text-sm mt-1">{proposal.description}</p>
                        </div>
                        <Badge className={`${
                          proposal.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          proposal.status === 'passed' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          proposal.status === 'failed' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        }`}>
                          {proposal.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Votes For:</span>
                          <span className="text-green-400 font-bold">{proposal.votesFor}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Votes Against:</span>
                          <span className="text-red-400 font-bold">{proposal.votesAgainst}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Time Remaining:</span>
                          <span className="text-white">{getTimeRemaining(proposal.endTime)}</span>
                        </div>
                        
                        {proposal.status === 'active' && (
                          <div className="space-y-2">
                            <Progress 
                              value={getVotePercentage(proposal.votesFor, proposal.votesAgainst)} 
                              className="h-2"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleVote(proposal.id, true)}
                                disabled={isLoading}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                Vote For
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleVote(proposal.id, false)}
                                disabled={isLoading}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Vote Against
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-ctea-dark/50 border-ctea-teal/20">
                  <h3 className="text-lg font-bold text-white mb-4">Token Economics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Supply:</span>
                      <span className="text-white font-bold">{tokenBalance.totalSupply} $TEA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Circulating Supply:</span>
                      <span className="text-white font-bold">{tokenBalance.circulatingSupply} $TEA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Staking APY:</span>
                      <span className="text-green-400 font-bold">1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Governance Rights:</span>
                      <span className="text-ctea-teal font-bold">Yes</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-ctea-dark/50 border-ctea-teal/20">
                  <h3 className="text-lg font-bold text-white mb-4">Use Cases</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-ctea-yellow" />
                      <span className="text-white">Boost submissions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-ctea-purple" />
                      <span className="text-white">Stake for rewards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Vote className="w-4 h-4 text-ctea-teal" />
                      <span className="text-white">Governance voting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-400" />
                      <span className="text-white">Earn rewards</span>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">View on Blockchain</h3>
                    <p className="text-gray-300">Explore your token transactions and contract details</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Contract
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      {!isConnected && (
        <Card className="p-12 bg-ctea-dark/50 border-ctea-teal/20 text-center">
          <Wallet className="w-16 h-16 text-ctea-teal mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
          <p className="text-gray-400 mb-6">
            Connect your wallet to view your $TEA token balance, stake for rewards, and participate in governance.
          </p>
          <Button
            onClick={connectWallet}
            disabled={isLoading}
            className="bg-gradient-to-r from-ctea-yellow to-ctea-orange text-ctea-dark font-bold"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </Card>
      )}
    </div>
  );
};

export default TokenIntegration;
