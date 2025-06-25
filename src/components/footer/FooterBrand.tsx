
import React from 'react';
import { Link } from 'react-router-dom';

const FooterBrand = () => {
  return (
    <div className="lg:col-span-2">
      <Link to="/" className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-ctea-teal to-ctea-purple rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <span className="text-xl font-bold text-white">CTea</span>
      </Link>
      <p className="text-gray-400 mb-4 text-sm leading-relaxed">
        The ultimate platform for crypto gossip, verified rumors, and community-driven truth. 
        Spill the tea, earn rewards, and stay ahead of the crypto narrative.
      </p>
    </div>
  );
};

export default FooterBrand;
