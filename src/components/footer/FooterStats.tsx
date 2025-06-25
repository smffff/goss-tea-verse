
import React from 'react';

const FooterStats = () => {
  return (
    <div className="border-t border-ctea-teal/20 pt-8 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-ctea-teal">15.7K</div>
          <div className="text-sm text-gray-400">Tea Spilled</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-ctea-purple">2.4K</div>
          <div className="text-sm text-gray-400">Active Sippers</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-ctea-yellow">420K</div>
          <div className="text-sm text-gray-400">$TEA Distributed</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-ctea-pink">99.2%</div>
          <div className="text-sm text-gray-400">Uptime</div>
        </div>
      </div>
    </div>
  );
};

export default FooterStats;
