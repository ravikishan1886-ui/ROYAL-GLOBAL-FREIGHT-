import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  Building,
  Globe2,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { StorageService } from '../../services/storage';
import { CompanyInfo, ContactEnquiry } from '../../types';
import { generateContactReference, isValidEmail, isValidPhone } from '../../utils/enquiry';
import { Logo } from '../common/Logo';

interface ContactPageProps {
  companyInfo: CompanyInfo;
  onRequestQuote: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ companyInfo, onRequestQuote }) => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name || formData.name.trim().length < 2) {
      errs.name = 'Please provide your full name';
    }
    if (!formData.email || !isValidEmail(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (formData.phone && !isValidPhone(formData.phone)) {
      errs.phone = 'Please provide a valid phone number';
    }
    if (!formData.subject || formData.subject.trim().length < 3) {
      errs.subject = 'Subject is required';
    }
    if (!formData.message || formData.message.trim().length < 8) {
      errs.message = 'Please provide your inquiry message (minimum 8 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const refNumber = generateContactReference();
      const newContact: ContactEnquiry = {
        id: `c-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        referenceNumber: refNumber,
        createdAt: new Date().toISOString(),
        name: formData.name.trim(),
        companyName: formData.companyName.trim() || undefined,
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        status: 'New'
      };

      StorageService.addContact(newContact);
      setIsSubmitting(false);
      setSubmittedRef(refNumber);
    }, 700);
  };

  const handleWhatsAppClick = () => {
    const cleanNumber = companyInfo.whatsAppNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello Royal Global Freight team, I would like to inquire about international shipping services.`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="w-full bg-[#F4F6F9] text-[#182638] animate-fadeIn pb-20">
      
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
          <div className="flex justify-center pb-1">
            <Logo variant="horizontal" theme="dark" size="md" withTagline={true} />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102D50] text-[#DFBF7A] text-xs font-bold uppercase tracking-widest border border-[#C8A45D]/40">
            <Mail className="w-3.5 h-3.5 text-[#C8A45D]" />
            Corporate Communications
          </div>
          <h1 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            CONTACT ROYAL GLOBAL FREIGHT
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-['Inter',sans-serif]">
            Connect with our international logistics specialists for operational consultations, carrier coordination, and corporate account management.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headquarters Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C8A45D]">
                  Operational Gateway
                </span>
                <h3 className="font-['Montserrat',sans-serif] text-xl font-bold text-[#071B36]">
                  Global Trade Operations
                </h3>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#071B36] text-[#C8A45D] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-500 block">Headquarters Address</span>
                    <p className="font-medium text-slate-900 mt-0.5">{companyInfo.address}</p>
                    <p className="text-xs text-slate-500">{companyInfo.city}, {companyInfo.country}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#071B36] text-[#C8A45D] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-500 block">General Telephone</span>
                    <p className="font-mono font-bold text-slate-900 mt-0.5">{companyInfo.phone}</p>
                    <p className="text-xs text-slate-500">24/7 Operations Desk: <span className="font-mono">{companyInfo.emergencyPhone}</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#071B36] text-[#C8A45D] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-500 block">Commercial Inquiries</span>
                    <p className="font-medium text-slate-900 mt-0.5">{companyInfo.email}</p>
                    <p className="text-xs text-slate-500">Average response time: &lt; 4 business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#071B36] text-[#C8A45D] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-500 block">Operational Hours</span>
                    <p className="font-medium text-slate-900 mt-0.5">{companyInfo.workingHours}</p>
                    <p className="text-xs text-slate-500">{companyInfo.supportHours}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Instant Button */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect via WhatsApp Trade Desk</span>
                </button>
              </div>
            </div>

            {/* Google Maps Integration Placeholder */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-3 overflow-hidden">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#071B36] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C8A45D]" />
                  <span>Maritime Tower & Port Gateway Location</span>
                </h4>
                <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Global Gateways
                </span>
              </div>

              <div className="relative h-48 w-full bg-[#071B36] rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center text-center p-4">
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(#C8A45D 1px, transparent 1px), linear-gradient(90deg, #C8A45D 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                  }}
                />
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#C8A45D] text-[#071B36] flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-white tracking-wide">
                    {companyInfo.address}
                  </p>
                  <p className="text-[11px] text-[#DFBF7A]">
                    {companyInfo.city} · Port Terminal Corridor
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Business Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 space-y-8">
              
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C8A45D]">
                  Corporate Form
                </span>
                <h2 className="font-['Montserrat',sans-serif] text-2xl font-extrabold text-[#071B36] uppercase tracking-wide">
                  SEND A BUSINESS INQUIRY
                </h2>
                <p className="text-xs text-slate-500">
                  For formal freight quotations with weight, dimensions, and Incoterms, please use our dedicated{' '}
                  <button onClick={onRequestQuote} className="text-[#C8A45D] font-bold underline hover:text-[#071B36]">
                    Request a Quote
                  </button>{' '}
                  portal.
                </p>
              </div>

              {submittedRef ? (
                <div className="bg-emerald-50 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg text-emerald-900">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Your reference number is <strong className="font-mono text-emerald-950 font-bold">{submittedRef}</strong>. Our customer relations desk has received your note and will review it promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedRef(null);
                      setFormData({
                        name: '',
                        companyName: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 bg-[#071B36] text-white font-bold text-xs rounded-xl hover:bg-[#102D50] transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Eleanor Vance"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                          errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:border-[#C8A45D]'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g. Vance Trading Corp"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#C8A45D] text-sm outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Business Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. evance@vancetrading.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                          errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:border-[#C8A45D]'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Telephone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +44 20 7946 0812"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                          errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:border-[#C8A45D]'
                        }`}
                      />
                      {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Inquiry Subject <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Trade Lane Collaboration / Carrier Agreement Inquiry"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                        errors.subject ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:border-[#C8A45D]'
                      }`}
                    />
                    {errors.subject && <p className="text-xs text-rose-500 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Inquiry Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your cargo inquiries, project schedules, or general forwarding questions..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                        errors.message ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:border-[#C8A45D]'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-['Montserrat',sans-serif] font-bold text-xs uppercase tracking-wider bg-[#071B36] hover:bg-[#102D50] text-white transition shadow-lg cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>SENDING INQUIRY...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#C8A45D]" />
                          <span>SEND BUSINESS INQUIRY</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
