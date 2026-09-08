import React from 'react';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO, ASSETS } from '../data/businessData';

interface AboutSectionProps {
  onBookClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBookClick }) => {
  return (
    <section id="about" className="py-24 bg-[#080808] text-white border-t border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-sm overflow-hidden border border-neutral-800 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
              <img
                src={ASSETS.aboutImage}
                alt="Automotive detailing showroom finish by Xtreme Detail LLC"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[460px] object-cover filter brightness-95 contrast-105 hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Corner accent */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-sm bg-black/80 border border-neutral-700 backdrop-blur-md">
                <span className="text-[10px] font-mono tracking-widest text-[#FFC400] uppercase">
                  SAN FRANCISCO STUDIO
                </span>
              </div>
            </div>

            {/* Accent frame badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#101010] border border-[#F58220]/40 p-4 rounded-sm shadow-xl hidden sm:block">
              <span className="text-xs font-mono uppercase tracking-widest text-[#F58220]">
                STUDIO FOCUS
              </span>
              <div className="font-heading italic font-black text-xl text-white mt-0.5 uppercase">
                PRECISION AUTOMOTIVE CARE
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F58220] mb-2">
              ABOUT XTREME DETAIL LLC
            </span>
            <h2 className="font-heading font-black italic tracking-tight text-4xl sm:text-5xl text-white uppercase mb-6 leading-tight">
              DEDICATED TO THE ART OF AUTOMOTIVE FINISH.
            </h2>

            <div className="space-y-4 text-neutral-300 text-base leading-relaxed mb-8">
              <p>
                Based in San Francisco, California, <strong className="text-white font-semibold">Xtreme Detail LLC</strong> provides premium automotive detailing and car washing services tailored for vehicles that deserve attentive care.
              </p>
              <p>
                Our philosophy centers on thorough craftsmanship and surface preservation. From meticulous multi-stage hand washing to intensive interior cabin rejuvenation, machine paint polishing, and hydrophobic ceramic coatings, every service is conducted with meticulous focus on vehicle beauty and cleanliness.
              </p>
              <p className="text-neutral-400 text-sm">
                We treat every vehicle as a reflection of precision, bringing back a clean showroom appearance that stands out in Northern California.
              </p>
            </div>

            {/* Quick Contact & Info points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-neutral-800 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-black border border-neutral-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#F58220]" />
                </div>
                <div>
                  <div className="text-xs font-mono text-neutral-400 uppercase">Location</div>
                  <div className="text-sm font-semibold text-white">{BUSINESS_INFO.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-black border border-neutral-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-[#FFC400]" />
                </div>
                <div>
                  <div className="text-xs font-mono text-neutral-400 uppercase">Direct Phone</div>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="text-sm font-semibold text-white hover:text-[#F58220] transition-colors"
                  >
                    {BUSINESS_INFO.phoneFormatted}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <button
                id="about-book-btn"
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#FFC400] via-[#F58220] to-[#D92820] text-black font-heading italic font-extrabold text-sm uppercase tracking-wider rounded-sm hover:brightness-110 transition-all shadow-[0_0_25px_rgba(245,130,32,0.3)]"
              >
                <span>REQUEST AN ESTIMATE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
