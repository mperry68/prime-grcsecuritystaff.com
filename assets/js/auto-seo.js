// Automatic SEO Tags System
// Automatically applies comprehensive SEO, AEO, GEO tags to all pages
// Works for existing and future pages without manual configuration

(function() {
    'use strict';
    
    // Base configuration - applies to all pages
    const baseConfig = {
        siteName: 'Prime Consulting Group',
        siteUrl: 'https://prime-grcsecuritystaff.com',
        defaultImage: '/public/images/cybersecurity-data-protection-concept-futuristic-shield-lock-scaled.jpg',
        logo: '/public/images/Prime-logo-RGB-e1709926780278-2-1.svg',
        address: {
            street: '6500 Trans-Canada Hwy Suite 400',
            city: 'Pointe-Claire',
            region: 'QC',
            postalCode: 'H9R 0A5',
            country: 'CA'
        },
        geo: {
            latitude: '45.4487',
            longitude: '-73.8169'
        },
        contact: {
            phone: '+1-514-881-9888',
            email: 'info@prime-consulting.ca'
        },
        keywords: {
            base: 'GRC services, ISO 27001, ISO 42001, SOC 2, AI governance, compliance consulting, cybersecurity, Canadian compliance, Law 25, Bill C-27, CPPA, bilingual GRC services, Prime Consulting Group'
        }
    };
    
    // Page-specific overrides (optional - system works without these)
    const pageOverrides = {
        '/': {
            title: 'Prime Consulting Group - Expert GRC Services & AI Governance for Canadian Law & Accounting Firms',
            description: 'Prime Consulting Group helps law and accounting firms implement ISO 27001, ISO 42001, SOC 2, and other GRC frameworks. Expert AI governance, compliance, and cybersecurity services across Canada. Bilingual support.',
            schemaType: 'ProfessionalService'
        },
        '/about.html': {
            title: 'About Us - Prime Consulting Group | Expert AI Governance & GRC Services',
            description: 'Learn about Prime Consulting Group, founded by Sam Leo. We help law and accounting firms navigate AI risks with ISO 27001, ISO 42001, and SOC 2 expertise. Bilingual services across Canada.',
            image: '/public/images/toronto-sunrise-scaled.jpg',
            schemaType: 'AboutPage'
        },
        '/grc-frameworks.html': {
            title: 'GRC Frameworks - ISO 27001, ISO 42001, SOC 2, ISO 9001, ISO 22301 | Prime Consulting',
            description: 'Expert guidance on ISO 27001, ISO 42001, ISO 9001, ISO 22301, and SOC 2 frameworks for legal and accounting firms in Canada. Implementation and compliance support.',
            schemaType: 'Service'
        }
    };
    
    // Extract page metadata from HTML
    function extractPageMetadata() {
        const h1 = document.querySelector('h1');
        const metaDesc = document.querySelector('meta[name="description"]');
        const title = document.querySelector('title');
        
        return {
            h1: h1 ? h1.textContent.trim() : null,
            existingTitle: title ? title.textContent : null,
            existingDesc: metaDesc ? metaDesc.content : null
        };
    }
    
    // Generate page-specific data
    function getPageData() {
        const path = window.location.pathname;
        const override = pageOverrides[path];
        const metadata = extractPageMetadata();
        const baseUrl = baseConfig.siteUrl;
        const currentUrl = baseUrl + path;
        
        // Generate title
        let title = override?.title;
        if (!title && metadata.h1) {
            title = `${metadata.h1} - ${baseConfig.siteName}`;
        } else if (!title && metadata.existingTitle) {
            title = metadata.existingTitle;
        } else if (!title) {
            title = `${baseConfig.siteName} - Expert GRC Services`;
        }
        
        // Generate description
        let description = override?.description || metadata.existingDesc;
        if (!description && metadata.h1) {
            description = `${baseConfig.siteName} provides expert ${metadata.h1.toLowerCase()} services for Canadian law and accounting firms. ISO 27001, ISO 42001, SOC 2 compliance and AI governance.`;
        } else if (!description) {
            description = `${baseConfig.siteName} helps law and accounting firms implement ISO 27001, ISO 42001, SOC 2, and other GRC frameworks with bilingual service across Canada.`;
        }
        
        // Generate keywords
        let keywords = baseConfig.keywords.base;
        if (metadata.h1) {
            keywords = `${metadata.h1.toLowerCase()}, ${keywords}`;
        }
        
        // Determine image
        const ogImage = override?.image || baseConfig.defaultImage;
        const fullImageUrl = baseUrl + ogImage;
        
        // Determine schema type
        const schemaType = override?.schemaType || 'WebPage';
        
        return {
            title,
            description,
            keywords,
            url: currentUrl,
            image: fullImageUrl,
            imagePath: ogImage,
            schemaType,
            path
        };
    }
    
    // Add meta tag
    function addMetaTag(attribute, value, type = 'name') {
        // Check if already exists
        const existing = document.querySelector(`meta[${type}="${attribute}"]`);
        if (existing && !existing.hasAttribute('data-auto-seo')) {
            return; // Don't override manually set tags
        }
        
        if (existing) {
            existing.content = value;
        } else {
            const meta = document.createElement('meta');
            meta.setAttribute(type, attribute);
            meta.content = value;
            meta.setAttribute('data-auto-seo', 'true');
            document.head.appendChild(meta);
        }
    }
    
    // Add or update link tag
    function addLinkTag(rel, href, hreflang = null) {
        let link = document.querySelector(`link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ''}`);
        if (!link) {
            link = document.createElement('link');
            link.rel = rel;
            if (hreflang) link.hreflang = hreflang;
            link.setAttribute('data-auto-seo', 'true');
            document.head.appendChild(link);
        }
        link.href = href;
    }
    
    // Generate structured data
    function generateStructuredData(pageData) {
        const baseSchema = {
            '@context': 'https://schema.org',
            '@type': pageData.schemaType,
            'name': pageData.title.replace(` - ${baseConfig.siteName}`, ''),
            'description': pageData.description,
            'url': pageData.url
        };
        
        // Add organization info for most pages
        if (pageData.schemaType !== 'Organization') {
            baseSchema.publisher = {
                '@type': 'Organization',
                'name': baseConfig.siteName,
                'logo': {
                    '@type': 'ImageObject',
                    'url': baseConfig.siteUrl + baseConfig.logo
                }
            };
        }
        
        // Add location for service pages
        if (pageData.schemaType === 'Service' || pageData.schemaType === 'ProfessionalService') {
            baseSchema.areaServed = {
                '@type': 'Country',
                'name': 'Canada'
            };
            baseSchema.provider = {
                '@type': 'Organization',
                'name': baseConfig.siteName,
                'address': {
                    '@type': 'PostalAddress',
                    'streetAddress': baseConfig.address.street,
                    'addressLocality': baseConfig.address.city,
                    'addressRegion': baseConfig.address.region,
                    'postalCode': baseConfig.address.postalCode,
                    'addressCountry': baseConfig.address.country
                },
                'telephone': baseConfig.contact.phone,
                'email': baseConfig.contact.email
            };
        }
        
        return baseSchema;
    }
    
    // Apply all SEO tags
    function applySEOTags() {
        const pageData = getPageData();
        const baseUrl = baseConfig.siteUrl;
        
        // Remove existing auto-generated tags
        document.querySelectorAll('[data-auto-seo]').forEach(el => {
            if (el.tagName === 'SCRIPT' && el.type === 'application/ld+json') {
                el.remove();
            }
        });
        
        // Basic Meta Tags
        addMetaTag('title', pageData.title, 'name');
        addMetaTag('description', pageData.description, 'name');
        addMetaTag('keywords', pageData.keywords, 'name');
        addMetaTag('author', baseConfig.siteName, 'name');
        addMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', 'name');
        addMetaTag('googlebot', 'index, follow', 'name');
        addMetaTag('bingbot', 'index, follow', 'name');
        addMetaTag('language', 'English', 'name');
        addMetaTag('content-language', 'en-CA', 'http-equiv');
        
        // Geographic Targeting
        addMetaTag('geo.region', 'CA-QC', 'name');
        addMetaTag('geo.placename', `${baseConfig.address.city}, Quebec, Canada`, 'name');
        addMetaTag('geo.position', `${baseConfig.geo.latitude};${baseConfig.geo.longitude}`, 'name');
        addMetaTag('ICBM', `${baseConfig.geo.latitude}, ${baseConfig.geo.longitude}`, 'name');
        
        // Open Graph
        addMetaTag('og:type', 'website', 'property');
        addMetaTag('og:url', pageData.url, 'property');
        addMetaTag('og:title', pageData.title, 'property');
        addMetaTag('og:description', pageData.description, 'property');
        addMetaTag('og:image', pageData.image, 'property');
        addMetaTag('og:image:width', '1200', 'property');
        addMetaTag('og:image:height', '630', 'property');
        addMetaTag('og:image:alt', pageData.title, 'property');
        addMetaTag('og:site_name', baseConfig.siteName, 'property');
        addMetaTag('og:locale', 'en_CA', 'property');
        addMetaTag('og:locale:alternate', 'fr_CA', 'property');
        
        // Twitter Card
        addMetaTag('twitter:card', 'summary_large_image', 'name');
        addMetaTag('twitter:title', pageData.title, 'name');
        addMetaTag('twitter:description', pageData.description, 'name');
        addMetaTag('twitter:image', pageData.image, 'name');
        addMetaTag('twitter:image:alt', pageData.title, 'name');
        
        // Canonical URL
        addLinkTag('canonical', pageData.url);
        
        // Alternate Languages
        if (!pageData.path.startsWith('/fr/')) {
            addLinkTag('alternate', baseUrl + '/fr' + pageData.path, 'fr');
            addLinkTag('alternate', pageData.url, 'en');
        } else {
            addLinkTag('alternate', baseUrl + pageData.path.replace('/fr', ''), 'en');
            addLinkTag('alternate', pageData.url, 'fr');
        }
        addLinkTag('alternate', pageData.url, 'x-default');
        
        // Update title tag
        const titleTag = document.querySelector('title');
        if (titleTag && !titleTag.hasAttribute('data-manual')) {
            titleTag.textContent = pageData.title;
        }
        
        // Structured Data
        const schema = generateStructuredData(pageData);
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-auto-seo', 'true');
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applySEOTags);
    } else {
        applySEOTags();
    }
})();

