import React, { useState } from 'react';
import {
  Ship,
  Plane,
  Truck,
  FileCheck,
  Warehouse,
  Cog,
  Boxes,
  Network,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Image as ImageIcon,
  ChevronDown,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { LOGISTICS_FAQS } from '../../services/seo';

interface ServicesPageProps {
  initialServiceId?: string;
  onRequestQuote: () => void;
  onNavigate?: (page: string, serviceId?: string) => void;
}

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  image: string;
  gallery: { url: string; label: string }[];
  description: string;
  features: string[];
  icon: any;
  relatedServiceIds: { id: string; name: string }[];
}

// Individual Interactive Service Card with Operational Photo Switcher & Internal Cross-Links
const ServiceCard: React.FC<{
  service: ServiceItem;
  index: number;
  onRequestQuote: () => void;
  onNavigate?: (page: string, serviceId?: string) => void;
}> = ({ service, index, onRequestQuote, onNavigate }) => {
  const [activeImage, setActiveImage] = useState<string>(service.image);
  const Icon = service.icon;
  const isEven = index % 2 === 0;

  return (
    <div
      id={service.id}
      className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all overflow-hidden scroll-mt-28"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        
        {/* Image & Interactive Gallery Section (5 cols) */}
        <div className={`lg:col-span-5 flex flex-col justify-between p-4 sm:p-6 bg-slate-50 border-b lg:border-b-0 ${isEven ? 'order-1 lg:border-r border-slate-200' : 'order-1 lg:order-2 lg:border-l border-slate-200'}`}>
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-[#071B36] shadow-inner group">
            <img
              src={activeImage}
              alt={`${service.title} - International Freight Forwarding & Logistics`}
              width={800}
              height={533}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B36]/80 via-transparent to-transparent opacity-60 pointer-events-none" />
            
            {/* Floating Number Badge */}
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#071B36]/90 backdrop-blur-md rounded-lg border border-[#C8A45D]/40 text-[#DFBF7A] font-mono text-xs font-bold pointer-events-none">
              SERVICE 0{index + 1}
            </div>

            {/* Live Operational Indicator */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 pointer-events-none">
              <span className="font-semibold text-[#DFBF7A] truncate font-['Montserrat',sans-serif]">
                Active Fleet View
              </span>
              <span className="text-slate-300 font-mono text-[10px]">Verified Logistics</span>
            </div>
          </div>

          {/* Operational Views Thumbnail Switcher */}
          {service.gallery && service.gallery.length > 1 && (
            <div className="mt-4 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                <ImageIcon className="w-3.5 h-3.5 text-[#C8A45D]" />
                <span>Operational Perspectives:</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {service.gallery.map((item, gIdx) => {
                  const isCurrent = activeImage === item.url;
                  return (
                    <button
                      key={gIdx}
                      type="button"
                      onClick={() => setActiveImage(item.url)}
                      className={`group relative h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-[#C8A45D] ring-2 ring-[#C8A45D]/40 scale-[1.02]'
                          : 'border-slate-300 hover:border-[#071B36] opacity-75 hover:opacity-100'
                      }`}
                      title={item.label}
                    >
                      <img
                        src={item.url}
                        alt={`${service.title} - ${item.label}`}
                        width={200}
                        height={133}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                      <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white bg-black/70 px-1 py-0.5 rounded truncate text-center block">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Details Section (7 cols) */}
        <div className={`lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#071B36] text-[#C8A45D] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8A45D]">
                  {service.category}
                </span>
              </div>

              <h2 className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#071B36] tracking-tight uppercase">
                {service.title}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-['Inter',sans-serif]">
              {service.description}
            </p>

            {/* Bullet Points */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#071B36]">
                Key Service Capabilities:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Internal Cross-Linking: Related Services */}
            {service.relatedServiceIds && service.relatedServiceIds.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Frequently Combined With:
                </span>
                <div className="flex flex-wrap gap-2">
                  {service.relatedServiceIds.map((rel, rIdx) => (
                    <button
                      key={rIdx}
                      type="button"
                      onClick={() => {
                        const targetEl = document.getElementById(rel.id);
                        if (targetEl) {
                          targetEl.scrollIntoView({ behavior: 'smooth' });
                        } else if (onNavigate) {
                          onNavigate('services', rel.id);
                        }
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-[#071B36] text-slate-700 hover:text-[#DFBF7A] text-xs font-medium transition cursor-pointer border border-slate-200"
                    >
                      <span>{rel.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quote Action Button */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
            <button
              onClick={onRequestQuote}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#C8A45D] to-[#DFBF7A] text-[#071B36] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>REQUEST A QUOTE FOR {service.title.split(' ')[0].toUpperCase()}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  initialServiceId: _initialServiceId,
  onRequestQuote,
  onNavigate
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const detailedServices: ServiceItem[] = [
    {
      id: 'ocean-freight',
      title: 'Ocean Freight Solutions',
      category: 'Sea Cargo Logistics',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80', label: 'ULCV Vessel' },
        { url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80', label: 'Open Ocean' },
        { url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80', label: 'Liner Berthing' }
      ],
      description: 'Comprehensive international ocean freight forwarding connecting global industrial and consumer markets. We provide competitive port-to-port and door-to-door sea freight coordination across major global shipping alliances, serving key maritime routes including transpacific, transatlantic, and India-to-worldwide corridors.',
      features: [
        'Full Container Load (FCL) contracting and slot booking',
        'Less than Container Load (LCL) consolidation services',
        'Import and export port terminal coordination',
        'International sea cargo documentation and bill of lading issuance',
        'Special equipment handling (Reefer, Open Top, Flat Rack containers)',
        'Vessel alliance schedule optimization and transshipment monitoring'
      ],
      icon: Ship,
      relatedServiceIds: [
        { id: 'customs-clearance', name: 'Customs Clearance' },
        { id: 'multimodal-transportation', name: 'Multimodal Transport' },
        { id: 'warehousing-distribution', name: 'Warehousing' }
      ]
    },
    {
      id: 'air-freight',
      title: 'International Air Freight',
      category: 'Aviation Logistics',
      image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80', label: 'Apron Loading' },
        { url: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1200&q=80', label: 'Freighter Jet' },
        { url: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80', label: 'Cargo Pallets' }
      ],
      description: 'Expedited air freight logistics engineered for time-critical, high-value, and sensitive commercial consignments. We coordinate direct flights, consolidated airwaybills, and specialized aircraft charter space globally.',
      features: [
        'International air cargo space allocation with scheduled carriers',
        'Import and export airport documentation and airwaybill management',
        'Time-sensitive express cargo coordination and urgent routing',
        'Temperature-controlled and pharmaceutical cold-chain handling',
        'Airport-to-airport and priority door-to-door delivery',
        'Dangerous goods (IATA-compliant) air freight coordination'
      ],
      icon: Plane,
      relatedServiceIds: [
        { id: 'customs-clearance', name: 'Customs Clearance' },
        { id: 'road-freight', name: 'Road Haulage Drayage' },
        { id: 'supply-chain-solutions', name: 'Supply Chain Solutions' }
      ]
    },
    {
      id: 'road-freight',
      title: 'Road & Inland Freight Haulage',
      category: 'Overland Transportation',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80', label: 'Highway Hauler' },
        { url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80', label: 'Overland Haulage' },
        { url: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80', label: 'Depot Transfer' }
      ],
      description: 'Reliable road transportation and cross-border haulage network providing the vital link between coastal deepwater ports, inland distribution depots, and client facilities.',
      features: [
        'Domestic inland transportation and container drayage',
        'Cross-border transportation coordination and border clearance',
        'Full Truckload (FTL) and Less than Truckload (LTL) solutions',
        'Comprehensive cargo movement solutions for regional distribution',
        'Monitored carrier fleet network with scheduled transit updates',
        'Heavy-duty flatbed and specialized trailer allocations'
      ],
      icon: Truck,
      relatedServiceIds: [
        { id: 'ocean-freight', name: 'Ocean Freight' },
        { id: 'multimodal-transportation', name: 'Intermodal Rail' },
        { id: 'warehousing-distribution', name: 'Warehousing' }
      ]
    },
    {
      id: 'customs-clearance',
      title: 'Customs Clearance & Brokerage Support',
      category: 'Regulatory Trade Compliance',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80', label: 'Audit Desk' },
        { url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', label: 'Port Customs' }
      ],
      description: 'Navigating international customs legislation, tariff classifications, and trade protocols with expert documentation coordination to ensure timely cargo release at seaport and airport inspection gates.',
      features: [
        'Import documentation coordination and commercial invoice review',
        'Export documentation coordination and clearance filing',
        'Customs clearance support across major international ports and airports',
        'Harmonized System (HS) code classification assistance',
        'Duty and tax assessment guidance under prevailing trade pacts',
        'Coordination with port health, agricultural, and quarantine authorities'
      ],
      icon: FileCheck,
      relatedServiceIds: [
        { id: 'ocean-freight', name: 'Ocean Freight' },
        { id: 'air-freight', name: 'Air Freight' },
        { id: 'warehousing-distribution', name: 'Bonded Warehousing' }
      ]
    },
    {
      id: 'warehousing-distribution',
      title: 'Warehousing & Distribution Services',
      category: 'Storage & Supply Hubs',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', label: 'Port Quay Hub' },
        { url: 'https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=1200&q=80', label: 'Terminal Stacks' },
        { url: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80', label: 'Bonded Yard' }
      ],
      description: 'Strategic warehousing and fulfillment coordination designed to support regional buffer stocks, container de-stuffing, and synchronized cargo distribution near major trade arteries.',
      features: [
        'Storage coordination in secure bonded and general facilities',
        'Professional cargo handling, palletizing, shrink-wrapping, and sorting',
        'Distribution support and scheduled dispatch coordination',
        'Cargo inspection, inventory verification, and condition reports',
        'Container cross-docking and multi-vendor cargo consolidation',
        'Comprehensive security monitoring and facility standards'
      ],
      icon: Warehouse,
      relatedServiceIds: [
        { id: 'road-freight', name: 'Road Freight' },
        { id: 'customs-clearance', name: 'Customs Clearance' },
        { id: 'supply-chain-solutions', name: 'Supply Chain Solutions' }
      ]
    },
    {
      id: 'project-cargo',
      title: 'Specialized Project Cargo Logistics',
      category: 'Heavy Lift & Engineering',
      image: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&w=1200&q=80', label: 'Harbor Gantry' },
        { url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80', label: 'Overhead Rigging' },
        { url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80', label: 'Heavy Machinery' }
      ],
      description: 'Bespoke logistics engineering for out-of-gauge industrial machinery, energy infrastructure, mining plant modules, and non-containerized breakbulk consignments.',
      features: [
        'Heavy cargo coordination and multi-axle modular transporter planning',
        'Oversized cargo transportation planning and route feasibility surveys',
        'Project logistics management from factory staging to site delivery',
        'Specialized crane, rigging, and maritime vessel hold supervision',
        'Civil engineering road permits and bridge weight compliance',
        'On-site technical supervision at loading and discharge ports'
      ],
      icon: Cog,
      relatedServiceIds: [
        { id: 'ocean-freight', name: 'Breakbulk Ocean Liner' },
        { id: 'multimodal-transportation', name: 'Multimodal Transport' },
        { id: 'customs-clearance', name: 'Heavy Equipment Clearance' }
      ]
    },
    {
      id: 'multimodal-transportation',
      title: 'Multimodal Transportation Services',
      category: 'Integrated Modal Logistics',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80', label: 'Intermodal Rail' },
        { url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80', label: 'Highway Drayage' },
        { url: 'https://images.unsplash.com/photo-1473445730015-841f29a9490b?auto=format&fit=crop&w=1200&q=80', label: 'Rail Terminal' }
      ],
      description: 'Seamless intermodal combinations harmonizing sea, air, rail, and road to optimize transit speed against logistics expenditures, bridging maritime gateways with continental manufacturing hubs.',
      features: [
        'Sea and road integrated transportation coordination',
        'Air and road hybrid logistics coordination',
        'Sea-Air expedited routes bridging continents',
        'Rail-road intermodal transfers and container drayage',
        'Single freight forwarding workflow across diverse modes',
        'Contingency routing during port or airport bottlenecks'
      ],
      icon: Boxes,
      relatedServiceIds: [
        { id: 'ocean-freight', name: 'Ocean Freight' },
        { id: 'road-freight', name: 'Road Haulage' },
        { id: 'project-cargo', name: 'Project Cargo' }
      ]
    },
    {
      id: 'supply-chain-solutions',
      title: 'Integrated Supply Chain Solutions',
      category: 'Logistics Architecture',
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80', label: 'Global Trade' },
        { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80', label: 'Liner Networks' }
      ],
      description: 'Holistic cargo flow coordination and strategic logistics planning designed to enhance visibility, mitigate trade disruption, and lower total landed cost for enterprise shippers.',
      features: [
        'End-to-end freight coordination across vendors and carriers',
        'Shipment visibility and structured milestone reporting',
        'Logistics planning and carrier contract optimization',
        'Purchase order monitoring and vendor dispatch scheduling',
        'Trade lane risk evaluation and alternative route modeling',
        'Commercial data analytics and logistics performance review'
      ],
      icon: Network,
      relatedServiceIds: [
        { id: 'ocean-freight', name: 'Ocean Freight' },
        { id: 'air-freight', name: 'Air Freight' },
        { id: 'warehousing-distribution', name: 'Warehousing' }
      ]
    }
  ];

  return (
    <div className="w-full bg-[#F4F6F9] text-[#182638] animate-fadeIn">
      
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8A45D]" />
            Commercial Freight Capabilities
          </div>
          <h1 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            INTERNATIONAL FREIGHT FORWARDING SERVICES
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-['Inter',sans-serif]">
            Specialized global freight forwarding solutions designed to transport commercial cargo securely across ocean vessels, international air routes, overland trucking, and multimodal corridors.
          </p>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/', onClick: () => onNavigate && onNavigate('home') },
            { name: 'Services', path: '/services' }
          ]}
        />
      </div>

      {/* Services List Details with Interactive Multi-Angle Gallery */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {detailedServices.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            onRequestQuote={onRequestQuote}
            onNavigate={onNavigate}
          />
        ))}
      </section>

      {/* Frequently Asked Questions (FAQ Section with Schema.org JSON-LD integration) */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071B36]/10 text-[#071B36] text-xs font-bold uppercase tracking-widest border border-[#C8A45D]/40">
              <HelpCircle className="w-3.5 h-3.5 text-[#C8A45D]" />
              Industry Insights
            </div>
            <h2 className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#071B36] uppercase tracking-tight">
              FREIGHT FORWARDING &amp; LOGISTICS FAQ
            </h2>
            <p className="text-sm text-slate-600 font-['Inter',sans-serif] max-w-2xl mx-auto">
              Clear answers to the most common questions regarding international shipping, container booking, customs compliance, and project cargo execution.
            </p>
          </div>

          <div className="space-y-4">
            {LOGISTICS_FAQS.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-colors bg-[#F4F6F9] hover:border-[#C8A45D]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-['Montserrat',sans-serif] font-bold text-sm sm:text-base text-[#071B36] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C8A45D] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 font-['Inter',sans-serif] leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-[#071B36] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-5">
          <h3 className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl font-bold uppercase text-white">
            Need a Customized Multimodal Shipping Strategy?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Our experienced freight coordination team is on standby to evaluate your cargo specifications, route options, and budget targets across global trade lanes.
          </p>
          <div className="pt-2">
            <button
              onClick={onRequestQuote}
              className="px-8 py-3.5 bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#071B36] font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
            >
              REQUEST A DETAILED FREIGHT QUOTE
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
