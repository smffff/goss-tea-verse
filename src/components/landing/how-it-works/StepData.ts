
import { MessageSquare, Image, Brain, Trophy, Shield } from 'lucide-react';

export interface StepConfig {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  parallaxOffset: number;
}

export const steps: StepConfig[] = [
  {
    icon: <MessageSquare className="w-16 h-16" />,
    title: "Anonymous Gossip",
    description: "Share your hottest crypto intel without revealing identity",
    color: "from-cyan-500 to-blue-500",
    bgColor: "from-cyan-500/20 to-blue-500/20",
    parallaxOffset: -50
  },
  {
    icon: <Image className="w-16 h-16" />,
    title: "Meme Templating",
    description: "Auto-generate viral memes from your gossip drops",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-500/20 to-pink-500/20",
    parallaxOffset: -100
  },
  {
    icon: <Brain className="w-16 h-16" />,
    title: "AI Commentary",
    description: "Smart bots analyze and amplify your tea with spicy takes",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-500/20 to-red-500/20",
    parallaxOffset: -150
  },
  {
    icon: <Trophy className="w-16 h-16" />,
    title: "On-Chain Reputation",
    description: "Build credibility and earn $TEA tokens for quality spills",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-500/20 to-emerald-500/20",
    parallaxOffset: -200
  },
  {
    icon: <Shield className="w-16 h-16" />,
    title: "Moderated Queues",
    description: "Community governance keeps the chaos organized",
    color: "from-indigo-500 to-purple-600",
    bgColor: "from-indigo-500/20 to-purple-600/20",
    parallaxOffset: -250
  }
];
