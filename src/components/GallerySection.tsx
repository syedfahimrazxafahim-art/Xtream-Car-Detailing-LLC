import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/businessData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Photos', count: GALLERY_ITEMS.length },
    { id: 'exterior', label: 'Exterior & Wash', count: GALLERY_ITEMS.filter(i => i.category === 'exterior').length },
    { id: 'paint', label: 'Paint Correction', count: GALLERY_ITEMS.filter(i => i.category === 'paint').length },
    { id: 'ceramic', label: 'Ceramic Coating', count: GALLERY_ITEMS.filter(i => i.category === 'ceramic').length },
    { id: 'interior', label: 'Interior Detailing', count: GALLERY_ITEMS.filter(i => i.category === 'interior').length },
  ];

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredItems.length]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImageIndex]);

  const activeImage = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-[#050505] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/10 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F58220]">
              AUTHENTIC STUDIO PORTFOLIO
            </span>
            <h2 className="font-heading font-black italic tracking-tight text-4xl sm:text-5xl lg:text-6xl text-white uppercase mt-1">
              VEHICLE GALLERY
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-sm leading-relaxed">
            Real client vehicle finishes, paint correction clarity, hydrophobic coatings, and interior reconditioning by Xtreme Detail LLC.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                setSelectedImageIndex(null);
              }}
              className={`cursor-pointer shrink-0 px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                filter === cat.id
                  ? 'bg-gradient-to-r from-[#FFC400] to-[#F58220] text-black font-bold border-transparent shadow-[0_0_15px_rgba(245,130,32,0.3)]'
                  : 'bg-[#101010] text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`ml-1.5 text-[10px] ${filter === cat.id ? 'text-black/80' : 'text-neutral-500'}`}>
                ({cat.count})
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Grid (all 12 images) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="group relative bg-[#101010] rounded-sm overflow-hidden border border-neutral-800 hover:border-[#F58220]/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
              onClick={() => setSelectedImageIndex(idx)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Corner Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-black/80 text-[#FFC400] border border-neutral-700 backdrop-blur-md rounded-xs">
                    {item.tag}
                  </span>
                </div>

                {/* Zoom Action Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-sm bg-black/80 border border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                  <Maximize2 className="w-4 h-4 text-[#F58220]" />
                </div>

                {/* Bottom title */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="font-heading italic font-bold text-base sm:text-lg text-white uppercase tracking-wide group-hover:text-[#FFC400] transition-colors">
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && selectedImageIndex !== null && (
        <div
          id="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between text-white pb-4 border-b border-neutral-800">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#F58220] tracking-widest block">
                {activeImage.tag}
              </span>
              <h3 className="font-heading italic font-black text-xl text-white uppercase">
                {activeImage.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-400">
                {selectedImageIndex + 1} / {filteredItems.length}
              </span>
              <button
                id="lightbox-close-button"
                onClick={() => setSelectedImageIndex(null)}
                aria-label="Close Lightbox"
                className="cursor-pointer p-2 rounded-sm bg-[#101010] border border-neutral-700 text-white hover:text-[#FFC400] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={activeImage.imageUrl}
              alt={activeImage.altText}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] max-w-full object-contain rounded-sm shadow-2xl"
            />

            {/* Prev Button */}
            <button
              id="lightbox-prev-btn"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
              }}
              aria-label="Previous Image"
              className="cursor-pointer absolute left-2 sm:left-4 p-3 rounded-sm bg-black/80 border border-neutral-700 text-white hover:text-[#F58220] hover:border-[#F58220] focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              id="lightbox-next-btn"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
              }}
              aria-label="Next Image"
              className="cursor-pointer absolute right-2 sm:right-4 p-3 rounded-sm bg-black/80 border border-neutral-700 text-white hover:text-[#F58220] hover:border-[#F58220] focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Footer Bar */}
          <div className="text-center pt-3 border-t border-neutral-800 text-xs font-mono text-neutral-400">
            {activeImage.altText} • Use arrow keys or buttons to navigate • Press ESC to close
          </div>
        </div>
      )}
    </section>
  );
};
