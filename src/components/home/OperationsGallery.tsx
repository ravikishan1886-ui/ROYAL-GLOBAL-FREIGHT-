import React, { useState } from 'react';
import {
  Ship,
  Anchor,
  Plane,
  Layers,
  Truck,
  Maximize2,
  X,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface OperationsGalleryProps {
  onRequestQuote: (category?: string) => void;
  onExploreServices: () => void;
}

export interface OperationalAsset {
  id: string;
  category: 'vessel' | 'port' | 'airfreight' | 'heavy-load' | 'multimodal';
  categoryLabel: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  alt: string;
  specBadge: string;
  specs: { label: string; value: string }[];
  description: string;
  keyFeatures: string[];
}

export const OPERATIONAL_ASSETS: OperationalAsset[] = [
  // 1. Ocean Vessels
  {
    id: 'asset-vessel-1',
    category: 'vessel',
    categoryLabel: 'Ocean Vessels',
    title: 'Ultra-Large Container Vessel (ULCV)',
    subtitle: 'Trans-Pacific & Asia-Europe Maritime Line Haul',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
    alt: 'Ultra-large international container vessel sailing maritime trade corridor',
    specBadge: '24,000 TEU Nominal Capacity',
    specs: [
      { label: 'Carrier Vessel Class', value: 'Megamax-24 ULCV' },
      { label: 'Deadweight Tonnage', value: '228,000 DWT' },
      { label: 'Reefer Container Plugs', value: '2,200 Active Monitoring' },
      { label: 'Trade Corridor', value: 'Asia – Northern Europe – North America' }
    ],
    description: 'Direct maritime alliance allocations securing guaranteed container slots across major international shipping arteries. Supporting FCL dry cargo, temperature-controlled refrigerated containers, and dangerous goods compliance.',
    keyFeatures: [
      'Tier-1 Global Shipping Alliance space guarantees',
      'Electronic Sea Waybills & real-time container tracking',
      'Scheduled weekly fixed-day departures'
    ]
  },
  {
    id: 'asset-vessel-2',
    category: 'vessel',
    categoryLabel: 'Ocean Vessels',
    title: 'Deep-Ocean Container Carrier Fleet',
    subtitle: 'Global Maritime Trade Lane Connectivity',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600&q=80',
    alt: 'Massive modern container cargo liner traversing international deep ocean trade lanes',
    specBadge: '18,500 TEU High-Speed Transit',
    specs: [
      { label: 'Cruising Speed', value: '21.5 Knots Economical Speed' },
      { label: 'Service Reliability', value: '99.2% Port-to-Port Adherence' },
      { label: 'Vessel Length', value: '399 Meters LOA' },
      { label: 'Draft', value: '16.0 Meters Scantling Draft' }
    ],
    description: 'High-efficiency container line-haul operations optimized for continuous transoceanic voyage schedules, minimal bunker consumption, and scheduled transshipment connections.',
    keyFeatures: [
      'Multi-port rotation with bonded transshipment hubs',
      'Direct customs EDI manifestation prior to arrival',
      'LCL cargo consolidation in primary maritime corridors'
    ]
  },

  // 2. Port Terminals
  {
    id: 'asset-port-1',
    category: 'port',
    categoryLabel: 'Port Terminals',
    title: 'Deepwater Quay & Ship-to-Shore Cranes',
    subtitle: 'Automated Container Berthing & Discharge',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
    alt: 'Automated container seaport terminal with Ship-to-Shore quay cranes',
    specBadge: '65m Outreach STS Gantry Cranes',
    specs: [
      { label: 'Berth Depth', value: '-18.5m Chart Datum' },
      { label: 'Crane Handling Speed', value: '38 Moves / Hour / Crane' },
      { label: 'Outreach Capacity', value: '24 Container Rows Across' },
      { label: 'Berth Infrastructure', value: 'Continuous Deepwater Quay' }
    ],
    description: 'Premier seaport terminal infrastructure facilitating immediate vessel berthing, high-speed dual-trolley container discharging, and rapid transfer to automated guided vehicles.',
    keyFeatures: [
      'Direct Ship-to-Shore (STS) gantry crane synchronization',
      'Pre-cleared green lane container release gates',
      '24/7 round-the-clock stevedoring and berth management'
    ]
  },
  {
    id: 'asset-port-2',
    category: 'port',
    categoryLabel: 'Port Terminals',
    title: 'Automated Container Terminal Stacking Hub',
    subtitle: 'High-Density Yard Logistics & Drayage Gateway',
    imageUrl: 'https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=1600&q=80',
    alt: 'High-density international shipping seaport with active vessel berthing and container stacks',
    specBadge: '1.8M TEU Annual Throughput Hub',
    specs: [
      { label: 'Terminal Automation', value: 'Automated Stacking Cranes (ASC)' },
      { label: 'Customs Facilities', value: 'On-Dock Bonded Container Depot' },
      { label: 'Drayage Turnaround', value: 'Under 22 Minutes Gate-in Gate-out' },
      { label: 'Security Standard', value: 'ISPS Code & C-TPAT Certified' }
    ],
    description: 'Integrated seaport container yard serving as the strategic junction between marine discharging, customs inspection bays, and intermodal inland dispatch.',
    keyFeatures: [
      'Automated stacking yard with dynamic container positioning',
      'On-dock customs examination and x-ray scanning lanes',
      'Seamless drayage interchange directly onto national highways'
    ]
  },

  // 3. Airfreight & Aviation
  {
    id: 'asset-air-1',
    category: 'airfreight',
    categoryLabel: 'Airfreight & Aviation',
    title: 'Wide-Body Freighter Aircraft Apron Loading',
    subtitle: 'Scheduled International Main-Deck Aviation Freight',
    imageUrl: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1600&q=80',
    alt: 'Modern wide-body cargo aircraft being loaded on the international airport apron',
    specBadge: '112,000 kg Payload Capacity',
    specs: [
      { label: 'Aircraft Platform', value: 'B777F / B747-8F Production Freighter' },
      { label: 'Main Deck Positions', value: '27 Standard 96x125in Pallets' },
      { label: 'Lower Hold Positions', value: '10 Standard LD3 ULD Containers' },
      { label: 'Transit Window', value: '24 – 48 Hours Airport-to-Airport' }
    ],
    description: 'Direct air cargo capacity allocations providing priority uplift for time-sensitive, high-value, and temperature-controlled commodities through premier global airport hubs.',
    keyFeatures: [
      'Scheduled main-deck cargo allocations on tier-1 global airlines',
      'Temperature-controlled active ULD containers (+2°C to +8°C / +15°C to +25°C)',
      'Immediate airport apron transfer and fast-track customs clearance'
    ]
  },
  {
    id: 'asset-air-2',
    category: 'airfreight',
    categoryLabel: 'Airfreight & Aviation',
    title: 'Express Air Cargo & Global Flight Operations',
    subtitle: 'Dedicated Flight Corridors & Priority Charters',
    imageUrl: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1600&q=80',
    alt: 'Aviation cargo freighter on airport apron prepared for international express departure',
    specBadge: 'Time-Definite International Uplift',
    specs: [
      { label: 'Airwaybill Issuance', value: 'Direct IATA Master Airwaybill (MAWB)' },
      { label: 'Flight Frequency', value: 'Daily Departures to Global Hubs' },
      { label: 'Charter Capability', value: 'Part and Full Aircraft Charter' },
      { label: 'Aviation Security', value: 'Known Consignor & Regulated Agent Compliant' }
    ],
    description: 'Expedited air cargo services engineered for critical manufacturing supply lines, urgent aerospace AOG components, pharmaceutical cold chain, and high-tech electronics.',
    keyFeatures: [
      'Priority emergency boarding status on scheduled commercial flights',
      'Hand-carry onboard courier (OBC) options for ultra-critical freight',
      'Full tarmac supervision and chain-of-custody documentation'
    ]
  },

  // 4. Heavy Load & Project Logistics
  {
    id: 'asset-heavy-1',
    category: 'heavy-load',
    categoryLabel: 'Heavy Load & Engineering',
    title: 'Harbor Heavy-Lift Gantry Cranes',
    subtitle: 'Breakbulk Vessel Hold & Industrial Rigging',
    imageUrl: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&w=1600&q=80',
    alt: 'Heavy duty harbor gantry cranes handling breakbulk project machinery',
    specBadge: '250-Ton Tandem Heavy Lift Capacity',
    specs: [
      { label: 'Lifting Infrastructure', value: 'Tandem Harbor Floating & Gantry Cranes' },
      { label: 'Max Unit Weight', value: 'Up to 350 Metric Tons Single Piece' },
      { label: 'Rigging Standard', value: 'Engineered Spreader Bars & Certified Slings' },
      { label: 'Engineering Team', value: 'Marine Surveyors & Heavy-Lift Naval Architects' }
    ],
    description: 'Turnkey project cargo engineering handling oversized industrial equipment, mining modules, electrical transformers, oilfield hardware, and specialized civil breakbulk.',
    keyFeatures: [
      'Method statements and 3D computer lifting simulations',
      'Under-hook marine insurance and lashing certificate validation',
      'Direct vessel-to-barge or vessel-to-trailer transfer coordination'
    ]
  },
  {
    id: 'asset-heavy-2',
    category: 'heavy-load',
    categoryLabel: 'Heavy Load & Engineering',
    title: 'Out-Of-Gauge Industrial Machinery & Rigging',
    subtitle: 'Specialized Modular Hydraulic Platform Transport',
    imageUrl: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1600&q=80',
    alt: 'Heavy industrial gantry and overhead crane lifting massive structural components',
    specBadge: 'Multi-Axle Modular Transporters (SPMT)',
    specs: [
      { label: 'Axle Loading', value: 'Hydraulically Equalized Axle Lines' },
      { label: 'Steering Modes', value: 'Multi-Directional & Crab Steering' },
      { label: 'Route Clearance', value: 'Civil Engineering Bridge & Overhead Surveys' },
      { label: 'Permit Oversight', value: 'National Highway Heavy Transport Permits' }
    ],
    description: 'Precision transit solutions for non-standard, heavy-gauge freight requiring specialized weight distribution, escort vehicles, and customized road clearance permits.',
    keyFeatures: [
      'Comprehensive route feasibility surveys and road obstruction clearing',
      'Police escort and municipal route scheduling coordination',
      'Turnkey factory-to-foundation installation support'
    ]
  },

  // 5. Multimodal Transport
  {
    id: 'asset-multi-1',
    category: 'multimodal',
    categoryLabel: 'Multimodal Transport',
    title: 'Intermodal Freight Rail Corridor',
    subtitle: 'Transcontinental Port-to-Inland Rail Connection',
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Transcontinental intermodal container freight train connecting seaports to inland terminals',
    specBadge: 'Double-Stack Rail Intermodal Service',
    specs: [
      { label: 'Train Capacity', value: 'Up to 240 TEU per Train Formation' },
      { label: 'Transit Efficiency', value: '70% Lower Carbon Emissions vs Highway' },
      { label: 'Inland Hub Connectivity', value: 'Direct Link to Regional Dry Ports' },
      { label: 'Tracking Telematics', value: 'Solar GPS Satellite Monitoring' }
    ],
    description: 'Seamless intermodal rail operations providing rapid bulk container transit from deepwater marine terminals to continental manufacturing heartlands and inland freight depots.',
    keyFeatures: [
      'Scheduled dedicated container block trains',
      'Bonded in-transit customs clearance bypassing highway congestion',
      'Rapid cross-dock transfer from rail wagon to distribution fleet'
    ]
  },
  {
    id: 'asset-multi-2',
    category: 'multimodal',
    categoryLabel: 'Multimodal Transport',
    title: 'Integrated Heavy Road Haulage Fleet',
    subtitle: 'Cross-Border Trucking & Port Drayage Gateway',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=80',
    alt: 'Commercial heavy freight haulage vehicle operating on international transport route',
    specBadge: 'Direct Drayage & Overland FTL/LTL',
    specs: [
      { label: 'Fleet Configuration', value: 'Tri-Axle Skeletal & Box Container Trailers' },
      { label: 'Security System', value: 'E-Locking & Real-Time Geofence Alerts' },
      { label: 'Driver Compliance', value: 'Hazardous Materials (ADR) Certified' },
      { label: 'Service Coverage', value: 'Seaport Drayage to Final Consignee Door' }
    ],
    description: 'Synchronized road freight haulage ensuring uninterrupted delivery from port gates and intermodal rail ramps directly to distribution facilities and customer doorsteps.',
    keyFeatures: [
      'GPS-tracked container drayage with instant proof of delivery (POD)',
      'Bonded customs transit corridors between bonded warehouses',
      'Overweight container chassis and generator set (genset) reefer haulage'
    ]
  }
];

export const OperationsGallery: React.FC<OperationsGalleryProps> = ({
  onRequestQuote,
  onExploreServices
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'vessel' | 'port' | 'airfreight' | 'heavy-load' | 'multimodal'>('all');
  const [selectedAsset, setSelectedAsset] = useState<OperationalAsset | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Operations', count: OPERATIONAL_ASSETS.length, icon: null },
    { id: 'vessel', label: 'Ocean Vessels', count: 2, icon: Ship },
    { id: 'port', label: 'Port Terminals', count: 2, icon: Anchor },
    { id: 'airfreight', label: 'Airfreight & Aviation', count: 2, icon: Plane },
    { id: 'heavy-load', label: 'Heavy Load & Engineering', count: 2, icon: Layers },
    { id: 'multimodal', label: 'Multimodal Transport', count: 2, icon: Truck }
  ];

  const filteredAssets = activeFilter === 'all'
    ? OPERATIONAL_ASSETS
    : OPERATIONAL_ASSETS.filter((a) => a.category === activeFilter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vessel': return <Ship className="w-4 h-4" />;
      case 'port': return <Anchor className="w-4 h-4" />;
      case 'airfreight': return <Plane className="w-4 h-4" />;
      case 'heavy-load': return <Layers className="w-4 h-4" />;
      case 'multimodal': return <Truck className="w-4 h-4" />;
      default: return <Ship className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F4F6F9] border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071B36] text-[#DFBF7A] text-xs font-bold uppercase tracking-widest border border-[#C8A45D]/40">
              <span className="w-2 h-2 rounded-full bg-[#C8A45D] animate-pulse" />
              Active Global Infrastructure
            </div>
            <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black text-[#071B36] tracking-tight uppercase">
              FLEET & OPERATIONS GALLERY
            </h2>
            <p className="text-base text-slate-600 font-['Inter',sans-serif] leading-relaxed">
              Explore active high-capacity logistics assets in motion: ocean container vessels, automated deepwater seaport terminals, priority aviation freighters, heavy-lift project engineering, and continental multimodal rail corridors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExploreServices}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-bold uppercase tracking-wider text-[#071B36] shadow-sm transition hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Services</span>
              <ExternalLink className="w-4 h-4 text-[#C8A45D]" />
            </button>
            <button
              onClick={() => onRequestQuote()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#C8A45D] to-[#DFBF7A] text-[#071B36] text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#071B36] text-white shadow-md border border-[#C8A45D]'
                    : 'bg-white text-slate-600 hover:text-[#071B36] hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#DFBF7A]' : 'text-slate-400'}`} />}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isActive ? 'bg-[#102D50] text-[#DFBF7A]' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-4">
          {filteredAssets.map((asset) => {
            return (
              <div
                key={asset.id}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Photo Container with Spec Overlays */}
                <div
                  className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#071B36] cursor-pointer"
                  onClick={() => setSelectedAsset(asset)}
                >
                  <img
                    src={asset.imageUrl}
                    alt={asset.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Subtle Directional Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#071B36]/30 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#071B36]/90 backdrop-blur-md border border-[#C8A45D]/50 text-[#DFBF7A] text-xs font-bold uppercase tracking-wide">
                      {getCategoryIcon(asset.category)}
                      <span>{asset.categoryLabel}</span>
                    </div>

                    <div className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-bold">
                      {asset.specBadge}
                    </div>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="px-4 py-2 rounded-xl bg-[#071B36]/90 backdrop-blur-md border border-[#C8A45D] text-[#DFBF7A] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl">
                      <Maximize2 className="w-4 h-4" />
                      <span>View Full Specifications</span>
                    </div>
                  </div>

                  {/* Bottom Image Headline */}
                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                    <span className="text-[#DFBF7A] text-[11px] font-bold uppercase tracking-widest block font-['Montserrat',sans-serif]">
                      {asset.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-['Montserrat',sans-serif] uppercase tracking-tight">
                      {asset.title}
                    </h3>
                  </div>
                </div>

                {/* Card Technical Specs & Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <p className="text-sm text-slate-600 leading-relaxed font-['Inter',sans-serif]">
                    {asset.description}
                  </p>

                  {/* Technical Specifications Grid */}
                  <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    {asset.specs.slice(0, 4).map((spec, sIdx) => (
                      <div key={sIdx} className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                          {spec.label}
                        </span>
                        <span className="text-xs font-extrabold text-[#071B36] font-['Montserrat',sans-serif] block truncate">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-2 flex items-center justify-between gap-4 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedAsset(asset)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071B36] hover:text-[#C8A45D] transition cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#C8A45D]" />
                      <span>Inspect Operation</span>
                    </button>

                    <button
                      onClick={() => onRequestQuote(asset.categoryLabel)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#071B36] hover:bg-[#102D50] text-[#DFBF7A] hover:text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Infrastructure Assurance */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#071B36] via-[#102D50] to-[#071B36] text-white border-2 border-[#C8A45D]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#C8A45D] text-[#071B36] flex items-center justify-center shrink-0 shadow-lg">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-['Montserrat',sans-serif] text-lg font-black uppercase text-white tracking-wide">
                TIER-1 ALLIANCE CAPACITY & REGULATORY INTEGRATION
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-['Inter',sans-serif] max-w-2xl">
                Royal Global Freight contracts high-volume space allocations with certified international ocean lines, scheduled air cargo freighters, bonded rail operators, and specialized heavy-lift carriers worldwide.
              </p>
            </div>
          </div>

          <button
            onClick={() => onRequestQuote()}
            className="px-6 py-3.5 bg-gradient-to-r from-[#C8A45D] to-[#DFBF7A] text-[#071B36] font-['Montserrat',sans-serif] font-black text-xs uppercase tracking-widest rounded-xl hover:shadow-lg transition cursor-pointer shrink-0"
          >
            REQUEST CAPACITY ALLOCATION
          </button>
        </div>

      </div>

      {/* Interactive Lightbox / Technical Inspection Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border-2 border-[#C8A45D] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedAsset(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#071B36] text-white hover:text-[#DFBF7A] flex items-center justify-center border border-[#C8A45D]/40 shadow-lg cursor-pointer transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-[#071B36]">
              <img
                src={selectedAsset.imageUrl}
                alt={selectedAsset.alt}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#071B36]/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#C8A45D] text-[#071B36] font-bold text-xs uppercase tracking-widest mb-2">
                  {selectedAsset.categoryLabel}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat',sans-serif] uppercase tracking-tight">
                  {selectedAsset.title}
                </h3>
                <p className="text-sm text-[#DFBF7A] font-semibold mt-1">
                  {selectedAsset.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#071B36]">
                  Operational Profile & Capabilities
                </h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-['Inter',sans-serif]">
                  {selectedAsset.description}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#071B36]">
                  Engineering & Operational Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedAsset.specs.map((spec, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">
                        {spec.label}
                      </span>
                      <span className="text-sm font-extrabold text-[#071B36] font-['Montserrat',sans-serif] block mt-0.5">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Operational Features */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#071B36]">
                  Standard Operating Procedures
                </h4>
                <div className="space-y-2">
                  {selectedAsset.keyFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition cursor-pointer"
                >
                  Close Inspection
                </button>

                <button
                  onClick={() => {
                    setSelectedAsset(null);
                    onRequestQuote(selectedAsset.categoryLabel);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C8A45D] to-[#DFBF7A] text-[#071B36] font-extrabold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>REQUEST QUOTE FOR THIS MODE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
