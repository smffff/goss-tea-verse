
import React from 'react';

const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Vaporwave Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#100C2A] via-[#1a0d26] to-[#0a0a0a]">
        {/* Retro Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 216, 164, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 216, 164, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Neon Glow Effects */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#FF4FB3]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00D8A4]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF9C39]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </>
  );
};

export default BackgroundEffects;
