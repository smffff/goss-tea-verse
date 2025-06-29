import React, { memo, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { useUnifiedState } from '@/hooks/useUnifiedState';
import { UnifiedService } from '@/services/UnifiedService';
import { useComponentPerformance } from '@/hooks/usePerformanceMonitor';

interface TeaSubmission {
  id: string;
  tea: string;
  category: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  is_anonymous: boolean;
  evidence_urls?: string[];
  metadata?: {
    ai_commentary?: string;
    credibility_score?: number;
  };
}

interface OptimizedTeaFeedProps {
  submissions: TeaSubmission[];
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
  className?: string;
}

// Memoized individual tea submission card
const TeaSubmissionCard = memo<{
  submission: TeaSubmission;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
  index: number;
}>(({ submission, onLike, onComment, onShare, index }) => {
  const { startRender, endRender } = useComponentPerformance(`TeaCard-${submission.id}`);
  
  useEffect(() => {
    startRender();
    return () => {
      const renderTime = endRender();
      if (renderTime > 16) {
        console.warn(`TeaCard ${submission.id} took ${renderTime.toFixed(2)}ms to render`);
      }
    };
  });

  const formattedDate = useMemo(() => {
    return new Date(submission.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [submission.created_at]);

  const credibilityColor = useMemo(() => {
    const score = submission.metadata?.credibility_score || 0;
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  }, [submission.metadata?.credibility_score]);

  const handleLike = useCallback(() => {
    onLike(submission.id);
  }, [submission.id, onLike]);

  const handleComment = useCallback(() => {
    onComment(submission.id);
  }, [submission.id, onComment]);

  const handleShare = useCallback(() => {
    onShare(submission.id);
  }, [submission.id, onShare]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      layout
    >
      <Card className="mb-4 bg-ctea-dark/50 border-ctea-teal/20 hover:border-ctea-teal/40 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-ctea-teal to-ctea-purple rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {submission.is_anonymous ? '🫖' : '👤'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  {submission.is_anonymous ? 'Anonymous Tea Spiller' : 'Named User'}
                </p>
                <p className="text-xs text-gray-500">{formattedDate}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-ctea-teal/30 text-ctea-teal">
                {submission.category}
              </Badge>
              {submission.metadata?.credibility_score && (
                <div className={`w-3 h-3 rounded-full ${credibilityColor}`} 
                     title={`Credibility: ${submission.metadata.credibility_score}%`} />
              )}
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-white leading-relaxed mb-3">{submission.tea}</p>
            
            {submission.metadata?.ai_commentary && (
              <div className="bg-ctea-darker/50 border-l-4 border-ctea-teal/50 p-3 rounded-r-lg">
                <p className="text-sm text-gray-300 italic">
                  "💭 {submission.metadata.ai_commentary}"
                </p>
              </div>
            )}
          </div>

          {submission.evidence_urls && submission.evidence_urls.length > 0 && (
            <div className="mb-4 flex gap-2 overflow-x-auto">
              {submission.evidence_urls.map((url, idx) => (
                <div key={idx} className="flex-shrink-0 w-20 h-20 bg-ctea-darker rounded-lg border border-ctea-teal/20">
                  {/* Placeholder for evidence images */}
                  <div className="w-full h-full flex items-center justify-center text-ctea-teal">
                    📎
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-ctea-teal/20">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
              >
                <Heart className="w-4 h-4 mr-1" />
                {submission.likes_count}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleComment}
                className="text-gray-400 hover:text-blue-400 hover:bg-blue-400/10"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                {submission.comments_count}
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-gray-400 hover:text-green-400 hover:bg-green-400/10"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

TeaSubmissionCard.displayName = 'TeaSubmissionCard';

// Virtualized list component for performance
const VirtualizedTeaList = memo<{
  submissions: TeaSubmission[];
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
}>(({ submissions, onLike, onComment, onShare }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 10 });
  
  const itemHeight = 200; // Estimated height of each card
  const containerHeight = 600; // Fixed container height
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = containerRef.current.scrollTop;
      const start = Math.floor(scrollTop / itemHeight);
      const end = Math.min(start + Math.ceil(containerHeight / itemHeight) + 2, submissions.length);
      
      setVisibleRange({ start, end });
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [submissions.length, itemHeight, containerHeight]);
  
  const visibleSubmissions = submissions.slice(visibleRange.start, visibleRange.end);
  const totalHeight = submissions.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;
  
  return (
    <div 
      ref={containerRef}
      className="h-[600px] overflow-y-auto"
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleSubmissions.map((submission, index) => (
            <TeaSubmissionCard
              key={submission.id}
              submission={submission}
              onLike={onLike}
              onComment={onComment}
              onShare={onShare}
              index={visibleRange.start + index}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

VirtualizedTeaList.displayName = 'VirtualizedTeaList';

// Main optimized tea feed component
const OptimizedTeaFeed: React.FC<OptimizedTeaFeedProps> = memo(({
  submissions,
  onLike,
  onComment,
  onShare,
  className = ''
}) => {
  const { startRender, endRender } = useComponentPerformance('OptimizedTeaFeed');
  
  useEffect(() => {
    startRender();
    return () => {
      const renderTime = endRender();
      if (renderTime > 16) {
        console.warn(`OptimizedTeaFeed took ${renderTime.toFixed(2)}ms to render`);
      }
    };
  });

  const sortedSubmissions = useMemo(() => {
    return [...submissions].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [submissions]);

  const handleLike = useCallback((id: string) => {
    onLike?.(id);
  }, [onLike]);

  const handleComment = useCallback((id: string) => {
    onComment?.(id);
  }, [onComment]);

  const handleShare = useCallback((id: string) => {
    onShare?.(id);
  }, [onShare]);

  const stats = useMemo(() => {
    const totalLikes = sortedSubmissions.reduce((sum, s) => sum + s.likes_count, 0);
    const totalComments = sortedSubmissions.reduce((sum, s) => sum + s.comments_count, 0);
    const avgCredibility = sortedSubmissions.reduce((sum, s) => 
      sum + (s.metadata?.credibility_score || 0), 0) / sortedSubmissions.length;
    
    return { totalLikes, totalComments, avgCredibility };
  }, [sortedSubmissions]);

  if (sortedSubmissions.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-6xl mb-4">🫖</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Tea Yet</h3>
        <p className="text-gray-400">Be the first to spill some tea!</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Stats Header */}
      <div className="bg-ctea-dark/30 rounded-lg p-4 border border-ctea-teal/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-ctea-teal">{sortedSubmissions.length}</p>
            <p className="text-sm text-gray-400">Submissions</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-400">{stats.totalLikes}</p>
            <p className="text-sm text-gray-400">Total Likes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">{stats.totalComments}</p>
            <p className="text-sm text-gray-400">Comments</p>
          </div>
        </div>
      </div>

      {/* Tea Feed */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <span>🫖</span>
          Latest Tea Spills
        </h2>
        
        {sortedSubmissions.length > 20 ? (
          <VirtualizedTeaList
            submissions={sortedSubmissions}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
          />
        ) : (
          <AnimatePresence>
            {sortedSubmissions.map((submission, index) => (
              <TeaSubmissionCard
                key={submission.id}
                submission={submission}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                index={index}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
});

OptimizedTeaFeed.displayName = 'OptimizedTeaFeed';

export default OptimizedTeaFeed; 