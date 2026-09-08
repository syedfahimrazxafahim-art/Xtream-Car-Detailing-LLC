import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Play, Pause, AlertCircle } from 'lucide-react';
import { REVIEWS_DATA } from '../data/businessData';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Touch tracking for swipe gestures
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Check reduced-motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Handle visibility change (pause when tab hidden)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPlaying(false);
      } else if (!prefersReducedMotion && !isHovered && !isFocused) {
        setIsPlaying(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [prefersReducedMotion, isHovered, isFocused]);

  const maxIndex = REVIEWS_DATA.length - 1;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay loop
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion || isHovered || isFocused) {
      return;
    }

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, prefersReducedMotion, isHovered, isFocused, nextSlide]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="reviews"
      className="py-24 bg-[#080808] text-white border-t border-neutral-900 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Disclaimer Notice */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-neutral-800 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F58220]">
              FEEDBACK & REPUTATION
            </span>
            <h2 className="font-heading font-black italic tracking-tight text-4xl sm:text-5xl lg:text-6xl text-white uppercase mt-1">
              REVIEWS
            </h2>
          </div>

          {/* Controls: Play/Pause, Prev, Next */}
          <div className="flex items-center gap-3">
            <button
              id="reviews-play-pause-btn"
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause auto-sliding reviews' : 'Play auto-sliding reviews'}
              className="p-2.5 rounded-sm bg-[#141414] border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-[#FFC400] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F58220]"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              id="reviews-prev-btn"
              type="button"
              onClick={prevSlide}
              aria-label="Previous Review"
              className="p-2.5 rounded-sm bg-[#141414] border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F58220]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              id="reviews-next-btn"
              type="button"
              onClick={nextSlide}
              aria-label="Next Review"
              className="p-2.5 rounded-sm bg-[#141414] border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F58220]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sample Disclaimer Banner as strictly requested by guidelines */}
        <div className="mb-10 px-4 py-3 rounded-sm bg-[#121212] border border-neutral-800 text-neutral-400 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#FFC400] shrink-0" />
          <span>
            <strong className="text-neutral-300">Preview Notice:</strong> The testimonials below are sample reviews for illustrative website preview purposes only and do not represent verified customer records.
          </span>
        </div>

        {/* Horizontal Slider Area */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card Track with responsive translation */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {REVIEWS_DATA.map((review) => (
              <div
                key={review.id}
                className="w-full shrink-0 px-2 sm:px-3 md:w-1/2 lg:w-1/3"
                style={{
                  minWidth: '100%',
                }}
              >
                <div className="bg-[#101010] border border-neutral-800 p-8 rounded-sm h-full flex flex-col justify-between shadow-xl">
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFC400] text-[#FFC400]" />
                      ))}
                    </div>

                    {/* Review Quote */}
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed italic mb-8">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="pt-5 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="font-heading italic font-bold text-white text-base uppercase">
                        {review.author}
                      </div>
                      <div className="text-xs font-mono text-[#F58220]">
                        {review.vehicle}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {REVIEWS_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to review slide ${index + 1}`}
              className={`h-1.5 transition-all rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F58220] ${
                currentIndex === index
                  ? 'w-8 bg-gradient-to-r from-[#FFC400] to-[#F58220]'
                  : 'w-2 bg-neutral-800 hover:bg-neutral-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
