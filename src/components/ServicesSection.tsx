import React, { useState } from 'react';
import { SERVICES, COMPANY_INFO } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState(SERVICES[0].id);

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  const getServiceWhatsAppUrl = (serviceTitle: string) => {
    return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
      `Hello Milaan Constructions, I am inquiring regarding your "${serviceTitle}" services for our home in the Chandigarh Tricity area.`
    )}`;
  };

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#0c0d10] border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-200/90 font-mono mb-3">
              <span>Expertise & Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              Architecture & Residential <br />
              <span className="font-editorial italic font-normal text-amber-100">Construction Services.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            Integrating contemporary masterplanning with turnkey civil execution, structural integrity, and artisanal interior joinery under a single accountable contract.
          </p>
        </div>

        {/* 2-Column Split: Service Interactive Accordion / Selector & Active Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Numbered Service List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {SERVICES.map((service) => {
              const isActive = service.id === activeServiceId;
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`cursor-pointer p-5 sm:p-6 transition-all duration-300 border text-left ${
                    isActive
                      ? 'bg-neutral-900/90 border-amber-200/40 shadow-xl'
                      : 'bg-neutral-900/20 border-neutral-800/60 hover:bg-neutral-900/40 hover:border-neutral-700'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveServiceId(service.id);
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-amber-300/80">
                      {service.number}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isActive ? 'rotate-90 text-amber-200' : 'text-neutral-600'
                      }`}
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-light text-white mt-2 mb-1 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {service.tagline}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed View with Real Photography & Deliverables */}
          <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between overflow-hidden">
            {/* Visual Photography Header */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden group/img">
              <ImageWithFallback
                src={activeService.imageUrl}
                alt={activeService.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/35 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest uppercase text-amber-200 bg-neutral-950/85 px-3 py-1 border border-amber-200/25 backdrop-blur-md shadow-lg">
                  {activeService.number} / Turnkey Scope
                </span>
                <span className="text-xs text-neutral-300 font-mono bg-neutral-950/85 px-3 py-1 border border-white/10 backdrop-blur-md shadow-lg">
                  Tricity Verified Standards
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-light text-white tracking-tight mb-4">
                  {activeService.title}
                </h4>
                <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed mb-6">
                  {activeService.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                    Core Specifications & Engineering Deliverables:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {activeService.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light leading-normal">
                        <Check className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Enquiry for this service */}
              <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-neutral-400">
                  <span>Supervised by certified structural & civil engineers</span>
                </div>
                <a
                  href={getServiceWhatsAppUrl(activeService.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-wider uppercase bg-amber-100 hover:bg-amber-200 text-neutral-950 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-800" />
                  <span>Enquire for this Service</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
