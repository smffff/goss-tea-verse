import React from 'react';
import HeroSection from '@/components/Hero';

const FallbackLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-300 to-blue-300 flex flex-col items-center justify-center font-[\'Anton\'] px-4">
      <div className="w-full max-w-3xl mx-auto">
        <HeroSection
          customTitle="☕ Spill the Tea, Even While We Build"
          customSubtitle="Our full app is steeping... but you can still leak what matters."
          ctaText="Spill Anonymous Tea"
          ctaLink="/spill"
          heroImage="/assets/cteacupicon.png"
          ctaClassName="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg px-8 py-3 text-lg shadow-lg transition font-[\'Anton\']"
        />
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 mt-6 rounded text-center text-lg shadow-md">
          CTea is live in early-access build mode. Some features may not work perfectly yet. Your gossip is safe. Our devs are caffeinated.
        </div>
      </div>
    </div>
  );
};

export default FallbackLanding; 