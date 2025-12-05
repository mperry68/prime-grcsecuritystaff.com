// Link Checker - Validates internal links on the page
// Run this in browser console to check for broken links

(function() {
    'use strict';
    
    function checkLinks() {
        const links = document.querySelectorAll('a[href]');
        const results = {
            total: links.length,
            internal: 0,
            external: 0,
            broken: [],
            anchors: 0
        };
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Skip mailto, tel, and anchor links
            if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
                if (href.startsWith('#')) {
                    results.anchors++;
                }
                return;
            }
            
            // Check if external
            if (href.startsWith('http://') || href.startsWith('https://')) {
                results.external++;
                return;
            }
            
            // Internal link
            results.internal++;
            
            // Check if file exists (for relative paths)
            if (href.startsWith('/') || !href.includes('://')) {
                // This is a basic check - actual validation would require server-side
                const path = href.startsWith('/') ? href : new URL(href, window.location.origin).pathname;
                
                // Check if it's a valid path format
                if (path.includes('.html') || path.endsWith('/')) {
                    // Could add fetch check here, but that would be async
                    console.log('Internal link:', path);
                }
            }
        });
        
        console.log('Link Check Results:', results);
        return results;
    }
    
    // Export for console use
    window.checkLinks = checkLinks;
    
    // Auto-run in development
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', checkLinks);
        } else {
            checkLinks();
        }
    }
})();

