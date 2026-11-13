import { CompanyInfo } from '../types';

export interface SEOConfig {
  title: string;
  description: string;
  canonicalPath: string;
  keywords: string[];
  h1: string;
  ogType?: 'website' | 'article';
  image?: string;
  serviceId?: string;
  breadcrumbs?: { name: string; path: string }[];
}

export const CANONICAL_ORIGIN = 'https://royalglobalfreight.com';
export const SITE_DISPLAY_NAME = 'Royal Global Freight Pvt Ltd.';

export const OFFICIAL_LOGO_ABSOLUTE_URL = `${CANONICAL_ORIGIN}/assets/aistudio/file_000000002b3c8208aa2c073557e13cb3_eeff9ba8.png`;

// Primary Target Keywords
export const TARGET_KEYWORDS = [
  'International Freight Forwarder',
  'International Freight Forwarding',
  'Global Freight Forwarding',
  'International Shipping Company',
  'Global Logistics Solutions',
  'Ocean Freight Services',
  'Air Freight Services',
  'Road Freight Services',
  'FCL and LCL Shipping',
  'Import Export Logistics',
  'Customs Clearance Support',
  'Multimodal Transportation',
  'Project Cargo Logistics',
  'Supply Chain Solutions',
  'Freight Forwarder in India',
  'International Shipping from India',
  'India Freight Forwarding Services',
  'Import Export Logistics India'
];

export const SEO_PAGES: Record<string, SEOConfig> = {
  home: {
    title: 'Royal Global Freight Pvt Ltd. | International Freight Forwarding & Logistics',
    description: 'Royal Global Freight Pvt Ltd. offers international freight forwarding, ocean freight, air freight, road transportation and global logistics coordination.',
    canonicalPath: '/',
    h1: 'International Freight Forwarding & Global Logistics Solutions',
    keywords: [
      'International Freight Forwarder',
      'International Freight Forwarding',
      'Global Freight Forwarding',
      'International Shipping Company',
      'Global Logistics Solutions',
      'FCL and LCL Shipping'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    breadcrumbs: [{ name: 'Home', path: '/' }]
  },
  about: {
    title: 'About Royal Global Freight Pvt Ltd. | Global Logistics Company',
    description: 'Discover Royal Global Freight Pvt Ltd., a premier global freight forwarder connecting international markets with reliable sea, air, and multimodal logistics solutions.',
    canonicalPath: '/about',
    h1: 'About Royal Global Freight | Global Logistics Company',
    keywords: [
      'Global Logistics Company',
      'International Freight Forwarding',
      'International Shipping Company',
      'Reliable Freight Forwarder'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' }
    ]
  },
  services: {
    title: 'International Freight Forwarding Services | Royal Global Freight Pvt Ltd.',
    description: 'Explore our end-to-end international freight forwarding services, including ocean container shipping, air cargo, road freight haulage, and customs clearance.',
    canonicalPath: '/services',
    h1: 'International Freight Forwarding Services',
    keywords: [
      'International Freight Forwarding Services',
      'Ocean Freight Services',
      'Air Freight Services',
      'Road Freight Services',
      'Customs Clearance Support',
      'Multimodal Transportation'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' }
    ]
  },
  'ocean-freight': {
    title: 'Ocean Freight Services | Royal Global Freight Pvt Ltd.',
    description: 'Full container load (FCL) and less than container load (LCL) international ocean shipping services connecting major global seaports and maritime trade lanes.',
    canonicalPath: '/services/ocean-freight',
    h1: 'Ocean Freight Services & Container Shipping Solutions',
    keywords: [
      'Ocean Freight Services',
      'FCL and LCL Shipping',
      'International Shipping Company',
      'Container Ship Transport',
      'Sea Cargo Forwarding',
      'International Shipping from India'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'ocean-freight',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Ocean Freight', path: '/services/ocean-freight' }
    ]
  },
  'air-freight': {
    title: 'International Air Freight Services | Royal Global Freight Pvt Ltd.',
    description: 'Expedited international air freight services, scheduled airline allocations, and air cargo charter solutions for time-critical global consignments.',
    canonicalPath: '/services/air-freight',
    h1: 'International Air Freight Services & Cargo Logistics',
    keywords: [
      'Air Freight Services',
      'International Air Freight Services',
      'Express Air Cargo',
      'Airwaybill Logistics',
      'IATA Freight Forwarder'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'air-freight',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Air Freight', path: '/services/air-freight' }
    ]
  },
  'road-freight': {
    title: 'Road Freight Services | Royal Global Freight Pvt Ltd.',
    description: 'Road Freight Services by Royal Global Freight. Reliable road transportation, cross-border haulage coordination, and inland container drayage logistics.',
    canonicalPath: '/services/road-freight',
    h1: 'Road Freight Services & Inland Transportation Haulage',
    keywords: [
      'Road Freight Services',
      'Cross-Border Haulage',
      'Container Drayage',
      'FTL and LTL Trucking',
      'Inland Cargo Movement'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'road-freight',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Road Freight', path: '/services/road-freight' }
    ]
  },
  'customs-clearance': {
    title: 'Customs Clearance Support | Royal Global Freight Pvt Ltd.',
    description: 'Customs Clearance Support by Royal Global Freight. Expert import and export customs documentation review, HS tariff classification, and port clearance support.',
    canonicalPath: '/services/customs-clearance',
    h1: 'Customs Clearance Support & Trade Compliance Brokerage',
    keywords: [
      'Customs Clearance Support',
      'Import Export Logistics',
      'Tariff Classification',
      'Customs Brokerage Coordination',
      'Import Export Logistics India'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'customs-clearance',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Customs Clearance', path: '/services/customs-clearance' }
    ]
  },
  'warehousing-distribution': {
    title: 'Warehousing & Distribution Services | Royal Global Freight Pvt Ltd.',
    description: 'Warehousing and distribution support near major international transport corridors. Bonded storage, cargo palletizing, and cross-dock dispatch.',
    canonicalPath: '/services/warehousing-distribution',
    h1: 'Warehousing & Strategic Distribution Services',
    keywords: [
      'Warehousing and Distribution',
      'Bonded Storage Logistics',
      'Cargo Cross-Docking',
      'Supply Chain Distribution'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'warehousing-distribution',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Warehousing', path: '/services/warehousing-distribution' }
    ]
  },
  'project-cargo': {
    title: 'Project Cargo Logistics | Royal Global Freight Pvt Ltd.',
    description: 'Specialized Project Cargo Logistics by Royal Global Freight. Heavy-lift engineering, oversized breakbulk shipping, and modular hydraulic platform routing.',
    canonicalPath: '/services/project-cargo',
    h1: 'Specialized Project Cargo & Heavy Lift Logistics',
    keywords: [
      'Project Cargo Logistics',
      'Heavy Lift Shipping',
      'Breakbulk Cargo',
      'Out of Gauge Transport',
      'Modular Transporters'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'project-cargo',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Project Cargo', path: '/services/project-cargo' }
    ]
  },
  'multimodal-transportation': {
    title: 'Multimodal Transportation | Royal Global Freight Pvt Ltd.',
    description: 'Multimodal Transportation Services combining sea, rail, road, and air into an integrated, cost-efficient international logistics pipeline.',
    canonicalPath: '/services/multimodal-transportation',
    h1: 'Multimodal Transportation & Intermodal Freight Services',
    keywords: [
      'Multimodal Transportation',
      'Intermodal Freight Rail',
      'Sea Air Logistics',
      'Integrated Freight Solutions'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'multimodal-transportation',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Multimodal', path: '/services/multimodal-transportation' }
    ]
  },
  'supply-chain-solutions': {
    title: 'Supply Chain Solutions | Royal Global Freight Pvt Ltd.',
    description: 'Holistic international supply chain management, PO milestone tracking, carrier contract optimization, and trade lane risk modeling.',
    canonicalPath: '/services/supply-chain-solutions',
    h1: 'Integrated Supply Chain Solutions & Freight Architecture',
    keywords: [
      'Supply Chain Solutions',
      'Global Logistics Architecture',
      'Freight Cost Optimization',
      'Shipment Visibility'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80',
    serviceId: 'supply-chain-solutions',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Supply Chain', path: '/services/supply-chain-solutions' }
    ]
  },
  network: {
    title: 'Global Shipping Network | Royal Global Freight Pvt Ltd.',
    description: 'Global Shipping Network by Royal Global Freight. Trans-Pacific, Asia-Europe, Transatlantic, Middle East, and Latin American commercial freight corridors.',
    canonicalPath: '/network',
    h1: 'Global Shipping Network & International Trade Corridors',
    keywords: [
      'Global Shipping Network',
      'International Trade Corridors',
      'Trans-Pacific Trade Lane',
      'Asia Europe Shipping',
      'Freight Forwarder in India',
      'India Freight Forwarding Services'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=1200&q=80',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Global Network', path: '/network' }
    ]
  },
  contact: {
    title: 'Contact Royal Global Freight Pvt Ltd. | Freight & Logistics Enquiries',
    description: 'Contact Royal Global Freight. Reach our dedicated international freight forwarding desks for shipping rates, carrier bookings, and logistics consultation.',
    canonicalPath: '/contact',
    h1: 'Contact Royal Global Freight & Priority Trade Desks',
    keywords: [
      'Contact Freight Forwarder',
      'Shipping Enquiries',
      'International Logistics Contact',
      'Freight Forwarder Phone Number'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact Us', path: '/contact' }
    ]
  },
  quote: {
    title: 'Request an International Freight Quote | Royal Global Freight Pvt Ltd.',
    description: 'Request an International Freight Quote from Royal Global Freight. Competitive rates for FCL/LCL ocean shipping, air cargo, and multimodal freight solutions.',
    canonicalPath: '/quote',
    h1: 'Request an International Freight Quote',
    keywords: [
      'Request a Freight Quote',
      'International Shipping Rates',
      'Ocean Freight Quote',
      'Air Cargo Pricing',
      'FCL Quote'
    ],
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Request a Quote', path: '/quote' }
    ]
  },
  'not-found': {
    title: 'Page Not Found (404) | Royal Global Freight Pvt Ltd.',
    description: 'The requested freight forwarding page could not be found. Navigate back to Royal Global Freight home, our services, or global shipping network.',
    canonicalPath: '/404',
    h1: '404 - Page Not Found',
    keywords: ['Royal Global Freight 404'],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: '404', path: '/404' }
    ]
  },
  'privacy-policy': {
    title: 'Privacy Policy | Royal Global Freight Pvt Ltd.',
    description: 'Privacy Policy of Royal Global Freight. Learn how we handle, store, and protect commercial shipping documentation and client data.',
    canonicalPath: '/privacy-policy',
    h1: 'Privacy & Data Protection Policy',
    keywords: [
      'Royal Global Freight Privacy Policy',
      'Freight Data Protection',
      'Shipping Document Privacy'
    ],
    ogType: 'website',
    image: `${CANONICAL_ORIGIN}/assets/aistudio/file_000000002b3c8208aa2c073557e13cb3_eeff9ba8.png`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy-policy' }
    ]
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions | Royal Global Freight Pvt Ltd.',
    description: 'Standard Terms & Conditions of Freight Service for Royal Global Freight. Detailed forwarding, carriage coordination, and liability conditions.',
    canonicalPath: '/terms-and-conditions',
    h1: 'Standard Terms & Conditions of Freight Service',
    keywords: [
      'Royal Global Freight Terms and Conditions',
      'Freight Forwarding Contract Terms',
      'Standard Trading Conditions'
    ],
    ogType: 'website',
    image: `${CANONICAL_ORIGIN}/assets/aistudio/file_000000002b3c8208aa2c073557e13cb3_eeff9ba8.png`,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Terms & Conditions', path: '/terms-and-conditions' }
    ]
  }
};

/**
 * Generates Schema.org Organization JSON-LD
 */
export function generateOrganizationSchema(company: CompanyInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${CANONICAL_ORIGIN}/#organization`,
    name: SITE_DISPLAY_NAME,
    legalName: SITE_DISPLAY_NAME,
    alternateName: ['Royal Global Freight', 'RGF'],
    url: `${CANONICAL_ORIGIN}/`,
    logo: OFFICIAL_LOGO_ABSOLUTE_URL,
    image: OFFICIAL_LOGO_ABSOLUTE_URL,
    description: 'Royal Global Freight Pvt Ltd. is a premium international freight forwarding and global logistics coordination enterprise.',
    slogan: company.tagline,
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressLocality: company.city,
      addressRegion: company.state || 'Harbor Commercial District',
      postalCode: company.postalCode || '018981',
      addressCountry: company.country
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: company.phone,
        contactType: 'customer support',
        availableLanguage: ['English']
      },
      {
        '@type': 'ContactPoint',
        telephone: company.emergencyPhone,
        contactType: 'emergency shipping coordination',
        availableLanguage: ['English']
      }
    ],
    sameAs: [
      'https://www.linkedin.com/company/royal-global-freight'
    ]
  };
}

/**
 * Generates Schema.org WebSite JSON-LD
 */
export function generateWebSiteSchema(_company: CompanyInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${CANONICAL_ORIGIN}/#website`,
    url: `${CANONICAL_ORIGIN}/`,
    name: SITE_DISPLAY_NAME,
    alternateName: ['Royal Global Freight', 'RGF'],
    description: 'International Freight Forwarding, Global Shipping and Logistics Solutions.',
    publisher: {
      '@id': `${CANONICAL_ORIGIN}/#organization`
    }
  };
}

/**
 * Generates Schema.org BreadcrumbList JSON-LD
 */
export function generateBreadcrumbSchema(breadcrumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${CANONICAL_ORIGIN}${crumb.path === '/' ? '' : crumb.path}`
    }))
  };
}

/**
 * Generates Schema.org Service JSON-LD
 */
export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string,
  company: CompanyInfo
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    provider: {
      '@type': 'Organization',
      name: company.companyName,
      url: CANONICAL_ORIGIN
    },
    url: `${CANONICAL_ORIGIN}${serviceUrl}`,
    description: serviceDescription,
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'International Freight Forwarding Services'
    }
  };
}

/**
 * Generates Schema.org FAQPage JSON-LD
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Common FAQs for Logistics & Freight Forwarding (Original, High-Value)
 */
export const LOGISTICS_FAQS = [
  {
    question: 'What is the primary difference between FCL and LCL ocean shipping?',
    answer: 'FCL (Full Container Load) reserves an entire container (standard 20ft or 40ft) exclusively for your consignment, ideal for large shipments and minimizing handling. LCL (Less than Container Load) consolidates multiple shippers\' cargo into a shared container, offering a cost-effective alternative for smaller volumes without paying for unused space.'
  },
  {
    question: 'How does Royal Global Freight coordinate customs clearance?',
    answer: 'Our trade compliance specialists review shipping documentation—including Commercial Invoices, Packing Lists, Certificates of Origin, and Bills of Lading—to ensure accurate Harmonized System (HS) tariff classification, duty computation, and timely electronic declaration filing before arrival at the destination port or airport.'
  },
  {
    question: 'What information is needed to receive an international freight quotation?',
    answer: 'To provide a tailored and accurate freight quote, we require: origin city and country, destination port or city, preferred mode of transport (ocean, air, road, multimodal), cargo description, total gross weight (kg), package dimensions (cm), and applicable Incoterms (e.g., FOB, CIF, DAP, EXW).'
  },
  {
    question: 'Do you coordinate project cargo and out-of-gauge heavy lift shipments?',
    answer: 'Yes. Royal Global Freight provides dedicated project logistics engineering for non-standard, heavy-lift, and oversized industrial machinery. Our scope covers route surveys, specialized crane and rigging coordination, vessel hold stowage plans, and civil transportation permits.'
  },
  {
    question: 'Can Royal Global Freight coordinate shipments originating from or delivering to India?',
    answer: 'Yes. We coordinate international freight forwarding between major Indian industrial centers (including Nhava Sheva/JNPT, Mundra, Chennai, Kolkata, and New Delhi ICDs) and trade gateways across North America, Europe, the Middle East, Southeast Asia, and Africa.'
  }
];
