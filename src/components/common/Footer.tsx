import React from 'react';
import { Mail, Phone, MapPin, Clock, Shield, Globe, ExternalLink, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { CompanyInfo } from '../../types';

interface FooterProps {
  onNavigate: (page: string) => void;
  onRequestQuote: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  companyInfo: CompanyInfo;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onRequestQuote,
  onOpenPrivacy,
  onOpenTerms,
  companyInfo
}) => {
  const currentYear = new Date().getFullYear();

  const servicesList = [
    { title: 'Ocean Freight', mode: 'ocean' },
    { title: 'Air Freight', mode: 'air' },
    { title: 'Road Freight', mode: 'road' },
    { title: 'Customs Clearance', mode: 'services' },
    { title: 'Warehousing & Distribution', mode: 'services' },
    { title: 'Project Cargo', mode: 'services' }
  ];

  return (
    <footer className="w-full bg-[#041021] text-slate-300 border-t-2 border-[#C8A45D]/40 relative overflow-hidden">
      {/* Background Accent Subtle Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C8A45D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#102D50]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Brand & Positioning (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="horizontal" theme="dark" size="md" withTagline={true} imgStyle={{ backgroundColor: '#ffffff' }} />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm font-['Inter',sans-serif]">
              Royal Global Freight provides international freight forwarding, ocean cargo, air transport, and synchronized logistics coordination across premier global trade routes.
            </p>
            <div className="p-3.5 bg-[#071B36] border border-[#C8A45D]/30 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-[#DFBF7A] uppercase tracking-wider block">
                Official Corporate Tagline
              </span>
              <p className="text-xs text-white italic font-serif">
                "{companyInfo.tagline}"
              </p>
            </div>
            
            {/* Social & Corporate Channels */}
            <div className="pt-2">
              <span className="text-xs text-slate-400 block mb-2 font-semibold uppercase tracking-wider">
                Corporate Connectivity
              </span>
              <div className="flex items-center gap-3">
                {['LinkedIn Trade Desk', 'Maritime Exchange', 'Global Cargo Network'].map((name, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 hover:text-[#DFBF7A] hover:border-[#C8A45D]/40 transition"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#DFBF7A] border-b border-[#C8A45D]/30 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About Us', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Global Network', id: 'network' },
                { label: 'Contact Us', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-300 hover:text-[#DFBF7A] transition flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <ArrowRight className="w-3 h-3 text-[#C8A45D]" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Logistics Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#DFBF7A] border-b border-[#C8A45D]/30 pb-2">
              Key Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {servicesList.map((service, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      onNavigate('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-left hover:text-[#DFBF7A] transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" />
                    <span>{service.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Operations & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#DFBF7A] border-b border-[#C8A45D]/30 pb-2">
              Operations & Inquiries
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug">
                  {companyInfo.address}, {companyInfo.city}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <span className="font-mono text-white font-semibold">
                  {companyInfo.phone}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <span className="text-slate-300 truncate">
                  {companyInfo.email}
                </span>
              </div>
              <div className="flex items-start gap-2.5 pt-1 text-slate-400">
                <Clock className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                <div>
                  <p>{companyInfo.workingHours}</p>
                  <p className="text-[#DFBF7A] font-medium">{companyInfo.supportHours}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onRequestQuote}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C8A45D] to-[#DFBF7A] text-[#071B36] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition shadow-md shadow-[#C8A45D]/20 cursor-pointer"
              >
                REQUEST A FREIGHT QUOTE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Privacy & Admin Row */}
        <div className="mt-14 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {currentYear} Royal Global Freight (RGF). All rights reserved.</span>
            <span className="hidden sm:inline-block">·</span>
            <span className="text-slate-500 text-[11px]">Connecting Businesses. Moving the World.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#DFBF7A] transition cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-[#DFBF7A] transition cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('admin')}
              className="text-[#DFBF7A] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Shield className="w-3 h-3 text-[#C8A45D]" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
