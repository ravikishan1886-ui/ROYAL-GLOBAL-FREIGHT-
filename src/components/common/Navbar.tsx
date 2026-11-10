import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Shield, Search, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { CompanyInfo } from '../../types';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onRequestQuote: () => void;
  onOpenTracking: () => void;
  companyInfo: CompanyInfo;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onRequestQuote,
  onOpenTracking,
  companyInfo
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'network', label: 'Global Network' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Corporate Micro-Bar */}
      <div className="bg-[#041021] text-xs text-slate-300 border-b border-[#C8A45D]/20 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block font-semibold text-[#DFBF7A] uppercase tracking-wider text-[10px]">
              International Freight Forwarding & Logistics
            </span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <div className="flex items-center gap-1.5 text-slate-300 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-[#C8A45D]" />
              <span className="font-mono text-[11px]">{companyInfo.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={onOpenTracking}
              className="flex items-center gap-1.5 text-[#DFBF7A] hover:text-white transition font-medium cursor-pointer"
            >
              <Search className="w-3 h-3" />
              <span>Track Shipment</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1 transition cursor-pointer ${
                activePage === 'admin' ? 'text-[#C8A45D] font-bold' : 'text-slate-400 hover:text-[#C8A45D]'
              }`}
              title="Staff & Operations Portal"
            >
              <Shield className="w-3 h-3 text-[#C8A45D]" />
              <span className="text-[10px] uppercase tracking-wider">Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        style={{ backgroundColor: '#ffffff' }}
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-md shadow-xl py-3 border-b border-[#C8A45D]/30'
            : 'py-4 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo on Left - Full Company Name & Official Emblem */}
          <div onClick={() => handleNavClick('home')} className="cursor-pointer py-1">
            <Logo variant="horizontal" theme="light" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-sm font-semibold tracking-wide transition-all relative py-1 cursor-pointer ${
                      isActive
                        ? 'text-[#C8A45D] font-bold'
                        : 'text-[#182638] hover:text-[#C8A45D]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8A45D] rounded-full animate-fadeIn" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Prominent Gold Quote Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={onRequestQuote}
                className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-['Montserrat',sans-serif] font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#C8A45D] via-[#DFBF7A] to-[#C8A45D] text-[#071B36] shadow-lg shadow-[#C8A45D]/20 hover:shadow-[#C8A45D]/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onRequestQuote}
              className="px-3 py-1.5 rounded-lg bg-[#C8A45D] text-[#071B36] font-bold text-[11px] tracking-wider uppercase"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ backgroundColor: '#a8a8a8' }}
              className="p-2 text-slate-200 hover:text-white rounded-lg border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" style={{ backgroundColor: '#776161' }} />
              ) : (
                <Menu className="w-6 h-6" style={{ backgroundColor: '#776161' }} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[100px] bottom-0 z-30 bg-[#071B36]/98 backdrop-blur-xl border-b border-[#C8A45D]/30 p-6 flex flex-col justify-between overflow-y-auto animate-fadeIn">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left text-base font-bold py-3 px-4 rounded-xl transition cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-[#C8A45D]/20 text-[#DFBF7A] border border-[#C8A45D]/40'
                        : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0A2242] border border-slate-700 text-slate-200 font-semibold text-sm"
              >
                <Search className="w-4 h-4 text-[#C8A45D]" />
                <span>Track Shipment Cargo</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#C8A45D] to-[#DFBF7A] text-[#071B36] font-bold text-sm tracking-wider uppercase shadow-lg shadow-[#C8A45D]/20"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-2">
            <p className="font-semibold text-[#DFBF7A]">Royal Global Freight Operations</p>
            <p>{companyInfo.address}</p>
            <div className="flex items-center justify-between pt-2">
              <span className="font-mono">{companyInfo.phone}</span>
              <button
                onClick={() => handleNavClick('admin')}
                className="text-[#C8A45D] hover:underline flex items-center gap-1 font-semibold"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
