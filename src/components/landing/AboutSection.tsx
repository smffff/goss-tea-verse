
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-br from-ctea-dark to-ctea-darker">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
            About CTea Newsroom
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4 bg-ctea-dark/30 backdrop-blur-lg border border-ctea-teal/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-ctea-teal flex items-center gap-2">
                🎯 Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We're building the ultimate anonymous gossip platform for crypto Twitter—where alpha leaks, 
                market takes, and spicy rumors get the attention they deserve.
              </p>
            </div>
            <div className="space-y-4 bg-ctea-dark/30 backdrop-blur-lg border border-ctea-purple/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-ctea-purple flex items-center gap-2">
                🛡️ Privacy First
              </h3>
              <p className="text-gray-300 leading-relaxed">
                All submissions are anonymous by default. We use advanced encryption to protect your identity 
                while ensuring quality content rises to the top.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
