import React from 'react';
import { COMPANY_INFO, SERVICE_AREAS } from '../data/content';
import { MessageCircle, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Archia Constructions, I am inquiring regarding a luxury residential project in the Chandigarh Tricity.'
  )}`;

  return (
    <footer className="relative bg-[#07080a] text-neutral-400 border-t border-neutral-800 text-xs">
      {/* Upper Footer Strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Col 1: Brand & Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-base font-semibold tracking-[0.22em] uppercase text-white block">
              ARCHIA CONSTRUCTIONS
            </span>
            <p className="text-neutral-400 font-light leading-relaxed max-w-sm">
              Bespoke luxury residential architecture, precision civil engineering, and turnkey villa construction crafted for discerning families across the Chandigarh Capital Region.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 text-white hover:text-amber-200 transition-colors uppercase tracking-wider text-[11px] font-mono"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Service Areas in Tricity (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-neutral-200 uppercase font-mono tracking-widest text-[11px]">
              Service Territories
            </p>
            <ul className="space-y-2 text-neutral-400 font-light">
              {SERVICE_AREAS.map((area) => (
                <li key={area.name} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-amber-200/60 rounded-full" />
                  <span className="text-neutral-300 font-medium">{area.name}:</span>
                  <span className="text-neutral-500 text-[11px] truncate">{area.microMarkets.slice(0, 2).join(', ')}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-neutral-200 uppercase font-mono tracking-widest text-[11px]">
              Navigation
            </p>
            <ul className="space-y-2 font-mono text-[11px]">
              <li>
                <a href="#projects" className="hover:text-amber-200 transition-colors">Featured Projects</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-200 transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#journey" className="hover:text-amber-200 transition-colors">Construction Journey</a>
              </li>
              <li>
                <a href="#interiors" className="hover:text-amber-200 transition-colors">Luxury Interiors</a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-amber-200 transition-colors">Cost Estimator</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-200 transition-colors">Contact Studio</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Presence (3 cols) */}
          <div className="lg:col-span-3 space-y-3 font-mono text-[11px]">
            <p className="text-neutral-200 uppercase tracking-widest">
              Design Studio
            </p>
            <p className="text-neutral-400 font-sans leading-relaxed">
              Level 4, Archia House <br />
              IT Park & Knowledge Hub, Sector 82 <br />
              Mohali, Punjab 140308, India
            </p>
            <p className="text-neutral-500 pt-1">
              Direct: concierge@archiaconstructions.com
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-neutral-900 py-6 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Mohali &bull; Chandigarh &bull; Panchkula</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
