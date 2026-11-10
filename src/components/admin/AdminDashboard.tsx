import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  LogOut,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Mail,
  Settings,
  Ship,
  Plane,
  Truck,
  Boxes,
  Plus,
  Save,
  X,
  AlertCircle,
  Copy,
  Check,
  MapPin,
  Calendar,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { StorageService } from '../../services/storage';
import {
  QuoteEnquiry,
  ContactEnquiry,
  CompanyInfo,
  ShipmentRecord,
  EnquiryStatus,
  ShipmentMode
} from '../../types';
import { generateTrackingNumber, isValidEmail, isValidStatusTransition } from '../../utils/enquiry';
import { Logo } from '../common/Logo';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onRequestQuote: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite, onRequestQuote }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'quotes' | 'contacts' | 'company' | 'tracking' | 'services'>('quotes');

  // Data States
  const [quotes, setQuotes] = useState<QuoteEnquiry[]>([]);
  const [contacts, setContacts] = useState<ContactEnquiry[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(StorageService.getCompanyInfo());
  const [trackingRecords, setTrackingRecords] = useState<ShipmentRecord[]>([]);

  // Search & Filter States
  const [quoteSearch, setQuoteSearch] = useState('');
  const [quoteStatusFilter, setQuoteStatusFilter] = useState<string>('all');
  const [contactSearch, setContactSearch] = useState('');
  const [contactStatusFilter, setContactStatusFilter] = useState<string>('all');

  // Selected Detail Modal
  const [selectedQuote, setSelectedQuote] = useState<QuoteEnquiry | null>(null);
  const [statusUpdateNotes, setStatusUpdateNotes] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Tracking Record Modal
  const [showAddTrackingModal, setShowAddTrackingModal] = useState(false);
  const [newTracking, setNewTracking] = useState<Partial<ShipmentRecord>>({
    trackingNumber: generateTrackingNumber(),
    referenceId: '',
    origin: '',
    destination: '',
    shipmentMode: 'ocean',
    status: 'Booked',
    carrierName: '',
    vesselOrFlight: '',
    estimatedArrival: '',
    milestones: []
  });

  // Load data & subscribe
  useEffect(() => {
    setIsAuthenticated(StorageService.isAdminAuthenticated());
    loadAllData();

    const unsubscribe = StorageService.getCompanyInfo(); // test read
    return StorageService.isAdminAuthenticated() ? () => {} : undefined;
  }, []);

  const loadAllData = () => {
    setQuotes(StorageService.getQuotes());
    setContacts(StorageService.getContacts());
    setCompanyInfo(StorageService.getCompanyInfo());
    setTrackingRecords(StorageService.getShipmentRecords());
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    // Secure authentication check (Admin credentials)
    // Email: admin@royalglobalfreight.com
    // Password: RoyalFreight2026!
    const validEmail = 'admin@royalglobalfreight.com';
    const validPass = 'RoyalFreight2026!';

    if (
      authEmail.trim().toLowerCase() === validEmail.toLowerCase() &&
      authPassword === validPass
    ) {
      StorageService.setAdminAuthenticated(true);
      setIsAuthenticated(true);
      loadAllData();
    } else {
      setAuthError('Invalid administrator credentials. Please check your email and security key.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    StorageService.setAdminAuthenticated(false);
    setIsAuthenticated(false);
    setAuthEmail('');
    setAuthPassword('');
  };

  // Handle Quote Status Change
  const handleUpdateQuoteStatus = (newStatus: EnquiryStatus) => {
    if (!selectedQuote) return;
    StorageService.updateQuoteStatus(selectedQuote.id, newStatus, statusUpdateNotes);
    const updated = StorageService.getQuotes();
    setQuotes(updated);
    setSelectedQuote(updated.find(q => q.id === selectedQuote.id) || null);
    setSaveSuccessMsg(`Status updated to "${newStatus}"`);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Handle Contact Status Change
  const handleUpdateContactStatus = (id: string, newStatus: ContactEnquiry['status']) => {
    StorageService.updateContactStatus(id, newStatus);
    setContacts(StorageService.getContacts());
  };

  // Handle Company Info Save
  const handleSaveCompanyInfo = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.updateCompanyInfo(companyInfo);
    setSaveSuccessMsg('Company operational information saved successfully.');
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  // Handle Add Tracking Record
  const handleSaveTrackingRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTracking.origin || !newTracking.destination) {
      alert('Please provide origin and destination');
      return;
    }

    const trkRecord: ShipmentRecord = {
      trackingNumber: newTracking.trackingNumber || generateTrackingNumber(),
      referenceId: newTracking.referenceId || 'DIRECT-BOOKING',
      origin: newTracking.origin!,
      destination: newTracking.destination!,
      shipmentMode: (newTracking.shipmentMode as ShipmentMode) || 'ocean',
      status: (newTracking.status as any) || 'Booked',
      carrierName: newTracking.carrierName || 'Contracted Fleet',
      vesselOrFlight: newTracking.vesselOrFlight || 'Scheduled Departure',
      estimatedArrival: newTracking.estimatedArrival || 'TBD',
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      milestones: [
        {
          step: 'Consignment Registered',
          location: newTracking.origin!,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
          completed: true
        },
        {
          step: 'Cargo Dispatched to Terminal',
          location: 'Origin Inland Terminal',
          timestamp: 'Scheduled',
          completed: false
        }
      ]
    };

    StorageService.saveShipmentRecord(trkRecord);
    setTrackingRecords(StorageService.getShipmentRecords());
    setShowAddTrackingModal(false);
    setNewTracking({
      trackingNumber: generateTrackingNumber(),
      referenceId: '',
      origin: '',
      destination: '',
      shipmentMode: 'ocean',
      status: 'Booked',
      carrierName: '',
      vesselOrFlight: '',
      estimatedArrival: '',
      milestones: []
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered Quotes
  const filteredQuotes = quotes.filter(q => {
    const matchesSearch =
      q.referenceNumber.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.fullName.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.companyName.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.originCity.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.destinationCity.toLowerCase().includes(quoteSearch.toLowerCase());
    const matchesStatus = quoteStatusFilter === 'all' || q.status === quoteStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Contacts
  const filteredContacts = contacts.filter(c => {
    const matchesSearch =
      c.referenceNumber.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
      (c.companyName && c.companyName.toLowerCase().includes(contactSearch.toLowerCase())) ||
      c.subject.toLowerCase().includes(contactSearch.toLowerCase());
    const matchesStatus = contactStatusFilter === 'all' || c.status === contactStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: EnquiryStatus) => {
    switch (status) {
      case 'New': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Under Review': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Quotation Sent': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'In Discussion': return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Cancelled': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-[85vh] bg-[#071B36] flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
        <div className="max-w-md w-full bg-[#0A2242] border border-[#C8A45D]/40 rounded-3xl p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <Logo variant="horizontal" size="md" theme="dark" />
            </div>
            <h2 className="font-['Montserrat',sans-serif] text-lg font-black text-white uppercase tracking-wider">
              OPERATIONS COMMAND PORTAL
            </h2>
            <p className="text-xs text-slate-400">
              Authorized Logistics Administrator & Staff Gateway
            </p>
          </div>

          {authError && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@royalglobalfreight.com"
                className="w-full px-4 py-3 rounded-xl bg-[#071B36] border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-[#C8A45D] outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Security Passcode
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#071B36] border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-[#C8A45D] outline-none transition"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-['Montserrat',sans-serif] font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#C8A45D] to-[#DFBF7A] text-[#071B36] shadow-lg shadow-[#C8A45D]/20 hover:shadow-[#C8A45D]/40 transition cursor-pointer"
              >
                AUTHENTICATE & ENTER PORTAL
              </button>
            </div>
          </form>

          {/* Quick-Access Demo Hint for Staff Evaluation */}
          <div className="p-3 bg-[#071B36] border border-slate-800 rounded-xl space-y-1 text-center">
            <span className="text-[10px] uppercase font-bold text-[#DFBF7A] block">
              Official Demo Credentials
            </span>
            <p className="text-[11px] text-slate-300 font-mono">
              Email: <span className="text-white">admin@royalglobalfreight.com</span>
            </p>
            <p className="text-[11px] text-slate-300 font-mono">
              Key: <span className="text-white">RoyalFreight2026!</span>
            </p>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onBackToSite}
              className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
            >
              ← Return to Public Website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="w-full min-h-screen bg-[#041021] text-slate-200 animate-fadeIn">
      
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-30 bg-[#071B36] border-b border-[#C8A45D]/30 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0A2242] border border-[#C8A45D] flex items-center justify-center text-[#DFBF7A]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-['Montserrat',sans-serif] text-sm sm:text-base font-extrabold text-white tracking-wider uppercase">
              ROYAL GLOBAL FREIGHT — Operations Command Center
            </h1>
            <p className="text-[10px] text-[#DFBF7A]">
              Royal Global Freight Management Desk · Logged in as Administrator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={onBackToSite}
            className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Live Website</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Success Banner if status changed */}
        {saveSuccessMsg && (
          <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{saveSuccessMsg}</span>
            </div>
            <button onClick={() => setSaveSuccessMsg('')} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Overview Metric Cards (4 Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#071B36] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Total Quotes</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">{quotes.length}</span>
              <FileSpreadsheet className="w-5 h-5 text-[#C8A45D]" />
            </div>
            <p className="text-[11px] text-slate-400">
              <span className="text-emerald-400 font-bold">{quotes.filter(q => q.status === 'New').length}</span> pending review
            </p>
          </div>

          <div className="bg-[#071B36] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Quotations Sent</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                {quotes.filter(q => q.status === 'Quotation Sent' || q.status === 'In Discussion' || q.status === 'Completed').length}
              </span>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-[11px] text-slate-400">Dispatched to cargo shippers</p>
          </div>

          <div className="bg-[#071B36] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Contact Messages</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">{contacts.length}</span>
              <Mail className="w-5 h-5 text-sky-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              <span className="text-sky-400 font-bold">{contacts.filter(c => c.status === 'New').length}</span> unread inquiries
            </p>
          </div>

          <div className="bg-[#071B36] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Active Tracking Manifests</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">{trackingRecords.length}</span>
              <Ship className="w-5 h-5 text-[#DFBF7A]" />
            </div>
            <p className="text-[11px] text-slate-400">Future-ready architecture</p>
          </div>
        </div>

        {/* Dashboard Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'quotes', label: `Quotation Enquiries (${quotes.length})`, icon: FileSpreadsheet },
            { id: 'contacts', label: `Contact Inquiries (${contacts.length})`, icon: Mail },
            { id: 'company', label: 'Company Info & Hotlines', icon: Settings },
            { id: 'tracking', label: `Shipment Tracking Records (${trackingRecords.length})`, icon: Ship },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#C8A45D] text-[#071B36] shadow-md shadow-[#C8A45D]/20'
                    : 'bg-[#071B36] text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Quotation Enquiries */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            
            {/* Search & Filter Toolbar */}
            <div className="bg-[#071B36] p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={quoteSearch}
                  onChange={(e) => setQuoteSearch(e.target.value)}
                  placeholder="Search by Ref, Company, Port..."
                  className="w-full pl-9 pr-4 py-2 bg-[#0A2242] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={quoteStatusFilter}
                  onChange={(e) => setQuoteStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0A2242] border border-slate-700 text-xs rounded-xl text-white outline-none focus:border-[#C8A45D]"
                >
                  <option value="all">All Statuses ({quotes.length})</option>
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Quotation Sent">Quotation Sent</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <button
                  onClick={onRequestQuote}
                  className="px-3 py-2 bg-[#C8A45D] text-[#071B36] font-bold text-xs rounded-xl hover:bg-[#DFBF7A] transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Quote Entry</span>
                </button>
              </div>
            </div>

            {/* Quotations Table */}
            <div className="bg-[#071B36] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0A2242] text-slate-400 border-b border-slate-700/80 uppercase font-bold tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Ref Number</th>
                      <th className="py-3.5 px-4">Customer & Company</th>
                      <th className="py-3.5 px-4">Route</th>
                      <th className="py-3.5 px-4">Mode / Cargo</th>
                      <th className="py-3.5 px-4">Weight</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredQuotes.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          No quotation enquiries match the selected filter.
                        </td>
                      </tr>
                    ) : (
                      filteredQuotes.map((q) => (
                        <tr key={q.id} className="hover:bg-[#0A2242]/50 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-white">
                            <div className="flex items-center gap-1.5">
                              <span>{q.referenceNumber}</span>
                              <button
                                onClick={() => copyToClipboard(q.referenceNumber)}
                                className="text-slate-500 hover:text-[#C8A45D]"
                                title="Copy"
                              >
                                {copiedId === q.referenceNumber ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-white block">{q.companyName}</span>
                            <span className="text-[11px] text-slate-400">{q.fullName} · {q.email}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-slate-200 font-medium block">{q.originCity} ({q.originCountry})</span>
                            <span className="text-slate-400 text-[11px] block">→ {q.destinationCity} ({q.destinationCountry})</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="uppercase font-bold text-[10px] text-[#DFBF7A] block">{q.shipmentMode}</span>
                            <span className="text-slate-300 truncate max-w-[140px] block">{q.cargoType}</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            {q.grossWeightKg.toLocaleString()} kg
                            <span className="text-slate-500 block text-[10px]">{q.numberOfPackages} pkgs</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeClass(q.status)}`}>
                              {q.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedQuote(q);
                                setStatusUpdateNotes(q.notes || '');
                              }}
                              className="px-3 py-1.5 bg-[#0A2242] hover:bg-[#C8A45D] text-slate-300 hover:text-[#071B36] font-bold rounded-lg border border-slate-700 transition cursor-pointer"
                            >
                              Inspect Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Contact Inquiries */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <div className="bg-[#071B36] p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  placeholder="Search inquiries..."
                  className="w-full pl-9 pr-4 py-2 bg-[#0A2242] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-[#C8A45D]"
                />
              </div>

              <select
                value={contactStatusFilter}
                onChange={(e) => setContactStatusFilter(e.target.value)}
                className="px-3 py-2 bg-[#0A2242] border border-slate-700 text-xs rounded-xl text-white outline-none focus:border-[#C8A45D]"
              >
                <option value="all">All Messages ({contacts.length})</option>
                <option value="New">New</option>
                <option value="Read">Read</option>
                <option value="Replied">Replied</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="space-y-3">
              {filteredContacts.length === 0 ? (
                <div className="bg-[#071B36] border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
                  No contact messages match your filter.
                </div>
              ) : (
                filteredContacts.map((c) => (
                  <div key={c.id} className="bg-[#071B36] border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#DFBF7A]">{c.referenceNumber}</span>
                        <span className="text-white font-bold text-sm">{c.name}</span>
                        {c.companyName && (
                          <span className="text-xs text-slate-400">({c.companyName})</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 font-mono">
                          {c.createdAt.replace('T', ' ').substring(0, 16)}
                        </span>
                        <select
                          value={c.status}
                          onChange={(e) => handleUpdateContactStatus(c.id, e.target.value as any)}
                          className="px-2.5 py-1 bg-[#0A2242] border border-slate-700 rounded-lg text-xs font-bold text-[#C8A45D] outline-none"
                        >
                          <option value="New">Status: New</option>
                          <option value="Read">Status: Read</option>
                          <option value="Replied">Status: Replied</option>
                          <option value="Archived">Status: Archived</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-200">Subject: {c.subject}</h4>
                      <p className="text-xs text-slate-300 bg-[#0A2242] p-3 rounded-xl border border-slate-800 leading-relaxed">
                        {c.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                      <span>Email: <strong className="text-white">{c.email}</strong></span>
                      {c.phone && <span>Phone: <strong className="text-white font-mono">{c.phone}</strong></span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Company Operational Information Editor */}
        {activeTab === 'company' && (
          <form onSubmit={handleSaveCompanyInfo} className="bg-[#071B36] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="font-['Montserrat',sans-serif] text-base font-bold text-white uppercase tracking-wider">
                EDIT COMPANY CONTACT INFORMATION & OPERATIONS HOTLINES
              </h3>
              <p className="text-xs text-slate-400">
                Changes saved here instantly update across the website navigation, contact page, and footer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Company Legal Title
                </label>
                <input
                  type="text"
                  value={companyInfo.companyName}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Official Corporate Tagline
                </label>
                <input
                  type="text"
                  value={companyInfo.tagline}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Primary Customer Email
                </label>
                <input
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  General Telephone Line
                </label>
                <input
                  type="text"
                  value={companyInfo.phone}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  24/7 Operations Desk Hotline
                </label>
                <input
                  type="text"
                  value={companyInfo.emergencyPhone}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, emergencyPhone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  WhatsApp Direct Number
                </label>
                <input
                  type="text"
                  value={companyInfo.whatsAppNumber}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, whatsAppNumber: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Headquarters Street Address
                </label>
                <input
                  type="text"
                  value={companyInfo.address}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Working Hours Description
                </label>
                <input
                  type="text"
                  value={companyInfo.workingHours}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, workingHours: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Support Coverage Label
                </label>
                <input
                  type="text"
                  value={companyInfo.supportHours}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, supportHours: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#C8A45D]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#071B36] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>SAVE OPERATIONAL SETTINGS</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: Shipment Tracking Records (Future-Ready Architecture) */}
        {activeTab === 'tracking' && (
          <div className="space-y-4">
            <div className="bg-[#071B36] p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white">Consignment Tracking Database</h3>
                <p className="text-xs text-slate-400">Future-ready architecture for container and airwaybill milestones.</p>
              </div>
              <button
                onClick={() => setShowAddTrackingModal(true)}
                className="px-4 py-2 bg-[#C8A45D] text-[#071B36] font-bold text-xs rounded-xl hover:bg-[#DFBF7A] transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Tracking Manifest</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trackingRecords.map((item) => (
                <div key={item.trackingNumber} className="bg-[#071B36] border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="font-mono font-bold text-[#DFBF7A] text-sm">{item.trackingNumber}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 block">Origin</span>
                      <span className="text-white font-medium">{item.origin}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Destination</span>
                      <span className="text-white font-medium">{item.destination}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Mode / Vessel</span>
                      <span className="text-slate-300">{item.shipmentMode} · {item.vesselOrFlight}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">ETA</span>
                      <span className="text-[#DFBF7A] font-bold">{item.estimatedArrival}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <span>Milestones: {item.milestones.filter(m => m.completed).length} / {item.milestones.length} completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Quote Detail Modal / Inspection Drawer */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-[#071B36] border border-[#C8A45D]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 bg-[#0A2242] border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#C8A45D]/20 text-[#DFBF7A] font-mono font-bold text-xs rounded-lg border border-[#C8A45D]/40">
                  {selectedQuote.referenceNumber}
                </span>
                <h3 className="font-bold text-white text-base">
                  Enquiry from {selectedQuote.companyName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              
              {/* Status Update Control */}
              <div className="bg-[#0A2242] p-4 rounded-xl border border-slate-700 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Current Status</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border mt-1 inline-block ${getStatusBadgeClass(selectedQuote.status)}`}>
                    {selectedQuote.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-300">Set New Status:</span>
                  <select
                    value={selectedQuote.status}
                    onChange={(e) => handleUpdateQuoteStatus(e.target.value as EnquiryStatus)}
                    className="px-3 py-1.5 bg-[#071B36] border border-[#C8A45D] text-white rounded-xl outline-none font-bold text-xs"
                  >
                    <option value="New">New</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Quotation Sent">Quotation Sent</option>
                    <option value="In Discussion">In Discussion</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Customer & Route Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#051429] p-4 rounded-xl border border-slate-800">
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Contact Person</span>
                  <p className="text-sm font-bold text-white">{selectedQuote.fullName}</p>
                  <p className="text-slate-300">{selectedQuote.companyName}</p>
                  <p className="text-slate-400">{selectedQuote.email}</p>
                  <p className="text-slate-400 font-mono">{selectedQuote.phoneNumber}</p>
                  <p className="text-slate-500">{selectedQuote.country}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Routing & Incoterms</span>
                  <p className="text-slate-200">
                    <strong className="text-white">Origin:</strong> {selectedQuote.originCity}, {selectedQuote.originCountry}
                  </p>
                  <p className="text-slate-200">
                    <strong className="text-white">Destination:</strong> {selectedQuote.destinationCity}, {selectedQuote.destinationCountry}
                  </p>
                  <p className="text-[#DFBF7A] font-bold">
                    Incoterm: {selectedQuote.incoterms}
                  </p>
                  <p className="text-slate-400">
                    Target Ready Date: {selectedQuote.expectedShippingDate}
                  </p>
                </div>
              </div>

              {/* Cargo Specs */}
              <div className="bg-[#051429] p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-bold uppercase block text-[10px]">Cargo Specifications</span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-500 block">Commodity:</span>
                    <span className="text-white font-medium">{selectedQuote.cargoType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Gross Weight:</span>
                    <span className="text-white font-bold font-mono">{selectedQuote.grossWeightKg.toLocaleString()} KG</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Packages:</span>
                    <span className="text-white font-medium">{selectedQuote.numberOfPackages} units</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block">Dimensions:</span>
                  <span className="text-slate-300">{selectedQuote.dimensionsCm || 'Standard container or not specified'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Description:</span>
                  <p className="text-slate-200 bg-black/20 p-2.5 rounded-lg border border-slate-800">
                    {selectedQuote.cargoDescription}
                  </p>
                </div>
                {selectedQuote.additionalRequirements && (
                  <div>
                    <span className="text-slate-500 block">Additional Instructions:</span>
                    <p className="text-slate-300 italic">{selectedQuote.additionalRequirements}</p>
                  </div>
                )}
                {selectedQuote.documentName && (
                  <div className="pt-1">
                    <span className="text-emerald-400">Attached Manifest Document: {selectedQuote.documentName}</span>
                  </div>
                )}
              </div>

              {/* Operational Notes */}
              <div className="space-y-2">
                <label className="text-slate-400 font-bold uppercase block text-[10px]">
                  Internal Trade Desk Notes
                </label>
                <textarea
                  rows={3}
                  value={statusUpdateNotes}
                  onChange={(e) => setStatusUpdateNotes(e.target.value)}
                  placeholder="Record carrier quotation notes, vessel allocation names, or rate validity dates..."
                  className="w-full p-3 bg-[#051429] border border-slate-700 rounded-xl text-white text-xs outline-none focus:border-[#C8A45D]"
                />
              </div>

            </div>

            <div className="px-6 py-4 bg-[#0A2242] border-t border-slate-700 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Logged at: {selectedQuote.createdAt.replace('T', ' ').substring(0, 19)}
              </span>
              <button
                onClick={() => handleUpdateQuoteStatus(selectedQuote.status)}
                className="px-5 py-2 bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#071B36] font-bold text-xs uppercase rounded-xl transition"
              >
                Save Notes & Status
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add Tracking Modal */}
      {showAddTrackingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#071B36] border border-[#C8A45D]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="font-bold text-white text-base">Add Shipment Tracking Manifest</h3>
              <button onClick={() => setShowAddTrackingModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTrackingRecord} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tracking Number</label>
                <input
                  type="text"
                  required
                  value={newTracking.trackingNumber}
                  onChange={(e) => setNewTracking({ ...newTracking, trackingNumber: e.target.value })}
                  className="w-full p-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Origin Port / City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Busan Port (KRPUS)"
                    value={newTracking.origin}
                    onChange={(e) => setNewTracking({ ...newTracking, origin: e.target.value })}
                    className="w-full p-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Destination Port / City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hamburg (DEHAM)"
                    value={newTracking.destination}
                    onChange={(e) => setNewTracking({ ...newTracking, destination: e.target.value })}
                    className="w-full p-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Shipment Mode</label>
                  <select
                    value={newTracking.shipmentMode}
                    onChange={(e) => setNewTracking({ ...newTracking, shipmentMode: e.target.value as any })}
                    className="w-full p-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-white"
                  >
                    <option value="ocean">Ocean Freight</option>
                    <option value="air">Air Freight</option>
                    <option value="road">Road Freight</option>
                    <option value="multimodal">Multimodal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Initial Status</label>
                  <select
                    value={newTracking.status}
                    onChange={(e) => setNewTracking({ ...newTracking, status: e.target.value as any })}
                    className="w-full p-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Booked">Booked</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Customs Cleared">Customs Cleared</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Vessel / Flight ID</label>
                  <input
                    type="text"
                    placeholder="e.g. HMM Algeciras V.021W"
                    value={newTracking.vesselOrFlight}
                    onChange={(e) => setNewTracking({ ...newTracking, vesselOrFlight: e.target.value })}
                    className="w-full p-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estimated Arrival Date</label>
                  <input
                    type="date"
                    value={newTracking.estimatedArrival}
                    onChange={(e) => setNewTracking({ ...newTracking, estimatedArrival: e.target.value })}
                    className="w-full p-2.5 bg-[#0A2242] border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTrackingModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C8A45D] text-[#071B36] font-bold rounded-xl"
                >
                  Save Manifest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
