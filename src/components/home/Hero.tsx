import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Ship,
  Plane,
  Truck,
  Anchor,
  Layers,
  Boxes
} from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onRequestQuote: () => void;
  onOpenTracking: () => void;
}

interface Slide {
  id: string;
  category: string;
  tabLabel: string;
  image: string;
  alt: string;
  headlineFirst: string;
  headlineSecond: string;
  subtext: string;
  operationalStat: string;
  icon: any;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onRequestQuote,
  onOpenTracking
}) => {
  // 10 High-Impact Verified Logistics Showcase Slides covering all major operational domains
  const slides: Slide[] = [
    {
      id: 'ocean-vessel-1',
      category: 'GLOBAL OCEAN FREIGHT',
      tabLabel: 'Container Vessel',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2400&q=85',
      alt: 'Ultra-large international container vessel sailing maritime trade corridor',
      headlineFirst: 'GLOBAL OCEAN FREIGHT.',
      headlineSecond: 'WITHOUT BOUNDARIES.',
      subtext: 'Direct ocean carrier space allocations, full container load (FCL) contracting, and scheduled LCL consolidation across 120+ international trade lanes.',
      operationalStat: '24,000 TEU Alliance Capacity · 99.4% On-Time Carrier Transit',
      icon: Ship
    },
    {
      id: 'port-terminal-1',
      category: 'DEEPWATER SEAPORT INFRASTRUCTURE',
      tabLabel: 'Port & STS Cranes',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=85',
      alt: 'Automated container seaport terminal with Ship-to-Shore quay cranes',
      headlineFirst: 'STRATEGIC PORT',
      headlineSecond: 'TERMINAL OPERATIONS.',
      subtext: 'Synchronized quay crane discharging, rapid vessel turnaround coordination, and seamless port drayage directly into regional bonded logistics depots.',
      operationalStat: '24/7 Deepwater Berth Coordination · Direct Terminal Release Gateways',
      icon: Anchor
    },
    {
      id: 'airfreight-1',
      category: 'EXPEDITED AVIATION FREIGHT',
      tabLabel: 'Air Cargo Jet',
      image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=2400&q=85',
      alt: 'Modern wide-body cargo aircraft being loaded on the international airport apron',
      headlineFirst: 'PRIORITY AVIATION',
      headlineSecond: 'CARGO SPEED.',
      subtext: 'Time-critical international air shipments, scheduled airline space allotments, temperature-controlled pharma logistics, and full cargo aircraft charters.',
      operationalStat: 'IATA Scheduled Allocations · Direct Airport-to-Airport Airwaybills',
      icon: Plane
    },
    {
      id: 'heavy-load-1',
      category: 'HEAVY LIFT & PROJECT LOGISTICS',
      tabLabel: 'Heavy Lift Crane',
      image: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&w=2400&q=85',
      alt: 'Heavy duty harbor gantry cranes handling breakbulk project machinery',
      headlineFirst: 'OUT-OF-GAUGE &',
      headlineSecond: 'HEAVY LOAD LOGISTICS.',
      subtext: 'Specialized logistics engineering for oversized industrial components, modular transport trailers, specialized crane rigging, and civil transit permits.',
      operationalStat: 'Heavy Lift Engineering · Breakbulk Vessel Hold Coordination',
      icon: Layers
    },
    {
      id: 'multimodal-1',
      category: 'INTERMODAL RAIL & MULTIMODAL',
      tabLabel: 'Container Rail',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=2400&q=85',
      alt: 'Transcontinental intermodal container freight train connecting seaports to inland terminals',
      headlineFirst: 'MULTIMODAL TRANSPORT &',
      headlineSecond: 'INTERMODAL CORRIDORS.',
      subtext: 'Synchronized rail, sea, and road freight connections bridging continental dry ports and maritime gateways for maximum transit efficiency.',
      operationalStat: 'Double-Stack Rail Integrations · Seamless Port-to-Rail Drayage',
      icon: Truck
    },
    {
      id: 'ocean-vessel-2',
      category: 'TRANS-OCEANIC LINER FLEET',
      tabLabel: 'Deep Sea Liner',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=2400&q=85',
      alt: 'Massive modern container cargo liner traversing international deep ocean trade lanes',
      headlineFirst: 'MARITIME ARTERIES &',
      headlineSecond: 'GLOBAL LINER CAPACITY.',
      subtext: 'Robust capacity guarantees with Tier-1 ocean alliances, refrigerated reefer monitoring, and specialized container equipment for global trade.',
      operationalStat: 'Global Liner Network · 140+ Direct Port-of-Call Rotations',
      icon: Ship
    },
    {
      id: 'port-terminal-2',
      category: 'COMMERCIAL SEAPORT HUBS',
      tabLabel: 'Port Stacking Yard',
      image: 'https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=2400&q=85',
      alt: 'High-density international shipping seaport with active vessel berthing and container stacks',
      headlineFirst: 'HIGH-THROUGHPUT',
      headlineSecond: 'PORT TERMINALS.',
      subtext: 'Advanced container yard staging, automated straddle carrier movement, customs inspection docks, and priority vessel clearance services.',
      operationalStat: 'Automated Yard Staging · Direct Customs Inspection Cross-Docking',
      icon: Anchor
    },
    {
      id: 'heavy-load-2',
      category: 'INDUSTRIAL PROJECT ENGINEERING',
      tabLabel: 'Out-Of-Gauge Gear',
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=2400&q=85',
      alt: 'Heavy industrial gantry and overhead crane lifting massive structural components',
      headlineFirst: 'SPECIALIZED RIGGING &',
      headlineSecond: 'OVERSIZED FREIGHT.',
      subtext: 'Comprehensive turnkey engineering for turbine generators, mining equipment, industrial machinery, and mega infrastructure modules.',
      operationalStat: '140+ Ton Lift Capacity · Multiaxial Hydraulic Platform Routing',
      icon: Layers
    },
    {
      id: 'airfreight-2',
      category: 'TIME-CRITICAL AIR CHARTERS',
      tabLabel: 'Express Air Cargo',
      image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=2400&q=85',
      alt: 'Aviation cargo freighter on airport apron prepared for international express departure',
      headlineFirst: 'GLOBAL AIR CHARTER &',
      headlineSecond: 'EXPEDITED TRANSIT.',
      subtext: 'Dedicated aircraft charters, emergency AOG aviation spares, high-value electronics freight, and secured main-deck cargo capacity.',
      operationalStat: 'Guaranteed Uplift Slots · Global Airport Apron Handling',
      icon: Plane
    },
    {
      id: 'multimodal-2',
      category: 'CROSS-BORDER HIGHWAY HAULAGE',
      tabLabel: 'Overland Haulage',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2400&q=85',
      alt: 'Commercial heavy freight haulage vehicle operating on international transport route',
      headlineFirst: 'INTEGRATED HIGHWAY &',
      headlineSecond: 'OVERLAND HAULAGE.',
      subtext: 'Connecting sea terminals and international airports directly to your distribution warehouses with GPS telematics and bonded customs transit.',
      operationalStat: 'Full Truckload (FTL) & LTL Network · Bonded Customs Transit Corridors',
      icon: Truck
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides every 6.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const currentSlide = slides[currentSlideIndex];

  return (
    <section 
      className="relative w-full min-h-[92vh] lg:min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#071B36]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 
        HERO SLIDESHOW BACKGROUND:
        High opacity (0.80 - 0.85) ensures rich visibility of cargo vessels,
        ports, cranes, containers and aircraft.
        Carefully tuned directional gradients keep all foreground typography razor-sharp.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                style={{ opacity: 1.0 }}
              />

              {/* Refined Directional Overlays for High Image Visibility and Crisp Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#071B36]/80 via-[#071B36]/45 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B36]/85 via-transparent to-[#071B36]/30" />
              <div className="absolute inset-0 bg-[#071B36]/20 pointer-events-none" />
            </div>
          );
        })}

        {/* Technical Maritime Latitude Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.025] z-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C8A45D 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }}
        />
      </div>

      {/* Main Hero Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-24 w-full">
        <div className="max-w-4xl space-y-6 text-left">
            
            {/* Animated Category Operational Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#071B36]/90 border border-[#C8A45D] backdrop-blur-md shadow-lg shadow-[#071B36]/50">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8A45D] animate-ping shrink-0" />
              <span className="text-xs font-['Montserrat',sans-serif] font-extrabold uppercase tracking-widest text-[#DFBF7A]">
                {currentSlide.category}
              </span>
            </div>

            {/* Dynamic Animated Main Heading */}
            <div key={currentSlide.id} className="animate-fadeIn space-y-1">
              <h1 className="font-['Montserrat',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] uppercase drop-shadow-[0_4px_16px_rgba(7,27,54,0.95)]">
                {currentSlide.headlineFirst} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFBF7A] via-[#C8A45D] to-[#F1D79E] drop-shadow-[0_4px_16px_rgba(7,27,54,0.95)]">
                  {currentSlide.headlineSecond}
                </span>
              </h1>
            </div>

            {/* Slide Dynamic Subtitle */}
            <div key={`sub-${currentSlide.id}`} className="animate-fadeIn">
              <p className="text-base sm:text-lg text-slate-100 max-w-2xl font-['Inter',sans-serif] font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(7,27,54,0.95)]">
                {currentSlide.subtext}
              </p>
            </div>

            {/* Live Operational Capability Stat Bar */}
            <div className="p-3 bg-[#0A2242]/90 border border-[#C8A45D]/40 rounded-xl backdrop-blur-md max-w-xl flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-[#071B36] text-[#C8A45D] shrink-0">
                <Anchor className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold text-white tracking-wide">
                <span className="text-[#DFBF7A] uppercase font-bold text-[10px] block">Live Operational Standard</span>
                {currentSlide.operationalStat}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onRequestQuote}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-['Montserrat',sans-serif] font-extrabold text-xs uppercase tracking-widest bg-gradient-to-r from-[#C8A45D] via-[#DFBF7A] to-[#C8A45D] text-[#071B36] shadow-xl shadow-[#C8A45D]/30 hover:shadow-[#C8A45D]/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-['Montserrat',sans-serif] font-bold text-xs uppercase tracking-widest text-white bg-white/15 hover:bg-white/20 border border-[#C8A45D]/60 hover:border-[#DFBF7A] transition-all backdrop-blur-md cursor-pointer shadow-md"
              >
                <span>EXPLORE OUR SERVICES</span>
                <Ship className="w-4 h-4 text-[#DFBF7A]" />
              </button>
            </div>

          </div>

      </div>
    </section>
  );
};
