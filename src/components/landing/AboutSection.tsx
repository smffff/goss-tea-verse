
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
            Born from the mind of ladyinvsible, CTea Newsroom fills the void that crypto Twitter 
            never knew it had—a place for anonymous gossip, verified rumors, and community-driven truth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4 bg-ctea-dark/30 backdrop-blur-lg border border-ctea-teal/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-ctea-teal flex items-center gap-2">
                🎯 Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Crypto doesn't need another whitepaper—it needs a gossip column. We're building 
                the platform where alpha leaks, market takes, and spicy rumors get the spotlight 
                they deserve, all while keeping contributors anonymous and secure.
              </p>
            </div>
            <div className="space-y-4 bg-ctea-dark/30 backdrop-blur-lg border border-ctea-purple/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-ctea-purple flex items-center gap-2">
                🛡️ Privacy First
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Built by someone who understands the importance of anonymity in crypto. 
                Advanced encryption protects your identity while our community curation 
                ensures quality content rises to the top.
              </p>
            </div>
            <div className="space-y-4 bg-ctea-dark/30 backdrop-blur-lg border border-ctea-pink/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-ctea-pink flex items-center gap-2">
                🚀 Community Driven
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Every feature, from the reaction system to the governance model, was designed 
                with the crypto community in mind. This isn't just another platform—it's 
                your platform, built by one of your own.
              </p>
            </div>
            <div className="space-y-4 bg-ctea-dark/30 backdrop-blur-lg border border-ctea-yellow/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-ctea-yellow flex items-center gap-2">
                ☕ The ladyinvsible Touch
              </h3>
              <p className="text-gray-300 leading-relaxed">
                From meme culture to market dynamics, ladyinvsible brought years of crypto 
                experience into every aspect of CTea Newsroom. This is gossip with purpose, 
                chaos with community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
