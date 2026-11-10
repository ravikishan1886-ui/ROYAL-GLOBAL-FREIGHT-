import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, MapPin, Ship, Plane, Truck, ArrowRight, AlertCircle } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { ShipmentRecord } from '../../types';
import { Logo } from './Logo';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackingNumber?: string;
  onRequestQuote: () => void;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
  isOpen,
  onClose,
  initialTrackingNumber = '',
  onRequestQuote
}) => {
  const [query, setQuery] = useState(initialTrackingNumber);
  const [result, setResult] = useState<ShipmentRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = (trkNum?: string) => {
    const target = (trkNum || query).trim();
    if (!target) {
      setErrorMsg('Please enter a valid tracking reference');
      return;
    }
    setErrorMsg('');
    const found = StorageService.getShipmentByTrackingNumber(target);
    setResult(found || null);
    setHasSearched(true);
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'air': return <Plane className="w-5 h-5 text-[#C8A45D]" />;
      case 'road': return <Truck className="w-5 h-5 text-[#C8A45D]" />;
      default: return <Ship className="w-5 h-5 text-[#C8A45D]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#071B36] border border-[#C8A45D]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-labelledby="tracking-title"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0A2242] border-b border-[#C8A45D]/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo variant="horizontal" theme="dark" size="sm" withTagline={false} />
            <div className="hidden sm:block border-l border-slate-700 pl-4">
              <h3 id="tracking-title" className="text-sm font-bold text-white tracking-wide">
                Cargo Tracking Manifest
              </h3>
              <p className="text-[11px] text-[#DFBF7A]">
                Royal Global Freight Verified Milestone Architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close tracking modal"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Search Box */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#DFBF7A] uppercase tracking-wider block">
              Enter Tracking Reference / Airwaybill / Bill of Lading Number
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setErrorMsg('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g. RGF-TRK-88219 or RGF-TRK-49102"
                className="flex-1 px-4 py-3 bg-[#051429] border border-slate-700 focus:border-[#C8A45D] text-white placeholder-slate-500 rounded-xl outline-none text-sm transition"
              />
              <button
                onClick={() => handleSearch()}
                className="px-6 py-3 bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#071B36] font-bold text-sm rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
            {errorMsg && <p className="text-xs text-rose-400 mt-1">{errorMsg}</p>}

            {/* Quick Demo Search Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400">Sample verified shipments:</span>
              <button
                onClick={() => {
                  setQuery('RGF-TRK-88219');
                  handleSearch('RGF-TRK-88219');
                }}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-[#C8A45D]/30 rounded-md text-xs text-[#DFBF7A] transition font-mono cursor-pointer"
              >
                RGF-TRK-88219 (Ocean)
              </button>
              <button
                onClick={() => {
                  setQuery('RGF-TRK-49102');
                  handleSearch('RGF-TRK-49102');
                }}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-[#C8A45D]/30 rounded-md text-xs text-[#DFBF7A] transition font-mono cursor-pointer"
              >
                RGF-TRK-49102 (Air)
              </button>
            </div>
          </div>

          {/* Search Result */}
          {hasSearched && result && (
            <div className="bg-[#0A2242] border border-[#C8A45D]/30 rounded-xl p-5 space-y-5 animate-fadeIn">
              {/* Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#071B36] border border-[#C8A45D]/40 rounded-xl">
                    {getModeIcon(result.shipmentMode)}
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Tracking Reference</span>
                    <span className="text-lg font-mono font-bold text-white tracking-wider">
                      {result.trackingNumber}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Status:</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {result.status}
                  </span>
                </div>
              </div>

              {/* Transit Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-[#071B36] p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Origin</span>
                  <span className="text-sm font-semibold text-white mt-0.5 block flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                    {result.origin}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Destination</span>
                  <span className="text-sm font-semibold text-white mt-0.5 block flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    {result.destination}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Vessel / Flight</span>
                  <span className="text-sm font-medium text-slate-200 mt-0.5 block truncate">
                    {result.vesselOrFlight || 'Assigned Carrier Transit'}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Estimated Arrival</span>
                  <span className="text-sm font-bold text-[#DFBF7A] mt-0.5 block">
                    {result.estimatedArrival}
                  </span>
                </div>
              </div>

              {/* Milestones Timeline */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Shipment Milestones & Checkpoints
                </h4>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
                  {result.milestones.map((milestone, idx) => (
                    <div key={idx} className="relative group">
                      <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border ${
                        milestone.completed 
                          ? 'bg-[#C8A45D] border-[#DFBF7A] text-[#071B36]' 
                          : 'bg-[#071B36] border-slate-600 text-slate-500'
                      }`}>
                        {milestone.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3 h-3" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-sm font-semibold ${milestone.completed ? 'text-white' : 'text-slate-400'}`}>
                            {milestone.step}
                          </span>
                          <span className="text-[11px] text-[#DFBF7A] font-mono">
                            {milestone.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{milestone.location}</p>
                        {milestone.notes && (
                          <p className="text-xs text-slate-300 italic bg-white/5 p-2 rounded border border-white/5 mt-1">
                            {milestone.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {hasSearched && !result && (
            <div className="bg-[#0A2242] border border-amber-500/30 rounded-xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Record Not Found</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                No active cargo record was located under <span className="font-mono text-[#DFBF7A]">"{query}"</span>. 
                Please verify your booking reference or contact our 24/7 shipment coordination desk.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onRequestQuote();
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C8A45D] text-[#071B36] font-bold text-xs rounded-xl hover:bg-[#DFBF7A] transition"
                >
                  <span>Request a New Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {!hasSearched && (
            <div className="bg-[#0A2242]/50 border border-slate-800 rounded-xl p-6 text-center space-y-2">
              <p className="text-xs text-slate-300">
                Royal Global Freight operates secure digital cargo tracking for registered corporate accounts. 
                Enter your shipment tracking ID above or test with our sample manifests.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
