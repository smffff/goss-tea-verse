
import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES, ALT_TEXT } from '@/config/images';

const NavigationLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <img 
        src={IMAGES.logo}
        alt={ALT_TEXT.logo}
        className="w-8 h-8 object-contain"
      />
      <span className="font-bold text-brand-text text-xl font-anton">
        CTea News
      </span>
    </Link>
  );
};

export default NavigationLogo;
