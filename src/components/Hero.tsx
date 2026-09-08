import React from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { ASSETS, BUSINESS_INFO } from '../data/businessData';

interface HeroProps {
  onBookNowClick: () => void;
  onViewServicesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookNowClick, onViewServicesClick }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#050505]"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src={ASSETS.heroImage}
          alt="Freshly detailed luxury performance vehicle in dark automotive studio"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Multi-layer cinematic overlays for text readability and moody aesthetic */}
        <div className="absolute inset-0 bg-[#050505]/75 backdrop-brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
        
        {/* Subtle orange ambient edge light */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#F58220]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Subtle location indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101010]/80 border border-white/10 backdrop-blur-md mb-6 text-xs tracking-wider uppercase text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-[#FFC400] animate-pulse" />
            <span className="font-semibold text-white">San Francisco, California</span>
            <span className="text-neutral-500">•</span>
            <span className="text-[#F58220]">Automotive Studio</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading font-black italic tracking-tight text-5xl sm:text-7xl lg:text-8xl leading-[0.92] text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] mb-6">
            XTREME DETAIL.<br />
            <span className="racing-gradient-text">EXTREME RESULTS.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl mb-10 drop-shadow-md">
            {BUSINESS_INFO.heroSubheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 mb-14">
            {/* Primary CTA */}
            <button
              id="hero-book-cta"
              onClick={onBookNowClick}
              className="group relative px-8 py-4 rounded-sm font-heading italic font-extrabold tracking-wider text-lg uppercase text-black overflow-hidden shadow-[0_0_30px_rgba(245,130,32,0.35)] hover:shadow-[0_0_45px_rgba(245,130,32,0.6)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFC400] via-[#F58220] to-[#D92820] group-hover:brightness-110 transition-all duration-300" />
              <div className="relative flex items-center justify-center gap-2.5 z-10 text-black">
                <span>BOOK YOUR DETAIL</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>

            {/* Secondary CTA */}
            <button
              id="hero-services-cta"
              onClick={onViewServicesClick}
              className="px-8 py-4 rounded-sm font-heading italic font-bold tracking-wider text-lg uppercase text-white bg-[#101010]/80 hover:bg-white hover:text-black border border-white/40 hover:border-white transition-all duration-300 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] flex items-center justify-center"
            >
              VIEW SERVICES
            </button>
          </div>

          {/* Subtle Key Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-neutral-400">
            <div>
              <div className="font-heading italic font-bold text-white text-lg">CERAMIC & PAINT</div>
              <div className="text-xs text-neutral-400">Precision correction & coating</div>
            </div>
            <div>
              <div className="font-heading italic font-bold text-white text-lg">INTERIOR PURIFICATION</div>
              <div className="text-xs text-neutral-400">Deep steam & leather care</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-heading italic font-bold text-white text-lg">BAY AREA STUDIO</div>
              <div className="text-xs text-neutral-400">San Francisco, CA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={onViewServicesClick}
        aria-label="Scroll to services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-neutral-400 hover:text-white transition-colors duration-200"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-1">SCROLL</span>
        <ChevronDown className="w-5 h-5 animate-bounce text-[#FFC400]" />
      </button>
    </section>
  );
};
