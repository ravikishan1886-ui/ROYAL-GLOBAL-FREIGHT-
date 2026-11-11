import React, { useEffect } from 'react';
import {
  SEO_PAGES,
  CANONICAL_ORIGIN,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateFAQSchema,
  LOGISTICS_FAQS
} from '../../services/seo';
import { CompanyInfo } from '../../types';
import { Analytics } from '../../services/analytics';

interface SEOHeadProps {
  pageKey: string;
  serviceId?: string;
  companyInfo: CompanyInfo;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  pageKey,
  serviceId,
  companyInfo
}) => {
  useEffect(() => {
    // Determine effective SEO config key
    const effectiveKey = (pageKey === 'services' && serviceId && SEO_PAGES[serviceId])
      ? serviceId
      : (SEO_PAGES[pageKey] ? pageKey : 'home');

    const config = SEO_PAGES[effectiveKey] || SEO_PAGES.home;
    const canonicalUrl = `${CANONICAL_ORIGIN}${config.canonicalPath === '/' ? '' : config.canonicalPath}`;

    // 1. Update Document Title
    document.title = config.title;

    // Helper to set or create meta tag
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', config.description);
    setMetaTag('name', 'keywords', config.keywords.join(', '));
    setMetaTag('name', 'author', companyInfo.companyName);
    setMetaTag('name', 'robots', pageKey === 'admin' ? 'noindex, nofollow' : 'index, follow');

    // 3. Open Graph Tags
    setMetaTag('property', 'og:site_name', companyInfo.companyName);
    setMetaTag('property', 'og:title', config.title);
    setMetaTag('property', 'og:description', config.description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', config.ogType || 'website');
    setMetaTag('property', 'og:image', config.image || `${CANONICAL_ORIGIN}/assets/aistudio/file_000000002b3c8208aa2c073557e13cb3_eeff9ba8.png`);
    setMetaTag('property', 'og:locale', 'en_US');

    // 4. Twitter / X Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', config.title);
    setMetaTag('name', 'twitter:description', config.description);
    setMetaTag('name', 'twitter:image', config.image || `${CANONICAL_ORIGIN}/assets/aistudio/file_000000002b3c8208aa2c073557e13cb3_eeff9ba8.png`);

    // 5. Canonical Link Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // 6. Google Search Console Verification Meta Tag (if configured)
    if (companyInfo.gscVerificationCode && companyInfo.gscVerificationCode.trim()) {
      setMetaTag('name', 'google-site-verification', companyInfo.gscVerificationCode.trim());
    }

    // 7. Inject Structured Data (JSON-LD)
    const scriptId = 'rgf-schema-structured-data';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    // Assemble schemas
    const schemas: any[] = [
      generateOrganizationSchema(companyInfo),
      generateWebSiteSchema(companyInfo)
    ];

    if (config.breadcrumbs && config.breadcrumbs.length > 0) {
      schemas.push(generateBreadcrumbSchema(config.breadcrumbs));
    }

    if (config.serviceId) {
      schemas.push(
        generateServiceSchema(config.h1, config.description, config.canonicalPath, companyInfo)
      );
    }

    if (pageKey === 'services') {
      schemas.push(generateFAQSchema(LOGISTICS_FAQS));
    }

    scriptEl.text = JSON.stringify(schemas.length === 1 ? schemas[0] : { '@context': 'https://schema.org', '@graph': schemas });

    // 8. Track Page View in Analytics
    Analytics.trackPageView(config.canonicalPath, config.title);

    // Cleanup on unmount or page change
    return () => {
      // Clean script on unmount if needed
    };
  }, [pageKey, serviceId, companyInfo]);

  return null;
};
