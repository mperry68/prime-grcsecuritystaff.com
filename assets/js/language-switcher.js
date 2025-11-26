// Language Switcher Functionality
// Handles switching between English and French versions of pages
// Falls back to English if French version doesn't exist

(function() {
    'use strict';
    
    // Store language preference
    function setLanguagePreference(lang) {
        localStorage.setItem('preferred-language', lang);
    }
    
    function getLanguagePreference() {
        return localStorage.getItem('preferred-language') || 'en';
    }
    
    // Detect current language from URL
    function getCurrentLanguage() {
        const path = window.location.pathname;
        return path.startsWith('/fr/') ? 'fr' : 'en';
    }
    
    // Get current page name
    function getCurrentPage() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(s => s);
        
        // Handle homepage (root or /fr/)
        if (segments.length === 0 || (segments.length === 1 && segments[0] === 'fr')) {
            return 'index.html';
        }
        
        // If we're in /fr/, get the page after 'fr'
        if (segments[0] === 'fr') {
            if (segments.length === 1) {
                return 'index.html'; // /fr/ is homepage
            }
            return segments[1]; // /fr/page.html -> page.html
        }
        
        // Get the last segment (filename)
        const filename = segments[segments.length - 1];
        return filename || 'index.html';
    }
    
    // Get the corresponding page URL in the other language
    function getAlternateLanguageUrl() {
        const currentLang = getCurrentLanguage();
        const currentPage = getCurrentPage();
        const targetLang = currentLang === 'en' ? 'fr' : 'en';
        
        // Special case for homepage
        if (currentPage === 'index.html') {
            return targetLang === 'fr' ? '/fr/' : '/';
        }
        
        // For other pages
        if (targetLang === 'fr') {
            return `/fr/${currentPage}`;
        } else {
            // Remove /fr/ prefix if present
            return `/${currentPage}`;
        }
    }
    
    // Check if a page exists (with better error handling)
    async function pageExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            // If HEAD fails, try GET
            try {
                const response = await fetch(url, { method: 'GET' });
                return response.ok;
            } catch (e) {
                return false;
            }
        }
    }
    
    // Show notice banner when viewing English content on French URL
    function showFallbackNotice() {
        // Check if notice already exists
        if (document.getElementById('language-fallback-notice')) {
            return;
        }
        
        const notice = document.createElement('div');
        notice.id = 'language-fallback-notice';
        notice.className = 'language-fallback-notice';
        notice.innerHTML = `
            <div class="container">
                <span>🇬🇧 Cette page n'est pas encore disponible en français. Affichage de la version anglaise.</span>
                <span class="notice-en">This page is not yet available in French. Showing English version.</span>
                <button class="notice-close" aria-label="Close notice">×</button>
            </div>
        `;
        
        // Insert at the top of body
        document.body.insertBefore(notice, document.body.firstChild);
        
        // Close button handler
        const closeBtn = notice.querySelector('.notice-close');
        closeBtn.addEventListener('click', () => {
            notice.style.display = 'none';
            // Store in sessionStorage to remember user dismissed it
            sessionStorage.setItem('lang-fallback-dismissed', 'true');
        });
        
        // Check if user previously dismissed
        if (sessionStorage.getItem('lang-fallback-dismissed') === 'true') {
            notice.style.display = 'none';
        }
    }
    
    // Check if we're on a French URL but viewing English content
    async function checkFrenchPageExists() {
        const currentLang = getCurrentLanguage();
        const currentPage = getCurrentPage();
        
        // If we're on a French URL, check if the page actually exists
        if (currentLang === 'fr') {
            const frenchUrl = window.location.pathname;
            const exists = await pageExists(frenchUrl);
            
            if (!exists) {
                // French page doesn't exist, redirect to English
                const englishUrl = currentPage === 'index.html' ? '/' : `/${currentPage}`;
                
                // Redirect to English and show notice
                window.location.href = englishUrl;
            }
        }
    }
    
    // Make navigation links language-aware
    function updateNavigationLinks(lang) {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="/"]');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            
            // Skip external links
            if (href.startsWith('http') || href.startsWith('#')) return;
            
            // Skip language switcher links
            if (link.classList.contains('lang-link')) return;
            
            // Update link based on language
            if (lang === 'fr') {
                // Convert to French URL
                if (href === '/' || href === '/index.html') {
                    link.setAttribute('href', '/fr/');
                } else if (!href.startsWith('/fr/')) {
                    link.setAttribute('href', `/fr${href}`);
                }
            } else {
                // Convert to English URL
                if (href === '/fr/' || href === '/fr/index.html') {
                    link.setAttribute('href', '/');
                } else if (href.startsWith('/fr/')) {
                    link.setAttribute('href', href.replace('/fr/', '/'));
                }
            }
        });
    }
    
    // Initialize language switcher
    async function initLanguageSwitcher() {
        // Wait a bit for header to load
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const langLinks = document.querySelectorAll('.lang-link');
        const currentLang = getCurrentLanguage();
        const alternateUrl = getAlternateLanguageUrl();
        
        // Update language preference
        setLanguagePreference(currentLang);
        
        // Update navigation links
        updateNavigationLinks(currentLang);
        
        langLinks.forEach(link => {
            const linkLang = link.getAttribute('data-lang');
            
            // Highlight current language
            if (linkLang === currentLang) {
                link.classList.add('active');
                link.style.fontWeight = 'bold';
                link.style.color = 'var(--primary-color)';
            } else {
                link.classList.remove('active');
                link.style.fontWeight = 'normal';
                link.style.color = '';
            }
            
            // Set up click handler
            link.addEventListener('click', async function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Only switch if clicking the other language
                if (linkLang !== currentLang) {
                    // Store preference and navigate
                    setLanguagePreference(linkLang);
                    
                    // Navigate directly - let the page load handle fallback
                    window.location.href = alternateUrl;
                }
            });
        });
        
        // Check if we need to show fallback notice
        await checkFrenchPageExists();
        
        // Re-update navigation after a delay to catch dynamically loaded content
        setTimeout(() => updateNavigationLinks(currentLang), 500);
    }
    
    // Initialize when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
        } else {
            initLanguageSwitcher();
        }
    }
    
    // Also listen for header load events
    document.addEventListener('headerLoaded', initLanguageSwitcher);
    
    init();
})();

