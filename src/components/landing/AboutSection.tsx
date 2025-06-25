
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-r from-accent/5 to-accent2/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            About CTea Newsroom
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">🎯 Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                We're building the ultimate anonymous gossip platform for crypto Twitter—where alpha leaks, 
                market takes, and spicy rumors get the attention they deserve.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">🛡️ Privacy First</h3>
              <p className="text-gray-700 leading-relaxed">
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
