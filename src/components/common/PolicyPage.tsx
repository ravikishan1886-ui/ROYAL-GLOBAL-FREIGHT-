import React from 'react';
import { ShieldCheck, FileText, Lock, Globe, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';

interface PolicyPageProps {
  type: 'privacy' | 'terms';
  onNavigate: (page: string) => void;
  onRequestQuote: () => void;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ type, onNavigate, onRequestQuote }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="w-full bg-[#FFFFFF] text-[#182638] animate-fadeIn">
      {/* Page Header */}
      <section className="relative py-16 sm:py-20 bg-[#071B36] text-white overflow-hidden border-b-2 border-[#C8A45D]">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C8A45D 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102D50] text-[#DFBF7A] text-xs font-bold uppercase tracking-widest border border-[#C8A45D]/40">
            {isPrivacy ? <ShieldCheck className="w-3.5 h-3.5 text-[#C8A45D]" /> : <FileText className="w-3.5 h-3.5 text-[#C8A45D]" />}
            <span>{isPrivacy ? 'Legal & Data Governance' : 'Standard Trading Conditions'}</span>
          </div>

          <h1 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            {isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms & Conditions of Freight Service'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-['Inter',sans-serif]">
            {isPrivacy
              ? 'Transparency, commercial confidentiality, and international compliance for all shipper communications and cargo records.'
              : 'Standard international freight forwarding, ocean carriage, customs brokerage, and logistics operational terms.'}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-[#F4F6F9] border-b border-slate-200">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/', onClick: () => onNavigate('home') },
            { name: isPrivacy ? 'Privacy Policy' : 'Terms & Conditions', path: isPrivacy ? '/privacy-policy' : '/terms-and-conditions' }
          ]}
        />
      </div>

      {/* Main Content Body */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
          {isPrivacy ? (
            <>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-emerald-900 font-medium">
                  Royal Global Freight ("RGF") is committed to preserving the confidentiality, integrity, and security of all commercial shipping documentation, cargo manifests, customer contact records, and customs filings.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-['Montserrat',sans-serif] text-xl font-bold text-[#071B36]">
                  1. Information We Collect
                </h2>
                <p>
                  To provide accurate freight quotations, book carrier vessel slots, execute customs clearance, and issue compliant bills of lading, we collect essential operational information:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
                  <li>Shipper, consignee, and notify party company titles, addresses, and contacts.</li>
                  <li>Commercial cargo invoices, packing lists, HS codes, gross weights, and cubic dimensions.</li>
                  <li>Origin and destination seaports, airports, and inland delivery depot locations.</li>
                  <li>Relevant international trade licenses and authorized tax identification numbers.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="font-['Montserrat',sans-serif] text-xl font-bold text-[#071B36]">
                  2. Purpose & Legal Basis of Processing
                </h2>
                <p>
                  Collected data is strictly used for freight forwarding execution:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
                  <li>Generating formal freight rate estimates and carrier allocation confirmations.</li>
                  <li>Mandatory filings with customs administrations, port gate operators, and aviation security bodies.</li>
                  <li>Transmitting electronic shipment milestone alerts and delivery proofs.</li>
                  <li>Compliance with international maritime safety (SOLAS VGM) and dangerous cargo (IMDG / IATA) laws.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="font-['Montserrat',sans-serif] text-xl font-bold text-[#071B36]">
                  3. Commercial Data Confidentiality
                </h2>
                <p>
                  We strictly treat trade lane data, pricing schedules, and customer vendor lists as proprietary business secrets. Royal Global Freight never sells, rents, or monetizes client cargo data or trade flows to external marketing platforms.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-['Montserrat',sans-serif] text-xl font-bold text-[#071B36]">
                  4. Retention & Security Controls
                </h2>
                <p>
                  All quotation requests, shipment documents, and customer correspondence are stored in encrypted environments with strict role-based access. Documents are retained in compliance with international maritime and tax statutory limitation periods.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                <FileText className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-amber-900 font-medium">
                  All freight forwarding coordination, ocean carriage bookings, air cargo handling, and customs brokerage are conducted under the Standard Trading Conditions of Royal Global Freight.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-['Montserrat',sans-serif] text-xl font-bold text-[#071B36]">
                  1. Role as Freight Forwarder
                </h2>
                <p>
                  Royal Global Freight acts as a forwarding coordinator procuring carriage through contracted ocean shipping lines, commercial cargo airlines, intermodal rail lines, and bonded road hauliers. Carrier terms, conditions, and liability limits set forth in master bills of lading and airwaybills govern actual physical carriage.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-['Montserrat',sans-serif] text-xl font-bold text-[#071B36]">
                  2. Quotations and Validity
                </h2>
                <p>
                  Rates and transit times quoted via this website or formal quotation forms represent estimates based on prevailing bunker adjustment factors (BAF), currency adjustment factors (CAF), and terminal handling fees at the quote date. Final invoice charges are based on certified scale weights, verified dimensional volume, and equipment availability at cargo handover.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-['Montserrat',sans-serif] text-xl font-bold text-[#071B36]">
                  3. Shipper Warranties & Dangerous Cargo
                </h2>
                <p>
                  The customer warrants that all commodity descriptions, gross weights (Verified Gross Mass), and commercial paperwork provided are accurate and lawful. Dangerous, hazardous, or temperature-regulated cargo must be explicitly declared in writing with safety data sheets (SDS) prior to booking acceptance.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-['Montserrat',sans-serif] text-xl font-bold text-[#071B36]">
                  4. Cargo Insurance
                </h2>
                <p>
                  Carrier liability is subject to standard international conventions (Hague-Visby Rules, Warsaw/Montreal Convention). We strongly advise shippers to secure comprehensive all-risk marine cargo insurance for all consignments.
                </p>
              </div>
            </>
          )}

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#071B36] hover:text-[#C8A45D] transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Homepage</span>
            </button>

            <button
              onClick={onRequestQuote}
              className="px-6 py-2.5 bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#071B36] font-extrabold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
            >
              Request a Freight Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
