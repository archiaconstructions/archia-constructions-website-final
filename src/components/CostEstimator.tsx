import React, { useState } from 'react';
import { Calculator, MessageCircle, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface PlotOption {
  id: string;
  label: string;
  plotSizeDescription: string;
  defaultBuiltUpSqft: number;
}

interface SpecTier {
  id: string;
  name: string;
  ratePerSqft: number;
  description: string;
  features: string[];
}

export const CostEstimator: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('Mohali');
  const [selectedPlot, setSelectedPlot] = useState<string>('1-kanal');
  const [selectedTier, setSelectedTier] = useState<string>('ultra');
  const [customSqft, setCustomSqft] = useState<number>(6500);

  const locations = [
    'Mohali (Wave Estate / Sector 82 / Aerocity)',
    'Chandigarh (Prime Heritage Sectors)',
    'Panchkula (MDC / Sector 4, 6)',
    'New Chandigarh (Eco City / Omaxe)',
    'Kharar (Estates & Enclaves)',
    'Zirakpur (PR7 / Airport Corridor)',
  ];

  const plotOptions: PlotOption[] = [
    {
      id: '10-marla',
      label: '10 Marla (250 Sq.Yd)',
      plotSizeDescription: 'Ground + 1st + Terrace lounge (3,800 sq.ft)',
      defaultBuiltUpSqft: 3800,
    },
    {
      id: '1-kanal',
      label: '1 Kanal (500 Sq.Yd)',
      plotSizeDescription: 'Basement / Stilt + 2 Floors + Courtyard (6,500 sq.ft)',
      defaultBuiltUpSqft: 6500,
    },
    {
      id: '2-kanal',
      label: '2 Kanal (1,000 Sq.Yd)',
      plotSizeDescription: 'Multi-level modern villa with double height foyer (11,000 sq.ft)',
      defaultBuiltUpSqft: 11000,
    },
    {
      id: 'custom',
      label: 'Custom Farmhouse / Bespoke',
      plotSizeDescription: 'Tailored architectural footprint',
      defaultBuiltUpSqft: 15000,
    },
  ];

  const specTiers: SpecTier[] = [
    {
      id: 'signature',
      name: 'Signature Turnkey',
      ratePerSqft: 2650,
      description: 'High-performance RCC structure, premium Indian marble & large-format tiles, premium sanitaryware, thermal UPVC/Aluminium windows.',
      features: ['Fe 550D TMT Steel & M30 Concrete', 'Multi-Layer Crystalline Waterproofing', 'Hafele/Blum kitchen hardware'],
    },
    {
      id: 'ultra',
      name: 'Ultra Luxury Monolith',
      ratePerSqft: 3450,
      description: 'Post-tensioned cantilevered slabs, imported Italian Statuario/Bottochino marble, Schüco/Reynaers slimline aluminium glazing, ducted VRV HVAC.',
      features: ['Post-Tensioned Cantilevered RCC', 'Imported Italian Marble throughout', 'Schüco slimline thermal fenestration', 'Pre-wired smart automation'],
    },
    {
      id: 'bespoke',
      name: 'Bespoke Estate Reserve',
      ratePerSqft: 4400,
      description: 'Architectural concrete, full KNX automation, private lap pool with mosaic tiling, acoustic home cinema, Italian designer modular kitchen with Miele appliances.',
      features: ['Complete KNX Smart Home', 'Designer Lap Pool & Outdoor Pavilion', 'Custom artisanal smoked walnut woodwork', 'Geothermal/Solar integration'],
    },
  ];

  const activePlot = plotOptions.find((p) => p.id === selectedPlot) || plotOptions[1];
  const activeTier = specTiers.find((t) => t.id === selectedTier) || specTiers[1];

  const builtUpArea = selectedPlot === 'custom' ? customSqft : activePlot.defaultBuiltUpSqft;
  const estimatedTotal = builtUpArea * activeTier.ratePerSqft;

  // Approximate realistic breakdown
  const civilStructureCost = Math.round(estimatedTotal * 0.42);
  const finishingAndInteriorsCost = Math.round(estimatedTotal * 0.38);
  const mepAutomationCost = Math.round(estimatedTotal * 0.2);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const estimatedTimelineMonths =
    builtUpArea <= 4000 ? '10 – 12' : builtUpArea <= 8000 ? '12 – 14' : '15 – 18';

  const generateWhatsAppInquiry = () => {
    const text = `Hello Milaan Constructions, I generated an estimate on your website:
• Location: ${selectedLocation}
• Plot / Scope: ${activePlot.label}
• Estimated Area: ${builtUpArea.toLocaleString()} sq.ft
• Specification Tier: ${activeTier.name}
• Estimated Budget Range: ${formatINR(estimatedTotal)}
I would like to schedule a feasibility discussion with your chief architect.`;
    return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="estimator" className="relative py-24 md:py-32 bg-[#0a0b0e] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-200/90 font-mono mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Transparent Project Planning</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              Tricity Luxury Villa <br />
              <span className="font-editorial italic font-normal text-amber-100">Cost & Scope Estimator.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            Select your location in Chandigarh, Mohali, or Panchkula to receive an instant, transparent projection of turnkey construction costs, material specifications, and construction schedules.
          </p>
        </div>

        {/* Estimator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 bg-neutral-900/40 border border-neutral-800/80 p-6 sm:p-8">
            {/* 1. Location Selection */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-400 font-mono mb-3">
                01 / Select Location in Tricity Belt
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700/80 p-3.5 text-sm text-neutral-200 focus:outline-none focus:border-amber-200/80 font-sans"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="bg-neutral-900">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Plot Dimensions */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-400 font-mono mb-3">
                02 / Plot Size & Footprint
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {plotOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedPlot(opt.id);
                      if (opt.id !== 'custom') {
                        setCustomSqft(opt.defaultBuiltUpSqft);
                      }
                    }}
                    className={`p-3.5 text-left border transition-all ${
                      selectedPlot === opt.id
                        ? 'bg-neutral-900 border-amber-200/70 text-white shadow-md'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <p className="text-xs font-medium font-mono text-amber-200/90">{opt.label}</p>
                    <p className="text-[11px] text-neutral-400 mt-1">{opt.plotSizeDescription}</p>
                  </button>
                ))}
              </div>

              {selectedPlot === 'custom' && (
                <div className="mt-4 p-4 bg-neutral-950 border border-neutral-800">
                  <label className="block text-xs font-mono text-neutral-400 mb-2">
                    Custom Built-Up Area: <span className="text-amber-200">{customSqft.toLocaleString()} sq.ft</span>
                  </label>
                  <input
                    type="range"
                    min="4000"
                    max="35000"
                    step="500"
                    value={customSqft}
                    onChange={(e) => setCustomSqft(Number(e.target.value))}
                    className="w-full accent-amber-200 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-1">
                    <span>4,000 sq.ft</span>
                    <span>35,000 sq.ft</span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Specification Tier */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-400 font-mono mb-3">
                03 / Architectural Specification Level
              </label>
              <div className="space-y-3">
                {specTiers.map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`cursor-pointer p-4 border transition-all ${
                      selectedTier === tier.id
                        ? 'bg-neutral-900 border-amber-200/70 shadow-md'
                        : 'bg-neutral-950/60 border-neutral-800 hover:bg-neutral-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full border ${
                            selectedTier === tier.id
                              ? 'bg-amber-200 border-amber-200'
                              : 'border-neutral-600'
                          }`}
                        />
                        <h4 className="text-sm font-medium text-white">{tier.name}</h4>
                      </div>
                      <span className="font-mono text-xs text-amber-200">
                        ₹{tier.ratePerSqft.toLocaleString()}/sq.ft
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light mt-2 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Column (5 Cols) */}
          <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-700/80 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Estimated Turnkey Investment
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 border border-emerald-800/40">
                  Fixed Price Contract
                </span>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl font-light text-white tracking-tight tabular-nums">
                  {formatINR(estimatedTotal)}
                </p>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Based on ~{builtUpArea.toLocaleString()} sq.ft @ ₹{activeTier.ratePerSqft.toLocaleString()} / sq.ft
                </p>
              </div>

              {/* Scope Breakdown */}
              <div className="space-y-3 pt-2">
                <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                  Approximate Budget Allocation:
                </p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2.5 bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-400">Civil & Structural RCC (42%)</span>
                    <span className="text-neutral-200">{formatINR(civilStructureCost)}</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-400">Interiors & Imported Stone (38%)</span>
                    <span className="text-neutral-200">{formatINR(finishingAndInteriorsCost)}</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-400">MEP, Fenestration & Smart (20%)</span>
                    <span className="text-neutral-200">{formatINR(mepAutomationCost)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Timeline & Engineering Compliance */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-neutral-950 border border-neutral-800 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 uppercase">Estimated Timeline</span>
                  <p className="text-white font-medium mt-0.5">{estimatedTimelineMonths} Months</p>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase">Structural Standard</span>
                  <p className="text-amber-200 font-medium mt-0.5">Seismic Zone IV Compliant</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-[11px] text-neutral-400 leading-relaxed font-light">
                <Info className="w-3.5 h-3.5 text-amber-200 shrink-0 mt-0.5" />
                <span>
                  Estimates include architectural design, structural engineering, civil construction, finishes, and project management. Final figures are finalized after soil analysis and municipal bylaw review.
                </span>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
              <a
                href={generateWhatsAppInquiry()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 text-xs font-semibold tracking-widest uppercase bg-amber-100 hover:bg-amber-200 text-neutral-950 transition-all duration-200 hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4 text-emerald-800" />
                <span>Send Estimate to WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
