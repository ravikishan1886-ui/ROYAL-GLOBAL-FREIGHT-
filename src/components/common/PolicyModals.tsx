import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#071B36] border border-[#C8A45D]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        role="dialog"
      >
        <div className="px-6 py-4 bg-[#0A2242] border-b border-[#C8A45D]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C8A45D]/20 rounded-lg text-[#C8A45D]">
              {isPrivacy ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <h3 className="text-lg font-bold text-white">
              {isPrivacy ? 'Privacy & Data Protection Policy' : 'Standard Terms & Conditions of Freight Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto text-sm text-slate-300 space-y-4 leading-relaxed font-['Inter',sans-serif]">
          {isPrivacy ? (
            <>
              <p className="font-semibold text-white">
                Royal Global Freight ("RGF") is committed to maintaining the confidentiality and integrity of customer shipping documentation, cargo manifests, and commercial communications.
              </p>
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1 text-[#DFBF7A]">
                  1. Information Collection
                </h4>
                <p>
                  We collect commercial details necessary to execute freight forwarding services: customer name, corporate entity, contact numbers, origin/destination ports, cargo dimensions, commercial invoices, and regulatory customs documentation.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1 text-[#DFBF7A]">
                  2. Purpose of Processing
                </h4>
                <p>
                  Collected data is strictly utilized for quotation calculation, customs brokerage filings, vessel space allocations, airwaybill generation, and compliance with international trade authorities (e.g. IMO, IATA, World Customs Organization).
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1 text-[#DFBF7A]">
                  3. Data Security & Storage
                </h4>
                <p>
                  All quotation requests, shipment documents, and customer correspondence are stored in encrypted environments. We do not sell or monetize client shipment metrics or trading patterns.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="font-semibold text-white">
                All freight forwarding, ocean carriage coordination, air transport, customs brokerage, and logistics operations are conducted under the Standard Trading Conditions of Royal Global Freight.
              </p>
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1 text-[#DFBF7A]">
                  1. Role as Freight Forwarder
                </h4>
                <p>
                  Royal Global Freight acts as a forwarding agent coordinating transportation with underlying ocean carriers, airlines, terminal operators, and haulage contractors. Carrier bills of lading and air waybills govern carrier liability limits.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1 text-[#DFBF7A]">
                  2. Quotations and Validity
                </h4>
                <p>
                  Quotations provided via our portal represent estimated transit charges based on tariff rates, fuel bunker surcharges (BAF), currency adjustment factors (CAF), and terminal handling charges in effect at the quotation date. Actual charges may vary based on verified cargo weights and carrier space conditions.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1 text-[#DFBF7A]">
                  3. Shipper Warranties & Dangerous Cargo
                </h4>
                <p>
                  The shipper warrants that cargo descriptions are accurate and packaging complies with IMDG / ICAO regulations. Regulated hazardous materials or restricted cargo must be explicitly disclosed in writing prior to booking confirmation.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="px-6 py-4 bg-[#0A2242] border-t border-slate-700/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#071B36] font-bold text-xs rounded-xl transition"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
