/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { TrackingModal } from './components/common/TrackingModal';
import { PolicyModal } from './components/common/PolicyModals';
import { Hero } from './components/home/Hero';
import { IntroSection } from './components/home/IntroSection';
import { ServicesPreview } from './components/home/ServicesPreview';
import { OperationsGallery } from './components/home/OperationsGallery';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { InteractiveMapPreview } from './components/home/InteractiveMapPreview';
import { CtaBanner } from './components/home/CtaBanner';
import { SEOHead } from './components/common/SEOHead';
import { StorageService, subscribeToStore } from './services/storage';
import { Analytics } from './services/analytics';
import { CompanyInfo } from './types';

// Code-split non-homepage route chunks to reduce initial bundle size and speed up FCP
const AboutPage = lazy(() => import('./components/about/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./components/services/ServicesPage').then(m => ({ default: m.ServicesPage })));
const GlobalNetworkPage = lazy(() => import('./components/network/GlobalNetworkPage').then(m => ({ default: m.GlobalNetworkPage })));
const RequestQuotePage = lazy(() => import('./components/quote/RequestQuotePage').then(m => ({ default: m.RequestQuotePage })));
const ContactPage = lazy(() => import('./components/contact/ContactPage').then(m => ({ default: m.ContactPage })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const NotFoundPage = lazy(() => import('./components/common/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [policyModalType, setPolicyModalType] = useState<'privacy' | 'terms' | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(StorageService.getCompanyInfo());
  const [toastMessage, setToastMessage] = useState<string>('');

  // Sync state with hash or storage & initialize Analytics
  useEffect(() => {
    // Initialize GA4 tracking
    Analytics.init(companyInfo.gaMeasurementId);

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setActivePage('home');
      } else {
        setActivePage(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);

    // Subscribe to store updates (e.g. if admin changes company info or new quotes come in)
    const unsubscribe = subscribeToStore(() => {
      const updated = StorageService.getCompanyInfo();
      setCompanyInfo(updated);
      Analytics.init(updated.gaMeasurementId);
    });

    return () => {
      window.removeEventListener('hashchange', handleHash);
      unsubscribe();
    };
  }, [companyInfo.gaMeasurementId]);

  const navigateTo = (page: string, serviceId?: string) => {
    setActivePage(page);
    window.location.hash = page;
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-white text-[#182638] font-['Inter',sans-serif] flex flex-col antialiased selection:bg-[#C8A45D]/20 selection:text-[#071B36]">
      
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-[#071B36] border border-[#C8A45D] text-white shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#C8A45D]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar (Hidden only if in full Admin view for cleaner focus) */}
      {activePage !== 'admin' && (
        <Navbar
          activePage={activePage}
          onNavigate={(page) => navigateTo(page)}
          onRequestQuote={() => navigateTo('quote')}
          onOpenTracking={() => setIsTrackingOpen(true)}
          companyInfo={companyInfo}
        />
      )}

      {/* SEO Dynamic Head Synchronizer (Meta, Canonical, Social, Schema.org) */}
      <SEOHead
        pageKey={activePage}
        serviceId={selectedServiceId}
        companyInfo={companyInfo}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        <Suspense fallback={
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-12 bg-slate-50/50">
            <div className="w-10 h-10 border-3 border-[#C8A45D] border-t-transparent rounded-full animate-spin mb-4" />
            <span className="font-['Montserrat',sans-serif] text-xs font-bold text-[#071B36] uppercase tracking-widest animate-pulse">
              Loading Royal Global Freight...
            </span>
          </div>
        }>
          {activePage === 'home' && (
            <div className="animate-fadeIn">
              <Hero
                onExploreServices={() => navigateTo('services')}
                onRequestQuote={() => navigateTo('quote')}
                onOpenTracking={() => setIsTrackingOpen(true)}
              />
              <IntroSection
                onLearnMore={() => navigateTo('about')}
                onRequestQuote={() => navigateTo('quote')}
              />
              <ServicesPreview
                onSelectService={(id) => navigateTo('services', id)}
                onViewAllServices={() => navigateTo('services')}
                onRequestQuote={() => navigateTo('quote')}
              />
              <OperationsGallery
                onRequestQuote={(_cat) => navigateTo('quote')}
                onExploreServices={() => navigateTo('services')}
              />
              <WhyChooseUs />
              <InteractiveMapPreview
                onExploreNetwork={() => navigateTo('network')}
                onRequestQuote={() => navigateTo('quote')}
              />
              <CtaBanner
                onRequestQuote={() => navigateTo('quote')}
                onContactUs={() => navigateTo('contact')}
                companyInfo={companyInfo}
              />
            </div>
          )}

          {activePage === 'about' && (
            <AboutPage
              onRequestQuote={() => navigateTo('quote')}
              onExploreServices={() => navigateTo('services')}
              onNavigate={(page) => navigateTo(page)}
              companyInfo={companyInfo}
            />
          )}

          {activePage === 'services' && (
            <ServicesPage
              initialServiceId={selectedServiceId}
              onRequestQuote={() => navigateTo('quote')}
              onNavigate={(page, sId) => navigateTo(page, sId)}
            />
          )}

          {activePage === 'network' && (
            <GlobalNetworkPage
              onRequestQuote={() => navigateTo('quote')}
              onExploreServices={() => navigateTo('services')}
              onNavigate={(page) => navigateTo(page)}
            />
          )}

          {activePage === 'quote' && (
            <RequestQuotePage
              onQuoteSubmitted={(ref) => {
                showToast(`Quote reference ${ref} registered successfully!`);
              }}
              onExploreServices={() => navigateTo('services')}
              onNavigateHome={() => navigateTo('home')}
              onNavigate={(page) => navigateTo(page)}
            />
          )}

          {activePage === 'contact' && (
            <ContactPage
              companyInfo={companyInfo}
              onRequestQuote={() => navigateTo('quote')}
              onNavigate={(page) => navigateTo(page)}
            />
          )}

          {activePage === 'admin' && (
            <AdminDashboard
              onBackToSite={() => navigateTo('home')}
              onRequestQuote={() => navigateTo('quote')}
            />
          )}

          {/* Custom Branded 404 Not Found Page */}
          {!['home', 'about', 'services', 'network', 'quote', 'contact', 'admin'].includes(activePage) && (
            <NotFoundPage onNavigate={(page) => navigateTo(page)} />
          )}
        </Suspense>
      </main>

      {/* Main Footer (Hidden in Admin for clear workspace) */}
      {activePage !== 'admin' && (
        <Footer
          onNavigate={(page) => navigateTo(page)}
          onRequestQuote={() => navigateTo('quote')}
          onOpenPrivacy={() => setPolicyModalType('privacy')}
          onOpenTerms={() => setPolicyModalType('terms')}
          companyInfo={companyInfo}
        />
      )}

      {/* Global Tracking Modal */}
      <TrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        onRequestQuote={() => {
          setIsTrackingOpen(false);
          navigateTo('quote');
        }}
      />

      {/* Global Privacy / Terms Policy Modal */}
      <PolicyModal
        type={policyModalType}
        onClose={() => setPolicyModalType(null)}
      />

    </div>
  );
}
