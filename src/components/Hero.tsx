import React from "react";

interface HeroSectionProps {
  showDisclaimer?: boolean;
  customTitle?: string;
  customSubtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  heroImage?: string;
  ctaClassName?: string;
}

const HERO_TEXT = "Spill Tea. Stack Clout.";
const HERO_SUBHEAD = "Anonymous, viral, and a little bit dangerous.";
const HERO_IMAGE = "/assets/cteacupicon.png";
const CTA_TEXT = "🫖 Spill Tea Now";
const CTA_LINK = "/spill";
const CTA_CLASS = "px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition hover-lift shadow-lg text-lg font-['Oswald']";

const HeroSection: React.FC<HeroSectionProps> = ({
  showDisclaimer,
  customTitle,
  customSubtitle,
  ctaText,
  ctaLink,
  heroImage,
  ctaClassName,
}) => {
  return (
    <section
      className="relative w-full flex flex-col-reverse md:flex-row items-center justify-between px-6 py-12 md:py-24 bg-gradient-to-r from-pink-200 via-purple-300 to-blue-300 overflow-hidden min-h-[400px] md:min-h-[500px]"
    >
      {/* Text Content */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
        <h1
          className="font-['Anton'] font-extrabold uppercase text-4xl md:text-6xl mb-4 neon-glow"
          style={{ letterSpacing: '0.04em' }}
        >
          {customTitle || HERO_TEXT}
        </h1>
        <p className="font-['Oswald'] text-lg md:text-2xl font-semibold mb-6 text-gray-800 md:max-w-md">
          {customSubtitle || HERO_SUBHEAD}
        </p>
        <a href={ctaLink || CTA_LINK}>
          <button
            className={ctaClassName || CTA_CLASS}
          >
            {ctaText || CTA_TEXT}
          </button>
        </a>
        {showDisclaimer && (
          <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-900 rounded shadow-md animate-pulse-slow max-w-md">
            <span className="font-bold">The tea is still steeping…</span> we're brewing something juicy. Come back soon or drop your gossip anyway.
          </div>
        )}
      </div>
      {/* Hero Image */}
      <div className="flex-1 flex justify-center md:justify-end items-center mb-8 md:mb-0">
        <img
          src={heroImage || HERO_IMAGE}
          alt="Ctea Cup Icon"
          className="w-40 h-40 md:w-64 md:h-64 object-contain drop-shadow-2xl animate-float"
          draggable={false}
        />
      </div>
      {/* Optional: Floating Beta Badge */}
      <div className="absolute top-4 right-4 bg-yellow-400 px-3 py-1 text-xs font-bold rounded-full animate-bounce-subtle shadow-lg z-20 pointer-events-none">
        Beta Brew 🫖
      </div>
    </section>
  );
};

export default HeroSection; 