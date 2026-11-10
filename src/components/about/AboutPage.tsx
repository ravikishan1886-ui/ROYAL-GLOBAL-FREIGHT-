import React from 'react';
import {
  Compass,
  Target,
  Eye,
  Shield,
  CheckCircle,
  Award,
  Layers,
  ArrowRight,
  Anchor,
  Globe2,
  Ship,
  Plane,
  Truck
} from 'lucide-react';
import { CompanyInfo } from '../../types';
import { Logo } from '../common/Logo';

interface AboutPageProps {
  onRequestQuote: () => void;
  onExploreServices: () => void;
  companyInfo: CompanyInfo;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onRequestQuote,
  onExploreServices,
  companyInfo
}) => {
  const coreValues = [
    {
      name: 'Integrity',
      desc: 'Conducting every shipment negotiation, customs declaration, and partner interaction with uncompromising moral and professional standards.'
    },
    {
      name: 'Reliability',
      desc: 'Delivering consistent, dependable freight execution that clients and international trading houses can stake their operational timelines upon.'
    },
    {
      name: 'Transparency',
      desc: 'Maintaining honest, upfront communication regarding vessel schedules, container allocations, port conditions, and freight fee structures.'
    },
    {
      name: 'Professionalism',
      desc: 'Employing rigorous industry documentation methods, adhering to international trade regulations, and delivering courteous customer service.'
    },
    {
      name: 'Customer Commitment',
      desc: 'Treating client cargo with individual attention, designing optimal routing alternatives, and actively resolving logistical bottlenecks.'
    },
    {
      name: 'Continuous Improvement',
      desc: 'Evolving operational workflows, adopting modern logistics tracking systems, and refining freight forwarding practices to serve global commerce.'
    }
  ];

  const approaches = [
    {
      title: 'Carrier Neutrality & Strategic Alliances',
      desc: 'We collaborate with premier ocean alliances and international air carriers to secure optimal transit times and pricing flexibility without single-carrier dependency.'
    },
    {
      title: 'Meticulous Documentation & Compliance',
      desc: 'International shipping demands exact commercial invoices, packing lists, certificates of origin, and import filings to avert costly port detentions.'
    },
    {
      title: 'Proactive Milestone Communication',
      desc: 'Our coordination team tracks critical checkpoints from origin factory gate to destination terminal, providing timely milestone transparency.'
    }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#182638] animate-fadeIn">
      
      {/* Header Banner */}
      <section className="relative py-20 lg:py-28 bg-[#071B36] text-white overflow-hidden border-b-2 border-[#C8A45D]">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C8A45D 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 text-center space-y-4">
          <div className="flex justify-center pb-1">
            <Logo variant="horizontal" theme="dark" size="md" withTagline={true} />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102D50] text-[#DFBF7A] text-xs font-bold uppercase tracking-widest border border-[#C8A45D]/40">
            <Anchor className="w-3.5 h-3.5 text-[#C8A45D]" />
            Corporate Identity & Principles
          </div>
          <h1 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            ABOUT ROYAL GLOBAL FREIGHT
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-['Inter',sans-serif]">
            Focused on simplifying international cargo movement through professional freight forwarding, shipping coordination, and integrated logistics solutions.
          </p>
        </div>
      </section>

      {/* Company Overview & Who We Are */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#071B36]">
              <span className="w-2 h-2 rounded-full bg-[#C8A45D]" />
              Who We Are
            </div>
            <h2 className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#071B36] tracking-tight uppercase">
              A Dedicated Freight Forwarding Partner for Global Commerce
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed font-['Inter',sans-serif] text-base">
              <p>
                Royal Global Freight is an international freight forwarding and shipping coordination enterprise established to address the critical logistical demands of modern businesses. Operating at the intersection of ocean shipping, air transport, overland trucking, and multimodal logistics, we streamline cross-border goods movement.
              </p>
              <p>
                Our operational philosophy is built on clarity, accountability, and disciplined communication. Rather than overpromising, we dedicate ourselves to thorough route planning, accurate customs documentation coordination, and proactive cargo tracking across primary international shipping lanes.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onRequestQuote}
                className="px-6 py-3 bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#071B36] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md shadow-[#C8A45D]/20 cursor-pointer"
              >
                REQUEST A QUOTE
              </button>
              <button
                onClick={onExploreServices}
                className="px-6 py-3 bg-[#071B36] hover:bg-[#102D50] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                OUR SERVICES
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C8A45D]/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1000&q=80"
                alt="International cargo logistics coordination"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#071B36]/90 backdrop-blur-md rounded-xl border border-[#C8A45D]/40">
                <span className="text-xs font-bold text-[#DFBF7A] uppercase tracking-wider block">
                  Royal Global Freight
                </span>
                <p className="text-sm font-semibold text-white mt-1">
                  "Connecting Businesses. Moving the World."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Dual Cards */}
      <section className="py-16 bg-[#F4F6F9] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl border-2 border-[#071B36]/10 shadow-md space-y-4 relative overflow-hidden group hover:border-[#C8A45D] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#071B36] text-[#C8A45D] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-['Montserrat',sans-serif] text-xl font-extrabold text-[#071B36] uppercase tracking-wide">
                OUR MISSION
              </h3>
              <p className="text-base text-slate-700 leading-relaxed font-serif italic border-l-4 border-[#C8A45D] pl-4">
                "To simplify global cargo movement through coordinated freight forwarding and customer-focused logistics solutions."
              </p>
              <p className="text-xs text-slate-500 pt-2 font-['Inter',sans-serif]">
                Ensuring that every cargo owner, manufacturer, and distributor receives clear, dependable shipping pathways across global trade networks.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-2xl border-2 border-[#071B36]/10 shadow-md space-y-4 relative overflow-hidden group hover:border-[#C8A45D] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#071B36] text-[#C8A45D] flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-['Montserrat',sans-serif] text-xl font-extrabold text-[#071B36] uppercase tracking-wide">
                OUR VISION
              </h3>
              <p className="text-base text-slate-700 leading-relaxed font-serif italic border-l-4 border-[#C8A45D] pl-4">
                "To build a trusted global logistics brand connecting businesses and markets through efficient transportation solutions."
              </p>
              <p className="text-xs text-slate-500 pt-2 font-['Inter',sans-serif]">
                Setting the benchmark for royal precision, professional responsibility, and streamlined international freight orchestration.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values (6 Values) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071B36]/10 text-[#071B36] text-xs font-bold uppercase tracking-widest border border-[#C8A45D]/40">
            <Shield className="w-3.5 h-3.5 text-[#C8A45D]" />
            Foundational Tenets
          </div>
          <h2 className="font-['Montserrat',sans-serif] text-3xl font-extrabold text-[#071B36] uppercase tracking-tight">
            OUR CORE VALUES
          </h2>
          <p className="text-sm text-slate-600 font-['Inter',sans-serif]">
            The uncompromised principles directing our freight decisions, client relations, and operational integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#F4F6F9] rounded-2xl border border-slate-200 hover:border-[#C8A45D] hover:bg-white transition-all shadow-sm group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#071B36] text-[#C8A45D] flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h4 className="font-['Montserrat',sans-serif] text-base font-bold text-[#071B36]">
                  {val.name}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Fleet & Infrastructure Visual Gallery */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 pb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071B36] text-[#DFBF7A] text-xs font-bold uppercase tracking-widest border border-[#C8A45D]/40">
            <Anchor className="w-3.5 h-3.5 text-[#C8A45D]" />
            Global Operational Footprint
          </div>
          <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl font-black text-[#071B36] uppercase tracking-tight">
            FLEET REACH & INFRASTRUCTURE COORDINATION
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-['Inter',sans-serif]">
            Through high-tier carrier space commitments and automated terminal integrations, we orchestrate global transport across ocean liners, deepwater quays, airfreight freighters, and transcontinental multimodal networks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Ocean Vessel */}
          <div className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden bg-[#071B36]">
              <img
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80"
                alt="Trans-oceanic container vessel fleet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#071B36]/30 to-transparent opacity-80" />
              <div className="absolute top-3 left-3 p-2 rounded-lg bg-[#071B36]/90 border border-[#C8A45D]/40 text-[#DFBF7A]">
                <Ship className="w-4 h-4" />
              </div>
              <span className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white uppercase font-['Montserrat',sans-serif]">
                Global Ocean Vessels
              </span>
            </div>
            <div className="p-4 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#C8A45D] block">24,000 TEU Space Allotments</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct space commitments with global ocean carrier alliances for FCL and regular LCL consolidation.
              </p>
            </div>
          </div>

          {/* Card 2: Port Terminal */}
          <div className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden bg-[#071B36]">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                alt="Deepwater container seaport terminal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#071B36]/30 to-transparent opacity-80" />
              <div className="absolute top-3 left-3 p-2 rounded-lg bg-[#071B36]/90 border border-[#C8A45D]/40 text-[#DFBF7A]">
                <Anchor className="w-4 h-4" />
              </div>
              <span className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white uppercase font-['Montserrat',sans-serif]">
                Deepwater Port Terminals
              </span>
            </div>
            <div className="p-4 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#C8A45D] block">Automated Quay STS Cranes</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Synchronized berth discharging, fast-turnaround stevedoring, and priority on-dock customs releases.
              </p>
            </div>
          </div>

          {/* Card 3: Airfreight */}
          <div className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden bg-[#071B36]">
              <img
                src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80"
                alt="International air cargo freighter loading"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#071B36]/30 to-transparent opacity-80" />
              <div className="absolute top-3 left-3 p-2 rounded-lg bg-[#071B36]/90 border border-[#C8A45D]/40 text-[#DFBF7A]">
                <Plane className="w-4 h-4" />
              </div>
              <span className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white uppercase font-['Montserrat',sans-serif]">
                Aviation Airfreight
              </span>
            </div>
            <div className="p-4 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#C8A45D] block">Wide-Body Main Deck Freighters</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guaranteed airport apron space and IATA airwaybills for time-sensitive cross-continental transit.
              </p>
            </div>
          </div>

          {/* Card 4: Heavy Load & Multimodal */}
          <div className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden bg-[#071B36]">
              <img
                src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80"
                alt="Transcontinental multimodal rail and heavy haulage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#071B36]/30 to-transparent opacity-80" />
              <div className="absolute top-3 left-3 p-2 rounded-lg bg-[#071B36]/90 border border-[#C8A45D]/40 text-[#DFBF7A]">
                <Truck className="w-4 h-4" />
              </div>
              <span className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white uppercase font-['Montserrat',sans-serif]">
                Heavy Load & Multimodal
              </span>
            </div>
            <div className="p-4 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#C8A45D] block">Rail Intermodal & SPMT Rigging</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Out-of-gauge heavy industrial cargo coordination and intermodal double-stack container corridors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach to Global Logistics */}
      <section className="py-20 bg-[#071B36] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DFBF7A]">
              Operational Framework
            </span>
            <h2 className="font-['Montserrat',sans-serif] text-3xl font-extrabold uppercase tracking-tight text-white">
              OUR APPROACH TO GLOBAL LOGISTICS
            </h2>
            <p className="text-sm text-slate-300">
              International transport requires systematic coordination, proactive risk management, and rigorous compliance at every stage of the trade corridor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approaches.map((app, idx) => (
              <div
                key={idx}
                className="bg-[#0A2242] p-6 rounded-2xl border border-slate-700/80 space-y-4 hover:border-[#C8A45D] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#071B36] border border-[#C8A45D]/40 flex items-center justify-center text-[#DFBF7A]">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-['Montserrat',sans-serif] text-base font-bold text-white">
                  {app.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {app.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-bold text-white">Ready to discuss your supply chain requirements?</h4>
              <p className="text-xs text-slate-400">Our customer desk is prepared to evaluate your cargo origin and destination.</p>
            </div>
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#071B36] font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shrink-0"
            >
              REQUEST A FREIGHT QUOTE
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
