export type ShipmentMode = 'ocean' | 'air' | 'road' | 'multimodal';

export type EnquiryStatus = 
  | 'New'
  | 'Under Review'
  | 'Quotation Sent'
  | 'In Discussion'
  | 'Completed'
  | 'Cancelled';

export interface QuoteEnquiry {
  id: string;
  referenceNumber: string;
  createdAt: string;
  status: EnquiryStatus;
  
  // Customer Details
  fullName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  country: string;

  // Shipment Details
  originCountry: string;
  originCity: string;
  destinationCountry: string;
  destinationCity: string;
  shipmentMode: ShipmentMode;
  cargoType: string;
  cargoDescription: string;
  numberOfPackages: number;
  grossWeightKg: number;
  dimensionsCm?: string;
  incoterms: string;
  expectedShippingDate: string;

  // Additional Information
  additionalRequirements?: string;
  documentName?: string;
  notes?: string;
}

export interface ContactEnquiry {
  id: string;
  referenceNumber: string;
  createdAt: string;
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'New' | 'Read' | 'Replied' | 'Archived';
}

export interface CompanyInfo {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  emergencyPhone: string;
  address: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  whatsAppNumber: string;
  workingHours: string;
  supportHours: string;
  gaMeasurementId?: string;
  gscVerificationCode?: string;
}

export interface TrackingMilestone {
  step: string;
  location: string;
  timestamp: string;
  completed: boolean;
  notes?: string;
}

export interface ShipmentRecord {
  trackingNumber: string;
  referenceId: string;
  origin: string;
  destination: string;
  shipmentMode: ShipmentMode;
  status: 'Booked' | 'In Transit' | 'Customs Hold' | 'Customs Cleared' | 'Arrived at Destination Port' | 'Out for Delivery' | 'Delivered';
  carrierName?: string;
  vesselOrFlight?: string;
  estimatedArrival: string;
  lastUpdated: string;
  milestones: TrackingMilestone[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  features: string[];
  mode: ShipmentMode | 'general';
}
