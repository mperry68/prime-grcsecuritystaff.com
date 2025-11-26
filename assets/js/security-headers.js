// Security Headers and Best Practices
// Automatically applies security headers and best practices to all pages
// Works for existing and future pages

(function() {
    'use strict';
    
    // Security configuration
    const securityConfig = {
        // Content Security Policy
        csp: {
            'default-src': "'self'",
            'script-src': "'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
            'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
            'font-src': "'self' https://fonts.gstatic.com data:",
            'img-src': "'self' data: https: blob:",
            'connect-src': "'self'",
            'frame-ancestors': "'none'",
            'base-uri': "'self'",
            'form-action': "'self'",
            'object-src': "'none'",
            'upgrade-insecure-requests': ''
        },
        
        // Permissions Policy (formerly Feature Policy)
        permissionsPolicy: {
            'geolocation': '()',
            'microphone': '()',
            'camera': '()',
            'payment': '()',
            'usb': '()',
            'magnetometer': '()',
            'gyroscope': '()',
            'accelerometer': '()'
        }
    };
    
    // Apply security meta tags
    function applySecurityHeaders() {
        // Content Security Policy
        const cspDirectives = Object.entries(securityConfig.csp)
            .map(([key, value]) => value ? `${key} ${value}` : key)
            .join('; ');
        
        addMetaTag('Content-Security-Policy', cspDirectives, 'http-equiv');
        
        // Permissions Policy
        const permissionsDirectives = Object.entries(securityConfig.permissionsPolicy)
            .map(([key, value]) => `${key}=${value}`)
            .join(', ');
        
        addMetaTag('Permissions-Policy', permissionsDirectives, 'http-equiv');
        
        // Additional security headers (via meta tags where possible)
        addMetaTag('X-Content-Type-Options', 'nosniff', 'http-equiv');
        addMetaTag('X-Frame-Options', 'DENY', 'http-equiv');
        addMetaTag('X-XSS-Protection', '1; mode=block', 'http-equiv');
        addMetaTag('Referrer-Policy', 'strict-origin-when-cross-origin', 'name');
        
        // Preconnect for security
        addSecurityPreconnects();
        
        // Add security attributes to forms
        secureForms();
        
        // Add security attributes to links
        secureLinks();
    }
    
    // Add meta tag helper
    function addMetaTag(content, value, type) {
        const existing = document.querySelector(`meta[${type}="${content}"]`);
        if (existing && !existing.hasAttribute('data-auto-security')) {
            return; // Don't override manually set tags
        }
        
        if (existing) {
            existing.content = value;
        } else {
            const meta = document.createElement('meta');
            meta.setAttribute(type, content);
            meta.content = value;
            meta.setAttribute('data-auto-security', 'true');
            document.head.appendChild(meta);
        }
    }
    
    // Add security preconnects
    function addSecurityPreconnects() {
        const preconnects = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];
        
        preconnects.forEach(url => {
            if (!document.querySelector(`link[rel="preconnect"][href="${url}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = url;
                link.crossOrigin = 'anonymous';
                link.setAttribute('data-auto-security', 'true');
                document.head.appendChild(link);
            }
        });
    }
    
    // Secure forms
    function secureForms() {
        document.querySelectorAll('form').forEach(form => {
            // Add autocomplete attributes for security
            if (!form.hasAttribute('autocomplete')) {
                form.setAttribute('autocomplete', 'on');
            }
            
            // Add novalidate only if not using server-side validation
            // (commented out - keep server validation)
            // form.setAttribute('novalidate', '');
        });
        
        // Secure input fields
        document.querySelectorAll('input[type="email"], input[type="text"]').forEach(input => {
            if (input.type === 'email' && !input.hasAttribute('autocomplete')) {
                input.setAttribute('autocomplete', 'email');
            }
        });
    }
    
    // Secure external links
    function secureLinks() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            const href = link.getAttribute('href');
            const isExternal = !href.startsWith(window.location.origin);
            
            if (isExternal) {
                // Add security attributes to external links
                if (!link.hasAttribute('rel')) {
                    link.setAttribute('rel', 'noopener noreferrer');
                } else {
                    const rel = link.getAttribute('rel');
                    if (!rel.includes('noopener')) {
                        link.setAttribute('rel', rel + ' noopener noreferrer');
                    }
                }
                
                // Add target="_blank" if not present
                if (link.hasAttribute('target') && link.getAttribute('target') === '_blank') {
                    // Already has target, ensure rel is set
                } else if (link.hasAttribute('target')) {
                    // Has different target, leave as is
                }
            }
        });
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applySecurityHeaders);
    } else {
        applySecurityHeaders();
    }
    
    // Re-apply on dynamic content changes
    const observer = new MutationObserver(() => {
        secureForms();
        secureLinks();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();

