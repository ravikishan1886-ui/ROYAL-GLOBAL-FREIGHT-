import React from 'react';
import { ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';
import { CompanyInfo } from '../../types';

interface CtaBannerProps {
  onRequestQuote: () => void;
  onContactUs: () => void;
  companyInfo: CompanyInfo;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  onRequestQuote,
  onContactUs,
  companyInfo
}) => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#071B36] via-[#102D50] to-[#071B36] text-white relative overflow-hidden border-t border-[#C8A45D]/30">
      {/* Decorative Radial Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A45D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#041021]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C8A45D]/15 border border-[#C8A45D]/40 text-[#DFBF7A] text-xs font-bold uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C8A45D]" />
          Commercial Freight Inquiry
        </div>

        <h2 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
          LET'S MOVE YOUR BUSINESS FORWARD
        </h2>

        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-['Inter',sans-serif] leading-relaxed">
          Looking for a dependable freight forwarding partner? Connect with Royal Global Freight to discuss your shipping requirements.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onRequestQuote}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-['Montserrat',sans-serif] font-extrabold text-xs uppercase tracking-widest bg-gradient-to-r from-[#C8A45D] via-[#DFBF7A] to-[#C8A45D] text-[#071B36] shadow-xl shadow-[#C8A45D]/25 hover:shadow-[#C8A45D]/40 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <span>REQUEST A QUOTE</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onContactUs}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-['Montserrat',sans-serif] font-bold text-xs uppercase tracking-widest text-white bg-white/10 hover:bg-white/15 border border-[#C8A45D]/40 transition cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-[#C8A45D]" />
            <span>CONTACT OUR TEAM</span>
          </button>
        </div>

        <div className="pt-4 text-xs text-slate-400">
          <span>Priority Trade Desk: </span>
          <span className="font-mono text-white font-semibold">{companyInfo.phone}</span>
          <span className="mx-2">·</span>
          <span>Inquiries: </span>
          <span className="text-[#DFBF7A]">{companyInfo.email}</span>
        </div>
      </div>
    </section>
  );
};
