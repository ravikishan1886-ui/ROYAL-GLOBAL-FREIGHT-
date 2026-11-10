import { EnquiryStatus, QuoteEnquiry } from '../types';

/**
 * Generates an official Royal Global Freight Quote Reference Number
 * Format: RGF-Q-YYYY-[5 random alphanumeric chars]
 */
export function generateQuoteReference(year: number = new Date().getFullYear()): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RGF-Q-${year}-${random}`;
}

/**
 * Generates an official Royal Global Freight Contact Enquiry Reference Number
 * Format: RGF-C-YYYY-[5 random alphanumeric chars]
 */
export function generateContactReference(year: number = new Date().getFullYear()): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RGF-C-${year}-${random}`;
}

/**
 * Generates an official Tracking Number for Future-Ready Architecture
 * Format: RGF-TRK-[6 alphanumeric chars]
 */
export function generateTrackingNumber(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let random = '';
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RGF-TRK-${random}`;
}

/**
 * Validates international email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email.trim());
}

/**
 * Validates phone numbers (accepts international formats: +, digits, spaces, hyphens)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const digitsOnly = phone.replace(/[^0-9]/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 16;
}

export interface QuoteValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates complete freight quotation enquiry payload
 */
export function validateQuoteData(data: Partial<QuoteEnquiry>): QuoteValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required (minimum 2 characters)';
  }

  if (!data.companyName || data.companyName.trim().length < 2) {
    errors.companyName = 'Company Name is required';
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'A valid business email address is required';
  }

  if (!data.phoneNumber || !isValidPhone(data.phoneNumber)) {
    errors.phoneNumber = 'A valid phone number is required (min 7 digits)';
  }

  if (!data.country || data.country.trim().length < 2) {
    errors.country = 'Customer country is required';
  }

  if (!data.originCountry || data.originCountry.trim().length < 2) {
    errors.originCountry = 'Origin Country is required';
  }

  if (!data.originCity || data.originCity.trim().length < 2) {
    errors.originCity = 'Origin City is required';
  }

  if (!data.destinationCountry || data.destinationCountry.trim().length < 2) {
    errors.destinationCountry = 'Destination Country is required';
  }

  if (!data.destinationCity || data.destinationCity.trim().length < 2) {
    errors.destinationCity = 'Destination City is required';
  }

  if (!data.shipmentMode) {
    errors.shipmentMode = 'Please select a shipment mode';
  }

  if (!data.cargoType || data.cargoType.trim().length < 2) {
    errors.cargoType = 'Cargo Type is required (e.g. General Cargo, Electronics, Perishable)';
  }

  if (!data.cargoDescription || data.cargoDescription.trim().length < 5) {
    errors.cargoDescription = 'Please provide a clear cargo description (minimum 5 characters)';
  }

  if (data.numberOfPackages === undefined || data.numberOfPackages === null || data.numberOfPackages <= 0) {
    errors.numberOfPackages = 'Number of packages must be greater than 0';
  }

  if (data.grossWeightKg === undefined || data.grossWeightKg === null || data.grossWeightKg <= 0) {
    errors.grossWeightKg = 'Gross weight must be greater than 0 kg';
  }

  if (!data.incoterms || data.incoterms.trim().length === 0) {
    errors.incoterms = 'Please select an Incoterm (e.g. FOB, CIF, EXW)';
  }

  if (!data.expectedShippingDate) {
    errors.expectedShippingDate = 'Expected shipping date is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates enquiry status transitions in the logistics management workflow
 */
export function isValidStatusTransition(current: EnquiryStatus, next: EnquiryStatus): boolean {
  if (current === next) return true;
  
  // Cancelled or Completed can only be reopened by explicitly switching back to Under Review
  if (current === 'Cancelled') {
    return next === 'Under Review' || next === 'New';
  }
  
  const allowedNext: Record<EnquiryStatus, EnquiryStatus[]> = {
    'New': ['Under Review', 'Quotation Sent', 'Cancelled'],
    'Under Review': ['Quotation Sent', 'In Discussion', 'Cancelled'],
    'Quotation Sent': ['In Discussion', 'Completed', 'Cancelled', 'Under Review'],
    'In Discussion': ['Completed', 'Quotation Sent', 'Cancelled', 'Under Review'],
    'Completed': ['In Discussion', 'Under Review'],
    'Cancelled': ['Under Review', 'New']
  };

  return allowedNext[current]?.includes(next) ?? false;
}
