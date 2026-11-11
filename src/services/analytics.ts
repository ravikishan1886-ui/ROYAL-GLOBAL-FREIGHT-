/**
 * Google Analytics 4 (GA4) Integration & Event Tracking Service
 * Strictly respects user privacy - never collects or sends Personal Identifiable Information (PII).
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

class AnalyticsService {
  private initialized = false;
  private currentMeasurementId = '';

  /**
   * Initializes GA4 if a valid Measurement ID is configured
   */
  public init(measurementId?: string) {
    if (!measurementId || measurementId.trim() === '' || !measurementId.startsWith('G-')) {
      return;
    }

    if (this.initialized && this.currentMeasurementId === measurementId) {
      return;
    }

    this.currentMeasurementId = measurementId.trim();

    // Check if script already exists
    const existingScript = document.getElementById('rgf-ga4-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'rgf-ga4-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.currentMeasurementId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer?.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', this.currentMeasurementId, {
        send_page_view: false, // We manually trigger page_view with canonical paths
        anonymize_ip: true
      });
      this.initialized = true;
    }
  }

  /**
   * Track Page View
   */
  public trackPageView(pagePath: string, pageTitle: string) {
    if (typeof window !== 'undefined' && window.gtag && this.currentMeasurementId) {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle
      });
    }
  }

  /**
   * Track Freight Quote Submission (Sanitized - No PII)
   */
  public trackQuoteSubmission(params: {
    shipmentMode: string;
    originCountry: string;
    destinationCountry: string;
    grossWeightKg?: number;
  }) {
    if (typeof window !== 'undefined' && window.gtag && this.currentMeasurementId) {
      window.gtag('event', 'generate_lead', {
        event_category: 'Freight Quote',
        event_label: params.shipmentMode,
        shipment_mode: params.shipmentMode,
        origin_country: params.originCountry,
        destination_country: params.destinationCountry,
        weight_tier: params.grossWeightKg ? (params.grossWeightKg > 1000 ? 'heavy' : 'standard') : 'unknown'
      });
    }
  }

  /**
   * Track Contact Form Submission (Sanitized - No PII)
   */
  public trackContactSubmission(subject: string) {
    if (typeof window !== 'undefined' && window.gtag && this.currentMeasurementId) {
      window.gtag('event', 'contact_inquiry', {
        event_category: 'Contact',
        event_label: subject
      });
    }
  }

  /**
   * Track WhatsApp Click
   */
  public trackWhatsAppClick(sourceLocation = 'website') {
    if (typeof window !== 'undefined' && window.gtag && this.currentMeasurementId) {
      window.gtag('event', 'contact_whatsapp_click', {
        event_category: 'Engagement',
        event_label: sourceLocation
      });
    }
  }

  /**
   * Track Telephone Click
   */
  public trackPhoneClick(phoneNumber: string, sourceLocation = 'header') {
    if (typeof window !== 'undefined' && window.gtag && this.currentMeasurementId) {
      window.gtag('event', 'contact_phone_click', {
        event_category: 'Engagement',
        event_label: sourceLocation
      });
    }
  }

  /**
   * Track Email Click
   */
  public trackEmailClick(emailAddress: string, sourceLocation = 'footer') {
    if (typeof window !== 'undefined' && window.gtag && this.currentMeasurementId) {
      window.gtag('event', 'contact_email_click', {
        event_category: 'Engagement',
        event_label: sourceLocation
      });
    }
  }
}

export const Analytics = new AnalyticsService();
