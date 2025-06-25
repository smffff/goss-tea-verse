
import { TeaSubmission } from '@/types/teaFeed';

export const mockSubmissions: TeaSubmission[] = [
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
