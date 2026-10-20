import React, { useState } from 'react';
import { INTERIOR_FEATURES, COMPANY_INFO } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

export const LuxuryInteriors: React.FC = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState(INTERIOR_FEATURES[0].id);

  const activeFeature = INTERIOR_FEATURES.find((f) => f.id === selectedFeatureId) || INTERIOR_FEATURES[0];

  return (
    <section id="interiors" className="relative py-24 md:py-32 bg-[#0c0d10] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-200/90 font-mono mb-3">
              <span>Bespoke Living Spaces</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              Interior Architecture & <br />
              <span className="font-editorial italic font-normal text-amber-100">Artisanal Materiality.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            True luxury is sensory. We orchestrate raw textures, imported Italian marbles, architectural lighting, and bespoke joinery into cohesive private sanctuaries.
          </p>
        </div>

        {/* 4-Item Tab Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {INTERIOR_FEATURES.map((feature) => {
            const isSelected = feature.id === selectedFeatureId;
            return (
              <button
                key={feature.id}
                onClick={() => setSelectedFeatureId(feature.id)}
                className={`p-4 text-left border transition-all duration-300 ${
                  isSelected
                    ? 'bg-neutral-900 border-amber-200/60 shadow-lg'
                    : 'bg-neutral-950/40 border-neutral-800/80 hover:bg-neutral-900/40 hover:border-neutral-700'
                }`}
              >
                <p className="text-[10px] font-mono tracking-widest uppercase text-amber-300/80 mb-1">
                  {feature.category}
                </p>
                <h3
                  className={`text-sm md:text-base font-light tracking-tight ${
                    isSelected ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  {feature.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Feature Hero Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-neutral-900/40 border border-neutral-800 overflow-hidden">
          {/* Main Visual */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px] overflow-hidden bg-neutral-950">
            <ImageWithFallback
              src={activeFeature.imageUrl}
              alt={activeFeature.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              containerClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-neutral-300">
              <span className="bg-neutral-950/90 px-3 py-1.5 border border-white/10 uppercase tracking-widest text-amber-200">
                {activeFeature.category}
              </span>
              <span className="hidden sm:inline-block bg-neutral-950/90 px-3 py-1.5 border border-white/10">
                Real Interior Photography
              </span>
            </div>
          </div>

          {/* Details & Material Palettes */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interior Craftsmanship</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight mb-4">
                {activeFeature.title}
              </h3>
              <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed mb-8">
                {activeFeature.description}
              </p>

              {/* Material Palette List */}
              <div className="space-y-3 mb-8">
                <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                  Curated Material Specifications:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeFeature.materials.map((mat, i) => (
                    <div
                      key={i}
                      className="text-xs font-mono text-neutral-200 bg-neutral-900/90 border border-neutral-800 p-2.5 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-amber-200" />
                      <span>{mat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Consultation */}
            <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs text-neutral-400 font-mono">
                Sample finishes and material specifications available during scheduled consultations.
              </span>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Milaan Constructions, I am interested in exploring your interior architecture & material finishes for ${activeFeature.title}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-wider uppercase bg-amber-100 hover:bg-amber-200 text-neutral-950 transition-colors shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-emerald-800" />
                <span>Book Material Preview</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
