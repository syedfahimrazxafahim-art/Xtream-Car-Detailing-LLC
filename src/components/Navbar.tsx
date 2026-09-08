import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowUpRight, Facebook } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/businessData';

interface NavbarProps {
  onBookNowClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookNowClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['home', 'services', 'about', 'why-us', 'gallery', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key and body scroll lock for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-gradient-to-b from-[#050505]/90 via-[#050505]/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            id="nav-logo-link"
            className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] rounded-sm"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
          >
            <Logo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" aria-label="Main Navigation" className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-200 relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F58220] ${
                    isActive ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FFC400] via-[#F58220] to-[#D92820] rounded-full animate-in fade-in duration-300" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Phone, Facebook & Book Now */}
          <div className="hidden sm:flex items-center gap-3.5">
            <a
              id="nav-facebook-link"
              href={BUSINESS_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Xtreme Detail LLC on Facebook"
              className="cursor-pointer p-2.5 rounded-sm bg-[#101010] border border-neutral-800 hover:border-[#1877F2] text-neutral-400 hover:text-[#1877F2] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1877F2]"
            >
              <Facebook className="w-4 h-4 fill-current" />
            </a>

            <a
              id="nav-phone-link"
              href={`tel:${BUSINESS_INFO.phone}`}
              className="hidden xl:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#F58220]" />
              <span>{BUSINESS_INFO.phoneFormatted}</span>
            </a>

            <button
              id="nav-book-now-button"
              onClick={onBookNowClick}
              className="cursor-pointer relative group px-5 py-2.5 rounded-sm font-heading italic font-bold tracking-wider text-sm uppercase text-black overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(245,130,32,0.25)] hover:shadow-[0_0_30px_rgba(245,130,32,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFC400] via-[#F58220] to-[#D92820] group-hover:brightness-110 transition-all duration-300" />
              <div className="relative flex items-center gap-1.5 z-10 text-black">
                <span>BOOK NOW</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-sm text-neutral-300 hover:text-white bg-[#101010] border border-neutral-800 hover:border-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#FFC400]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer - Fullscreen 100dvh */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-overlay"
          className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto min-h-[100dvh]"
        >
          {/* Header row */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <Logo size="md" />
            <button
              id="mobile-menu-close-btn"
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-sm bg-[#101010] text-neutral-300 hover:text-white border border-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220]"
            >
              <X className="w-6 h-6 text-[#F58220]" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-5 my-auto py-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="group flex items-center justify-between text-2xl font-heading italic font-bold tracking-wider text-neutral-300 hover:text-white py-2 focus:outline-none focus-visible:text-[#FFC400]"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs font-mono text-neutral-600 group-hover:text-[#F58220] transition-colors">
                    0{idx + 1}
                  </span>
                  <span>{link.label}</span>
                </span>
                <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-[#F58220] transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            ))}
          </nav>

          {/* Mobile Footer & Book Now */}
          <div className="pt-6 border-t border-neutral-800 flex flex-col gap-4">
            <button
              id="mobile-book-now-cta"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookNowClick();
              }}
              className="w-full py-4 rounded-sm font-heading italic font-extrabold tracking-wider text-base uppercase text-black bg-gradient-to-r from-[#FFC400] via-[#F58220] to-[#D92820] shadow-[0_0_20px_rgba(245,130,32,0.3)] flex items-center justify-center gap-2"
            >
              <span>BOOK YOUR DETAIL</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 pt-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-2 hover:text-[#FFC400] transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#F58220]" />
                <span>{BUSINESS_INFO.phoneFormatted}</span>
              </a>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <a
                href={BUSINESS_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-300 hover:text-[#1877F2] transition-colors cursor-pointer"
              >
                <Facebook className="w-4 h-4 text-[#1877F2] fill-current" />
                <span>facebook.com/xtremedetail2023</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
