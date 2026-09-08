import React, { useState } from 'react';
import { ASSETS } from '../data/businessData';
import { Eye, Shield, Sparkles, Droplets, Check } from 'lucide-react';

export const DetailingShowcase: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number>(0);

  const showcaseItems = [
    {
      id: 'paint-clarity',
      title: 'PAINT CORRECTION & OPTICAL CLARITY',
      category: 'Surface Polishing',
      image: ASSETS.paintCorrectionImage,
      alt: 'Macro photography of automotive paint correction process with dual-action polisher on glossy black car',
      desc: 'Machine compounding and refining passes lift clear coat haze and swirl marks to reveal genuine paint depth and sharp mirror reflections.',
      tags: ['Rotary & Dual-Action Refinement', 'Swirl Elimination', 'High-Gloss Finish'],
      metric: 'Mirror Depth',
    },
    {
      id: 'hydrophobic-barrier',
      title: 'HYDROPHOBIC CERAMIC SURFACE BEADING',
      category: 'Nanotechnology Protection',
      image: ASSETS.ceramicBeadsImage,
      alt: 'Macro shot of spherical water droplets rolling off black ceramic coated car panel',
      desc: 'Liquid polymer nanotechnology establishes an ultra-slick, chemical-resistant barrier where water and road contaminants instantly bead and slide away.',
      tags: ['Intense Hydrophobic Sheeting', 'UV & Environmental Defense', 'Glass-Like Slickness'],
      metric: 'Extreme Water Contact Angle',
    },
    {
      id: 'interior-restoration',
      title: 'PRECISION COCKPIT REJUVENATION',
      category: 'Cabin Purification',
      image: ASSETS.interiorCockpitImage,
      alt: 'Luxury car cockpit interior detailed with matte leather and clean carbon fiber surfaces',
      desc: 'Delicate leather cleansing, matte conditioning, stitch cleaning, and deep fiber extraction restore the cabin to a fresh, showroom feel.',
      tags: ['Non-Greasy Matte Finish', 'Deep Steam Cleaning', 'Crevice Sanitization'],
      metric: 'Pristine Interior',
    },
    {
      id: 'exterior-finish',
      title: 'COMPLETE SHOWROOM EXTERIOR FINISH',
      category: 'Exterior Detail',
      image: ASSETS.heroImage,
      alt: 'Completed luxury supercar detailing in dark automotive studio with mirror reflections',
      desc: 'Comprehensive multi-stage treatment covering paint, glass, emblems, wheel barrels, and tires for a head-turning finish.',
      tags: ['Two-Bucket Safe Wash', 'Wheel Barrel Decontamination', 'Glass Clarity Treatment'],
      metric: 'Showroom Presence',
    },
  ];

  const current = showcaseItems[activeItem];

  return (
    <section id="showcase" className="py-24 bg-[#080808] text-white border-t border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-800 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F58220]">
              SURFACE MASTERY & DETAIL SHOWCASE
            </span>
            <h2 className="font-heading font-black italic tracking-tight text-4xl sm:text-5xl lg:text-6xl text-white uppercase mt-1">
              DETAILING SHOWCASE
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-sm inline-block">
              Interactive Surface Inspection
            </span>
          </div>
        </div>

        {/* Tab Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {showcaseItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(index)}
              className={`text-left p-4 rounded-sm border transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F58220] ${
                activeItem === index
                  ? 'bg-[#141414] border-[#F58220] text-white shadow-[0_0_15px_rgba(245,130,32,0.15)]'
                  : 'bg-[#101010] border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className={activeItem === index ? 'text-[#FFC400]' : 'text-neutral-500'}>
                  0{index + 1}
                </span>
                <span className="uppercase tracking-wider">{item.category}</span>
              </div>
              <div className="font-heading italic font-bold text-sm line-clamp-1">
                {item.title}
              </div>
            </button>
          ))}
        </div>

        {/* Featured Showcase Display Card */}
        <div className="bg-[#101010] border border-neutral-800 rounded-sm overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image viewer with zoom indicator and reflection overlay */}
            <div className="lg:col-span-8 relative min-h-[360px] sm:min-h-[460px] bg-black group overflow-hidden">
              <img
                src={current.image}
                alt={current.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="bg-black/80 backdrop-blur-md border border-neutral-700 text-[#FFC400] px-3 py-1 rounded-sm">
                  {current.metric}
                </span>
                <span className="text-neutral-400 bg-black/60 px-2 py-1 rounded-sm hidden sm:inline-block">
                  Studio Detailing Photography
                </span>
              </div>
            </div>

            {/* Description and Technical Highlights */}
            <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-[#101010]">
              <div>
                <div className="text-[10px] font-mono tracking-widest text-[#F58220] uppercase mb-2">
                  {current.category}
                </div>
                <h3 className="font-heading font-black italic text-2xl sm:text-3xl text-white uppercase tracking-wide mb-4">
                  {current.title}
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                  {current.desc}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Key Surface Attributes
                  </div>
                  {current.tags.map((tag, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-200">
                      <div className="w-4 h-4 rounded-full bg-[#FFC400]/20 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#FFC400]" />
                      </div>
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-800 text-[11px] font-mono text-neutral-500">
                Studio photographic documentation for Xtreme Detail LLC aesthetic review.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
