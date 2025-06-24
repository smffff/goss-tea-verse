
import React from 'react';
import WeeklyCampaignManager from '@/components/WeeklyCampaignManager';
import HypeCard from '@/components/HypeCard';

const Campaigns = () => {
  const hypeItems = [
    {
      title: "Top Tea Spillers",
      description: "See who's dominating the leaderboards this week",
      type: "leaderboard" as const,
      participants: 1247,
      featured: true
    },
    {
      title: "Evidence Spotlight",
      description: "The most credible submissions with receipts",
      type: "spotlight" as const,
      participants: 89
    },
    {
      title: "Chaos Challenge",
      description: "Who can create the most chaotic but entertaining content?",
      type: "challenge" as const,
      isActive: true,
      timeLeft: "3 days",
      participants: 234
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 animate-glow">
          Weekly Campaigns 🚀
        </h1>
        <p className="text-lg text-gray-300">
          Join themed challenges, earn $TEA points, and climb the leaderboards. 
          The spiciest content gets the biggest rewards!
        </p>
      </div>

      <WeeklyCampaignManager />

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">
          ✨ Community Highlights
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {hypeItems.map((item, index) => (
            <HypeCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
