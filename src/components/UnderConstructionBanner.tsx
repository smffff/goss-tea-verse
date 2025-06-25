import React, { useState } from 'react';

const UnderConstructionBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="w-full z-50 fixed top-0 left-0 flex justify-center animate-fadeInUp">
      <div className="flex items-center gap-3 px-6 py-3 rounded-b-xl shadow-xl bg-gradient-to-r from-pink-200 via-purple-300 to-blue-300 border-b-4 border-pink-400 text-tabloid-black font-bold text-base md:text-lg tracking-wide neon-glow">
        <span role="img" aria-label="warning">⚠️</span>
        <span>We're still steeping the good stuff... This version is live in <span className="text-pink-600">build mode</span>. Expect bugs, tea spills, and magic in motion.</span>
        <button
          onClick={() => setVisible(false)}
          className="ml-4 px-3 py-1 rounded-full bg-white/70 hover:bg-white text-pink-600 font-bold shadow transition"
          aria-label="Dismiss banner"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default UnderConstructionBanner; 