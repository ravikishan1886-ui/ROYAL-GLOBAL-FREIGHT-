import React, { useState } from 'react';
import { Globe, ArrowRight, Anchor, Plane, Truck, Compass, CheckCircle2 } from 'lucide-react';

interface InteractiveMapPreviewProps {
  onExploreNetwork?: () => void;
  onRequestQuote: () => void;
  isFullPage?: boolean;
}

export const InteractiveMapPreview: React.FC<InteractiveMapPreviewProps> = ({
  onExploreNetwork,
  onRequestQuote,
  isFullPage = false
}) => {
  const [activeGateway, setActiveGateway] = useState<string>('London');

  const gateways = [
    { name: 'London', role: 'European Maritime & Air Cargo Gateway', desc: 'Direct consolidation hub linking European ports and trans-Eurasian liner corridors.' },
    { name: 'New York', role: 'North American Atlantic Gateway', desc: 'Major East Coast container terminal handling North Atlantic & Pan-American traffic.' },
    { name: 'Cairo', role: 'Suez Canal & Middle East Crossroads', desc: 'Vital maritime nexus connecting Mediterranean and Indian Ocean shipping channels.' },
    { name: 'Beijing', role: 'Asia-Pacific Production & Rail Terminal', desc: 'Prime manufacturing consolidation center with high-volume Pacific line-haul.' },
    { name: 'Moscow', role: 'Eurasian Trans-Continental Corridor', desc: 'Intermodal freight rail linking East Asian hubs directly into regional distribution.' }
  ];

  const currentGateway = gateways.find(g => g.name === activeGateway) || gateways[0];

  return (
    <section className={`py-20 lg:py-28 bg-[#041021] text-white relative overflow-hidden ${isFullPage ? 'min-h-[85vh]' : ''}`}>
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#102D50]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102D50] text-[#DFBF7A] font-bold text-xs uppercase tracking-widest border border-[#C8A45D]/30">
            <Globe className="w-3.5 h-3.5 text-[#C8A45D]" />
            Trade Lanes & Corridors
          </div>

          <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            CONNECTING MARKETS ACROSS THE WORLD
          </h2>

          <p className="text-base text-slate-300 font-['Inter',sans-serif]">
            Coordinating reliable international cargo transport across seven global economic regions. Explore key shipping gateways and major trade lanes.
          </p>
        </div>

        {/* Global Logistics Route Map Display */}
        <div className="mt-12 space-y-6">
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#C8A45D]/40 shadow-2xl bg-[#071B36] group">
            <img
              src="/assets/aistudio/Gemini_Generated_Image_sxw0xdsxw0xdsxw0_2_90aa3eb2.jpg"
              alt="Royal Global Freight International Shipping Trade Routes and Global Corridors Map"
              className="w-full h-auto max-h-[640px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
              loading="lazy"
            />
            
            {/* Subtle Gradient Framing */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#041021]/80 via-transparent to-black/20 pointer-events-none" />

            {/* Strategic Gateway Selector Badges (Overlaid Bottom Bar) */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#071B36]/90 backdrop-blur-md border border-[#C8A45D]/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C8A45D] animate-ping" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#DFBF7A]">
                    Key Connected Gateway
                  </span>
                  <span className="text-white font-extrabold text-sm sm:text-base">
                    {currentGateway.name} Hub
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-1 sm:line-clamp-none">
                  <strong className="text-white">{currentGateway.role}:</strong> {currentGateway.desc}
                </p>
              </div>

              {/* Gateway Quick-Switch Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                {gateways.map((g) => (
                  <button
                    key={g.name}
                    onClick={() => setActiveGateway(g.name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      activeGateway === g.name
                        ? 'bg-[#C8A45D] text-[#071B36] shadow-md shadow-[#C8A45D]/30'
                        : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Operational Routing Inquiry Callout */}
          <div className="bg-[#0A2242] border border-[#C8A45D]/40 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#071B36] border border-[#C8A45D]/50 flex items-center justify-center text-[#DFBF7A] shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm text-white">Need Customized Route Planning Along These Corridors?</h4>
                <p className="text-xs text-slate-400">Our freight coordinators secure dedicated vessel allocations and optimized transit times.</p>
              </div>
            </div>

            <button
              onClick={onRequestQuote}
              className="w-full sm:w-auto px-6 py-3 bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#071B36] font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>REQUEST ROUTING QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Operational Disclaimer Note (Rule compliance) */}
        <div className="mt-8 text-xs text-slate-400 max-w-2xl mx-auto text-center">
          <span>
            Royal Global Freight coordinates international carriage across verified commercial shipping lanes and alliance agreements without claiming proprietary physical infrastructure or unverified foreign branch entities.
          </span>
        </div>

      </div>
    </section>
  );
};
