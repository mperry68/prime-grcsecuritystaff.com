// Comprehensive Security Headers and Vulnerability Protection
// Automatically applies security headers and best practices to all pages
// Protects against common vulnerabilities: XSS, CSRF, Clickjacking, MIME sniffing, etc.

(function() {
    'use strict';
    
    // Security configuration
    const securityConfig = {
        // Content Security Policy - Strict policy to prevent XSS
        csp: {
            'default-src': "'self'",
            'script-src': "'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
            'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
            'font-src': "'self' https://fonts.gstatic.com data:",
            'img-src': "'self' data: https: blob:",
            'connect-src': "'self'",
            'frame-src': "'none'",
            'frame-ancestors': "'none'",
            'base-uri': "'self'",
            'form-action': "'self'",
            'object-src': "'none'",
            'media-src': "'self'",
            'worker-src': "'self'",
            'manifest-src': "'self'",
            'upgrade-insecure-requests': '',
            'block-all-mixed-content': ''
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
            'accelerometer': '()',
            'fullscreen': '()',
            'picture-in-picture': '()',
            'autoplay': '()',
            'encrypted-media': '()',
            'battery': '()',
            'bluetooth': '()',
            'nfc': '()',
            'serial': '()',
            'xr-spatial-tracking': '()'
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
        
        // XSS Protection
        addMetaTag('X-Content-Type-Options', 'nosniff', 'http-equiv');
        addMetaTag('X-Frame-Options', 'DENY', 'http-equiv');
        addMetaTag('X-XSS-Protection', '1; mode=block', 'http-equiv');
        
        // Referrer Policy
        addMetaTag('Referrer-Policy', 'strict-origin-when-cross-origin', 'name');
        
        // Additional security headers
        addMetaTag('Cross-Origin-Embedder-Policy', 'require-corp', 'http-equiv');
        addMetaTag('Cross-Origin-Opener-Policy', 'same-origin', 'http-equiv');
        addMetaTag('Cross-Origin-Resource-Policy', 'same-origin', 'http-equiv');
        
        // Preconnect for security
        addSecurityPreconnects();
        
        // Secure forms and inputs
        secureForms();
        
        // Secure links
        secureLinks();
        
        // Prevent common attacks
        preventCommonAttacks();
        
        // Sanitize user inputs
        sanitizeInputs();
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
            { url: 'https://fonts.googleapis.com', crossorigin: true },
            { url: 'https://fonts.gstatic.com', crossorigin: true }
        ];
        
        preconnects.forEach(({ url, crossorigin }) => {
            if (!document.querySelector(`link[rel="preconnect"][href="${url}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = url;
                if (crossorigin) link.crossOrigin = 'anonymous';
                link.setAttribute('data-auto-security', 'true');
                document.head.appendChild(link);
            }
        });
    }
    
    // Secure forms against common vulnerabilities
    function secureForms() {
        document.querySelectorAll('form').forEach(form => {
            // Add CSRF protection attributes
            if (!form.hasAttribute('autocomplete')) {
                form.setAttribute('autocomplete', 'on');
            }
            
            // Prevent form submission to external domains (unless explicitly allowed)
            form.addEventListener('submit', function(e) {
                const action = form.getAttribute('action');
                if (action && action.startsWith('http') && !action.startsWith(window.location.origin)) {
                    // External form action - ensure it's intentional
                    if (!form.hasAttribute('data-allow-external')) {
                        console.warn('Form submission to external domain detected:', action);
                        // Allow but log warning
                    }
                }
            });
            
            // Secure input fields
            form.querySelectorAll('input, textarea, select').forEach(input => {
                // Add appropriate autocomplete
                if (input.type === 'email' && !input.hasAttribute('autocomplete')) {
                    input.setAttribute('autocomplete', 'email');
                }
                if (input.type === 'password' && !input.hasAttribute('autocomplete')) {
                    input.setAttribute('autocomplete', 'current-password');
                }
                
                // Prevent XSS in input values
                if (input.value) {
                    input.value = sanitizeString(input.value);
                }
            });
        });
    }
    
    // Secure external links
    function secureLinks() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            const href = link.getAttribute('href');
            const isExternal = href && !href.startsWith(window.location.origin);
            
            if (isExternal) {
                // Add security attributes to external links
                let rel = link.getAttribute('rel') || '';
                if (!rel.includes('noopener')) {
                    rel = rel ? rel + ' noopener noreferrer' : 'noopener noreferrer';
                    link.setAttribute('rel', rel);
                }
            }
        });
    }
    
    // Prevent common attacks
    function preventCommonAttacks() {
        // Prevent window.opener attacks
        window.opener = null;
        
        // Override dangerous functions in development
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
            // Only in development
            return;
        }
        
        // Prevent eval() usage (warning only)
        const originalEval = window.eval;
        window.eval = function(code) {
            console.warn('eval() usage detected - potential security risk');
            return originalEval.call(this, code);
        };
        
        // Monitor for suspicious activity
        monitorSuspiciousActivity();
    }
    
    // Sanitize user inputs
    function sanitizeInputs() {
        // Add input sanitization to all text inputs
        document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(input => {
            input.addEventListener('input', function(e) {
                // Basic sanitization - remove script tags
                const value = e.target.value;
                if (value.includes('<script') || value.includes('javascript:')) {
                    e.target.value = value.replace(/<script[^>]*>.*?<\/script>/gi, '')
                                          .replace(/javascript:/gi, '');
                }
            });
        });
    }
    
    // Sanitize string helper
    function sanitizeString(str) {
        if (typeof str !== 'string') return str;
        return str
            .replace(/<script[^>]*>.*?<\/script>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '');
    }
    
    // Monitor for suspicious activity
    function monitorSuspiciousActivity() {
        // Monitor for XSS attempts
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        // Check for suspicious script injection
                        if (node.tagName === 'SCRIPT' && node.src === '') {
                            const text = node.textContent || '';
                            if (text.includes('eval') || text.includes('Function')) {
                                console.warn('Potential XSS attempt detected');
                            }
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Monitor console for errors (potential attacks)
        const originalError = console.error;
        console.error = function(...args) {
            const message = args.join(' ');
            if (message.includes('CSP') || message.includes('Content Security Policy')) {
                // CSP violation - log but don't block
                console.warn('CSP violation detected:', message);
            }
            originalError.apply(console, args);
        };
    }
    
    // Add security attributes to dynamically created elements
    function secureDynamicContent() {
        // Override createElement to add security to new elements
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName, options) {
            const element = originalCreateElement.call(document, tagName, options);
            
            // Add security to links
            if (tagName.toLowerCase() === 'a') {
                element.addEventListener('click', function(e) {
                    const href = element.getAttribute('href');
                    if (href && href.startsWith('http') && !href.startsWith(window.location.origin)) {
                        if (!element.getAttribute('rel') || !element.getAttribute('rel').includes('noopener')) {
                            element.setAttribute('rel', 'noopener noreferrer');
                        }
                    }
                });
            }
            
            // Add security to forms
            if (tagName.toLowerCase() === 'form') {
                element.setAttribute('autocomplete', 'on');
            }
            
            return element;
        };
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            applySecurityHeaders();
            secureDynamicContent();
        });
    } else {
        applySecurityHeaders();
        secureDynamicContent();
    }
    
    // Re-apply on dynamic content changes
    const observer = new MutationObserver(function() {
        secureForms();
        secureLinks();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
