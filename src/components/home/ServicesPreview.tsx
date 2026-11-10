import React from 'react';
import {
  Ship,
  Plane,
  Truck,
  FileCheck,
  Warehouse,
  Cog,
  Boxes,
  Network,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { INITIAL_SERVICES } from '../../services/storage';

interface ServicesPreviewProps {
  onSelectService: (serviceId: string) => void;
  onViewAllServices: () => void;
  onRequestQuote: () => void;
}

export const ServicesPreview: React.FC<ServicesPreviewProps> = ({
  onSelectService,
  onViewAllServices,
  onRequestQuote
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ship': return <Ship className="w-6 h-6" />;
      case 'Plane': return <Plane className="w-6 h-6" />;
      case 'Truck': return <Truck className="w-6 h-6" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6" />;
      case 'Warehouse': return <Warehouse className="w-6 h-6" />;
      case 'Cog': return <Cog className="w-6 h-6" />;
      case 'Boxes': return <Boxes className="w-6 h-6" />;
      case 'Network': return <Network className="w-6 h-6" />;
      default: return <Ship className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#071B36] text-white relative">
      {/* Decorative background grid */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#C8A45D 1px, transparent 1px), linear-gradient(90deg, #C8A45D 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#C8A45D]/20">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102D50] text-[#DFBF7A] font-bold text-xs uppercase tracking-widest border border-[#C8A45D]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" />
              Integrated Freight Forwarding
            </div>
            <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              OUR LOGISTICS SOLUTIONS
            </h2>
            <p className="text-base text-slate-300 font-['Inter',sans-serif]">
              Engineered for efficiency, resilience, and global scale. Explore our specialized logistics and transportation capabilities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onViewAllServices}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-[#C8A45D]/40 text-xs font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View All 8 Services</span>
              <ChevronRight className="w-4 h-4 text-[#C8A45D]" />
            </button>
          </div>
        </div>

        {/* 8 Premium Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {INITIAL_SERVICES.map((service, index) => {
            return (
              <div
                key={service.id}
                className="group relative bg-[#0A2242] border border-slate-700/60 hover:border-[#C8A45D] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Service Card Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2242] via-[#0A2242]/40 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-[#071B36] border border-[#C8A45D]/60 flex items-center justify-center text-[#DFBF7A] shadow-lg group-hover:bg-[#C8A45D] group-hover:text-[#071B36] transition-colors">
                    {getIcon(service.iconName)}
                  </div>

                  <span className="absolute top-3 right-3 text-[10px] font-mono font-bold text-slate-300 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                    0{index + 1}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-['Montserrat',sans-serif] text-lg font-bold text-white group-hover:text-[#DFBF7A] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-['Inter',sans-serif] line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DFBF7A] group-hover:text-white transition cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                    <button
                      onClick={onRequestQuote}
                      className="text-[10px] uppercase font-bold text-slate-400 hover:text-[#C8A45D] transition"
                    >
                      Quote
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Trigger */}
        <div className="mt-14 p-6 rounded-2xl bg-[#102D50] border border-[#C8A45D]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-white">Require specialized project cargo or multimodal routing?</h4>
            <p className="text-xs text-slate-300">Our logistics architects evaluate oversize dimensions, routes, and vessel space.</p>
          </div>
          <button
            onClick={onRequestQuote}
            className="px-6 py-3 bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#071B36] font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shrink-0"
          >
            REQUEST BESPOKE QUOTATION
          </button>
        </div>

      </div>
    </section>
  );
};
