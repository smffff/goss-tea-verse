
import React from 'react';

const LiveStatsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            CTea by the Numbers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The community is growing faster than a memecoin pump
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20">
            <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">2,420</div>
            <div className="text-sm text-gray-600 font-medium">Beta Users</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-accent2/10 to-accent2/5 rounded-xl border border-accent2/20">
            <div className="text-3xl sm:text-4xl font-bold text-accent2 mb-2">15.7K</div>
            <div className="text-sm text-gray-600 font-medium">Hot Takes</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent2/10 rounded-xl border border-accent/20">
            <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">420K</div>
            <div className="text-sm text-gray-600 font-medium">$TEA Points</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-accent2/10 to-accent/10 rounded-xl border border-accent2/20">
            <div className="text-3xl sm:text-4xl font-bold text-accent2 mb-2">69</div>
            <div className="text-sm text-gray-600 font-medium">Viral Memes</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStatsSection;
