import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { ASSETS, BUSINESS_INFO } from '../data/businessData';

interface FinalCTAProps {
  onBookClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onBookClick }) => {
  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden text-white border-t border-neutral-800">
      {/* Background with dark overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src={ASSETS.finalCtaImage}
          alt="Dark glossy performance car finish by Xtreme Detail LLC"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-45 contrast-125"
        />
        <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        
        {/* Subtle glowing center accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#F58220]/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FFC400] mb-4 inline-block">
          SAN FRANCISCO, CALIFORNIA
        </span>

        <h2 className="font-heading font-black italic tracking-tight text-4xl sm:text-6xl lg:text-7xl text-white uppercase leading-[0.95] mb-6 drop-shadow-xl">
          READY TO MAKE YOUR CAR <br />
          <span className="racing-gradient-text">XTREME AGAIN?</span>
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
          Restore true optical gloss, deep reflections, and durable surface protection with Xtreme Detail LLC.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="final-cta-book-btn"
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 rounded-sm font-heading italic font-extrabold tracking-wider text-base uppercase text-black bg-gradient-to-r from-[#FFC400] via-[#F58220] to-[#D92820] hover:brightness-110 shadow-[0_0_35px_rgba(245,130,32,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <span>BOOK YOUR DETAIL</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            id="final-cta-call-btn"
            href={`tel:${BUSINESS_INFO.phone}`}
            className="w-full sm:w-auto px-8 py-4 rounded-sm font-heading italic font-bold tracking-wider text-base uppercase text-white bg-black/80 hover:bg-white hover:text-black border border-white/20 hover:border-white transition-all backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#F58220]" />
            <span>{BUSINESS_INFO.phoneFormatted}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
