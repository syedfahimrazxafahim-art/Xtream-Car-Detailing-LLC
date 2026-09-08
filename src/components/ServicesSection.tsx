import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Shield, Wrench, Droplets, Car, Armchair, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data/businessData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#FFC400]" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#F58220]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-[#FFC400]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-[#F58220]" />;
      case 'Car':
        return <Car className="w-5 h-5 text-[#FFC400]" />;
      case 'Armchair':
        return <Armchair className="w-5 h-5 text-[#F58220]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#FFC400]" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#050505] text-white relative">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#F58220]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F58220]">
              AUTOMOTIVE DETAILING & CARE
            </span>
            <h2 className="font-heading font-black italic tracking-tight text-4xl sm:text-5xl lg:text-6xl text-white uppercase mt-1">
              SERVICES
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-sm leading-relaxed">
            Professional automotive care calibrated to revive, enhance, and protect your vehicle's appearance inside and out.
          </p>
        </div>

        {/* Editorial Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Primary Specialty Box - Spans 7 columns on Desktop */}
          <div className="lg:col-span-7 bg-[#101010] border border-neutral-800 hover:border-[#F58220]/50 rounded-sm p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300">
            {/* Top gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC400] via-[#F58220] to-[#D92820]" />
            
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-black border border-neutral-700 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#FFC400]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#FFC400] bg-[#FFC400]/10 px-2 py-0.5 rounded-xs border border-[#FFC400]/30">
                      FLAGSHIP TREATMENT
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-500">01</span>
              </div>

              <h3 className="font-heading font-black italic text-3xl sm:text-4xl text-white tracking-wide uppercase mb-3">
                {SERVICES_DATA[0].name}
              </h3>

              <p className="text-neutral-300 text-base leading-relaxed mb-6">
                {SERVICES_DATA[0].fullDesc}
              </p>

              {/* Feature points */}
              <div className="space-y-2.5 mb-8">
                {SERVICES_DATA[0].features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#F58220] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Showroom Interior & Exterior
              </span>
              <button
                id="service-cta-full-detail"
                onClick={() => onSelectService(SERVICES_DATA[0].name)}
                className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#F58220] text-black text-xs font-heading italic font-extrabold uppercase tracking-wider rounded-sm transition-all duration-200"
              >
                <span>Get an Estimate</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Paint Correction Box - Spans 5 columns */}
          <div className="lg:col-span-5 bg-[#101010] border border-neutral-800 hover:border-[#F58220]/50 rounded-sm p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-black border border-neutral-700 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-[#FFC400]" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#F58220] bg-[#F58220]/10 px-2 py-0.5 rounded-xs border border-[#F58220]/30">
                    OPTICAL CLARITY
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-500">02</span>
              </div>

              <h3 className="font-heading font-black italic text-3xl sm:text-4xl text-white tracking-wide uppercase mb-3">
                {SERVICES_DATA[3].name}
              </h3>

              <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                {SERVICES_DATA[3].fullDesc}
              </p>

              <div className="space-y-2.5 mb-8">
                {SERVICES_DATA[3].features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#F58220] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Machine Polishing
              </span>
              <button
                id="service-cta-paint-correction"
                onClick={() => onSelectService(SERVICES_DATA[3].name)}
                className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-800 hover:bg-[#F58220] text-white hover:text-black text-xs font-heading italic font-extrabold uppercase tracking-wider rounded-sm transition-all duration-200 border border-neutral-700 hover:border-[#F58220]"
              >
                <span>Get an Estimate</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Remaining 4 Services in an Asymmetric 4-Card Grid */}
          {[
            SERVICES_DATA[4], // Ceramic Coating
            SERVICES_DATA[1], // Interior Detailing
            SERVICES_DATA[2], // Exterior Detailing
            SERVICES_DATA[5], // Premium Car Wash
          ].map((service, index) => (
            <div
              key={service.id}
              className="lg:col-span-3 sm:col-span-6 bg-[#101010] border border-neutral-800/90 hover:border-neutral-700 rounded-sm p-6 flex flex-col justify-between hover:bg-[#141414] transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-9 h-9 rounded-sm bg-black/80 border border-neutral-800 flex items-center justify-center group-hover:border-[#F58220]/40 transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">
                    0{index + 3}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFC400]">
                    {service.highlight}
                  </span>
                  <h3 className="font-heading font-black italic text-2xl text-white tracking-wide uppercase mt-0.5">
                    {service.name}
                  </h3>
                </div>

                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F58220]" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800/80">
                <button
                  id={`service-cta-${service.id}`}
                  onClick={() => onSelectService(service.name)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 bg-black/60 hover:bg-[#F58220] text-neutral-300 hover:text-black text-xs font-heading italic font-bold uppercase tracking-wider rounded-sm transition-all duration-200 border border-neutral-800 hover:border-[#F58220]"
                >
                  <span>Get an Estimate</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
