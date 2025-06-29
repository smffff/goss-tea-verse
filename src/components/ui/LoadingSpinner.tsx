import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-6xl animate-bounce">🫖</div>
        <div className="w-8 h-8 border-2 border-ctea-teal/30 border-t-ctea-teal rounded-full animate-spin mx-auto"></div>
        <p className="text-white font-medium">Brewing your CTea experience...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 