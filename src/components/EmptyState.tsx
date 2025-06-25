import React from 'react';
import { Coffee, MessageSquare, Sparkles, Crown, Eye } from 'lucide-react';
import TabloidButton from '@/components/ui/TabloidButton';

interface EmptyStateProps {
  variant?: 'feed' | 'comments' | 'leaderboard' | 'search' | 'error';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  showIcon?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  variant = 'feed',
  title,
  description,
  actionLabel,
  onAction,
  showIcon = true
}) => {
  const getVariantContent = () => {
    switch (variant) {
      case 'feed':
        return {
          icon: <Coffee className="w-16 h-16 text-vintage-red/60" />,
          title: title || "No Tea to Spill Yet! 🫖",
          description: description || "The gossip mill is running dry. Be the first to drop some piping hot drama and get this party started!",
          actionLabel: actionLabel || "Spill the First Tea",
          bgGradient: "from-vintage-red/5 to-pale-pink/10"
        };
      case 'comments':
        return {
          icon: <MessageSquare className="w-16 h-16 text-vintage-red/60" />,
          title: title || "Dead Silent in Here... 🦗",
          description: description || "No one's talking about this tea yet. Break the ice and drop your hot take - someone has to start the drama!",
          actionLabel: actionLabel || "Drop Your Hot Take",
          bgGradient: "from-neon-pink/5 to-vintage-red/5"
        };
      case 'leaderboard':
        return {
          icon: <Crown className="w-16 h-16 text-vintage-red/60" />,
          title: title || "No Legends Yet! 👑",
          description: description || "The leaderboard is empty and waiting for its first queen. Start spilling tea to claim your throne!",
          actionLabel: actionLabel || "Claim Your Crown",
          bgGradient: "from-vintage-red/5 to-neon-pink/5"
        };
      case 'search':
        return {
          icon: <Eye className="w-16 h-16 text-vintage-red/60" />,
          title: title || "No Tea Found! 🔍",
          description: description || "We searched high and low but couldn't find any drama matching that. Try different keywords or spill your own tea!",
          actionLabel: actionLabel || "Spill New Tea",
          bgGradient: "from-pale-pink/5 to-vintage-red/5"
        };
      case 'error':
        return {
          icon: <Sparkles className="w-16 h-16 text-vintage-red/60" />,
          title: title || "Oops! Drama Overload! 😤",
          description: description || "Something went wrong while we were brewing your tea. Even the best gossip networks have hiccups!",
          actionLabel: actionLabel || "Try Again",
          bgGradient: "from-vintage-red/10 to-pale-pink/5"
        };
      default:
        return {
          icon: <Coffee className="w-16 h-16 text-vintage-red/60" />,
          title: title || "Nothing Here Yet!",
          description: description || "Time to spill some tea and get this party started!",
          actionLabel: actionLabel || "Get Started",
          bgGradient: "from-vintage-red/5 to-pale-pink/5"
        };
    }
  };

  const content = getVariantContent();

  return (
    <div className={`flex flex-col items-center justify-center text-center p-12 bg-gradient-to-br ${content.bgGradient} rounded-xl border border-vintage-red/20`}>
      {showIcon && (
        <div className="mb-6 animate-float">
          {content.icon}
        </div>
      )}
      
      <h3 className="font-tabloid text-2xl text-tabloid-black uppercase tracking-wider mb-4 max-w-md">
        {content.title}
      </h3>
      
      <p className="text-tabloid-black/70 font-medium text-lg max-w-lg mb-8 leading-relaxed">
        {content.description}
      </p>
      
      {onAction && actionLabel && (
        <TabloidButton 
          variant="spill" 
          onClick={onAction}
          className="font-bold text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
        >
          {content.actionLabel}
        </TabloidButton>
      )}
      
      {variant === 'feed' && (
        <div className="mt-6 bg-vintage-red/10 border border-vintage-red/30 rounded-lg p-4 max-w-md">
          <p className="text-vintage-red text-sm font-bold">
            💡 Pro Tip: The spicier the tea, the bigger the reactions. No basic gossip allowed!
          </p>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
