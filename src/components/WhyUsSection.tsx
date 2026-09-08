import React from 'react';
import { WHY_US_CARDS } from '../data/businessData';
import { Check } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-[#050505] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F58220]">
            AUTOMOTIVE STANDARDS
          </span>
          <h2 className="font-heading font-black italic tracking-tight text-4xl sm:text-5xl lg:text-6xl text-white uppercase mt-1">
            WHY XTREME DETAIL
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Engineered around high standards of surface preparation, optical clarity, and protective vehicle care.
          </p>
        </div>

        {/* Scroll Stacking Cards Container */}
        <div className="relative max-w-4xl mx-auto space-y-6 md:space-y-8">
          {WHY_US_CARDS.map((card, index) => {
            // Calculate sticky top offset for desktop stacking
            const stickyTop = 100 + index * 24; // Navbar height + incremental offset

            return (
              <div
                key={card.number}
                className="md:sticky rounded-sm border border-neutral-800 bg-[#101010] p-8 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.9)] transition-all duration-300 hover:border-[#F58220]/40 group"
                style={{
                  top: `${stickyTop}px`,
                  zIndex: 10 + index,
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
                  {/* Big Number Column */}
                  <div className="md:col-span-3 flex md:flex-col items-center md:items-start justify-between border-b md:border-b-0 md:border-r border-neutral-800 pb-4 md:pb-0 md:pr-6">
                    <span className="font-heading font-black italic text-5xl sm:text-6xl lg:text-7xl racing-gradient-text tracking-tighter">
                      {card.number}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase md:mt-2">
                      STANDARD
                    </span>
                  </div>

                  {/* Content Column */}
                  <div className="md:col-span-9 flex flex-col justify-center">
                    <h3 className="font-heading font-black italic text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide uppercase mb-3 group-hover:text-[#FFC400] transition-colors">
                      {card.headline}
                    </h3>
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">
                      {card.desc}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                      <div className="w-4 h-4 rounded-full bg-[#F58220]/20 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#F58220]" />
                      </div>
                      <span>{card.detail}</span>
                    </div>
                  </div>
                </div>

                {/* Subtle bottom edge gradient bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F58220]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
