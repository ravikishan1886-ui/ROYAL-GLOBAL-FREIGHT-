import React, { useState } from 'react';
import { Globe, Compass, ArrowRight, Anchor, Plane, Truck, Info } from 'lucide-react';

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
  const [activeRegion, setActiveRegion] = useState<string>('Asia');
  const [activeMode, setActiveMode] = useState<'all' | 'ocean' | 'air' | 'road'>('all');

  const regions = [
    {
      name: 'Asia',
      hubs: 'Shanghai, Singapore, Busan, Hong Kong, Tokyo',
      corridors: 'Trans-Pacific & Asia-Europe Maritime Corridors',
      stats: 'Major Container Manufacturing & Electronics Export Lanes',
      x: 740,
      y: 210,
    },
    {
      name: 'Europe',
      hubs: 'Rotterdam, Antwerp, Hamburg, Frankfurt (Air Cargo), Felixstowe',
      corridors: 'North Sea & Mediterranean Gateway Logistics',
      stats: 'Industrial Machinery, Chemicals & High-Tech Components',
      x: 500,
      y: 160,
    },
    {
      name: 'Middle East',
      hubs: 'Jebel Ali (Dubai), Port of Salalah, King Abdullah Port',
      corridors: 'East-West Maritime Crossroads & Air Cargo Transshipment',
      stats: 'Intercontinental Consolidation & Multimodal Staging',
      x: 590,
      y: 230,
    },
    {
      name: 'North America',
      hubs: 'Los Angeles/Long Beach, New York/New Jersey, Chicago, Savannah',
      corridors: 'Trans-Pacific Eastbound & Transatlantic Westbound',
      stats: 'Consumer Goods, Automotive & Intermodal Inland Rail',
      x: 230,
      y: 180,
    },
    {
      name: 'South America',
      hubs: 'Santos, Buenos Aires, Callao, Cartagena',
      corridors: 'Pan-American Coastal & Transatlantic South Corridors',
      stats: 'Commodities, Agricultural Produce & Mineral Freight',
      x: 320,
      y: 360,
    },
    {
      name: 'Africa',
      hubs: 'Durban, Tanger Med, Mombasa, Port Said',
      corridors: 'Cape Route & Mediterranean-Red Sea Arteries',
      stats: 'Raw Materials, Infrastructure Cargo & Consumer Inflow',
      x: 520,
      y: 300,
    },
    {
      name: 'Oceania',
      hubs: 'Sydney, Melbourne, Auckland, Brisbane',
      corridors: 'Australasian Maritime feeder & Trans-Tasman corridors',
      stats: 'Specialized Dry Bulk, Reefer Foods & General Merchandise',
      x: 820,
      y: 390,
    }
  ];

  const currentRegionData = regions.find(r => r.name === activeRegion) || regions[0];

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

        {/* Transport Mode Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-8">
          {[
            { id: 'all', label: 'All Global Corridors', icon: Globe },
            { id: 'ocean', label: 'Ocean Freight Lanes', icon: Anchor },
            { id: 'air', label: 'Air Cargo Corridors', icon: Plane },
            { id: 'road', label: 'Inland Haulage Routes', icon: Truck },
          ].map((mode) => {
            const Icon = mode.icon;
            const isSelected = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#C8A45D] text-[#071B36] shadow-md shadow-[#C8A45D]/20'
                    : 'bg-[#071B36] text-slate-300 hover:text-white border border-slate-700/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Region Selector Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {regions.map((reg) => {
            const isSelected = activeRegion === reg.name;
            return (
              <button
                key={reg.name}
                onClick={() => setActiveRegion(reg.name)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#DFBF7A] text-[#071B36] font-bold ring-2 ring-[#C8A45D]'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                {reg.name}
              </button>
            );
          })}
        </div>

        {/* World Map Graphical Visualization */}
        <div className="mt-10 relative bg-[#071B36]/90 border border-[#C8A45D]/30 rounded-2xl p-4 sm:p-8 shadow-2xl backdrop-blur-md overflow-hidden">
          
          <div className="relative w-full aspect-[16/8] min-h-[340px] max-h-[560px]">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gradient for Shipping Lines */}
                <linearGradient id="routeGold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C8A45D" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#DFBF7A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#C8A45D" stopOpacity="0.8" />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* World Grid Lines */}
              <line x1="0" y1="125" x2="1000" y2="125" stroke="#102D50" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#102D50" strokeWidth="0.8" />
              <line x1="0" y1="375" x2="1000" y2="375" stroke="#102D50" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="250" y1="0" x2="250" y2="500" stroke="#102D50" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="500" y1="0" x2="500" y2="500" stroke="#102D50" strokeWidth="0.8" />
              <line x1="750" y1="0" x2="750" y2="500" stroke="#102D50" strokeWidth="0.5" strokeDasharray="4 4" />

              {/* Simplified Stylized Continents Outlines */}
              {/* North America */}
              <path
                d="M120 90 L240 80 L300 130 L260 210 L220 220 L160 170 Z"
                fill="#0A2242"
                stroke="#173E6D"
                strokeWidth="1.2"
              />
              {/* South America */}
              <path
                d="M260 250 L340 280 L350 370 L300 450 L270 380 L250 290 Z"
                fill="#0A2242"
                stroke="#173E6D"
                strokeWidth="1.2"
              />
              {/* Europe */}
              <path
                d="M450 110 L540 100 L560 170 L480 190 L440 160 Z"
                fill="#0A2242"
                stroke="#173E6D"
                strokeWidth="1.2"
              />
              {/* Africa */}
              <path
                d="M460 210 L560 220 L580 320 L520 420 L470 350 L450 260 Z"
                fill="#0A2242"
                stroke="#173E6D"
                strokeWidth="1.2"
              />
              {/* Asia */}
              <path
                d="M570 90 L850 80 L880 170 L800 280 L680 280 L590 200 Z"
                fill="#0A2242"
                stroke="#173E6D"
                strokeWidth="1.2"
              />
              {/* Oceania / Australia */}
              <path
                d="M770 340 L880 330 L870 420 L780 430 Z"
                fill="#0A2242"
                stroke="#173E6D"
                strokeWidth="1.2"
              />

              {/* Major Maritime & Air Trade Corridors (Animated Curved Arcs) */}
              {/* Trans-Pacific Lane (Asia to NA West Coast) */}
              {(activeMode === 'all' || activeMode === 'ocean') && (
                <path
                  d="M740 210 Q980 90 230 180"
                  stroke="url(#routeGold)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              )}

              {/* Asia-Europe Maritime Corridor (via Suez) */}
              {(activeMode === 'all' || activeMode === 'ocean') && (
                <path
                  d="M740 210 Q660 270 590 230 Q540 200 500 160"
                  stroke="#C8A45D"
                  strokeWidth="2.2"
                  strokeDasharray="5 3"
                />
              )}

              {/* Transatlantic Corridor (Europe to NA East Coast) */}
              {(activeMode === 'all' || activeMode === 'ocean' || activeMode === 'air') && (
                <path
                  d="M500 160 Q380 120 250 180"
                  stroke="#DFBF7A"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              )}

              {/* Europe - South America */}
              {(activeMode === 'all' || activeMode === 'ocean') && (
                <path
                  d="M500 160 Q420 260 320 360"
                  stroke="#C8A45D"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  strokeOpacity="0.7"
                />
              )}

              {/* Asia - Oceania Corridor */}
              {(activeMode === 'all' || activeMode === 'ocean') && (
                <path
                  d="M740 210 Q780 280 820 390"
                  stroke="#C8A45D"
                  strokeWidth="1.8"
                  strokeDasharray="5 3"
                />
              )}

              {/* Asia - Middle East - Africa */}
              {(activeMode === 'all' || activeMode === 'air' || activeMode === 'ocean') && (
                <path
                  d="M740 210 Q620 220 520 300"
                  stroke="#DFBF7A"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.75"
                />
              )}

              {/* North America - South America */}
              {(activeMode === 'all' || activeMode === 'road' || activeMode === 'ocean') && (
                <path
                  d="M230 180 Q270 270 320 360"
                  stroke="#C8A45D"
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                  strokeOpacity="0.7"
                />
              )}

              {/* Interactive Region Coordinate Nodes */}
              {regions.map((reg) => {
                const isSelected = activeRegion === reg.name;
                return (
                  <g
                    key={reg.name}
                    className="cursor-pointer group"
                    onClick={() => setActiveRegion(reg.name)}
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle
                        cx={reg.x}
                        cy={reg.y}
                        r="18"
                        stroke="#C8A45D"
                        strokeWidth="1.5"
                        fill="#C8A45D"
                        fillOpacity="0.2"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={reg.x}
                      cy={reg.y}
                      r={isSelected ? 8 : 6}
                      fill={isSelected ? '#DFBF7A' : '#C8A45D'}
                      stroke="#071B36"
                      strokeWidth="2"
                      filter="url(#glow)"
                    />
                    <text
                      x={reg.x}
                      y={reg.y - 12}
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#C8A45D'}
                      fontSize={isSelected ? '12' : '10'}
                      fontWeight="bold"
                      fontFamily="Montserrat, sans-serif"
                      letterSpacing="1"
                    >
                      {reg.name.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Region Detail Card Overlay */}
          <div className="mt-6 bg-[#0A2242] border border-[#C8A45D]/40 rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#C8A45D] text-[#071B36]">
                  Selected Region
                </span>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {currentRegionData.name} Trade Corridors
                </h3>
              </div>
              <p className="text-xs text-slate-300">
                <strong className="text-[#DFBF7A]">Key Shipping Gateways & Hubs:</strong> {currentRegionData.hubs}
              </p>
              <p className="text-xs text-slate-400">
                <strong className="text-slate-200">Dominant Cargo Flows:</strong> {currentRegionData.stats}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onRequestQuote}
                className="px-6 py-2.5 bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#071B36] font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                Inquire on this Lane
              </button>
            </div>
          </div>

        </div>

        {/* Operational Disclaimer Note (Rule compliance) */}
        <div className="mt-6 flex items-start gap-2.5 text-xs text-slate-400 max-w-2xl mx-auto text-center justify-center">
          <Info className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
          <span>
            Royal Global Freight coordinates international carriage across verified commercial shipping lanes and alliance agreements without claiming proprietary physical infrastructure or unverified foreign branch entities.
          </span>
        </div>

      </div>
    </section>
  );
};
