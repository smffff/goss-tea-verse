import React from 'react';

interface PixelIconProps {
  className?: string;
  size?: number;
}

const PixelIcon: React.FC<PixelIconProps> = ({ className = '', size = 24 }) => {
  return (
    <div 
      className={`pixel-art ${className}`}
      style={{
        width: size,
        height: size,
        imageRendering: 'pixelated',
        background: 'linear-gradient(45deg, #FF2052, #FFD93D)',
        borderRadius: '4px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Pixel art pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-1/4 h-1/4 bg-white"></div>
        <div className="w-1/4 h-1/4 bg-white absolute top-1/4 right-1/4"></div>
        <div className="w-1/4 h-1/4 bg-white absolute bottom-1/4 left-1/4"></div>
        <div className="w-1/4 h-1/4 bg-white absolute bottom-0 right-0"></div>
      </div>
    </div>
  );
};

export default PixelIcon; 