import React, { useState, useRef } from 'react';
import { PROJECTS, COMPANY_INFO } from '../data/content';
import { Project } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { X, ArrowUpRight, MessageCircle, MapPin, Maximize2, Calendar, Clock, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
}

const Project3DCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(project)}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group cursor-pointer bg-neutral-900/40 border border-neutral-800/80 hover:border-amber-200/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg will-change-transform"
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d',
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(project);
        }
      }}
    >
      {/* Image Container with hover transition */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
        <ImageWithFallback
          src={project.imageUrl}
          alt={`${project.title} - ${project.subtitle}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          containerClassName="w-full h-full"
        />
        {/* Measured gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top overlay metadata (unboxed clean text) with 3D Z-lift */}
        <div
          className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-neutral-300 transition-transform duration-300"
          style={{ transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)' }}
        >
          <span className="bg-neutral-950/80 px-2.5 py-1 border border-white/10 backdrop-blur-sm">
            {project.categoryLabel}
          </span>
          <span className="bg-neutral-950/80 px-2.5 py-1 border border-white/10 backdrop-blur-sm">
            {project.year}
          </span>
        </div>

        {/* Bottom floating view cue */}
        <div className="absolute bottom-4 right-4 w-9 h-9 bg-neutral-950/90 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Maximize2 className="w-4 h-4 text-amber-200" />
        </div>
      </div>

      {/* Card Body with 3D Z-separation */}
      <div
        className="p-6 flex-1 flex flex-col justify-between transition-transform duration-300"
        style={{ transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)' }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-2">
            <MapPin className="w-3.5 h-3.5 text-amber-200/80" />
            <span>{project.location}</span>
          </div>
          <h3 className="text-xl font-light text-white tracking-tight group-hover:text-amber-100 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-neutral-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Footer specs */}
        <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span>{project.area}</span>
          <span className="inline-flex items-center gap-1 text-amber-200 group-hover:translate-x-1 transition-transform">
            <span>View Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};

export const ProjectsGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'villas', label: 'Luxury Villas' },
    { id: 'mansions', label: 'Modern Mansions' },
    { id: 'interiors', label: 'Bespoke Interiors' },
    { id: 'farmhouses', label: 'Farmhouses' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const getProjectWhatsAppUrl = (project: Project) => {
    return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
      `Hello Archia Constructions, I am interested in discussing a residential project similar in architectural scope and scale to "${project.title}" located in ${project.location} (${project.area}).`
    )}`;
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-[#0c0d10] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header & Category Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-200/90 font-mono mb-3">
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              Featured Residential <br />
              <span className="font-editorial italic font-normal text-amber-100">Commissions.</span>
            </h2>
          </div>

          {/* Clean Segmented Filter Bar */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 self-start lg:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-amber-100 text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid with 3D perspective depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Project3DCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Architectural Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-[#101216] border border-neutral-800 text-white overflow-hidden shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-neutral-800">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-amber-200 uppercase mb-1">
                  <span>{selectedProject.categoryLabel}</span>
                  <span aria-hidden="true">&bull;</span>
                  <span>{selectedProject.location}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 border border-neutral-700 hover:border-white text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close Project Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="max-h-[75vh] overflow-y-auto p-6 md:p-8 space-y-8">
              {/* Primary Visual Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 aspect-[16/10] overflow-hidden bg-neutral-950">
                  <ImageWithFallback
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                  {selectedProject.galleryImages.slice(1, 3).map((imgUrl, i) => (
                    <div key={i} className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden bg-neutral-950">
                      <ImageWithFallback
                        src={imgUrl}
                        alt={`${selectedProject.title} view ${i + 2}`}
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Architectural Specs Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-neutral-900/60 border border-neutral-800 font-mono text-xs">
                <div>
                  <p className="text-neutral-500 uppercase">Built-Up Area</p>
                  <p className="text-neutral-200 font-medium text-sm mt-0.5">{selectedProject.area}</p>
                </div>
                <div>
                  <p className="text-neutral-500 uppercase">Location</p>
                  <p className="text-neutral-200 font-medium text-sm mt-0.5">{selectedProject.location}</p>
                </div>
                <div>
                  <p className="text-neutral-500 uppercase">Completion Time</p>
                  <p className="text-neutral-200 font-medium text-sm mt-0.5">{selectedProject.timeline}</p>
                </div>
                <div>
                  <p className="text-neutral-500 uppercase">Style</p>
                  <p className="text-neutral-200 font-medium text-sm mt-0.5">{selectedProject.architecturalStyle}</p>
                </div>
              </div>

              {/* Description and Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-7 space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                    Project Narrative & Vision
                  </h4>
                  <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="pt-2">
                    <h5 className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-2">
                      Disciplines Executed:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.scope.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 bg-neutral-900/40 border border-neutral-800/80 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-200 font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Engineering Highlights</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-neutral-300 font-light">
                    {selectedProject.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-200 font-bold">&bull;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer with WhatsApp CTA */}
            <div className="p-6 md:p-8 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-neutral-400 font-mono">
                Have a plot in {selectedProject.location.split(',')[0]}? We provide full architectural feasibility.
              </p>
              <a
                href={getProjectWhatsAppUrl(selectedProject)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase bg-amber-100 hover:bg-amber-200 text-neutral-950 transition-colors shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-emerald-800" />
                <span>Inquire About Similar Commission</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
