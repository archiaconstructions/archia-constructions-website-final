import React, { useState } from 'react';
import { JOURNEY_STEPS, COMPANY_INFO } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';
import { ShieldCheck, CheckCircle2, Clock, Calendar, ArrowRight, MessageCircle } from 'lucide-react';

export const ConstructionJourney: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const currentStep = JOURNEY_STEPS[activeStepIndex];

  return (
    <section id="journey" className="relative py-24 md:py-32 bg-[#090a0c] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-200/90 font-mono mb-3">
              <span>The Archia Process</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              Our Construction Journey: <br />
              <span className="font-editorial italic font-normal text-amber-100">Zero Compromise, Total Clarity.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            Every Archia villa follows an exacting 4-stage delivery matrix, audited against 380 quality control standards and documented through weekly client progress reports.
          </p>
        </div>

        {/* 4-Stage Step Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12">
          {JOURNEY_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-5 text-left border transition-all duration-300 relative ${
                  isActive
                    ? 'bg-neutral-900 border-amber-200/50 shadow-lg'
                    : 'bg-neutral-950/60 border-neutral-800/80 hover:bg-neutral-900/40 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-amber-300/80">
                    Phase {step.number}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">{step.duration}</span>
                </div>
                <h3
                  className={`text-sm md:text-base font-medium tracking-tight ${
                    isActive ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  {step.title.split('&')[0]}
                </h3>

                {isActive && (
                  <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-amber-200" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        <div className="bg-neutral-900/50 border border-neutral-800 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Visual Side */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden bg-neutral-950">
            <ImageWithFallback
              src={currentStep.imageUrl}
              alt={currentStep.title}
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-200 bg-black/80 px-3 py-1 border border-amber-200/20">
                {currentStep.phase} Execution
              </span>
              <p className="text-xs text-neutral-300 font-mono mt-2">
                Typical Duration: {currentStep.duration}
              </p>
            </div>
          </div>

          {/* Content & Quality Checks */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-amber-200 tracking-widest uppercase">
                  Step {currentStep.number} of 04
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-1 mb-3">
                  {currentStep.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              {/* Milestones */}
              <div className="space-y-3 pt-2">
                <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-200" />
                  <span>Key Phase Milestones:</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentStep.milestones.map((m, i) => (
                    <div
                      key={i}
                      className="text-xs text-neutral-300 bg-neutral-900/80 border border-neutral-800 p-3 flex items-start gap-2"
                    >
                      <span className="font-mono text-amber-200/90 text-[11px] shrink-0">{i + 1}.</span>
                      <span className="leading-snug">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Assurance Protocols */}
              <div className="p-4 bg-amber-950/10 border border-amber-800/30 space-y-2">
                <p className="text-xs uppercase tracking-widest text-amber-200 font-mono flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>Rigorous Quality Assurance Standards:</span>
                </p>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {currentStep.qualityAssurance.map((qa, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-300/80 rounded-full" />
                      <span>{qa}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next Step / WhatsApp Discussion */}
            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {activeStepIndex < JOURNEY_STEPS.length - 1 ? (
                  <button
                    onClick={() => setActiveStepIndex((prev) => prev + 1)}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-200 hover:text-white transition-colors"
                  >
                    <span>Proceed to Phase {JOURNEY_STEPS[activeStepIndex + 1].number}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-xs font-mono text-neutral-400">Final Stage: 15-Year Warranty Handover</span>
                )}
              </div>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Archia Constructions, I would like to know more about your construction process and timeline for Phase ${currentStep.number}: ${currentStep.title}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase bg-neutral-800 hover:bg-neutral-700 text-white transition-colors border border-neutral-700"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Discuss Timeline on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
