
import React from 'react';

interface TeaCupProps {
  className?: string;
  animated?: boolean;
}

const TeaCup: React.FC<TeaCupProps> = ({ className = '', animated = false }) => {
  return (
    <div className={`${className} ${animated ? 'animate-bounce' : ''}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Steam */}
        <g className={animated ? 'animate-pulse' : ''}>
          <path
            d="M35 20 C35 15, 40 15, 40 20 C40 15, 45 15, 45 20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-ctea-teal opacity-60"
          />
          <path
            d="M45 18 C45 13, 50 13, 50 18 C50 13, 55 13, 55 18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-ctea-pink opacity-40"
          />
        </g>
        
        {/* Cup Body */}
        <path
          d="M25 30 L25 70 C25 75, 30 80, 35 80 L55 80 C60 80, 65 75, 65 70 L65 30 Z"
          fill="url(#cupGradient)"
          stroke="currentColor"
          strokeWidth="2"
          className="text-ctea-teal"
        />
        
        {/* Tea liquid */}
        <path
          d="M27 32 L27 68 C27 72, 31 76, 35 76 L55 76 C59 76, 63 72, 63 68 L63 32 Z"
          fill="url(#teaGradient)"
          className="opacity-80"
        />
        
        {/* Handle */}
        <path
          d="M65 45 C75 45, 75 55, 65 55"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-ctea-teal"
        />
        
        {/* Saucer */}
        <ellipse
          cx="45"
          cy="82"
          rx="25"
          ry="4"
          fill="url(#saucerGradient)"
          className="opacity-60"
        />
        
        <defs>
          <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F766E" />
            <stop offset="100%" stopColor="#134E4A" />
          </linearGradient>
          <linearGradient id="teaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="saucerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F766E" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default TeaCup;
