import {
  QuoteEnquiry,
  ContactEnquiry,
  CompanyInfo,
  ShipmentRecord,
  EnquiryStatus,
  ServiceItem
} from '../types';

const STORAGE_KEYS = {
  QUOTES: 'rgf_quote_enquiries',
  CONTACTS: 'rgf_contact_enquiries',
  COMPANY: 'rgf_company_info',
  TRACKING: 'rgf_shipment_tracking',
  ADMIN_AUTH: 'rgf_admin_auth_token'
};

export const INITIAL_COMPANY_INFO: CompanyInfo = {
  companyName: 'Royal Global Freight',
  tagline: 'Connecting Businesses. Moving the World.',
  email: 'inquiries@royalglobalfreight.com',
  phone: '+1 (800) 482-9921',
  emergencyPhone: '+1 (888) 743-7692',
  address: 'Suite 2400, International Maritime Tower, Harbor Boulevard',
  city: 'Singapore & London Global Gateways',
  country: 'Global Operations Headquarters',
  whatsAppNumber: '+18004829921',
  workingHours: 'Monday – Friday: 08:00 – 18:00 (UTC)',
  supportHours: '24/7 Priority Shipment Coordination Desk'
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'ocean-freight',
    slug: 'ocean-freight',
    title: 'Ocean Freight',
    shortDesc: 'Full Container Load (FCL), Less than Container Load (LCL), international sea cargo and port coordination.',
    fullDesc: 'Comprehensive international ocean freight forwarding solutions tailored to global trade corridors. We coordinate reliable sea freight services across major shipping alliances, offering flexible sailing schedules and optimal routing.',
    iconName: 'Ship',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    mode: 'ocean',
    features: [
      'Full Container Load (FCL) contracting',
      'Less than Container Load (LCL) consolidation',
      'Import and export port coordination',
      'Special equipment (Reefer, Open Top, Flat Rack)',
      'Port-to-port and door-to-door coordination'
    ]
  },
  {
    id: 'air-freight',
    slug: 'air-freight',
    title: 'Air Freight',
    shortDesc: 'International air cargo, import and export coordination, and time-sensitive cargo routing.',
    fullDesc: 'Rapid, dependable international air cargo transportation designed for high-value and time-critical consignments. Partnering with global cargo airlines to secure scheduled allocations and chartered flight space.',
    iconName: 'Plane',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80',
    mode: 'air',
    features: [
      'International air cargo scheduling',
      'Import and export airport documentation',
      'Time-sensitive express cargo coordination',
      'Temperature-controlled air freight handling',
      'Airport-to-airport and door-to-door delivery'
    ]
  },
  {
    id: 'road-freight',
    slug: 'road-freight',
    title: 'Road Freight',
    shortDesc: 'Domestic transportation, cross-border haulage coordination, and inland cargo movement solutions.',
    fullDesc: 'Dedicated road transport and cross-border trucking network facilitating reliable inland distribution, container drayage, and scheduled line-haul movements across regional trade zones.',
    iconName: 'Truck',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    mode: 'road',
    features: [
      'Full Truckload (FTL) and Less than Truckload (LTL)',
      'Cross-border trade corridor coordination',
      'Port container drayage and terminal transfers',
      'GPS-monitored fleet coordination',
      'Heavy-duty flatbed and curtain-sider options'
    ]
  },
  {
    id: 'customs-clearance',
    slug: 'customs-clearance',
    title: 'Customs Clearance',
    shortDesc: 'Import documentation coordination, export clearance support, and tariff compliance assistance.',
    fullDesc: 'Navigating regulatory standards and tariff classifications with experienced customs brokerage partners. Ensuring seamless border crossing and timely release of your cross-border shipments.',
    iconName: 'FileCheck',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    mode: 'general',
    features: [
      'Import and export documentation review',
      'Harmonized System (HS) code classification',
      'Duty and tariff calculation assistance',
      'Regulatory compliance and permit filing',
      'Customs inspection coordination'
    ]
  },
  {
    id: 'warehousing-distribution',
    slug: 'warehousing-distribution',
    title: 'Warehousing & Distribution',
    shortDesc: 'Storage coordination, cargo handling, inventory control, and distribution support.',
    fullDesc: 'Modern warehousing solutions strategically situated near major shipping ports and transportation hubs. Supporting secure short-term and long-term storage, sorting, and fulfillment operations.',
    iconName: 'Warehouse',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    mode: 'general',
    features: [
      'Bonded and non-bonded warehouse coordination',
      'Palletizing, shrink-wrapping, and labeling',
      'Inventory control and cargo consolidation',
      'Pick, pack, and regional distribution dispatch',
      '24/7 security monitored facility standards'
    ]
  },
  {
    id: 'project-cargo',
    slug: 'project-cargo',
    title: 'Project Cargo',
    shortDesc: 'Heavy cargo coordination, oversized equipment planning, and complex project logistics.',
    fullDesc: 'Specialized logistics engineering for oversized, heavy-lift, and out-of-gauge industrial equipment. Every phase is meticulously planned from route surveys to specialized rigging and multi-axle trailers.',
    iconName: 'Cog',
    image: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&w=1200&q=80',
    mode: 'multimodal',
    features: [
      'Heavy-lift and breakbulk sea transportation',
      'Engineering route surveys and civil permits',
      'Specialized crane and rigging planning',
      'On-site staging and port supervision',
      'End-to-end industrial project management'
    ]
  },
  {
    id: 'multimodal-transportation',
    slug: 'multimodal-transportation',
    title: 'Multimodal Transportation',
    shortDesc: 'Sea and road, air and road, and rail integrations for cost-effective international transit.',
    fullDesc: 'Harmonizing ocean, air, rail, and road modalities under a single coordinated workflow to deliver the ideal balance between transit speed and logistics expenditure.',
    iconName: 'Boxes',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
    mode: 'multimodal',
    features: [
      'Sea-Air hybrid freight coordination',
      'Rail-road intermodal transfers',
      'Single-point logistics coordination',
      'Reduced transit times compared to pure ocean',
      'Cost-optimized routing alternatives'
    ]
  },
  {
    id: 'supply-chain-solutions',
    slug: 'supply-chain-solutions',
    title: 'Supply Chain Solutions',
    shortDesc: 'Freight coordination, shipment visibility, and integrated logistics planning.',
    fullDesc: 'Strategic supply chain consultancy and cargo flow orchestration designed to enhance resilience, reduce lead times, and optimize total landed costs across your supply network.',
    iconName: 'Network',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80',
    mode: 'general',
    features: [
      'End-to-end cargo movement coordination',
      'Shipment visibility and milestone reporting',
      'Landed cost analysis and routing optimization',
      'Vendor management and PO coordination',
      'Customized corporate reporting dashboards'
    ]
  }
];

export const INITIAL_TRACKING_RECORDS: ShipmentRecord[] = [
  {
    trackingNumber: 'RGF-TRK-88219',
    referenceId: 'RGF-Q-2026-N97KL',
    origin: 'Singapore (SGSIN)',
    destination: 'Rotterdam, Netherlands (NLRTM)',
    shipmentMode: 'ocean',
    status: 'In Transit',
    carrierName: 'Ocean Alliance Carrier',
    vesselOrFlight: 'CMA CGM Palais Royal / V.2604W',
    estimatedArrival: '2026-11-28',
    lastUpdated: '2026-11-08 14:30 UTC',
    milestones: [
      { step: 'Booking Confirmed', location: 'Singapore Port Terminal', timestamp: '2026-11-01 09:00 UTC', completed: true },
      { step: 'Cargo Received & Inspected', location: 'Jurong Consolidation Center', timestamp: '2026-11-03 16:45 UTC', completed: true },
      { step: 'Customs Cleared for Export', location: 'Singapore Customs Terminal', timestamp: '2026-11-04 11:20 UTC', completed: true },
      { step: 'Vessel Departed Origin Port', location: 'Suez Maritime Corridor', timestamp: '2026-11-06 04:15 UTC', completed: true, notes: 'Currently transiting Red Sea lane' },
      { step: 'Arrival at Destination Port', location: 'Port of Rotterdam', timestamp: 'Expected 2026-11-26', completed: false },
      { step: 'Final Customs & Delivery', location: 'Rotterdam Logistics Center', timestamp: 'Expected 2026-11-28', completed: false }
    ]
  },
  {
    trackingNumber: 'RGF-TRK-49102',
    referenceId: 'RGF-Q-2026-K32MN',
    origin: 'Frankfurt Airport, Germany (FRA)',
    destination: 'Chicago O\'Hare, USA (ORD)',
    shipmentMode: 'air',
    status: 'Customs Cleared',
    carrierName: 'Global Cargo Air',
    vesselOrFlight: 'Flight GC-8491 (B777-200F)',
    estimatedArrival: '2026-11-10',
    lastUpdated: '2026-11-09 08:15 UTC',
    milestones: [
      { step: 'Air Cargo Airwaybill Issued', location: 'Frankfurt Cargo City South', timestamp: '2026-11-07 10:00 UTC', completed: true },
      { step: 'Flight Departed FRA', location: 'Frankfurt Airport', timestamp: '2026-11-08 02:30 UTC', completed: true },
      { step: 'Flight Landed at ORD', location: 'Chicago O\'Hare Cargo Hub', timestamp: '2026-11-08 14:50 UTC', completed: true },
      { step: 'Import Customs Cleared', location: 'US CBP Inspection Center', timestamp: '2026-11-09 07:45 UTC', completed: true, notes: 'Cleared without discrepancies' },
      { step: 'Out for Final Delivery', location: 'Illinois Logistics Hub', timestamp: 'Scheduled 2026-11-10', completed: false }
    ]
  }
];

export const INITIAL_QUOTES: QuoteEnquiry[] = [
  {
    id: 'q-seed-1',
    referenceNumber: 'RGF-Q-2026-N97KL',
    createdAt: '2026-11-02T08:30:00Z',
    status: 'In Discussion',
    fullName: 'David Vance',
    companyName: 'Nordic Industrial Supplies',
    email: 'dvance@nordicindustrial.eu',
    phoneNumber: '+49 40 8291 0023',
    country: 'Germany',
    originCountry: 'Singapore',
    originCity: 'Singapore Port',
    destinationCountry: 'Netherlands',
    destinationCity: 'Rotterdam',
    shipmentMode: 'ocean',
    cargoType: 'Industrial Valves & Pumps',
    cargoDescription: '2x 40ft High Cube containers of heavy marine pumps and precision valves',
    numberOfPackages: 38,
    grossWeightKg: 22400,
    dimensionsCm: '2x 40HC Containers',
    incoterms: 'FOB',
    expectedShippingDate: '2026-11-20',
    additionalRequirements: 'Requires port drayage coordination upon arrival at Rotterdam',
    notes: 'Quotation sent on Nov 3. Client discussing vessel schedule options.'
  },
  {
    id: 'q-seed-2',
    referenceNumber: 'RGF-Q-2026-M44PY',
    createdAt: '2026-11-08T14:15:00Z',
    status: 'New',
    fullName: 'Elena Rostova',
    companyName: 'AeroTech Avionics LLC',
    email: 'elena@aerotech-avionics.com',
    phoneNumber: '+1 (312) 555-0188',
    country: 'United States',
    originCountry: 'Japan',
    originCity: 'Tokyo Narita (NRT)',
    destinationCountry: 'United States',
    destinationCity: 'Chicago O\'Hare (ORD)',
    shipmentMode: 'air',
    cargoType: 'Aerospace Electronics',
    cargoDescription: '6 wooden crates of calibrated avionics circuit units and navigation sensors',
    numberOfPackages: 6,
    grossWeightKg: 1450,
    dimensionsCm: '120x80x110 cm each',
    incoterms: 'CIP',
    expectedShippingDate: '2026-11-18',
    additionalRequirements: 'Temperature controlled handling between 15°C and 25°C',
    notes: 'Urgent enquiry received via corporate web portal.'
  },
  {
    id: 'q-seed-3',
    referenceNumber: 'RGF-Q-2026-W88QR',
    createdAt: '2026-11-05T11:00:00Z',
    status: 'Quotation Sent',
    fullName: 'Carlos Mendes',
    companyName: 'TransAtlantic Foods Corp',
    email: 'carlos.m@transatlanticfoods.com',
    phoneNumber: '+34 91 749 2210',
    country: 'Spain',
    originCountry: 'Brazil',
    originCity: 'Santos Port',
    destinationCountry: 'Spain',
    destinationCity: 'Valencia Port',
    shipmentMode: 'ocean',
    cargoType: 'Agricultural Produce (Coffee Beans)',
    cargoDescription: '3x 20ft food-grade containers of green specialty coffee beans',
    numberOfPackages: 600,
    grossWeightKg: 54000,
    dimensionsCm: '3x 20ft Standard Containers',
    incoterms: 'CIF',
    expectedShippingDate: '2026-11-30',
    additionalRequirements: 'Moisture absorbing desiccant poles required in all containers',
    notes: 'Quotation sent on Nov 6. Follow-up meeting scheduled.'
  }
];

export const INITIAL_CONTACTS: ContactEnquiry[] = [
  {
    id: 'c-seed-1',
    referenceNumber: 'RGF-C-2026-A19BC',
    createdAt: '2026-11-07T16:20:00Z',
    name: 'Marcus Chen',
    companyName: 'Pacific Rim Trade Alliance',
    email: 'mchen@pacificrimtrade.org',
    phone: '+65 6721 8840',
    subject: 'Partnership and Trade Lane Coordination',
    message: 'We are seeking an established freight forwarding partner for recurring container movements between Southeast Asian ports and European distribution centers. Would appreciate a direct consultation.',
    status: 'New'
  },
  {
    id: 'c-seed-2',
    referenceNumber: 'RGF-C-2026-X83LP',
    createdAt: '2026-11-04T09:40:00Z',
    name: 'Sophie Laurent',
    companyName: 'Laurent Fine Chemicals',
    email: 'sophie.laurent@laurent-chem.fr',
    phone: '+33 1 42 68 55 00',
    subject: 'Dangerous Goods Class 3 Certification Inquiry',
    message: 'Do you handle multimodal carriage for regulated Class 3 solvent cargo from Le Havre to US East Coast?',
    status: 'Replied'
  }
];

// In-memory + LocalStorage unified store with event dispatching
type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  listeners.forEach(fn => {
    try {
      fn();
    } catch (e) {
      console.error('Listener callback error', e);
    }
  });
}

export function subscribeToStore(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Helper to safely read from localStorage
function readStorage<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(key);
    if (!val) return fallback;
    return JSON.parse(val) as T;
  } catch (err) {
    console.warn(`Error reading ${key} from storage`, err);
    return fallback;
  }
}

// Helper to safely write to localStorage
function writeStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Error writing ${key} to storage`, err);
  }
  notifyListeners();
}

export const StorageService = {
  // Quote Enquiries
  getQuotes(): QuoteEnquiry[] {
    return readStorage<QuoteEnquiry[]>(STORAGE_KEYS.QUOTES, INITIAL_QUOTES);
  },

  addQuote(enquiry: QuoteEnquiry): void {
    const current = this.getQuotes();
    // Prepend new enquiry
    const updated = [enquiry, ...current];
    writeStorage(STORAGE_KEYS.QUOTES, updated);
  },

  updateQuoteStatus(id: string, status: EnquiryStatus, notes?: string): void {
    const current = this.getQuotes();
    const updated = current.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          notes: notes !== undefined ? notes : item.notes
        };
      }
      return item;
    });
    writeStorage(STORAGE_KEYS.QUOTES, updated);
  },

  getQuoteByReference(ref: string): QuoteEnquiry | undefined {
    return this.getQuotes().find(q => q.referenceNumber.toUpperCase() === ref.trim().toUpperCase());
  },

  // Contact Inquiries
  getContacts(): ContactEnquiry[] {
    return readStorage<ContactEnquiry[]>(STORAGE_KEYS.CONTACTS, INITIAL_CONTACTS);
  },

  addContact(contact: ContactEnquiry): void {
    const current = this.getContacts();
    const updated = [contact, ...current];
    writeStorage(STORAGE_KEYS.CONTACTS, updated);
  },

  updateContactStatus(id: string, status: ContactEnquiry['status']): void {
    const current = this.getContacts();
    const updated = current.map(c => c.id === id ? { ...c, status } : c);
    writeStorage(STORAGE_KEYS.CONTACTS, updated);
  },

  // Company Information
  getCompanyInfo(): CompanyInfo {
    return readStorage<CompanyInfo>(STORAGE_KEYS.COMPANY, INITIAL_COMPANY_INFO);
  },

  updateCompanyInfo(info: CompanyInfo): void {
    writeStorage(STORAGE_KEYS.COMPANY, info);
  },

  // Shipment Tracking Records
  getShipmentRecords(): ShipmentRecord[] {
    return readStorage<ShipmentRecord[]>(STORAGE_KEYS.TRACKING, INITIAL_TRACKING_RECORDS);
  },

  getShipmentByTrackingNumber(trackingNumber: string): ShipmentRecord | undefined {
    const list = this.getShipmentRecords();
    const clean = trackingNumber.trim().toUpperCase();
    return list.find(s => s.trackingNumber.toUpperCase() === clean);
  },

  saveShipmentRecord(record: ShipmentRecord): void {
    const list = this.getShipmentRecords();
    const index = list.findIndex(s => s.trackingNumber.toUpperCase() === record.trackingNumber.toUpperCase());
    let updated: ShipmentRecord[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = record;
    } else {
      updated = [record, ...list];
    }
    writeStorage(STORAGE_KEYS.TRACKING, updated);
  },

  // Admin Authentication Session
  isAdminAuthenticated(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'authenticated_rgf_admin';
    } catch {
      return false;
    }
  },

  setAdminAuthenticated(auth: boolean): void {
    try {
      if (auth) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'authenticated_rgf_admin');
      } else {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
      }
    } catch (e) {
      console.warn('Storage auth set error', e);
    }
    notifyListeners();
  }
};
