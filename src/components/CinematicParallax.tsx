import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageWithFallback } from './ImageWithFallback';
import { Layers, Compass, ArrowRight, Sparkles, Eye, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

interface SequenceStage {
  id: string;
  stageNumber: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
  imageUrl: string;
  alt: string;
}

const STAGES: SequenceStage[] = [
  {
    id: 'exterior',
    stageNumber: '01',
    category: 'Exterior Monolith',
    title: 'Post-Tensioned Cantilevers & Pure Form',
    subtitle: 'Sector 9, Chandigarh',
    description:
      'The journey commences at the monolithic concrete facade. Dramatic 14-meter column-free cantilevers hover over private landscaped grounds, engineered with high-grade Fe 550D rebar and M35 concrete to withstand northern India’s seismic forces.',
    specs: [
      { label: 'Cantilever Span', value: '14.2 Meters' },
      { label: 'Clearance Height', value: '7.20 Meters' },
      { label: 'Structural Grade', value: 'M35 Post-Tensioned' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    alt: 'Luxury contemporary villa monolithic exterior elevation in Chandigarh',
  },
  {
    id: 'courtyard',
    stageNumber: '02',
    category: 'Courtyard Threshold',
    title: 'The Glass Pavilion & Reflection Pool',
    subtitle: 'Wave Estate, Mohali',
    description:
      'Crossing the threshold reveals an introspective central courtyard. Triple-glazed Schüco slimline sliding portals dissolve the barrier between air-conditioned living spaces and a serene black granite reflection pool.',
    specs: [
      { label: 'Glazing System', value: 'Schüco Panorama' },
      { label: 'Glass Performance', value: 'Low-E Double IGU' },
      { label: 'Acoustic Rating', value: '42 dB Isolation' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85',
    alt: 'Internal courtyard with pool reflection and glass walls in Mohali',
  },
  {
    id: 'salon',
    stageNumber: '03',
    category: 'Great Living Salon',
    title: 'Double-Height Foyer & Artisanal Stones',
    subtitle: 'Eco City 1, New Chandigarh',
    description:
      'Stepping into the great living salon, volumes expand to 24 feet. Hand-selected Italian Statuario marble slabs are bookmatched seamlessly across the floor plate, illuminated by museum-grade indirect cove lighting and acoustic walnut louvers.',
    specs: [
      { label: 'Floor Finish', value: 'Italian Statuario' },
      { label: 'Ceiling Height', value: '24 Ft Double-Volume' },
      { label: 'Joinery', value: 'Smoked American Walnut' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85',
    alt: 'Double height luxury living room with sculptural floating staircase',
  },
  {
    id: 'sanctuary',
    stageNumber: '04',
    category: 'Master Sanctuary',
    title: 'Private Suites & Sunset Cantilever',
    subtitle: 'MDC Sector 4, Panchkula',
    description:
      'Ascending to the private quarters, the master suite terminates in a deep cantilevered balcony overlooking the Shivalik foothills. Motorized thermal drapery and intelligent KNX scene automation curate twilight relaxation.',
    specs: [
      { label: 'Automation', value: 'KNX Wired Architecture' },
      { label: 'Flooring', value: 'Austrian Oak Parquet' },
      { label: 'Ensuite Spa', value: 'Dornbracht & Travertine' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2400&q=85',
    alt: 'Modern master bedroom suite opening onto private terrace at twilight',
  },
];

export const CinematicParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTriggerRef = useRef<HTMLDivElement>(null);

  // References for layered images
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);

  // References for card text overlays
  const textCard1Ref = useRef<HTMLDivElement>(null);
  const textCard2Ref = useRef<HTMLDivElement>(null);
  const textCard3Ref = useRef<HTMLDivElement>(null);
  const textCard4Ref = useRef<HTMLDivElement>(null);

  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToStage = (index: number) => {
    const st = ScrollTrigger.getById('cinematic-parallax-st');
    if (st) {
      const stageProgress = [0.05, 0.35, 0.65, 0.92];
      const targetY = st.start + (st.end - st.start) * stageProgress[index];
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!pinTriggerRef.current) return;

      // Ensure initial card states
      if (textCard1Ref.current) gsap.set(textCard1Ref.current, { opacity: 1, y: 0 });
      if (textCard2Ref.current) gsap.set(textCard2Ref.current, { opacity: 0, y: 30 });
      if (textCard3Ref.current) gsap.set(textCard3Ref.current, { opacity: 0, y: 30 });
      if (textCard4Ref.current) gsap.set(textCard4Ref.current, { opacity: 0, y: 30 });

      // Pinned GSAP ScrollTrigger Sequence
      // Mobile has +=250% scroll distance to allow ample time to scrub each stage comfortably
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'cinematic-parallax-st',
          trigger: pinTriggerRef.current,
          start: 'top top',
          end: isMobile ? '+=250%' : '+=300%',
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            if (p < 0.25) setActiveStageIndex(0);
            else if (p < 0.52) setActiveStageIndex(1);
            else if (p < 0.78) setActiveStageIndex(2);
            else setActiveStageIndex(3);
          },
        },
      });

      // Total timeline normalized to 3.6 units
      // STAGE 1 (0.0 -> 0.7): Monolith Cantilever
      tl.to(
        layer1Ref.current,
        {
          scale: prefersReducedMotion ? 1.04 : 1.15,
          ease: 'none',
          duration: 0.7,
        },
        0
      );

      // TRANSITION 1 -> 2 (0.7 -> 1.3): Exterior to Courtyard
      tl.to(
        textCard1Ref.current,
        {
          y: prefersReducedMotion ? -10 : -30,
          opacity: 0,
          duration: 0.35,
          ease: 'power1.out',
        },
        0.7
      );

      tl.fromTo(
        layer2Ref.current,
        {
          opacity: 0,
          clipPath: prefersReducedMotion ? 'none' : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          scale: prefersReducedMotion ? 1.0 : 1.12,
        },
        {
          opacity: 1,
          clipPath: prefersReducedMotion ? 'none' : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1.0,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        0.7
      );

      tl.to(
        textCard2Ref.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        0.9
      );

      // STAGE 2 HOLD (1.3 -> 1.7)

      // TRANSITION 2 -> 3 (1.7 -> 2.3): Courtyard to Great Salon Interior
      tl.to(
        textCard2Ref.current,
        {
          y: prefersReducedMotion ? -10 : -30,
          opacity: 0,
          duration: 0.35,
          ease: 'power1.out',
        },
        1.7
      );

      tl.fromTo(
        layer3Ref.current,
        {
          opacity: 0,
          clipPath: prefersReducedMotion ? 'none' : 'inset(0% 0% 100% 0%)',
          scale: prefersReducedMotion ? 1.0 : 1.12,
        },
        {
          opacity: 1,
          clipPath: prefersReducedMotion ? 'none' : 'inset(0% 0% 0% 0%)',
          scale: 1.0,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        1.7
      );

      tl.to(
        textCard3Ref.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        1.9
      );

      // STAGE 3 HOLD (2.3 -> 2.7)

      // TRANSITION 3 -> 4 (2.7 -> 3.3): Great Salon to Master Sanctuary
      tl.to(
        textCard3Ref.current,
        {
          y: prefersReducedMotion ? -10 : -30,
          opacity: 0,
          duration: 0.35,
          ease: 'power1.out',
        },
        2.7
      );

      tl.fromTo(
        layer4Ref.current,
        {
          opacity: 0,
          scale: prefersReducedMotion ? 1.0 : 1.14,
        },
        {
          opacity: 1,
          scale: 1.0,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        2.7
      );

      tl.to(
        textCard4Ref.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        2.9
      );

      // STAGE 4 HOLD (3.3 -> 3.6)
    }, pinTriggerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  const currentStage = STAGES[activeStageIndex];

  return (
    <div
      id="spatial-sequence"
      ref={containerRef}
      className="relative w-full bg-[#08090b] text-white"
    >
      {/* Pinned Showcase Container */}
      <div
        ref={pinTriggerRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Layer 1: Exterior Elevation */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 w-full h-full will-change-transform z-10"
        >
          <ImageWithFallback
            src={STAGES[0].imageUrl}
            alt={STAGES[0].alt}
            priority={true}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>

        {/* Layer 2: Courtyard Threshold (Clip-path reveal) */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 w-full h-full will-change-transform z-20"
          style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }}
        >
          <ImageWithFallback
            src={STAGES[1].imageUrl}
            alt={STAGES[1].alt}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>

        {/* Layer 3: Great Living Salon (Aperture reveal) */}
        <div
          ref={layer3Ref}
          className="absolute inset-0 w-full h-full will-change-transform z-30"
          style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
        >
          <ImageWithFallback
            src={STAGES[2].imageUrl}
            alt={STAGES[2].alt}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>

        {/* Layer 4: Master Sanctuary (Depth crossfade) */}
        <div
          ref={layer4Ref}
          className="absolute inset-0 w-full h-full will-change-transform z-40 opacity-0"
        >
          <ImageWithFallback
            src={STAGES[3].imageUrl}
            alt={STAGES[3].alt}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>

        {/* Global Dark Vignette & Floor Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-black/40 to-black/60 z-45 pointer-events-none" />

        {/* Top HUD: Spatial Narrative Progress & Camera Telemetry */}
        <div className="relative z-50 max-w-7xl mx-auto w-full px-6 md:px-10 pt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-amber-200 rounded-full" />
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-300">
              <span className="text-amber-200 font-bold">Spatial Walkthrough</span>
              <span className="mx-2 text-neutral-600">·</span>
              <span>Exterior to Interior Sequence</span>
            </div>
          </div>

          {/* Interactive Stage Indicators (Buttons allow direct click to view) */}
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px]">
            {STAGES.map((s, idx) => (
              <button
                type="button"
                key={s.id}
                onClick={() => scrollToStage(idx)}
                className={`px-3 py-1 border transition-all cursor-pointer ${
                  activeStageIndex === idx
                    ? 'bg-amber-100 text-neutral-950 font-semibold border-amber-200'
                    : 'bg-black/60 text-neutral-400 border-white/10 hover:text-white hover:border-neutral-500'
                }`}
                aria-label={`Jump to Stage ${s.stageNumber}: ${s.category}`}
              >
                <span>{s.stageNumber}</span>
                <span className="ml-1.5 uppercase tracking-wider">{s.category}</span>
              </button>
            ))}
          </div>

          {/* Live Zoom / Scroll Scrubber Progress Indicator */}
          <div className="font-mono text-xs text-neutral-400 bg-black/60 border border-white/10 px-3 py-1.5 backdrop-blur-md">
            <span>SCROLL: </span>
            <span className="text-amber-200 tabular-nums">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* Dynamic Architectural Narrative Cards (Stacked via Grid Overlay for seamless GSAP control) */}
        <div className="relative z-50 max-w-7xl mx-auto w-full px-6 md:px-10 pb-10 flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-none">
          <div className="grid grid-cols-1 grid-rows-1 max-w-xl w-full [&>*]:col-start-1 [&>*]:row-start-1">
            {/* Card 1: Exterior */}
            <div
              ref={textCard1Ref}
              className={`bg-neutral-950/90 backdrop-blur-xl border border-neutral-800 p-6 sm:p-8 shadow-2xl will-change-transform ${
                activeStageIndex === 0 ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-3 pb-2 border-b border-neutral-800">
                <span className="uppercase tracking-widest text-amber-200 font-semibold">
                  Phase 01 / {STAGES[0].category}
                </span>
                <span>{STAGES[0].subtitle}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-3">
                {STAGES[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                {STAGES[0].description}
              </p>
              <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-900 border border-neutral-800 font-mono text-[11px]">
                {STAGES[0].specs.map((sp, i) => (
                  <div key={i}>
                    <p className="text-neutral-500 uppercase">{sp.label}</p>
                    <p className="text-amber-200 font-medium mt-0.5">{sp.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Courtyard */}
            <div
              ref={textCard2Ref}
              className={`bg-neutral-950/90 backdrop-blur-xl border border-neutral-800 p-6 sm:p-8 shadow-2xl will-change-transform ${
                activeStageIndex === 1 ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-3 pb-2 border-b border-neutral-800">
                <span className="uppercase tracking-widest text-amber-200 font-semibold">
                  Phase 02 / {STAGES[1].category}
                </span>
                <span>{STAGES[1].subtitle}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-3">
                {STAGES[1].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                {STAGES[1].description}
              </p>
              <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-900 border border-neutral-800 font-mono text-[11px]">
                {STAGES[1].specs.map((sp, i) => (
                  <div key={i}>
                    <p className="text-neutral-500 uppercase">{sp.label}</p>
                    <p className="text-amber-200 font-medium mt-0.5">{sp.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Great Salon */}
            <div
              ref={textCard3Ref}
              className={`bg-neutral-950/90 backdrop-blur-xl border border-neutral-800 p-6 sm:p-8 shadow-2xl will-change-transform ${
                activeStageIndex === 2 ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-3 pb-2 border-b border-neutral-800">
                <span className="uppercase tracking-widest text-amber-200 font-semibold">
                  Phase 03 / {STAGES[2].category}
                </span>
                <span>{STAGES[2].subtitle}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-3">
                {STAGES[2].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                {STAGES[2].description}
              </p>
              <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-900 border border-neutral-800 font-mono text-[11px]">
                {STAGES[2].specs.map((sp, i) => (
                  <div key={i}>
                    <p className="text-neutral-500 uppercase">{sp.label}</p>
                    <p className="text-amber-200 font-medium mt-0.5">{sp.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Master Sanctuary */}
            <div
              ref={textCard4Ref}
              className={`bg-neutral-950/90 backdrop-blur-xl border border-neutral-800 p-6 sm:p-8 shadow-2xl will-change-transform ${
                activeStageIndex === 3 ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-3 pb-2 border-b border-neutral-800">
                <span className="uppercase tracking-widest text-amber-200 font-semibold">
                  Phase 04 / {STAGES[3].category}
                </span>
                <span>{STAGES[3].subtitle}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-3">
                {STAGES[3].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                {STAGES[3].description}
              </p>
              <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-900 border border-neutral-800 font-mono text-[11px]">
                {STAGES[3].specs.map((sp, i) => (
                  <div key={i}>
                    <p className="text-neutral-500 uppercase">{sp.label}</p>
                    <p className="text-amber-200 font-medium mt-0.5">{sp.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Quality Certificate Callout */}
          <div className="hidden lg:flex flex-col items-end gap-3 pointer-events-auto">
            <div className="p-4 bg-black/75 backdrop-blur-md border border-neutral-800 max-w-xs text-right font-mono text-xs">
              <div className="flex items-center justify-end gap-2 text-amber-200 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="uppercase tracking-wider">Tricity Structural Standards</span>
              </div>
              <p className="text-neutral-300 font-sans text-xs">
                Seismic Zone IV engineered. Every milestone tested in certified laboratories.
              </p>
            </div>

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                `Hello Milaan Constructions, I explored your architectural spatial walkthrough (Phase ${currentStage.stageNumber}: ${currentStage.title}) and would like to discuss our plot.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-amber-100 hover:bg-amber-200 text-neutral-950 font-semibold uppercase tracking-wider text-xs transition-colors"
            >
              <span>Consult Chief Architect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
