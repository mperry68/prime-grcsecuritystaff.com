// Universal Head Component Loader
// Automatically loads SEO and security scripts for all pages
// Works for existing and future pages

(function() {
    'use strict';
    
    // Base scripts that should be on every page
    const requiredScripts = [
        '/assets/js/auto-seo.js',
        '/assets/js/security-headers.js'
    ];
    
    // Check if scripts are already loaded
    function isScriptLoaded(src) {
        return Array.from(document.querySelectorAll('script[src]'))
            .some(script => script.src.includes(src));
    }
    
    // Load required scripts
    function loadRequiredScripts() {
        const basePath = getBasePath();
        
        requiredScripts.forEach(scriptPath => {
            const fullPath = basePath === '/' ? scriptPath : '../' + scriptPath.replace('/', '');
            
            if (!isScriptLoaded(scriptPath) && !isScriptLoaded(fullPath)) {
                const script = document.createElement('script');
                script.src = fullPath;
                script.defer = true;
                script.setAttribute('data-auto-loaded', 'true');
                document.head.appendChild(script);
            }
        });
    }
    
    // Get base path (same logic as load-components.js)
    function getBasePath() {
        const pathSegments = window.location.pathname.split('/').filter(segment => segment !== '');
        if (pathSegments[0] === 'fr') {
            return pathSegments.length > 2 ? '../../' : '../';
        }
        if (pathSegments.length > 1 && pathSegments[pathSegments.length - 1].includes('.html')) {
            return '../';
        }
        return '/';
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadRequiredScripts);
    } else {
        loadRequiredScripts();
    }
})();

