import { Project, Service, JourneyStep, InteriorFeature, ServiceArea } from '../types';

export const COMPANY_INFO = {
  name: 'MILAAN CONSTRUCTIONS',
  tagline: 'WE BUILD THE WAY YOU ENVISION.',
  legalName: 'Milaan Constructions',
  phone: '+91 83600 51244',
  phoneDisplay: '+91 83600 51244',
  phoneTel: '+918360051244',
  whatsappNumber: '918360051244',
  email: 'archiaconstructions@gmail.com',
  address: 'Mohali & Chandigarh Capital Region (Tricity), Punjab, India',
  serviceRegion: 'Chandigarh Capital Region (Mohali, Chandigarh, Panchkula, New Chandigarh, Kharar, Zirakpur)',
  servicePillars: {
    focus: 'Luxury Residential Turnkey Construction',
    geography: 'Chandigarh Capital Region (Tricity)',
    standards: 'Seismic Zone IV & BIS Engineering Compliance',
    execution: 'End-to-End Architectural & Civil Execution',
  },
};

export const SERVICE_AREAS: ServiceArea[] = [
  {
    name: 'Mohali',
    microMarkets: ['Sector 82 JLPL', 'Sector 66', 'Wave Estate (Sector 85/99)', 'Aerocity', 'IT City'],
    description: 'Premier residential sectors and integrated luxury townships in Mohali.',
  },
  {
    name: 'Chandigarh',
    microMarkets: ['Sector 9', 'Sector 4', 'Sector 8', 'Sector 10', 'Sector 11', 'Sector 33'],
    description: 'Ultra-prime architectural heritage sectors and modern luxury estates.',
  },
  {
    name: 'Panchkula',
    microMarkets: ['Mansa Devi Complex (MDC)', 'Sector 2', 'Sector 4', 'Sector 6', 'Pinjore Kalka Belt'],
    description: 'Hillside view residences and bespoke hillside luxury villas.',
  },
  {
    name: 'New Chandigarh',
    microMarkets: ['Eco City 1 & 2', 'Omaxe The Lake & Cassia', 'Medicity Corridors'],
    description: 'Contemporary planned luxury mastercommunities and green villas.',
  },
  {
    name: 'Kharar',
    microMarkets: ['Sunny Enclave Extension', 'VR Punjab Corridor', 'Khanpur Villa Enclaves'],
    description: 'Sprawling private estates, bespoke bungalows, and expansive plots.',
  },
  {
    name: 'Zirakpur',
    microMarkets: ['PR7 Airport Ring Road', 'VIP Road Mansions', 'Dhakoli Luxury Enclaves'],
    description: 'Exclusive penthouses, duplex residences, and gated private residences.',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'residence-sector-9',
    title: 'The Linear Monolith',
    subtitle: 'Sector 9, Chandigarh',
    category: 'villas',
    categoryLabel: 'Luxury Villa',
    location: 'Sector 9, Chandigarh',
    area: '10,500 sq.ft (2 Kanal)',
    year: '2025',
    timeline: '14 Months Turnkey',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80',
    ],
    description:
      'A striking 2-Kanal contemporary residence crafted with exposed cast-in-place concrete, teak brise-soleil screens, and triple-glazed curtain walls. Designed for seamless indoor-outdoor living with a private lap pool and double-height central courtyards.',
    highlights: [
      'Post-tensioned cantilevered concrete roofs with zero column obstruction',
      'Italian Statuario marble flooring across all formal entertainment zones',
      'Integrated VRV HVAC climate management with acoustic duct dampening',
      'Multi-layer crystalline structural waterproofing and drainage management',
    ],
    architecturalStyle: 'Modernist Brutalist & Warm Tropical',
    scope: ['Architectural Planning', 'RCC & Civil Construction', 'Interior Architecture', 'Landscape Integration'],
  },
  {
    id: 'wave-estate-residence',
    title: 'The Glass Pavilion',
    subtitle: 'Wave Estate, Sector 85, Mohali',
    category: 'villas',
    categoryLabel: 'Luxury Villa',
    location: 'Wave Estate, Mohali',
    area: '6,200 sq.ft (1 Kanal)',
    year: '2024',
    timeline: '12 Months Turnkey',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80',
    ],
    description:
      'Engineered for a prominent business family, this 1-Kanal villa in Wave Estate features expansive cantilevered glass volumes, natural travertine cladding, and a zen reflection pond integrated into the entryway.',
    highlights: [
      'Automated Schüco minimalist sliding door systems with flush floor tracks',
      'Custom millwork in smoked American walnut and brass shadow-line details',
      'Basement home theater with THX sound insulation and private wine cellar',
      '30kW rooftop solar grid integrated into architectural parapets',
    ],
    architecturalStyle: 'Contemporary International Minimalist',
    scope: ['Full Turnkey Construction', 'Structural Engineering', 'Interior Execution', 'Smart Automation'],
  },
  {
    id: 'eco-city-mansion',
    title: 'The Cantilever House',
    subtitle: 'Eco City 1, New Chandigarh',
    category: 'mansions',
    categoryLabel: 'Modern Mansion',
    location: 'Eco City, New Chandigarh',
    area: '14,000 sq.ft (2.5 Kanal)',
    year: '2025',
    timeline: '16 Months Turnkey',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=80',
    ],
    description:
      'Perched with uninterrupted views of the Shivalik foothills in New Chandigarh, this mansion balances bold structural geometry with soft natural materials, featuring an 8-meter cantilevered master terrace.',
    highlights: [
      'Deep structural cantilever executed with high-grade Fe 550D TMT steel and M35 concrete',
      'Infinity edge swimming pool with Italian mosaic tiling',
      'Smart home centralized automation: lighting, blinds, security, and climate',
      'Geothermal pre-cooling heat exchanger for maximum energy efficiency',
    ],
    architecturalStyle: 'High-Tech Contemporary Luxury',
    scope: ['Master Architecture', 'Civil Engineering', 'Interior Joinery', 'Landscape Architecture'],
  },
  {
    id: 'mdc-panchkula-bungalow',
    title: 'The Travertine Sanctuary',
    subtitle: 'MDC Sector 4, Panchkula',
    category: 'villas',
    categoryLabel: 'Luxury Villa',
    location: 'MDC, Panchkula',
    area: '8,800 sq.ft (1.5 Kanal)',
    year: '2024',
    timeline: '13 Months Turnkey',
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80',
    ],
    description:
      'Nestled near the quiet foothills of Panchkula, this residence uses imported Silver Travertine stone facades, bronze metal accents, and internal courtyards to bring soft natural daylight into the deep floor plate.',
    highlights: [
      'Open-to-sky internal tropical atrium with automated rain-sensor skylights',
      'Bespoke master suite with walk-in dressing and custom bookmatched marble bath',
      'Engineered wooden parquet floors imported from Austria in private suites',
      'Comprehensive seismic-zone IV resistant structural design',
    ],
    architecturalStyle: 'Organic Minimalist',
    scope: ['Architecture & Approvals', 'Civil Execution', 'Turnkey Interiors', 'Custom Millwork'],
  },
  {
    id: 'zirakpur-sky-penthouse',
    title: 'The Sky Duplex',
    subtitle: 'Airport Road, Zirakpur',
    category: 'interiors',
    categoryLabel: 'Bespoke Interior',
    location: 'PR7 Corridor, Zirakpur',
    area: '5,400 sq.ft Duplex',
    year: '2025',
    timeline: '7 Months Interior Fitout',
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=80',
    ],
    description:
      'A double-height penthouse transformation featuring a sculptural floating brass staircase, monolithic marble kitchen island, and custom acoustic timber acoustic paneling throughout the living salon.',
    highlights: [
      'Suspended architectural steel and tempered glass floating stairs',
      'Custom Poliform-style modular show kitchen with Miele appliances',
      'Flos and Davide Groppi architectural recessed magnetic lighting tracks',
      'Seamless micro-cement bathroom walls with concealed Dornbracht tapware',
    ],
    architecturalStyle: 'European Contemporary Luxury',
    scope: ['Interior Architecture', 'Bespoke Joinery', 'MEP & Lighting Design', 'Turnkey Furnishing'],
  },
  {
    id: 'kharar-farmhouse-estate',
    title: 'The Orchard Estate',
    subtitle: 'Kharar Outskirts / Greater Mohali',
    category: 'farmhouses',
    categoryLabel: 'Luxury Farmhouse',
    location: 'Kharar, Greater Mohali',
    area: '18,500 sq.ft (1.5 Acre Estate)',
    year: '2024',
    timeline: '18 Months Turnkey',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
    ],
    description:
      'A sprawling luxury farmhouse estate combining timeless brick vaulted colonnades with ultra-modern glass pavilions. Designed around preserved fruit trees with an outdoor entertainment deck and guest villas.',
    highlights: [
      'Exposed wire-cut clay brick vaulted ceilings with hand-finished lime wash',
      'Expansive heated outdoor swimming pool with poolside pavilion bar',
      'Independent security annex, staff quarters, and 6-car subterranean garage',
      'Rainwater harvesting reservoir recharging local water aquifers',
    ],
    architecturalStyle: 'Modern Heritage & Estate Living',
    scope: ['Master Planning', 'Civil Construction', 'Landscape Architecture', 'Interior Fit-Out'],
  },
];

export const SERVICES: Service[] = [
  {
    id: 'turnkey-construction',
    number: '01',
    title: 'Turnkey Luxury Residential Construction',
    tagline: 'Complete single-point responsibility from groundbreak to handover.',
    description:
      'We undertake end-to-end luxury villa and bungalow construction across Chandigarh, Mohali, and Panchkula. No sub-contracting chaos, no budget surprises—pure engineering excellence supervised daily by certified civil engineers.',
    deliverables: [
      'Seismic Zone IV structural engineering & post-tensioned RCC framing',
      'Anti-termite foundation barrier & German crystalline multi-layer waterproofing',
      'Complete MEP engineering: plumbing, VRV HVAC, electrical & drainage systems',
      'Daily site logs, milestone videos, and dedicated client liaison engineer',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'architectural-design',
    number: '02',
    title: 'Contemporary Architectural Design',
    tagline: 'Bespoke architectural masterplans aligned with local municipal bylaws.',
    description:
      'Our architectural studio blends progressive international aesthetics with rigorous climatic sensitivity. Every layout optimizes natural cross-ventilation, daylight penetration, and Vastu-compliant energy flows without compromising modernist geometry.',
    deliverables: [
      '3D spatial volumetrics, daylight analysis, and photorealistic design studies',
      'Municipal sanction drawings & liaison approvals for GMADA, CHB, and HUDA',
      'Structural calculation sheets certified by licensed IIT/PEC structural engineers',
      'Comprehensive working detail drawings: facades, louvers, fenestration & skylights',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'interior-architecture',
    number: '03',
    title: 'Bespoke Interior Architecture & Joinery',
    tagline: 'Precision millwork, curated Italian stones, and architectural lighting.',
    description:
      'We craft interior sanctuaries characterized by restrained luxury. We source directly from Italian quarries and operate our own precision woodworking facility to ensure flawless alignment of bookmatched stones and veneer grain continuity.',
    deliverables: [
      'Complete interior layouts, ceiling design & architectural lighting plans',
      'Italian marble hand-selection, CNC waterjet cutting & mirror polishing',
      'Custom modular kitchens with Blum/Hettich hardware and quartz countertops',
      'Acoustic home theaters, automated motorized dressings & ensuite spas',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'structural-engineering',
    number: '04',
    title: 'Structural Engineering & RCC Quality',
    tagline: 'Engineered for multi-generational longevity and seismic resilience.',
    description:
      'Luxury villas require audacious cantilevers, open-span living spaces without intermediate columns, and massive glass envelopes. We engineer structural solutions using high-performance concrete mixes and ultrasonic weld testing.',
    deliverables: [
      'Fe 550D primary brand steel (Tata Tiscon / Jindal Panther) with mill test certificates',
      'Computer-batched ready-mix concrete (M30/M35/M40) with cube testing at every pour',
      'Comprehensive structural audit reports and laboratory certified test sheets',
      'Sub-soil investigation and pile/raft foundation optimization',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'smart-landscape',
    number: '05',
    title: 'Smart Automation & Landscape Integration',
    tagline: 'Subtle technology and serene outdoor living woven into architecture.',
    description:
      'A truly luxury residence should intuitively anticipate your comfort. We engineer KNX-based smart automation, architectural facade lighting, perimeter security, and drought-resistant native landscapes with automated micro-drip irrigation.',
    deliverables: [
      'Wired KNX automation for lighting, climate, motorized curtains & access control',
      'Solar grid-tied inverters and high-capacity battery storage integration',
      'Biophilic landscape design, vertical green walls & reflection water features',
      'Architectural landscape lighting with scheduled twilight scenes',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=2000&q=80',
  },
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: '01',
    phase: 'Phase One',
    title: 'Vision & Architectural Masterplanning',
    description:
      'We translate your lifestyle aspirations into an architectural masterplan. From soil testing and solar orientation to GMADA/CHB regulatory compliance, every millimeter is planned before breaking ground.',
    duration: 'Weeks 1 – 6',
    milestones: [
      'Site topographic survey and geotechnical core soil testing',
      'Concept schematic design and 3D architectural volumetrics',
      'Vastu alignment and spatial zoning review with family',
      'Statutory municipal drawing preparation and sanction submission',
    ],
    qualityAssurance: [
      'Certified structural engineer calculations',
      'Solar path and climatic thermal comfort modelling',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80',
  },
  {
    number: '02',
    phase: 'Phase Two',
    title: 'Civil & Structural Engineering Execution',
    description:
      'The foundational spine of your home. Using certified raw materials, laser-guided formwork, and laboratory-tested concrete pours, we construct a monolithic structure designed to endure generations.',
    duration: 'Months 2 – 7',
    milestones: [
      'Deep excavation, anti-termite chemical soil barrier, and raft foundation',
      'Plinth casting, grade beam reinforcement, and sub-slab crystalline waterproofing',
      'Superstructure columns, post-tensioned slabs, and cantilevered beams',
      'High-performance AAC or wire-cut brick masonry with expansion joints',
    ],
    qualityAssurance: [
      'Laboratory compressive strength cube testing at 7, 14, and 28 days',
      'Ultrasonic flaw detection for steel welds and rebar cover checks',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
  },
  {
    number: '03',
    phase: 'Phase Three',
    title: 'MEP Infrastructure & Bespoke Finishes',
    description:
      'The nervous system and tactile soul of the residence. We install low-noise plumbing, concealed VRV HVAC ducting, bespoke Italian marble flooring, and precision millwork crafted in our climate-controlled workshop.',
    duration: 'Months 8 – 13',
    milestones: [
      'Multi-layer pressure-tested Viega/Geberit plumbing lines',
      'Zero-dB acoustic insulated ducted air-conditioning ducting',
      'Precision Italian marble dry-lay pattern approval and resin treatment',
      'High-grade thermal break aluminium sliding windows and double glazing',
    ],
    qualityAssurance: [
      '10-bar hydraulic pipe pressure holding tests for 72 consecutive hours',
      'Laser-level calibration for all continuous stone flooring and flush doors',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=80',
  },
  {
    number: '04',
    phase: 'Phase Four',
    title: 'White-Glove Commissioning & Handover',
    description:
      'Prior to handover, our site engineering team executes an exhaustive MEP and finishes audit. Every circuit, water fixture, joinery alignment, and acoustic seal is calibrated to perfection, accompanied by complete engineering documentation.',
    duration: 'Month 14',
    milestones: [
      'Comprehensive MEP, plumbing, and structural snagging audit',
      'Industrial deep cleaning and stone crystallisation polishing',
      'Homeowner manual, equipment OEM warranties, and circuit schematics',
      'Ceremonial key handover and onboarding for smart home automation',
    ],
    qualityAssurance: [
      'Formal Structural Completion & As-Built Engineering Documentation',
      'Dedicated post-handover customer support and tuning visits',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
  },
];

export const INTERIOR_FEATURES: InteriorFeature[] = [
  {
    id: 'marble-sanctuary',
    title: 'Bookmatched Italian Stone',
    category: 'Stonework & Surfaces',
    description:
      'Hand-selected in Carrara and Verona, our marble slabs are individually dry-laid and laser-matched to produce continuous natural veining across grand living spaces.',
    materials: ['Italian Statuario', 'Bottochino Fiorito', 'Silver Travertine', 'Armani Bronze'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'architectural-millwork',
    title: 'Artisanal Smoked Walnut Joinery',
    category: 'Woodwork & Cabinetry',
    description:
      'Custom floor-to-ceiling pivot doors with concealed magnetic latches, acoustic wall slats, and bespoke walk-in dressings crafted in moisture-treated natural veneers.',
    materials: ['Smoked American Walnut', 'Burr Oak', 'Concealed Tectus Hinges', 'Satin Champagne Metal'],
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'luminous-spaces',
    title: 'Architectural Glazing & Lighting',
    category: 'Atmospheric Systems',
    description:
      'Floor-to-ceiling slim-profile thermal glazed portals that blur interior living with tranquil garden verandas, complemented by museum-grade high-CRI recessed lighting.',
    materials: ['Thermal-Break Aluminium', 'Low-E Acoustic Glass', 'CRI 98+ Magnetic Tracks', 'Indirect Coves'],
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'wellness-suites',
    title: 'Private Spa Ensuite Sanctuaries',
    category: 'Bath & Wellness',
    description:
      'Curated private master bathrooms featuring free-standing stone composite bathtubs, thermostatic rain showers with ambient chromotherapy, and underfloor radiant heating.',
    materials: ['Fluted Glass Partitions', 'Dornbracht Brushed Platinum', 'Solid Surface Stone', 'Anti-Slip Flamed Granite'],
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=80',
  },
];
