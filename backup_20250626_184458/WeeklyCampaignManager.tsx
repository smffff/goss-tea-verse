import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import WeeklyCampaign from '@/components/WeeklyCampaign';

const WeeklyCampaignManager = () => {
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [upcomingCampaigns, setUpcomingCampaigns] = useState([]);

  // Mock campaign data - in production this would come from Supabase
  const campaigns = [
    {
      id: 1,
      title: "Monday Meme Madness",
      description: "Drop your spiciest crypto memes and earn double $TEA points! The most viral meme wins exclusive CTeaBot commentary and a rare achievement badge.",
      theme: "meme",
      startDate: new Date(),
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      participants: 1247,
      topPrize: "500 $TEA",
      isActive: true,
      submissions: 89
    },
    {
      id: 2,
      title: "Tuesday Tea Time",
      description: "Spill the hottest gossip from the crypto world. Anonymous submissions encouraged. Best drama gets featured in our weekly roundup.",
      theme: "drama",
      startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      participants: 0,
      topPrize: "300 $TEA",
      isActive: false,
      submissions: 0
    },
    {
      id: 3,
      title: "Viral Friday Frenzy",
      description: "Create content that breaks the internet. Only the most shareable content wins. Bonus points for receipts and evidence!",
      theme: "viral",
      startDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
      participants: 0,
      topPrize: "1000 $TEA",
      isActive: false,
      submissions: 0
    }
  ];

  useEffect(() => {
    // Filter active and upcoming campaigns
    const active = campaigns.filter(c => c.isActive);
    const upcoming = campaigns.filter(c => !c.isActive);
    
    setCurrentCampaign(active[0] || null);
    setUpcomingCampaigns(upcoming);
  }, []);

  return (
    <div className="space-y-6">
      {currentCampaign && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 animate-glow">
            🔥 Active Campaign
          </h2>
          <WeeklyCampaign {...currentCampaign} />
        </div>
      )}
      
      {upcomingCampaigns.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            📅 Upcoming Campaigns
          </h3>
          <div className="space-y-4">
            {upcomingCampaigns.slice(0, 2).map((campaign) => (
              <WeeklyCampaign key={campaign.id} {...campaign} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyCampaignManager;
