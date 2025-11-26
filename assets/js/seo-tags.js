// SEO Tags Generator
// Dynamically adds comprehensive SEO, AEO, GEO, Open Graph, and structured data tags

(function() {
    'use strict';
    
    // SEO configuration for each page
    const seoConfig = {
        '/': {
            title: 'Prime Consulting Group - Expert GRC Services & AI Governance for Canadian Law & Accounting Firms',
            description: 'Prime Consulting Group helps law and accounting firms implement ISO 27001, ISO 42001, SOC 2, and other GRC frameworks. Expert AI governance, compliance, and cybersecurity services across Canada.',
            keywords: 'GRC services, ISO 27001, ISO 42001, SOC 2, AI governance, compliance consulting, cybersecurity, law firm compliance, accounting firm security, Canadian compliance, Law 25, Bill C-27, CPPA, bilingual GRC services',
            type: 'website',
            image: '/public/images/cybersecurity-data-protection-concept-futuristic-shield-lock-scaled.jpg',
            schema: {
                '@context': 'https://schema.org',
                '@type': 'ProfessionalService',
                'name': 'Prime Consulting Group',
                'description': 'Expert governance, risk, and compliance services for Canadian professional services firms',
                'url': 'https://prime-grcsecuritystaff.com',
                'logo': 'https://prime-grcsecuritystaff.com/public/images/Prime-logo-RGB-e1709926780278-2-1.svg',
                'address': {
                    '@type': 'PostalAddress',
                    'streetAddress': '6500 Trans-Canada Hwy Suite 400',
                    'addressLocality': 'Pointe-Claire',
                    'addressRegion': 'Quebec',
                    'postalCode': 'H9R 0A5',
                    'addressCountry': 'CA'
                },
                'telephone': '+1-514-881-9888',
                'email': 'info@prime-consulting.ca',
                'areaServed': {
                    '@type': 'Country',
                    'name': 'Canada'
                },
                'serviceType': ['GRC Consulting', 'AI Governance', 'ISO Compliance', 'SOC 2', 'Cybersecurity'],
                'priceRange': '$$'
            }
        },
        '/about.html': {
            title: 'About Us - Prime Consulting Group | Expert AI Governance & GRC Services',
            description: 'Learn about Prime Consulting Group, founded by Sam Leo. We help law and accounting firms navigate AI risks with ISO 27001, ISO 42001, and SOC 2 expertise. Bilingual services across Canada.',
            keywords: 'about Prime Consulting Group, Sam Leo, AI governance experts, ISO consultants, GRC consulting team, Canadian compliance experts',
            type: 'website',
            image: '/public/images/toronto-sunrise-scaled.jpg'
        },
        '/grc-frameworks.html': {
            title: 'GRC Frameworks - ISO 27001, ISO 42001, SOC 2, ISO 9001, ISO 22301 | Prime Consulting',
            description: 'Expert guidance on ISO 27001, ISO 42001, ISO 9001, ISO 22301, and SOC 2 frameworks for legal and accounting firms in Canada. Implementation and compliance support.',
            keywords: 'ISO 27001, ISO 42001, SOC 2, ISO 9001, ISO 22301, GRC frameworks, compliance frameworks, ISO certification, SOC 2 audit',
            type: 'website',
            image: '/public/images/business-person-futuristic-business-environment-scaled.jpg'
        }
    };
    
    // Get current page path
    function getCurrentPath() {
        return window.location.pathname;
    }
    
    // Get base URL
    function getBaseUrl() {
        return window.location.origin;
    }
    
    // Get current page config or default
    function getPageConfig() {
        const path = getCurrentPath();
        return seoConfig[path] || seoConfig['/'] || {};
    }
    
    // Add meta tags
    function addMetaTags(config) {
        const head = document.head;
        const baseUrl = getBaseUrl();
        const currentUrl = baseUrl + window.location.pathname;
        
        // Remove existing dynamic meta tags
        document.querySelectorAll('meta[data-seo-dynamic]').forEach(el => el.remove());
        
        // Keywords
        if (config.keywords) {
            addMetaTag('keywords', config.keywords, 'name');
        }
        
        // Author
        addMetaTag('author', 'Prime Consulting Group', 'name');
        
        // Robots
        addMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', 'name');
        addMetaTag('googlebot', 'index, follow', 'name');
        addMetaTag('bingbot', 'index, follow', 'name');
        
        // Language
        addMetaTag('language', 'English', 'name');
        addMetaTag('content-language', 'en-CA', 'http-equiv');
        
        // Geographic targeting
        addMetaTag('geo.region', 'CA-QC', 'name');
        addMetaTag('geo.placename', 'Pointe-Claire, Quebec, Canada', 'name');
        addMetaTag('geo.position', '45.4487;-73.8169', 'name');
        addMetaTag('ICBM', '45.4487, -73.8169', 'name');
        
        // Open Graph
        if (config.title) {
            addMetaTag('og:title', config.title, 'property');
        }
        if (config.description) {
            addMetaTag('og:description', config.description, 'property');
        }
        addMetaTag('og:type', config.type || 'website', 'property');
        addMetaTag('og:url', currentUrl, 'property');
        addMetaTag('og:site_name', 'Prime Consulting Group', 'property');
        addMetaTag('og:locale', 'en_CA', 'property');
        addMetaTag('og:locale:alternate', 'fr_CA', 'property');
        if (config.image) {
            addMetaTag('og:image', baseUrl + config.image, 'property');
            addMetaTag('og:image:width', '1200', 'property');
            addMetaTag('og:image:height', '630', 'property');
            addMetaTag('og:image:alt', config.title || 'Prime Consulting Group', 'property');
        }
        
        // Twitter Card
        addMetaTag('twitter:card', 'summary_large_image', 'name');
        addMetaTag('twitter:site', '@primeconsulting', 'name');
        addMetaTag('twitter:creator', '@primeconsulting', 'name');
        if (config.title) {
            addMetaTag('twitter:title', config.title, 'name');
        }
        if (config.description) {
            addMetaTag('twitter:description', config.description, 'name');
        }
        if (config.image) {
            addMetaTag('twitter:image', baseUrl + config.image, 'name');
        }
        
        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            head.appendChild(canonical);
        }
        canonical.href = currentUrl;
        
        // Alternate language links (for bilingual support)
        const currentPath = window.location.pathname;
        if (!currentPath.startsWith('/fr/')) {
            addAlternateLanguage('fr', baseUrl + '/fr' + currentPath);
        } else {
            addAlternateLanguage('en', baseUrl + currentPath.replace('/fr', ''));
        }
        
        // Structured Data (JSON-LD)
        if (config.schema) {
            addStructuredData(config.schema);
        }
    }
    
    // Helper to add meta tag
    function addMetaTag(content, value, attribute) {
        const meta = document.createElement('meta');
        meta.setAttribute(attribute, content);
        meta.content = value;
        meta.setAttribute('data-seo-dynamic', 'true');
        document.head.appendChild(meta);
    }
    
    // Add alternate language link
    function addAlternateLanguage(lang, url) {
        let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
        if (!link) {
            link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang;
            document.head.appendChild(link);
        }
        link.href = url;
    }
    
    // Add structured data
    function addStructuredData(schema) {
        // Remove existing structured data
        document.querySelectorAll('script[type="application/ld+json"][data-seo-dynamic]').forEach(el => el.remove());
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-dynamic', 'true');
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            const config = getPageConfig();
            addMetaTags(config);
        });
    } else {
        const config = getPageConfig();
        addMetaTags(config);
    }
})();

