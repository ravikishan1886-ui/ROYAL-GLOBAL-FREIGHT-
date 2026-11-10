import React, { useState } from 'react';
import {
  Globe,
  Anchor,
  Plane,
  Truck,
  ArrowRight,
  ShieldCheck,
  Compass,
  Layers,
  CheckCircle2,
  Ship
} from 'lucide-react';
import { InteractiveMapPreview } from '../home/InteractiveMapPreview';
import { Logo } from '../common/Logo';

interface GlobalNetworkPageProps {
  onRequestQuote: () => void;
  onExploreServices: () => void;
}

export const GlobalNetworkPage: React.FC<GlobalNetworkPageProps> = ({
  onRequestQuote,
  onExploreServices
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ocean' | 'air' | 'road'>('all');

  const tradeCorridors = [
    {
      corridor: 'Trans-Pacific Trade Lane',
      mode: 'Ocean Freight & Air Cargo',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
      gateways: 'Shanghai, Ningbo, Busan → Los Angeles, Long Beach, Seattle',
      description: 'The world\'s highest volume maritime trade artery, supporting consumer electronics, industrial manufacturing components, and automotive supplies.',
      frequency: 'Weekly scheduled alliance departures',
      transit: '14 – 18 days port-to-port'
    },
    {
      corridor: 'Asia – Europe Maritime Expressway',
      mode: 'Ocean Freight (Suez & Cape)',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      gateways: 'Singapore, Shenzhen, Port Klang → Rotterdam, Antwerp, Hamburg',
      description: 'Connecting Asian manufacturing powerhouses with Western European distribution terminals via modern ultra-large container vessels (ULCVs).',
      frequency: 'Multiple weekly alliance loops',
      transit: '24 – 32 days port-to-port'
    },
    {
      corridor: 'Transatlantic Trade Route',
      mode: 'Ocean Freight & Scheduled Air',
      image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80',
      gateways: 'Frankfurt, London Heathrow, Antwerp → New York JFK, Chicago ORD, Savannah',
      description: 'High-value trade corridor for precision instruments, pharmaceuticals, aerospace sub-assemblies, and specialized chemicals.',
      frequency: 'Daily scheduled cargo flights & weekly sea sailings',
      transit: '1 – 3 days (Air) / 9 – 12 days (Ocean)'
    },
    {
      corridor: 'Middle East Crossroads & Transshipment',
      mode: 'Multimodal Sea-Air & Overland',
      image: 'https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=800&q=80',
      gateways: 'Jebel Ali (DXB/DWC), Salalah → European & African Regional Hubs',
      description: 'Strategic intercontinental hub linking Asian production with Gulf consumption and East African gateways.',
      frequency: 'Continuous feeder & trunk connections',
      transit: 'Flexible intermodal schedules'
    },
    {
      corridor: 'Pan-American North-South Corridors',
      mode: 'Ocean Freight & Cross-Border Road',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
      gateways: 'Houston, Miami, Santos, Buenos Aires, Callao',
      description: 'Facilitating agricultural perishables, mining machinery, and energy components across the Americas.',
      frequency: 'Scheduled bi-weekly and weekly sailings',
      transit: '12 – 16 days maritime transit'
    }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#182638] animate-fadeIn">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-[#071B36] text-white overflow-hidden border-b-2 border-[#C8A45D]">
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
            <Globe className="w-3.5 h-3.5 text-[#C8A45D]" />
            Trade Corridors & Global Arteries
          </div>
          <h1 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            ROYAL GLOBAL FREIGHT NETWORK
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-['Inter',sans-serif]">
            Coordinating ocean, air, and overland transportation across seven major economic regions without single-carrier constraints.
          </p>
        </div>
      </section>

      {/* Interactive Map Component Full Page Mode */}
      <InteractiveMapPreview
        isFullPage={true}
        onRequestQuote={onRequestQuote}
      />

      {/* Deep-Dive Trade Corridors Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#071B36]">
            <span className="w-2 h-2 rounded-full bg-[#C8A45D]" />
            Strategic Shipping Arteries
          </div>
          <h2 className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#071B36] uppercase tracking-tight">
            PRIMARY INTERNATIONAL TRADE CORRIDORS
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-['Inter',sans-serif]">
            We coordinate space allocations, equipment positioning, and terminal customs release along the world's most critical commerce lanes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {tradeCorridors.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#C8A45D] transition-all shadow-sm hover:shadow-xl space-y-4 flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Corridor Image Header */}
              <div className="relative h-44 w-full overflow-hidden bg-[#071B36]">
                <img
                  src={item.image}
                  alt={item.corridor}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#071B36]/30 to-transparent opacity-85" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-bold font-mono text-[#DFBF7A] bg-[#071B36]/90 px-2.5 py-0.5 rounded border border-[#C8A45D]/40 backdrop-blur-sm">
                    CORRIDOR 0{idx + 1}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#DFBF7A] uppercase tracking-wide">
                    {item.mode}
                  </span>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-['Montserrat',sans-serif] text-lg font-bold text-[#071B36]">
                    {item.corridor}
                  </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 text-xs">
                  <p>
                    <strong className="text-[#071B36]">Gateways:</strong>{' '}
                    <span className="text-slate-600">{item.gateways}</span>
                  </p>
                  <p>
                    <strong className="text-[#071B36]">Transit Duration:</strong>{' '}
                    <span className="text-emerald-700 font-semibold">{item.transit}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <button
                  onClick={onRequestQuote}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071B36] hover:text-[#C8A45D] transition cursor-pointer"
                >
                  <span>Inquire on this Trade Lane</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      </section>

      {/* Import & Export Operations Standard */}
      <section className="py-16 bg-[#F4F6F9] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C8A45D]">
                  Operational Standards
                </span>
                <h3 className="font-['Montserrat',sans-serif] text-2xl font-extrabold text-[#071B36] uppercase">
                  IMPORT & EXPORT LOGISTICS RIGOR
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every international consignment coordinated by Royal Global Freight is backed by structured verification milestones. We align with authorized terminal handlers, bonded drayage operators, and certified customs brokers to maintain high reliability without unverified marketing claims.
                </p>
                <div className="space-y-2 pt-2">
                  {[
                    'Carrier space reservation confirmed prior to dispatch',
                    'Commercial documentation audited for HS code alignment',
                    'Direct communication with local terminal handling teams',
                    'Proactive contingency planning during adverse port conditions'
                  ].map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#C8A45D] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-[#071B36] text-white rounded-2xl border border-[#C8A45D]/40 space-y-4 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#DFBF7A]">
                  Dedicated Rate Desk
                </span>
                <h4 className="text-xl font-bold text-white">
                  Planning an international shipment along these corridors?
                </h4>
                <p className="text-xs text-slate-300">
                  Receive verified slot availability, carrier sailing dates, and customized container freight options.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onRequestQuote}
                    className="w-full sm:w-auto px-6 py-3 bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#071B36] font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                  >
                    SUBMIT ROUTING ENQUIRY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
