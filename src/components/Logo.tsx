import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/businessData';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  customLogoSrc?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', customLogoSrc }) => {
  const [imageError, setImageError] = useState(false);
  const logoUrl = customLogoSrc || BUSINESS_INFO.officialLogo;

  const logoHeights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-14 sm:h-16',
  };

  const titleSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[10px] tracking-[0.24em]',
    lg: 'text-xs tracking-[0.28em]',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Client Logo Image */}
      {!imageError && logoUrl ? (
        <div className="relative shrink-0 flex items-center">
          <img
            src={logoUrl}
            alt="Xtreme Detail LLC Official Logo"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className={`object-contain rounded-xs border border-white/10 shadow-[0_2px_12px_rgba(245,130,32,0.25)] ${logoHeights[size]}`}
          />
        </div>
      ) : (
        /* Dynamic SVG badge fallback if image fails to load */
        <div className={`relative flex items-center justify-center shrink-0 ${size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10'}`}>
          <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_10px_rgba(245,130,32,0.35)]">
            <defs>
              <linearGradient id="racingFlameFallback" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFC400" />
                <stop offset="48%" stopColor="#F58220" />
                <stop offset="100%" stopColor="#D92820" />
              </linearGradient>
              <linearGradient id="charcoalMetalFallback" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2A2A2A" />
                <stop offset="100%" stopColor="#111111" />
              </linearGradient>
            </defs>
            <polygon
              points="12,2 38,2 43,22 32,42 6,42 1,22"
              fill="url(#charcoalMetalFallback)"
              stroke="#262626"
              strokeWidth="1.5"
            />
            <path d="M9 35L29 7H36L16 35H9Z" fill="url(#racingFlameFallback)" />
            <path d="M33 35L23 20L28 13L37 26L33 35Z" fill="#FFFFFF" />
            <path d="M7 9L15 20L11 26L3 15L7 9Z" fill="#A3A3A3" />
          </svg>
        </div>
      )}

      {/* Brand Name Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className={`font-heading font-black italic tracking-wider text-white ${titleSizes[size]}`}>
            XTREME
          </span>
          <span className={`font-heading font-bold italic tracking-wide text-white/90 ${titleSizes[size]}`}>
            DETAIL
          </span>
          <span className="text-[10px] font-bold text-[#F58220] tracking-normal uppercase ml-0.5">
            LLC
          </span>
        </div>
        <span className={`font-sans font-semibold text-neutral-400 uppercase ${subSizes[size]}`}>
          San Francisco
        </span>
      </div>
    </div>
  );
};
