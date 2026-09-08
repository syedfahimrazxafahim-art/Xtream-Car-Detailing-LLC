import React from 'react';
import { Phone, Mail, Facebook, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/businessData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="bg-[#050505] text-neutral-400 border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-850">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Premium automotive detailing and car washing studio based in San Francisco, California. Dedicated to high-performance surface care and showroom finish.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <MapPin className="w-3.5 h-3.5 text-[#F58220]" />
              <span>{BUSINESS_INFO.location}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white">
              Navigation
            </div>
            <ul className="space-y-2 text-sm">
              {['Home', 'Services', 'About', 'Why Us', 'Gallery', 'Reviews', 'Contact'].map((item) => {
                const id = item.toLowerCase().replace(/\s+/g, '-');
                return (
                  <li key={item}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(`#${id}`);
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Direct Contact & Social */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-white">
              Direct Contact
            </div>
            <div className="space-y-2.5 text-sm">
              <div>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-2.5 hover:text-[#FFC400] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F58220]" />
                  <span className="font-semibold text-white">{BUSINESS_INFO.phoneFormatted}</span>
                </a>
              </div>

              <div>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-2.5 hover:text-[#FFC400] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#F58220]" />
                  <span className="text-neutral-300 break-all">{BUSINESS_INFO.email}</span>
                </a>
              </div>

              <div className="pt-2">
                <a
                  id="footer-facebook-link"
                  href={BUSINESS_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Xtreme Detail LLC on Facebook"
                  className="cursor-pointer inline-flex items-center gap-2.5 px-3.5 py-2 rounded-sm bg-[#101010] border border-neutral-800 hover:border-[#1877F2] text-white hover:text-[#1877F2] transition-all text-xs font-mono group shadow-sm hover:shadow-[0_0_15px_rgba(24,119,242,0.25)]"
                >
                  <div className="w-5 h-5 rounded-xs bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                    <Facebook className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="group-hover:translate-x-0.5 transition-transform">facebook.com/xtremedetail2023</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 gap-4">
          <div>
            © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Automotive Detailing & Wash</span>
            <span>•</span>
            <span>San Francisco, CA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
