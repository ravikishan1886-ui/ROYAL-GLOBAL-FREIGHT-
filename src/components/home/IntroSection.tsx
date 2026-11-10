import React from 'react';
import { Globe2, Layers, HeartHandshake, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface IntroSectionProps {
  onLearnMore: () => void;
  onRequestQuote: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onLearnMore, onRequestQuote }) => {
  const features = [
    {
      title: 'Global Connectivity',
      description: 'Bridging major international trade corridors across Asia, Europe, the Americas, Africa, and Oceania through strategic maritime and aviation networks.',
      icon: Globe2,
      points: [
        'Strategic port-to-port connections',
        'Direct gateway coordination',
        'International trade route coverage'
      ]
    },
    {
      title: 'Professional Coordination',
      description: 'Meticulous end-to-end cargo logistics handling, regulatory customs oversight, document validation, and streamlined carrier communication.',
      icon: Layers,
      points: [
        'Rigorous documentation compliance',
        'Carrier schedule optimization',
        'Proactive milestone monitoring'
      ]
    },
    {
      title: 'Customer-Focused Solutions',
      description: 'Dedicated commercial service tailored to your precise cargo specifications, transit urgency, and international budget parameters.',
      icon: HeartHandshake,
      points: [
        'Single point of operational contact',
        'Customized transit solutions',
        'Transparent logistics communication'
      ]
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F4F6F9] relative overflow-hidden">
      {/* Decorative top border line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C8A45D]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071B36]/10 text-[#071B36] font-bold text-xs uppercase tracking-widest border border-[#C8A45D]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" />
            Corporate Overview
          </div>

          <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#071B36] tracking-tight uppercase">
            YOUR TRUSTED PARTNER IN GLOBAL LOGISTICS
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-['Inter',sans-serif]">
            Royal Global Freight is focused on simplifying international cargo movement through professional freight forwarding, shipping coordination and integrated logistics solutions. We aim to connect businesses, markets and opportunities through reliable transportation and customer-focused service.
          </p>
        </div>

        {/* 3 Premium Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-slate-200/80 hover:border-[#C8A45D] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-xl bg-[#071B36] flex items-center justify-center text-[#C8A45D] group-hover:bg-[#102D50] group-hover:scale-105 transition-all shadow-md">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="font-['Montserrat',sans-serif] text-xl font-bold text-[#071B36] tracking-wide">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-['Inter',sans-serif]">
                    {item.description}
                  </p>

                  <div className="space-y-2.5 pt-3 border-t border-slate-100">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#C8A45D] shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={onLearnMore}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071B36] group-hover:text-[#C8A45D] transition cursor-pointer"
                  >
                    <span>Learn About Our Approach</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
