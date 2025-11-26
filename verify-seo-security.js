// SEO and Security Verification Script
// Run this in browser console to verify all pages have SEO and security scripts

(function() {
    'use strict';
    
    const checks = {
        seo: {
            autoSeo: !!document.querySelector('script[src*="auto-seo.js"]'),
            loadHead: !!document.querySelector('script[src*="load-head.js"]')
        },
        security: {
            securityHeaders: !!document.querySelector('script[src*="security-headers.js"]'),
            vulnerabilityProtection: !!document.querySelector('script[src*="vulnerability-protection.js"]')
        },
        meta: {
            hasDescription: !!document.querySelector('meta[name="description"]'),
            hasRobots: !!document.querySelector('meta[name="robots"]'),
            hasOG: !!document.querySelector('meta[property="og:title"]'),
            hasTwitter: !!document.querySelector('meta[name="twitter:card"]'),
            hasCanonical: !!document.querySelector('link[rel="canonical"]')
        },
        securityHeaders: {
            hasCSP: !!document.querySelector('meta[http-equiv="Content-Security-Policy"]'),
            hasXFrame: !!document.querySelector('meta[http-equiv="X-Frame-Options"]'),
            hasXSS: !!document.querySelector('meta[http-equiv="X-XSS-Protection"]'),
            hasContentType: !!document.querySelector('meta[http-equiv="X-Content-Type-Options"]')
        }
    };
    
    console.log('=== SEO & Security Verification ===');
    console.log('Page:', window.location.pathname);
    console.log('');
    
    console.log('📊 SEO Scripts:');
    console.log('  ✓ auto-seo.js:', checks.seo.autoSeo ? '✅' : '❌');
    console.log('  ✓ load-head.js:', checks.seo.loadHead ? '✅' : '❌');
    console.log('');
    
    console.log('🔒 Security Scripts:');
    console.log('  ✓ security-headers.js:', checks.security.securityHeaders ? '✅' : '❌');
    console.log('  ✓ vulnerability-protection.js:', checks.security.vulnerabilityProtection ? '✅' : '❌');
    console.log('');
    
    console.log('🏷️ SEO Meta Tags:');
    console.log('  ✓ Description:', checks.meta.hasDescription ? '✅' : '❌');
    console.log('  ✓ Robots:', checks.meta.hasRobots ? '✅' : '❌');
    console.log('  ✓ Open Graph:', checks.meta.hasOG ? '✅' : '❌');
    console.log('  ✓ Twitter Card:', checks.meta.hasTwitter ? '✅' : '❌');
    console.log('  ✓ Canonical:', checks.meta.hasCanonical ? '✅' : '❌');
    console.log('');
    
    console.log('🛡️ Security Headers:');
    console.log('  ✓ CSP:', checks.securityHeaders.hasCSP ? '✅' : '❌');
    console.log('  ✓ X-Frame-Options:', checks.securityHeaders.hasXFrame ? '✅' : '❌');
    console.log('  ✓ X-XSS-Protection:', checks.securityHeaders.hasXSS ? '✅' : '❌');
    console.log('  ✓ X-Content-Type-Options:', checks.securityHeaders.hasContentType ? '✅' : '❌');
    console.log('');
    
    // Overall status
    const allSEO = checks.seo.loadHead && checks.meta.hasDescription && checks.meta.hasOG;
    const allSecurity = checks.security.securityHeaders && checks.securityHeaders.hasCSP;
    
    console.log('📈 Overall Status:');
    console.log('  SEO:', allSEO ? '✅ COMPLETE' : '⚠️ INCOMPLETE');
    console.log('  Security:', allSecurity ? '✅ COMPLETE' : '⚠️ INCOMPLETE');
    
    return {
        seo: allSEO,
        security: allSecurity,
        details: checks
    };
})();

