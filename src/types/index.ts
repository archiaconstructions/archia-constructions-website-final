export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'villas' | 'mansions' | 'interiors' | 'farmhouses';
  categoryLabel: string;
  location: string;
  area: string;
  year: string;
  timeline: string;
  imageUrl: string;
  galleryImages: string[];
  description: string;
  highlights: string[];
  architecturalStyle: string;
  scope: string[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  imageUrl: string;
}

export interface JourneyStep {
  number: string;
  phase: string;
  title: string;
  description: string;
  duration: string;
  milestones: string[];
  qualityAssurance: string[];
  imageUrl: string;
}

export interface InteriorFeature {
  id: string;
  title: string;
  category: string;
  description: string;
  materials: string[];
  imageUrl: string;
}

export interface ServiceArea {
  name: string;
  microMarkets: string[];
  description: string;
}
