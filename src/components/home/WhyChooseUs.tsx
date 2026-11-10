import React from 'react';
import {
  Globe,
  Users,
  CheckCircle,
  Sliders,
  MessageSquare,
  ShieldCheck,
  Award,
  Zap
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Global Freight Solutions',
      description: 'End-to-end international freight forwarding connecting key industrial manufacturing centers and consumption markets worldwide.',
      icon: Globe
    },
    {
      title: 'Customer-Centric Approach',
      description: 'Attentive, dedicated account specialists committed to understanding your cargo nuances and meeting strict delivery deadlines.',
      icon: Users
    },
    {
      title: 'Reliable Coordination',
      description: 'Disciplined operations ensuring cargo inspection, booking execution, and customs documentation proceed without delay.',
      icon: CheckCircle
    },
    {
      title: 'Flexible Shipping Options',
      description: 'Diverse transit alternatives spanning full container loads, LCL consolidation, scheduled air cargo, and multimodal routing.',
      icon: Sliders
    },
    {
      title: 'Transparent Communication',
      description: 'Clear, timely milestone updates and honest commercial interaction with no obscured handling fees or surprises.',
      icon: MessageSquare
    },
    {
      title: 'Integrated Logistics Support',
      description: 'Holistic synchronization between ocean vessels, airline schedules, port terminals, warehousing, and inland drayage.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071B36]/10 text-[#071B36] font-bold text-xs uppercase tracking-widest border border-[#C8A45D]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" />
            Operational Distinction
          </div>

          <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#071B36] tracking-tight uppercase">
            WHY CHOOSE ROYAL GLOBAL FREIGHT
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-['Inter',sans-serif]">
            We operate with unwavering commitment to operational precision, commercial integrity, and dependable global shipping execution.
          </p>
        </div>

        {/* 6 Feature Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#F4F6F9] rounded-2xl p-8 border border-slate-200/80 hover:border-[#C8A45D] hover:bg-white shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#071B36] text-[#C8A45D] flex items-center justify-center shrink-0 group-hover:bg-[#C8A45D] group-hover:text-[#071B36] transition-colors shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-['Montserrat',sans-serif] text-lg font-bold text-[#071B36] group-hover:text-[#071B36]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Inter',sans-serif]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
