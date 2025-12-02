// Universal Head Component Loader
// Automatically loads SEO and security scripts for all pages
// Works for existing and future pages

(function() {
    'use strict';
    
    // Base scripts that should be on every page
    const requiredScripts = [
        '/assets/js/auto-seo.js',
        '/assets/js/security-headers.js',
        '/assets/js/vulnerability-protection.js'
    ];
    
    // Check if scripts are already loaded
    function isScriptLoaded(src) {
        return Array.from(document.querySelectorAll('script[src]'))
            .some(script => script.src.includes(src));
    }
    
    // Load IP2Country script
    function loadIp2cScript() {
        // Check if IP2Country script is already loaded
        if (window.ip2c) {
            return;
        }
        
        const ip2cScript = document.createElement('script');
        ip2cScript.textContent = `
            ! function (i, s, o, g, r, a, m) {
                i.Ip2cObject = o;
                i[o] || (i[o] = function () {
                    (i[o].q = i[o].q || []).push(arguments)
                });
                i[o].l = +new Date;
                r = s.createElement(g);
                a = s.getElementsByTagName(g)[0];
                r.src = '//reveal.ip2c.net/8432574.js';
                a.parentNode.insertBefore(r, a)
            }(window, document, 'ip2c', 'script');
            
            ip2c('verify', '8432574');
        `;
        ip2cScript.setAttribute('data-auto-loaded', 'true');
        document.head.appendChild(ip2cScript);
    }
    
    // Load required scripts
    function loadRequiredScripts() {
        const basePath = getBasePath();
        
        // Load IP2Country script first
        loadIp2cScript();
        
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

