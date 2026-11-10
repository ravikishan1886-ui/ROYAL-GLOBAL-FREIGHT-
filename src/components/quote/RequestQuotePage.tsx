import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Ship,
  Plane,
  Truck,
  Boxes,
  CheckCircle2,
  AlertCircle,
  Upload,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { StorageService } from '../../services/storage';
import { QuoteEnquiry, ShipmentMode } from '../../types';
import { generateQuoteReference, validateQuoteData } from '../../utils/enquiry';
import { Logo } from '../common/Logo';

interface RequestQuotePageProps {
  onQuoteSubmitted?: (refNumber: string) => void;
  onExploreServices: () => void;
  onNavigateHome: () => void;
}

export const RequestQuotePage: React.FC<RequestQuotePageProps> = ({
  onQuoteSubmitted,
  onExploreServices,
  onNavigateHome
}) => {
  // Form State
  const [formData, setFormData] = useState<Partial<QuoteEnquiry>>({
    fullName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    country: '',
    originCountry: '',
    originCity: '',
    destinationCountry: '',
    destinationCity: '',
    shipmentMode: 'ocean',
    cargoType: '',
    cargoDescription: '',
    numberOfPackages: 1,
    grossWeightKg: 100,
    dimensionsCm: '',
    incoterms: 'FOB',
    expectedShippingDate: '',
    additionalRequirements: '',
    documentName: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const shipmentModes: { id: ShipmentMode; label: string; icon: any; desc: string }[] = [
    { id: 'ocean', label: 'Ocean Freight', icon: Ship, desc: 'FCL & LCL Sea Container Transport' },
    { id: 'air', label: 'Air Freight', icon: Plane, desc: 'Expedited International Aviation Cargo' },
    { id: 'road', label: 'Road Freight', icon: Truck, desc: 'Domestic & Cross-Border Haulage' },
    { id: 'multimodal', label: 'Multimodal', icon: Boxes, desc: 'Integrated Sea, Air & Road Solutions' }
  ];

  const incotermOptions = [
    { code: 'FOB', label: 'FOB – Free On Board (Standard for Sea Freight)' },
    { code: 'CIF', label: 'CIF – Cost, Insurance and Freight (Port Delivery)' },
    { code: 'EXW', label: 'EXW – Ex Works (Origin Factory Pickup)' },
    { code: 'CFR', label: 'CFR – Cost and Freight' },
    { code: 'DAP', label: 'DAP – Delivered at Place' },
    { code: 'DDP', label: 'DDP – Delivered Duty Paid (Door Delivery)' },
    { code: 'FCA', label: 'FCA – Free Carrier' },
    { code: 'CIP', label: 'CIP – Carriage and Insurance Paid To' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Clear field-specific error on edit
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleModeSelect = (mode: ShipmentMode) => {
    setFormData(prev => ({ ...prev, shipmentMode: mode }));
    if (errors.shipmentMode) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.shipmentMode;
        return next;
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setFormData(prev => ({ ...prev, documentName: file.name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submission if already submitted
    if (submittedRef) return;

    // Validate payload
    const validation = validateQuoteData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Scroll to first error
      const firstErrorField = Object.keys(validation.errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable submission network latency
    setTimeout(() => {
      const refNumber = generateQuoteReference();
      const newEnquiry: QuoteEnquiry = {
        id: `q-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        referenceNumber: refNumber,
        createdAt: new Date().toISOString(),
        status: 'New',
        fullName: formData.fullName!.trim(),
        companyName: formData.companyName!.trim(),
        email: formData.email!.trim(),
        phoneNumber: formData.phoneNumber!.trim(),
        country: formData.country!.trim(),
        originCountry: formData.originCountry!.trim(),
        originCity: formData.originCity!.trim(),
        destinationCountry: formData.destinationCountry!.trim(),
        destinationCity: formData.destinationCity!.trim(),
        shipmentMode: formData.shipmentMode as ShipmentMode,
        cargoType: formData.cargoType!.trim(),
        cargoDescription: formData.cargoDescription!.trim(),
        numberOfPackages: Number(formData.numberOfPackages) || 1,
        grossWeightKg: Number(formData.grossWeightKg) || 1,
        dimensionsCm: formData.dimensionsCm || '',
        incoterms: formData.incoterms || 'FOB',
        expectedShippingDate: formData.expectedShippingDate || '',
        additionalRequirements: formData.additionalRequirements || '',
        documentName: uploadedFileName || undefined
      };

      // Persist to store (synchronized with Admin Dashboard)
      StorageService.addQuote(newEnquiry);

      setIsSubmitting(false);
      setSubmittedRef(refNumber);
      if (onQuoteSubmitted) {
        onQuoteSubmitted(refNumber);
      }
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }, 900);
  };

  const copyRefToClipboard = () => {
    if (submittedRef) {
      navigator.clipboard?.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Submission Confirmation View
  if (submittedRef) {
    return (
      <div className="w-full bg-[#F4F6F9] min-h-[80vh] py-16 px-4 sm:px-8 animate-fadeIn flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl border-2 border-[#C8A45D]/40 shadow-2xl p-8 sm:p-12 text-center space-y-6">
          
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-600 shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#071B36] bg-[#071B36]/10 px-3 py-1 rounded-full">
              Quotation Enquiry Received
            </span>
            <h2 className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#071B36] uppercase tracking-tight">
              YOUR FREIGHT ENQUIRY HAS BEEN LOGGED
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Thank you for submitting your freight details to Royal Global Freight. Our commercial trade desk has received your cargo specifications.
            </p>
          </div>

          {/* Reference Card */}
          <div className="bg-[#071B36] text-white p-5 rounded-2xl border border-[#C8A45D] space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-[#DFBF7A] font-semibold block">
              Unique Reference Number
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-xl sm:text-2xl font-bold text-white tracking-wider">
                {submittedRef}
              </span>
              <button
                onClick={copyRefToClipboard}
                title="Copy reference to clipboard"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#DFBF7A] transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-300">
              Please quote this reference number in all communications with our operations team.
            </p>
          </div>

          {/* Next Steps Guidance */}
          <div className="text-left bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#071B36]">
              What Happens Next:
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <p className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#071B36] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">1</span>
                <span>Our trade desk verifies carrier space allocations, transit routes, and port conditions for {formData.originCity} → {formData.destinationCity}.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#071B36] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">2</span>
                <span>An official freight quotation with confirmed rate validity, sailing schedule, and estimated transit times will be dispatched to <strong className="text-slate-800">{formData.email}</strong>.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#071B36] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">3</span>
                <span>Enquiries are securely catalogued and accessible via the operations control desk.</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setSubmittedRef(null);
                setFormData({
                  fullName: '',
                  companyName: '',
                  email: '',
                  phoneNumber: '',
                  country: '',
                  originCountry: '',
                  originCity: '',
                  destinationCountry: '',
                  destinationCity: '',
                  shipmentMode: 'ocean',
                  cargoType: '',
                  cargoDescription: '',
                  numberOfPackages: 1,
                  grossWeightKg: 100,
                  dimensionsCm: '',
                  incoterms: 'FOB',
                  expectedShippingDate: '',
                  additionalRequirements: '',
                  documentName: ''
                });
                setUploadedFileName('');
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#071B36] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#102D50] transition cursor-pointer"
            >
              Submit Another Enquiry
            </button>
            <button
              onClick={onNavigateHome}
              className="w-full sm:w-auto px-6 py-3 bg-[#C8A45D] text-[#071B36] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#DFBF7A] transition cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F4F6F9] text-[#182638] animate-fadeIn pb-24">
      
      {/* Header Banner */}
      <section className="relative py-16 lg:py-20 bg-[#071B36] text-white overflow-hidden border-b-2 border-[#C8A45D]">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C8A45D 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10 text-center space-y-4">
          <div style={{ backgroundColor: '#ffffff' }} className="flex justify-center pb-1">
            <Logo variant="horizontal" theme="dark" size="md" withTagline={true} titleStyle={{ color: '#000000' }} />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102D50] text-[#DFBF7A] text-xs font-bold uppercase tracking-widest border border-[#C8A45D]/40">
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#C8A45D]" />
            Official Quotation Portal
          </div>
          <h1 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            REQUEST A FREIGHT QUOTATION
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-['Inter',sans-serif]">
            Provide your consignment parameters below. Royal Global Freight will evaluate optimal vessel allocations, transit routes, and commercial freight schedules.
          </p>
        </div>
      </section>

      {/* Main Quotation Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 -mt-8 relative z-20">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-10">
          
          {/* Important Notice */}
          <div className="p-4 bg-[#071B36]/5 rounded-2xl border border-[#C8A45D]/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C8A45D] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700">
              <strong className="text-[#071B36]">Commercial Notice:</strong> This quotation form initiates an official logistics rate enquiry with Royal Global Freight. We do not provide auto-generated rate placeholders; all quotations reflect verified carrier space allocations and current international tariffs.
            </div>
          </div>

          {/* Section 1: Shipment Mode Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-[#071B36] text-[#C8A45D] flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h2 className="font-['Montserrat',sans-serif] text-lg font-bold text-[#071B36] uppercase tracking-wide">
                SELECT SHIPMENT MODE <span className="text-rose-500">*</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {shipmentModes.map((mode) => {
                const Icon = mode.icon;
                const isSelected = formData.shipmentMode === mode.id;
                return (
                  <button
                    type="button"
                    key={mode.id}
                    onClick={() => handleModeSelect(mode.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#C8A45D] bg-[#071B36] text-white shadow-lg shadow-[#071B36]/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/10 text-[#DFBF7A]' : 'bg-slate-100 text-[#071B36]'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#C8A45D] bg-[#C8A45D]' : 'border-slate-300'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#071B36]" />}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm tracking-wide">{mode.label}</h4>
                      <p className={`text-[11px] mt-1 line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {mode.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.shipmentMode && <p className="text-xs text-rose-500 font-semibold">{errors.shipmentMode}</p>}
          </div>

          {/* Section 2: Customer Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-[#071B36] text-[#C8A45D] flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h2 className="font-['Montserrat',sans-serif] text-lg font-bold text-[#071B36] uppercase tracking-wide">
                CUSTOMER & COMPANY DETAILS
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Johnathan Smith"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="companyName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Smith Trading Global Ltd"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.companyName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.companyName && <p className="text-xs text-rose-500 mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Business Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. jsmith@smithtrading.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Phone / Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. +1 (555) 234-8900"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.phoneNumber ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.phoneNumber && <p className="text-xs text-rose-500 mt-1">{errors.phoneNumber}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="country" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Customer Country / Jurisdiction <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="e.g. United Kingdom, Singapore, United States, Germany..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.country ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.country && <p className="text-xs text-rose-500 mt-1">{errors.country}</p>}
              </div>
            </div>
          </div>

          {/* Section 3: Origin & Destination Routing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-[#071B36] text-[#C8A45D] flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h2 className="font-['Montserrat',sans-serif] text-lg font-bold text-[#071B36] uppercase tracking-wide">
                ORIGIN & DESTINATION ROUTING
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="originCountry" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Origin Country <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="originCountry"
                  name="originCountry"
                  value={formData.originCountry}
                  onChange={handleInputChange}
                  placeholder="e.g. China, Japan, Germany..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.originCountry ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.originCountry && <p className="text-xs text-rose-500 mt-1">{errors.originCountry}</p>}
              </div>

              <div>
                <label htmlFor="originCity" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Origin City / Port / Airport <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="originCity"
                  name="originCity"
                  value={formData.originCity}
                  onChange={handleInputChange}
                  placeholder="e.g. Shanghai Port (CNSHA) or Ningbo"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.originCity ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.originCity && <p className="text-xs text-rose-500 mt-1">{errors.originCity}</p>}
              </div>

              <div>
                <label htmlFor="destinationCountry" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Destination Country <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="destinationCountry"
                  name="destinationCountry"
                  value={formData.destinationCountry}
                  onChange={handleInputChange}
                  placeholder="e.g. United States, Netherlands..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.destinationCountry ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.destinationCountry && <p className="text-xs text-rose-500 mt-1">{errors.destinationCountry}</p>}
              </div>

              <div>
                <label htmlFor="destinationCity" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Destination City / Port / Airport <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="destinationCity"
                  name="destinationCity"
                  value={formData.destinationCity}
                  onChange={handleInputChange}
                  placeholder="e.g. Rotterdam (NLRTM) or Los Angeles"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.destinationCity ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.destinationCity && <p className="text-xs text-rose-500 mt-1">{errors.destinationCity}</p>}
              </div>
            </div>
          </div>

          {/* Section 4: Cargo Specifications & Incoterms */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-[#071B36] text-[#C8A45D] flex items-center justify-center font-bold text-xs">
                4
              </span>
              <h2 className="font-['Montserrat',sans-serif] text-lg font-bold text-[#071B36] uppercase tracking-wide">
                CARGO SPECIFICATIONS & INCOTERMS
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cargoType" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Cargo Commodity / Type <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="cargoType"
                  name="cargoType"
                  value={formData.cargoType}
                  onChange={handleInputChange}
                  placeholder="e.g. Machinery Components, Consumer Goods..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.cargoType ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.cargoType && <p className="text-xs text-rose-500 mt-1">{errors.cargoType}</p>}
              </div>

              <div>
                <label htmlFor="incoterms" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Applicable Incoterm <span className="text-rose-500">*</span>
                </label>
                <select
                  id="incoterms"
                  name="incoterms"
                  value={formData.incoterms}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#C8A45D] text-sm outline-none bg-white transition"
                >
                  {incotermOptions.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="numberOfPackages" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Number of Packages / Units <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  id="numberOfPackages"
                  name="numberOfPackages"
                  value={formData.numberOfPackages}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.numberOfPackages ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.numberOfPackages && <p className="text-xs text-rose-500 mt-1">{errors.numberOfPackages}</p>}
              </div>

              <div>
                <label htmlFor="grossWeightKg" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Total Gross Weight (KG) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  step="any"
                  id="grossWeightKg"
                  name="grossWeightKg"
                  value={formData.grossWeightKg}
                  onChange={handleInputChange}
                  placeholder="e.g. 4500"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.grossWeightKg ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.grossWeightKg && <p className="text-xs text-rose-500 mt-1">{errors.grossWeightKg}</p>}
              </div>

              <div>
                <label htmlFor="dimensionsCm" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Cargo Dimensions / Container Size (Optional)
                </label>
                <input
                  type="text"
                  id="dimensionsCm"
                  name="dimensionsCm"
                  value={formData.dimensionsCm}
                  onChange={handleInputChange}
                  placeholder="e.g. 1x 40HC Container or 120x80x160 cm"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#C8A45D] text-sm outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="expectedShippingDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Expected Cargo Ready Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  id="expectedShippingDate"
                  name="expectedShippingDate"
                  value={formData.expectedShippingDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.expectedShippingDate ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.expectedShippingDate && <p className="text-xs text-rose-500 mt-1">{errors.expectedShippingDate}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="cargoDescription" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Detailed Cargo Description & Packaging <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="cargoDescription"
                  name="cargoDescription"
                  rows={3}
                  value={formData.cargoDescription}
                  onChange={handleInputChange}
                  placeholder="Detail packing type (pallets, wooden crates, steel drums), stackability, whether cargo is non-hazardous or requires temperature regulation..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                    errors.cargoDescription ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-[#C8A45D]'
                  }`}
                />
                {errors.cargoDescription && <p className="text-xs text-rose-500 mt-1">{errors.cargoDescription}</p>}
              </div>
            </div>
          </div>

          {/* Section 5: Additional Information & Documents */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-[#071B36] text-[#C8A45D] flex items-center justify-center font-bold text-xs">
                5
              </span>
              <h2 className="font-['Montserrat',sans-serif] text-lg font-bold text-[#071B36] uppercase tracking-wide">
                ADDITIONAL INSTRUCTIONS & ATTACHMENTS
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="additionalRequirements" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Special Delivery Instructions / Port Drayage Requirements (Optional)
                </label>
                <textarea
                  id="additionalRequirements"
                  name="additionalRequirements"
                  rows={2}
                  value={formData.additionalRequirements}
                  onChange={handleInputChange}
                  placeholder="Specify destination lift-gate needs, bonded warehouse holds, certificate of origin requests, or customs brokerage support..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#C8A45D] text-sm outline-none transition"
                />
              </div>

              {/* Document Upload Area */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Upload Commercial Invoice / Packing List (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-[#C8A45D] rounded-2xl p-6 text-center bg-slate-50 transition cursor-pointer relative">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    accept=".pdf,.xlsx,.csv,.doc,.docx,.png,.jpg"
                  />
                  <div className="flex flex-col items-center gap-2 pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#C8A45D]">
                      <Upload className="w-5 h-5" />
                    </div>
                    {uploadedFileName ? (
                      <div className="text-xs">
                        <span className="font-bold text-emerald-600 block">File attached: {uploadedFileName}</span>
                        <span className="text-slate-400">Click to replace file</span>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500">
                        <span className="font-semibold text-[#071B36]">Click to upload</span> or drag and drop shipping manifests
                        <span className="block text-[11px] text-slate-400 mt-0.5">PDF, Word, Excel, Images up to 25MB</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Button and Indicator */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 max-w-sm">
              By submitting, your enquiry is logged directly into Royal Global Freight's quotation queue. An operations specialist will review and respond.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-['Montserrat',sans-serif] font-extrabold text-xs uppercase tracking-widest bg-gradient-to-r from-[#C8A45D] via-[#DFBF7A] to-[#C8A45D] text-[#071B36] shadow-xl shadow-[#C8A45D]/25 transition-all duration-300 ${
                isSubmitting ? 'opacity-70 cursor-wait' : 'hover:shadow-[#C8A45D]/40 hover:-translate-y-0.5 cursor-pointer'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#071B36] border-t-transparent rounded-full animate-spin" />
                  <span>TRANSMITTING ENQUIRY...</span>
                </>
              ) : (
                <>
                  <span>SUBMIT FREIGHT ENQUIRY</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
