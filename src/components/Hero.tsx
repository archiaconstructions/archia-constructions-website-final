import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, MessageCircle, Compass } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroImageContainerRef = useRef<HTMLDivElement>(null);
  const heroTextContainerRef = useRef<HTMLDivElement>(null);
  const heroForegroundRef = useRef<HTMLDivElement>(null);
  const metricsBarRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!heroSectionRef.current || !heroImageContainerRef.current) return;

      // GSAP ScrollTrigger timeline controlling camera-like optical push, pan, and multi-plane depth
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });

      // 1. Camera Zoom into the villa's cantilevered entrance & pool reflection
      tl.to(
        heroImageContainerRef.current,
        {
          scale: 1.32,
          yPercent: 12,
          xPercent: -3,
          ease: 'none',
        },
        0
      );

      // 2. 3D Perspective Text Push & Fade
      if (heroTextContainerRef.current) {
        tl.to(
          heroTextContainerRef.current,
          {
            y: -100,
            opacity: 0.05,
            scale: 0.95,
            filter: 'blur(6px)',
            ease: 'power1.inOut',
          },
          0
        );
      }

      // 3. Foreground Architectural Telemetry moves faster (2x Parallax Speed)
      if (heroForegroundRef.current) {
        tl.to(
          heroForegroundRef.current,
          {
            y: -220,
            opacity: 0,
            ease: 'none',
          },
          0
        );
      }

      // 4. Crosshairs & Grid Lines expand outwards (passing through camera lens)
      if (crosshairRef.current) {
        tl.to(
          crosshairRef.current,
          {
            scale: 1.4,
            opacity: 0,
            ease: 'none',
          },
          0
        );
      }

      // 5. Bottom Metrics Bar dissolves down
      if (metricsBarRef.current) {
        tl.to(
          metricsBarRef.current,
          {
            y: 40,
            opacity: 0,
            ease: 'none',
          },
          0
        );
      }
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Milaan Constructions, I would like to schedule a private architectural consultation for our residence in Chandigarh Tricity.'
  )}`;

  return (
    <section
      ref={heroSectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0c0d10] pt-24 md:pt-28"
      style={{ perspective: '1200px' }}
    >
      {/* ScrollTrigger Camera Zoom Photographic Background Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={heroImageContainerRef}
          className="w-full h-full origin-[60%_45%] will-change-transform"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85"
            alt="Contemporary luxury villa architectural photography with twilight illumination and reflection pool"
            priority={true}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover scale-100"
          />
        </div>

        {/* Cinematic Scrims & Architectural Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/55 to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-[#0c0d10]/80 pointer-events-none" />

        {/* Lens Crosshairs & Framing Lines for Optical Camera Feel */}
        <div
          ref={crosshairRef}
          className="absolute inset-0 pointer-events-none flex items-center justify-center will-change-transform"
        >
          <div className="w-[88vw] max-w-6xl h-[70vh] border border-white/8 relative">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-amber-200/50" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-amber-200/50" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-amber-200/50" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-amber-200/50" />
          </div>
        </div>
      </div>

      {/* Main Hero Content with 3D Depth Shift */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 flex-1 flex flex-col justify-center py-12 md:py-20">
        <div ref={heroTextContainerRef} className="max-w-4xl will-change-transform">
          {/* Subtle Location & Discipline Tag with Parallax Float */}
          <div
            ref={heroForegroundRef}
            className="flex items-center gap-3 text-xs md:text-sm tracking-[0.28em] uppercase text-amber-200/90 font-medium mb-6 font-mono"
          >
            <span>Mohali</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span>Chandigarh</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span>Panchkula</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span>New Chandigarh</span>
          </div>

          {/* User Requested Exact Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-white leading-[1.08] text-balance mb-8">
            WE BUILD <br />
            <span className="font-editorial italic font-normal text-amber-100/90">THE WAY YOU</span> <br />
            ENVISION.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl text-balance mb-10">
            Pioneering bespoke residential architecture, structural engineering precision, and turnkey luxury villa construction across the premier enclaves of the Chandigarh Capital Region.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#spatial-sequence"
              className="inline-flex items-center gap-3 px-7 py-4 text-xs font-semibold tracking-[0.2em] uppercase bg-white text-neutral-950 hover:bg-amber-100 transition-all duration-300 hover:translate-x-1"
            >
              <Compass className="w-4 h-4 text-neutral-900" />
              <span>Explore Projects</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 text-xs font-semibold tracking-[0.2em] uppercase bg-black/60 backdrop-blur-md border border-white/20 text-white hover:border-amber-200/80 hover:text-amber-100 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Key Metrics & Scroll Indicator */}
      <div
        ref={metricsBarRef}
        className="relative z-10 w-full border-t border-white/10 bg-black/50 backdrop-blur-md will-change-transform"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Key Trust Signals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-12 w-full md:w-auto">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">Specialisation</p>
              <p className="text-base md:text-lg font-light text-white mt-0.5">Luxury Residential</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">Service Region</p>
              <p className="text-base md:text-lg font-light text-white mt-0.5">Chandigarh Tricity</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">Engineering</p>
              <p className="text-base md:text-lg font-light text-white mt-0.5">Seismic Zone IV</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">Execution</p>
              <p className="text-base md:text-lg font-light text-white mt-0.5">End-to-End Turnkey</p>
            </div>
          </div>

          {/* Explore Projects Scroll Indicator */}
          <a
            href="#spatial-sequence"
            className="group flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-neutral-400 hover:text-amber-200 transition-colors self-end md:self-auto"
            aria-label="Scroll to explore projects"
          >
            <span>Scroll To Discover</span>
            <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-amber-200/60 flex items-center justify-center transition-colors">
              <ArrowDown className="w-3.5 h-3.5 text-neutral-300 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
