/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CinematicParallax } from './components/CinematicParallax';
import { SpatialDepthViewer } from './components/SpatialDepthViewer';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { ConstructionJourney } from './components/ConstructionJourney';
import { LuxuryInteriors } from './components/LuxuryInteriors';
import { CostEstimator } from './components/CostEstimator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from './data/content';

export default function App() {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Archia Constructions, I am interested in discussing a luxury residential construction project in the Chandigarh Tricity area.'
  )}`;

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f2f3f5] font-body bg-grain selection:bg-amber-900/40 selection:text-amber-200 overflow-x-hidden">
      {/* Fixed Navigation adhering to Top Bar Contract */}
      <Navbar />

      {/* Main Content Flow */}
      <main>
        {/* 1. Full-screen Photographic Hero with GSAP ScrollTrigger Camera Zoom */}
        <Hero />

        {/* 2. Pinned Multi-Stage Exterior-to-Interior Spatial Sequence */}
        <CinematicParallax />

        {/* 3. Three.js 3D Spatial Depth Studio with Real Architectural Photography */}
        <SpatialDepthViewer />

        {/* 4. Featured Real Projects Gallery with 3D Perspective Tilt Cards */}
        <ProjectsGallery />

        {/* 5. Architecture & Residential Construction Services */}
        <ServicesSection />

        {/* 6. Construction Journey Matrix (Planning, Structure, Interiors, Handover) */}
        <ConstructionJourney />

        {/* 7. Interior Design & Luxury Living */}
        <LuxuryInteriors />

        {/* 8. Interactive Tricity Villa Cost & Scope Estimator */}
        <CostEstimator />

        {/* 9. Full-Width Contact Section & WhatsApp CTA */}
        <ContactSection />
      </main>

      {/* Professional Architectural Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Quick Button for Mobile */}
      <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-emerald-400/30"
          aria-label="Direct WhatsApp Concierge"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="hidden sm:inline text-xs font-medium tracking-wider uppercase">
            WhatsApp Concierge
          </span>
        </a>
      </aside>
    </div>
  );
}
