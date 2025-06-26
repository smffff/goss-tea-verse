import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedLogo from '@/components/AnimatedLogo';

const FooterBrand = () => {
  return (
    <div className="mb-8">
      <Link to="/" className="flex items-center gap-2 mb-4">
        <AnimatedLogo variant="subtle" size="lg" showText={true} />
      </Link>
      <p className="text-gray-400 text-sm leading-relaxed max-w-md">
        The ultimate crypto gossip platform where anonymous intel meets AI-powered insights. 
        Spill tea, earn clout, stay shady.
      </p>
    </div>
  );
};

export default FooterBrand;
