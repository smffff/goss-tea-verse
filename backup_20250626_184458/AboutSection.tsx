
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-br from-ctea-dark to-ctea-darker">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
            About CTea Newsroom
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            Where emotional intelligence meets memecoin culture. We're building the future where 
            Crypto Twitter can spill tea smarter, with AI-powered reactions and community-driven truth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4 bg-ctea-dark/30 backdrop-blur-lg border border-[#FF4C7B]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#FF4C7B] flex items-center gap-2">
                🎯 Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Emotional intelligence meets memecoin culture. CTea Newsroom is where crypto gossip 
                gets the AI treatment it deserves. We're not just another social platform—we're 
                building the future of how Crypto Twitter processes information, emotions, and truth.
              </p>
            </div>
            <div className="space-y-4 bg-ctea-dark/30 backdrop-blur-lg border border-ctea-purple/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-ctea-purple flex items-center gap-2">
                🧠 AI-Powered Insights
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Every submission gets analyzed by our AI for emotional tone, credibility markers, 
                and viral potential. No more wondering if your take is hot or cold—our AI will 
                tell you exactly what temperature your tea is brewing at.
              </p>
            </div>
            <div className="space-y-4 bg-ctea-dark/30 backdrop-blur-lg border border-ctea-teal/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-ctea-teal flex items-center gap-2">
                🚀 Anonymous & Rewarded
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Share without fear, earn through engagement. Build your anonymous reputation 
                through quality contributions. The best tea spillers rise to the top through 
                community validation and AI scoring.
              </p>
            </div>
            <div className="space-y-4 bg-ctea-dark/30 backdrop-blur-lg border border-ctea-yellow/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-ctea-yellow flex items-center gap-2">
                ☕ The Stephanie Vision
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Created by Lady Invisible (Stephanie), who saw the need for emotional intelligence 
                in crypto discourse. This isn't just gossip—it's about processing the chaos of 
                Web3 with the sophistication it deserves.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
