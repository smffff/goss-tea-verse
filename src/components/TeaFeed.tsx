import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProgression } from '@/hooks/useUserProgression';
import TeaSubmissionCard from './TeaSubmissionCard';
import HotTakesFilters from './HotTakesFilters';
import LoadingSpinner from './LoadingSpinner';
import FeedSkeleton from './FeedSkeleton';
import { Share2, Flag, Copy, CheckCircle, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ReportModal from './ReportModal';

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
  boost_score?: number;
  author?: string;
  is_viral?: boolean;
}

interface AIComment {
  id: string;
  content: string;
  type: 'spicy' | 'smart' | 'memy' | 'savage';
  submission_id: string;
  created_at: string;
}

const TeaFeed = () => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [aiComments, setAiComments] = useState<{ [key: string]: AIComment[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSubmissions, setExpandedSubmissions] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingSubmission, setReportingSubmission] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const { incrementReaction } = useUserProgression();
  const { toast } = useToast();

  // Mock data for development
  const mockSubmissions: TeaSubmission[] = [
    {
      id: '1',
      content: "Solana just pulled the biggest rug of 2024. Insiders knew about the issues weeks ago but kept quiet while retail piled in. The network congestion was just the beginning - there's way more coming. 🚨",
      category: 'drama',
      evidence_urls: ['https://example.com/evidence1'],
      reactions: { hot: 247, cold: 23, spicy: 89 },
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      average_rating: 4.2,
      rating_count: 359,
      has_evidence: true,
      boost_score: 150,
      author: 'Anonymous',
      is_viral: true
    },
    {
      id: '2',
      content: "Ethereum ETF approval rumors heating up again. Sources say BlackRock is pushing hard behind the scenes. If this goes through, we're looking at a massive institutional inflow. The timing is suspicious though... 🤔",
      category: 'alpha',
      evidence_urls: null,
      reactions: { hot: 189, cold: 45, spicy: 67 },
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      average_rating: 3.8,
      rating_count: 301,
      has_evidence: false,
      boost_score: 89,
      author: 'CryptoInsider',
      is_viral: false
    },
    {
      id: '3',
      content: "New meme coin launching with suspicious timing. The dev team has zero transparency and the tokenomics are a red flag factory. DYOR but this smells like a classic pump and dump setup. 💀",
      category: 'warning',
      evidence_urls: ['https://example.com/evidence2'],
      reactions: { hot: 156, cold: 78, spicy: 123 },
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      average_rating: 4.5,
      rating_count: 357,
      has_evidence: true,
      boost_score: 234,
      author: 'RugDetector',
      is_viral: true
    },
    {
      id: '4',
      content: "DeFi summer 2.0 is coming. The signs are everywhere - TVL increasing, new protocols launching, and the yield farming opportunities are insane. This time it's different because of the institutional adoption. 🌞",
      category: 'alpha',
      evidence_urls: null,
      reactions: { hot: 98, cold: 34, spicy: 45 },
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      average_rating: 3.9,
      rating_count: 177,
      has_evidence: false,
      boost_score: 67,
      author: 'DeFiMaxi',
      is_viral: false
    },
    {
      id: '5',
      content: "Major exchange hack incoming. Multiple sources confirming a large CEX is about to get rekt. The amount is in the hundreds of millions. This is going to be the biggest crypto story of the year. 🔥",
      category: 'breaking',
      evidence_urls: ['https://example.com/evidence3'],
      reactions: { hot: 312, cold: 67, spicy: 156 },
      created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      average_rating: 4.7,
      rating_count: 535,
      has_evidence: true,
      boost_score: 445,
      author: 'WhaleAlert',
      is_viral: true
    }
  ];

  useEffect(() => {
    fetchSubmissions();
    fetchAIComments();
  }, [activeFilter, sortBy]);

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use mock data for now
      let filteredData = [...mockSubmissions];
      
      // Apply client-side filtering
      if (activeFilter !== 'all') {
        filteredData = filteredData.filter(submission => {
          const reactions = submission.reactions;
          switch (activeFilter) {
            case 'hot':
              return reactions.hot > reactions.cold;
            case 'spicy':
              return reactions.spicy > 50;
            case 'trending':
              return (reactions.hot + reactions.cold + reactions.spicy) > 200;
            case 'boosted':
              return (submission.boost_score || 0) > 100;
            case 'viral':
              return submission.is_viral;
            default:
              return true;
          }
        });
      }

      // Apply sorting
      filteredData.sort((a, b) => {
        switch (sortBy) {
          case 'reactions':
            return (b.reactions.hot + b.reactions.cold + b.reactions.spicy) - (a.reactions.hot + a.reactions.cold + a.reactions.spicy);
          case 'boosted':
            return (b.boost_score || 0) - (a.boost_score || 0);
          case 'controversial':
            return Math.abs(b.reactions.hot - b.reactions.cold) - Math.abs(a.reactions.hot - a.reactions.cold);
          default:
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
      });
      
      setSubmissions(filteredData);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      // Fallback to mock data
      setSubmissions(mockSubmissions);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAIComments = async () => {
    try {
      console.log('AI comments would be fetched here');
    } catch (error) {
      console.error('Error fetching AI comments:', error);
    }
  };

  const handleReaction = async (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => {
    try {
      const anonymousToken = localStorage.getItem('ctea_anonymous_token') || 
        Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      
      localStorage.setItem('ctea_anonymous_token', anonymousToken);

      const { data: existingReaction } = await supabase
        .from('user_reactions')
        .select('*')
        .eq('submission_id', submissionId)
        .eq('anonymous_token', anonymousToken)
        .single();

      if (existingReaction) {
        await supabase
          .from('user_reactions')
          .update({ reaction_type: reactionType })
          .eq('id', existingReaction.id);
      } else {
        await supabase
          .from('user_reactions')
          .insert({
            submission_id: submissionId,
            anonymous_token: anonymousToken,
            reaction_type: reactionType
          });

        await incrementReaction('given');
      }

      setSubmissions(prev => prev.map(sub => {
        if (sub.id === submissionId) {
          const newReactions = { ...sub.reactions };
          newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
          return { ...sub, reactions: newReactions };
        }
        return sub;
      }));

    } catch (error) {
      console.error('Error handling reaction:', error);
    }
  };

  const handleBoostUpdated = (submissionId: string, newBoost: number) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId) {
        return { ...sub, boost_score: newBoost };
      }
      return sub;
    }));
  };

  const generateAICommentary = async (submission: TeaSubmission, type: 'spicy' | 'smart' | 'memy' | 'wise' = 'spicy') => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-ai-commentary', {
        body: { 
          content: submission.content,
          category: submission.category,
          submissionId: submission.id,
          commentaryType: type
        }
      });

      if (error) throw error;
      
      if (data?.commentary) {
        setAiComments(prev => ({
          ...prev,
          [submission.id]: [
            ...(prev[submission.id] || []),
            {
              id: Date.now().toString(),
              content: data.commentary,
              type: type,
              submission_id: submission.id,
              created_at: new Date().toISOString()
            }
          ]
        }));
      }
    } catch (error) {
      console.error('Error generating AI commentary:', error);
    }
  };

  const toggleComments = (submissionId: string) => {
    setExpandedSubmissions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(submissionId)) {
        newSet.delete(submissionId);
      } else {
        newSet.add(submissionId);
      }
      return newSet;
    });
  };

  const handleShare = async (submissionId: string, platform: 'twitter' | 'copy') => {
    const shareUrl = `${window.location.origin}/feed?submission=${submissionId}`;
    const submission = submissions.find(s => s.id === submissionId);
    const shareText = submission ? `🔥 Hot take from CTea Newsroom: "${submission.content.substring(0, 100)}..."` : 'Check out this hot take!';

    if (platform === 'twitter') {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=CTea,Crypto`;
      window.open(twitterUrl, '_blank');
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        setCopiedLink(submissionId);
        toast({
          title: "Link Copied! 📋",
          description: "Post link copied to clipboard",
        });
        setTimeout(() => setCopiedLink(null), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        toast({
          title: "Copy Failed",
          description: "Couldn't copy link. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleReport = (submissionId: string) => {
    setReportingSubmission(submissionId);
    setShowReportModal(true);
  };

  if (isLoading) {
    return <FeedSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <HotTakesFilters 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Feed Items */}
      <div className="space-y-6">
        {submissions.map((submission) => (
          <div key={submission.id} className="bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-6 hover:bg-ctea-dark/40 transition-all duration-200">
            {/* Submission Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent2 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {submission.author?.charAt(0) || 'A'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{submission.author || 'Anonymous'}</span>
                    {submission.is_viral && (
                      <span className="bg-ctea-pink text-white text-xs px-2 py-1 rounded-full">🔥 Viral</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(submission.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare(submission.id, 'copy')}
                  className="text-gray-400 hover:text-accent"
                >
                  {copiedLink === submission.id ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare(submission.id, 'twitter')}
                  className="text-gray-400 hover:text-blue-400"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReport(submission.id)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Submission Content */}
            <div className="mb-4">
              <p className="text-white leading-relaxed">{submission.content}</p>
            </div>

            {/* Evidence Links */}
            {submission.evidence_urls && submission.evidence_urls.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-ctea-teal mb-2">
                  <span>📎 Evidence:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {submission.evidence_urls.map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent2 text-sm underline"
                    >
                      Link {index + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Reaction Buttons */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReaction(submission.id, 'hot')}
                  className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                >
                  🔥 Hot ({submission.reactions.hot})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReaction(submission.id, 'cold')}
                  className="text-gray-400 hover:text-blue-400 hover:bg-blue-400/10"
                >
                  ❄️ Cold ({submission.reactions.cold})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReaction(submission.id, 'spicy')}
                  className="text-gray-400 hover:text-orange-400 hover:bg-orange-400/10"
                >
                  🌶️ Spicy ({submission.reactions.spicy})
                </Button>
              </div>
              
              <div className="text-sm text-gray-400">
                {submission.rating_count} reactions • {submission.average_rating.toFixed(1)} ⭐
              </div>
            </div>

            {/* AI Commentary Section */}
            <div className="border-t border-ctea-teal/20 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-ctea-teal">AI Commentary</h4>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => generateAICommentary(submission, 'spicy')}
                    className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                  >
                    🌶️ Spicy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => generateAICommentary(submission, 'smart')}
                    className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                  >
                    🧠 Smart
                  </Button>
                </div>
              </div>
              
              {aiComments[submission.id] && aiComments[submission.id].length > 0 && (
                <div className="space-y-2">
                  {aiComments[submission.id].map((comment) => (
                    <div key={comment.id} className="bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-ctea-teal font-medium">
                          {comment.type === 'spicy' ? '🌶️ Spicy Take' : '🧠 Smart Analysis'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
          setReportingSubmission(null);
        }}
        submissionId={reportingSubmission}
      />
    </div>
  );
};

export default TeaFeed;
