import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Journey', href: '#journey' },
    { label: 'Interiors', href: '#interiors' },
    { label: 'Estimator', href: '#estimator' },
  ];

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Archia Constructions, I am interested in discussing a luxury residential construction / architectural project in the Chandigarh Tricity area.'
  )}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0c0d10]/90 backdrop-blur-md border-b border-white/8 py-4 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark adhering to Top Bar Contract */}
          <a
            href="#"
            className="group flex items-center gap-2 text-base md:text-lg font-semibold tracking-[0.22em] uppercase text-white hover:text-amber-200/90 transition-colors whitespace-nowrap shrink-0"
          >
            <span>ARCHIA CONSTRUCTIONS</span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium uppercase tracking-[0.18em] text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-200/80 hover:after:w-full after:transition-all after:duration-250 whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-wider uppercase text-neutral-900 bg-amber-100 hover:bg-amber-200 rounded-none transition-all duration-200 hover:shadow-[0_0_20px_rgba(251,191,36,0.25)] whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-800" />
              <span>WhatsApp Enquiry</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c0d10]/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 lg:hidden animate-in fade-in duration-200">
          <div className="space-y-6">
            <p className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
              Navigation
            </p>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-light text-neutral-200 hover:text-amber-200 tracking-wide transition-colors py-2 border-b border-neutral-800/80 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-600" />
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-light text-neutral-200 hover:text-amber-200 tracking-wide transition-colors py-2 border-b border-neutral-800/80 flex items-center justify-between"
              >
                <span>Contact Studio</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-600" />
              </a>
            </nav>
          </div>

          <div className="pt-6 border-t border-neutral-800 space-y-4">
            <div className="text-xs text-neutral-400">
              <p className="font-medium text-neutral-300">Mohali &bull; Chandigarh &bull; Panchkula</p>
              <p className="mt-1">Sector 82 JLPL Industrial Park, Mohali</p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-semibold tracking-wider uppercase bg-amber-100 text-neutral-900 hover:bg-amber-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-800" />
              <span>Direct WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
