import React from 'react';
import { COMPANY_INFO } from '../data/content';

const faqs = [
  {
    question: 'Which areas does Milaan Constructions serve?',
    answer: 'Milaan Constructions serves the Chandigarh Capital Region, including Mohali, Chandigarh, Panchkula, New Chandigarh, Kharar, and Zirakpur. Contact the team to discuss your plot location and project requirements.',
  },
  {
    question: 'What construction and design services are available?',
    answer: 'The website presents residential construction, architectural planning, civil execution, turnkey construction, and interior design services. The exact scope can be discussed for each home or plot.',
  },
  {
    question: 'Can I discuss a new house or villa project before deciding on a package?',
    answer: 'Yes. Use the website enquiry form or WhatsApp link to share your location, plot area, intended scope, and questions. The team can then discuss the next steps with you.',
  },
  {
    question: 'How do I request a construction consultation?',
    answer: 'Submit the enquiry form in the contact section or use the direct WhatsApp enquiry link. Include your name, phone number, project location, plot area, and a short description of what you want to build.',
  },
  {
    question: 'Does the website provide a construction cost estimate?',
    answer: 'The site includes an interactive cost estimator to help explore project scope. Treat any estimate as an initial guide; confirm specifications, inclusions, site conditions, and final pricing directly with the construction team.',
  },
];

export const FAQSection: React.FC = () => (
  <section id="faqs" aria-labelledby="faq-heading" className="relative py-20 md:py-28 bg-[#0b0c0e] border-t border-neutral-800/80">
    <div className="max-w-5xl mx-auto px-6 md:px-10">
      <div className="mb-10 md:mb-14">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-200/90 font-mono mb-3">Project Questions</p>
        <h2 id="faq-heading" className="text-3xl sm:text-5xl font-light tracking-tight text-white">
          Frequently Asked <span className="font-editorial italic text-amber-100">Questions.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-sm md:text-base text-neutral-400 leading-relaxed">
          Useful information for homeowners planning a residential construction or interior design project across the Chandigarh Tricity.
        </p>
      </div>
      <div className="divide-y divide-neutral-800 border-y border-neutral-800">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-5 md:py-6">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-6 text-base md:text-lg text-neutral-100 font-light [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span aria-hidden="true" className="text-amber-200 text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pt-4 pr-8 max-w-3xl text-sm md:text-base leading-relaxed text-neutral-400">{faq.answer}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-xs text-neutral-500">
        Need a project-specific answer? Contact {COMPANY_INFO.name} directly by WhatsApp or through the enquiry form.
      </p>
    </div>
  </section>
);
