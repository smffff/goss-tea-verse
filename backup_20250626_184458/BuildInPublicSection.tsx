
import React from 'react';
import TwitterPostGenerator from './TwitterPostGenerator';

const BuildInPublicSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-ctea-dark to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Building in Public 🚧
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Share your development journey with the community. Generate Twitter posts 
            about your building process and connect with other developers.
          </p>
        </div>
        
        <TwitterPostGenerator />
      </div>
    </section>
  );
};

export default BuildInPublicSection;
