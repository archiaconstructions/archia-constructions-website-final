import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Clock, Phone, Send, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO, SERVICE_AREAS } from '../data/content';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'Mohali',
    scope: 'Turnkey Luxury Villa Construction',
    plotArea: '1 Kanal (500 sq.yd)',
    notes: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMessage('');
    setFormSubmitted(true);

    // Build prefilled WhatsApp message
    const msg = `New Website Inquiry for Archia Constructions:
• Name: ${formData.name}
• Phone: ${formData.phone}
• Location: ${formData.location}
• Scope: ${formData.scope}
• Plot Area: ${formData.plotArea}
• Vision Notes: ${formData.notes || 'None provided'}`;

    const waUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  const directWhatsAppUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Archia Constructions, I would like to schedule a private consultation for a luxury residential construction project in the Chandigarh Tricity.'
  )}`;

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#090a0c] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Top Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-200/90 font-mono mb-3">
            <span>Private Consultations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight mb-6">
            Begin Your <br />
            <span className="font-editorial italic font-normal text-amber-100">Architectural Legacy.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Whether you hold a plot in Sector 9 Chandigarh, Wave Estate Mohali, MDC Panchkula, or Eco City New Chandigarh, our chief architects and structural partners are ready to evaluate your vision.
          </p>
        </div>

        {/* 2-Column Split: Studio Contact & Interactive Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Studio Information & Direct WhatsApp CTA */}
          <div className="lg:col-span-5 space-y-8">
            {/* Primary WhatsApp Card */}
            <div className="p-8 bg-neutral-900 border border-neutral-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
                <MessageCircle className="w-4 h-4" />
                <span>Instant Direct Channel</span>
              </div>
              <h3 className="text-2xl font-light text-white tracking-tight mb-3">
                WhatsApp Concierge
              </h3>
              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                Receive direct portfolio lookbooks, structural specification sheets, and set up a site visit directly with our founding team.
              </p>
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full py-4 text-xs font-semibold tracking-wider uppercase bg-amber-100 hover:bg-amber-200 text-neutral-950 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-800" />
                <span>Message on WhatsApp (+91 98765 43210)</span>
              </a>
            </div>

            {/* Studio Address & Details */}
            <div className="space-y-6 p-8 bg-neutral-900/30 border border-neutral-800/80 text-xs font-mono text-neutral-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
                <div>
                  <p className="uppercase tracking-widest text-neutral-400">Design Studio & Offices</p>
                  <p className="text-neutral-200 mt-1 font-sans text-sm leading-relaxed">
                    {COMPANY_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
                <div>
                  <p className="uppercase tracking-widest text-neutral-400">Consultation Hours</p>
                  <p className="text-neutral-200 mt-1 font-sans text-sm">
                    Monday – Saturday: 9:30 AM – 7:00 PM <br />
                    <span className="text-neutral-400 text-xs">Sunday by prior appointment only</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
                <div>
                  <p className="uppercase tracking-widest text-neutral-400">Direct Inquiries</p>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-amber-200 hover:underline mt-1 block font-sans text-sm"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Service Coverage Badges */}
            <div className="p-6 bg-neutral-950 border border-neutral-800">
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-3">
                Active Construction Footprint:
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-300">
                {SERVICE_AREAS.map((a) => (
                  <span
                    key={a.name}
                    className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300"
                  >
                    {a.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Working Consultation Form */}
          <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800 p-8 sm:p-10">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-light text-white tracking-tight">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. Your project parameters have been forwarded. Our senior project architect will contact you within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 text-xs font-mono tracking-widest uppercase border border-neutral-700 text-neutral-300 hover:text-white hover:border-white transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-light text-white tracking-tight mb-1">
                    Schedule an Architectural Consultation
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Fill in your project requirements below to receive structural recommendations.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-950/40 border border-red-800 text-red-200 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-400 font-mono mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Harpreet Singh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-neutral-200 focus:outline-none focus:border-amber-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-400 font-mono mb-2">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-neutral-200 focus:outline-none focus:border-amber-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-400 font-mono mb-2">
                      Project Location
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-neutral-200 focus:outline-none focus:border-amber-200"
                    >
                      <option value="Mohali">Mohali (Wave Estate / Sec 82 / Aerocity)</option>
                      <option value="Chandigarh">Chandigarh (Heritage & Luxury Sectors)</option>
                      <option value="Panchkula">Panchkula (MDC / Sector 2-6)</option>
                      <option value="New Chandigarh">New Chandigarh (Eco City / Omaxe)</option>
                      <option value="Kharar">Kharar (Estates & Outskirts)</option>
                      <option value="Zirakpur">Zirakpur (PR7 / VIP Road)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-400 font-mono mb-2">
                      Plot Dimensions / Area
                    </label>
                    <select
                      value={formData.plotArea}
                      onChange={(e) => setFormData({ ...formData, plotArea: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-neutral-200 focus:outline-none focus:border-amber-200"
                    >
                      <option value="10 Marla (250 sq.yd)">10 Marla (approx. 250 sq.yd)</option>
                      <option value="1 Kanal (500 sq.yd)">1 Kanal (approx. 500 sq.yd)</option>
                      <option value="2 Kanal (1,000 sq.yd)">2 Kanal (approx. 1,000 sq.yd)</option>
                      <option value="Farmhouse / Acreage">Farmhouse / Large Acreage</option>
                      <option value="Penthouse / Interior Fitout">Penthouse / Interior Fitout</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-mono mb-2">
                    Primary Scope Required
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-neutral-200 focus:outline-none focus:border-amber-200"
                  >
                    <option value="Turnkey Luxury Villa Construction">Turnkey Luxury Villa Construction (Civil + Interiors)</option>
                    <option value="Architectural Planning & Municipal Approvals">Architectural Planning & Municipal Approvals Only</option>
                    <option value="High-End Interior Architecture & Joinery">High-End Interior Architecture & Joinery</option>
                    <option value="Structural Engineering & RCC Framework">Structural Engineering & RCC Framework</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-400 font-mono mb-2">
                    Architectural Vision & Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your spatial aspirations: double-height foyer, basement home cinema, cantilevered master terrace, timeline preferences..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm text-neutral-200 focus:outline-none focus:border-amber-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-xs font-semibold tracking-widest uppercase bg-amber-100 hover:bg-amber-200 text-neutral-950 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry & Open WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
