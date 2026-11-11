import React from 'react';
import { Ship, ArrowRight, Home, Compass, Phone } from 'lucide-react';
import { Logo } from './Logo';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F4F6F9] px-4 py-16">
      <div className="max-w-2xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl">
        <div className="flex justify-center pb-2">
          <Logo variant="horizontal" theme="light" size="md" />
        </div>

        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-[#071B36] text-[#DFBF7A] text-xs font-mono font-bold tracking-widest">
            ERROR 404 · PAGE NOT FOUND
          </span>
          <h1 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl font-black text-[#071B36] uppercase tracking-tight">
            Off-Route Consignment
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-['Inter',sans-serif] max-w-md mx-auto leading-relaxed">
            The requested logistics URL or route cannot be located. It may have been moved, renamed, or temporarily rescheduled.
          </p>
        </div>

        {/* Quick Navigation Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-[#C8A45D] hover:bg-slate-50 transition cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#071B36] text-[#C8A45D] flex items-center justify-center shrink-0">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#071B36] block group-hover:text-[#C8A45D]">Return to Home</span>
              <span className="text-[10px] text-slate-500">Corporate Portal</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('services')}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-[#C8A45D] hover:bg-slate-50 transition cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#071B36] text-[#DFBF7A] flex items-center justify-center shrink-0">
              <Ship className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#071B36] block group-hover:text-[#C8A45D]">Freight Services</span>
              <span className="text-[10px] text-slate-500">Ocean, Air, Road</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('network')}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-[#C8A45D] hover:bg-slate-50 transition cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#071B36] text-[#C8A45D] flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#071B36] block group-hover:text-[#C8A45D]">Global Corridors</span>
              <span className="text-[10px] text-slate-500">Trade Lanes</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-[#C8A45D] hover:bg-slate-50 transition cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#071B36] text-[#DFBF7A] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#071B36] block group-hover:text-[#C8A45D]">Contact Support</span>
              <span className="text-[10px] text-slate-500">24/7 Operations</span>
            </div>
          </button>
        </div>

        {/* Primary CTA */}
        <div className="pt-2">
          <button
            onClick={() => onNavigate('quote')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C8A45D] via-[#DFBF7A] to-[#C8A45D] text-[#071B36] font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <span>Request a Freight Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
