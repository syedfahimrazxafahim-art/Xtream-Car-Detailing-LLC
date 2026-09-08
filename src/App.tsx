import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { WhyUsSection } from './components/WhyUsSection';
import { DetailingShowcase } from './components/DetailingShowcase';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { BookingSection } from './components/BookingSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Phone, Calendar, Facebook } from 'lucide-react';
import { BUSINESS_INFO } from './data/businessData';

export default function App() {
  const [preselectedService, setPreselectedService] = useState<string>('Full Detail');

  const scrollToContact = (serviceName?: string) => {
    if (serviceName) {
      setPreselectedService(serviceName);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-[#F58220] selection:text-black">
      {/* Sticky Header Navbar */}
      <Navbar onBookNowClick={() => scrollToContact()} />

      {/* Main Website Sections */}
      <main id="main-content" className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onBookNowClick={() => scrollToContact()}
          onViewServicesClick={scrollToServices}
        />

        {/* 2. Services Section (Editorial Asymmetric Layout) */}
        <ServicesSection
          onSelectService={(serviceName) => scrollToContact(serviceName)}
        />

        {/* 3. About Section */}
        <AboutSection onBookClick={() => scrollToContact()} />

        {/* 4. Why Xtreme Detail (Sticky Stacking Cards) */}
        <WhyUsSection />

        {/* 5. Detailing Showcase (Premium Image-Led Showcase replacing fake before/after) */}
        <DetailingShowcase />

        {/* 6. Gallery Section (Editorial Masonry & Lightbox) */}
        <GallerySection />

        {/* 7. Reviews Section (Horizontal Slider with Autoplay & Sample Notice) */}
        <ReviewsSection />

        {/* 8. Contact & Booking Section (Estimate Form & Direct Contact) */}
        <BookingSection preselectedService={preselectedService} />

        {/* 9. Final CTA */}
        <FinalCTA onBookClick={() => scrollToContact()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Persistent Floating Quick Actions Bar */}
      <div className="fixed bottom-3 left-3 right-3 z-40 sm:hidden flex items-center gap-2 p-1.5 rounded-sm bg-[#101010]/95 border border-neutral-800 backdrop-blur-md shadow-2xl">
        <a
          id="mobile-sticky-facebook-btn"
          href={BUSINESS_INFO.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Facebook Page"
          className="cursor-pointer py-3 px-3 bg-black/80 hover:bg-[#1877F2]/20 border border-neutral-700 hover:border-[#1877F2] text-[#1877F2] rounded-sm flex items-center justify-center transition-colors"
        >
          <Facebook className="w-4 h-4 fill-current" />
        </a>

        <a
          id="mobile-sticky-call-btn"
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex-1 py-3 px-3 bg-black/80 hover:bg-neutral-900 border border-neutral-700 text-white rounded-sm font-mono text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-[#F58220]" />
          <span>Call Us</span>
        </a>

        <button
          id="mobile-sticky-estimate-btn"
          onClick={() => scrollToContact()}
          className="flex-1 py-3 px-3 bg-gradient-to-r from-[#FFC400] to-[#F58220] text-black rounded-sm font-heading italic font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(245,130,32,0.4)] cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
}
