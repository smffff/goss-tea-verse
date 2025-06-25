import React, { useEffect, useState } from 'react';
import EnhancedTeaSubmissionCard from '@/components/EnhancedTeaSubmissionCard';
import FeedSkeleton from '@/components/FeedSkeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw, Coffee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeaSubmission {
  id: string;
  content: string;
  category: string;
  evidence_urls: string[] | null;
  reactions: { hot: number; cold: number; spicy: number };
  created_at: string;
  average_rating: number;
  rating_count: number;
  has_evidence: boolean;
  summary?: string;
  boost_score?: number;
  credibility_score?: number;
  verification_level?: 'none' | 'basic' | 'verified' | 'trusted' | 'legendary';
  memeability_score?: number;
  viral_potential?: number;
  engagement_rate?: number;
  is_trending?: boolean;
  author?: string;
  user_vote?: 'up' | 'down' | null;
}

const EnhancedTeaFeed = () => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  const mockSubmissions: TeaSubmission[] = [
    {
      id: '1',
      content: 'Major DeFi protocol is allegedly planning a surprise token launch next week. Sources close to the team say they\'ve been working on this in stealth mode for months. The token will have unique staking mechanisms that could disrupt the entire yield farming space. 👀',
      category: 'DeFi',
      evidence_urls: null,
      reactions: { hot: 145, cold: 12, spicy: 89 },
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      average_rating: 4.2,
      rating_count: 67,
      has_evidence: false,
      author: 'DeFiWhale',
      summary: 'Unconfirmed reports suggest a stealth DeFi project is preparing for launch',
      credibility_score: 78,
      is_trending: true
    },
    {
      id: '2',
      content: 'Spotted Vitalik at a coffee shop in SF discussing "the next phase of Ethereum" with some mysterious figures. Overheard something about "revolutionary consensus mechanisms" and "2024 being the year". Could this be related to the rumored Ethereum 3.0? ☕',
      category: 'Ethereum',
      evidence_urls: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
      reactions: { hot: 234, cold: 23, spicy: 156 },
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      average_rating: 4.7,
      rating_count: 89,
      has_evidence: true,
      author: 'CryptoSleuth',
      credibility_score: 92,
      is_trending: true
    },
    {
      id: '3',
      content: 'Anonymous whale just moved 50k ETH to a new address that\'s been linked to several major exchange wallets. This could signal a massive sell-off incoming, or maybe they\'re preparing for something big. The timing is suspicious given recent regulatory news... 🐋',
      category: 'Trading',
      evidence_urls: null,
      reactions: { hot: 67, cold: 45, spicy: 23 },
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      average_rating: 3.8,
      rating_count: 34,
      has_evidence: false,
      author: 'WhaleWatcher',
      credibility_score: 85
    }
  ];

  useEffect(() => {
    // Simulate loading submissions
    const loadSubmissions = () => {
      setIsLoading(true);
      setTimeout(() => {
        setSubmissions(mockSubmissions);
        setIsLoading(false);
      }, 1500);
    };

    loadSubmissions();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate new data
      const updatedSubmissions = mockSubmissions.map(sub => ({
        ...sub,
        reactions: {
          hot: sub.reactions.hot + Math.floor(Math.random() * 10),
          cold: sub.reactions.cold + Math.floor(Math.random() * 5),
          spicy: sub.reactions.spicy + Math.floor(Math.random() * 8)
        }
      }));
      setSubmissions(updatedSubmissions);
      setIsRefreshing(false);
      toast({
        title: "Feed Refreshed!",
        description: "Latest tea has been loaded",
      });
    }, 2000);
  };

  const handleReaction = (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => {
    setSubmissions(prev => prev.map(submission => {
      if (submission.id === submissionId) {
        return {
          ...submission,
          reactions: {
            ...submission.reactions,
            [reactionType]: submission.reactions[reactionType] + 1
          }
        };
      }
      return submission;
    }));

    toast({
      title: `Reacted with ${reactionType}!`,
      description: "Your reaction has been recorded",
    });
  };

  const handleVote = (submissionId: string, voteType: 'up' | 'down') => {
    console.log(`Vote ${voteType} on submission ${submissionId}`);
  };

  if (isLoading) {
    return <FeedSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Coffee className="w-5 h-5 text-[#00d1c1]" />
          Latest Tea
        </h2>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
          className="border-[#00d1c1]/30 text-[#00d1c1] hover:bg-[#00d1c1]/10"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* Feed Content */}
      {submissions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">☕</div>
          <h3 className="text-xl font-bold text-white mb-2">No tea found</h3>
          <p className="text-gray-400">Be the first to spill some tea!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.map((submission) => (
            <EnhancedTeaSubmissionCard
              key={submission.id}
              submission={submission}
              onReaction={handleReaction}
              onVote={handleVote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedTeaFeed;
