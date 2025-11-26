// Language Switcher Functionality
// Handles switching between English and French versions of pages
// Falls back to English if French version doesn't exist

(function() {
    'use strict';
    
    console.log('[Language Switcher] Script loaded');
    console.log('[Language Switcher] Current URL:', window.location.href);
    console.log('[Language Switcher] Current pathname:', window.location.pathname);
    
    // Store language preference
    function setLanguagePreference(lang) {
        console.log('[Language Switcher] Setting language preference to:', lang);
        localStorage.setItem('preferred-language', lang);
    }
    
    function getLanguagePreference() {
        const pref = localStorage.getItem('preferred-language') || 'en';
        console.log('[Language Switcher] Retrieved language preference:', pref);
        return pref;
    }
    
    // Detect current language from URL
    function getCurrentLanguage() {
        const path = window.location.pathname;
        const lang = path.startsWith('/fr/') ? 'fr' : 'en';
        console.log('[Language Switcher] Detected current language:', lang, 'from path:', path);
        return lang;
    }
    
    // Get current page name
    function getCurrentPage() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(s => s);
        console.log('[Language Switcher] Path segments:', segments);
        
        // Handle homepage (root or /fr/)
        if (segments.length === 0 || (segments.length === 1 && segments[0] === 'fr')) {
            console.log('[Language Switcher] Detected homepage');
            return 'index.html';
        }
        
        // If we're in /fr/, get the page after 'fr'
        if (segments[0] === 'fr') {
            if (segments.length === 1) {
                console.log('[Language Switcher] Detected French homepage');
                return 'index.html'; // /fr/ is homepage
            }
            const page = segments[1]; // /fr/page.html -> page.html
            console.log('[Language Switcher] Detected French page:', page);
            return page;
        }
        
        // Get the last segment (filename)
        const filename = segments[segments.length - 1];
        const page = filename || 'index.html';
        console.log('[Language Switcher] Detected page:', page);
        return page;
    }
    
    // Get the corresponding page URL in the other language
    function getAlternateLanguageUrl() {
        const currentLang = getCurrentLanguage();
        const currentPage = getCurrentPage();
        const targetLang = currentLang === 'en' ? 'fr' : 'en';
        console.log('[Language Switcher] Getting alternate URL - Current:', currentLang, 'Page:', currentPage, 'Target:', targetLang);
        
        // Special case for homepage
        if (currentPage === 'index.html') {
            const url = targetLang === 'fr' ? '/fr/' : '/';
            console.log('[Language Switcher] Homepage alternate URL:', url);
            return url;
        }
        
        // For other pages
        let url;
        if (targetLang === 'fr') {
            url = `/fr/${currentPage}`;
        } else {
            // Remove /fr/ prefix if present
            url = `/${currentPage}`;
        }
        console.log('[Language Switcher] Alternate URL:', url);
        return url;
    }
    
    // Check if a page exists (with better error handling)
    async function pageExists(url) {
        console.log('[Language Switcher] Checking if page exists:', url);
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const exists = response.ok;
            console.log('[Language Switcher] Page exists check (HEAD):', exists, 'Status:', response.status);
            return exists;
        } catch (error) {
            console.log('[Language Switcher] HEAD request failed, trying GET:', error.message);
            // If HEAD fails, try GET
            try {
                const response = await fetch(url, { method: 'GET' });
                const exists = response.ok;
                console.log('[Language Switcher] Page exists check (GET):', exists, 'Status:', response.status);
                return exists;
            } catch (e) {
                console.log('[Language Switcher] GET request also failed:', e.message);
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
        console.log('[Language Switcher] Checking if French page exists');
        const currentLang = getCurrentLanguage();
        const currentPage = getCurrentPage();
        
        // If we're on a French URL, check if the page actually exists
        if (currentLang === 'fr') {
            const frenchUrl = window.location.pathname;
            console.log('[Language Switcher] On French URL, checking existence:', frenchUrl);
            const exists = await pageExists(frenchUrl);
            
            if (!exists) {
                // French page doesn't exist, redirect to English but keep French preference
                const englishUrl = currentPage === 'index.html' ? '/' : `/${currentPage}`;
                console.log('[Language Switcher] French page does not exist, redirecting to English but keeping FR preference:', englishUrl);
                
                // Keep French language preference so navigation continues to prefer French
                setLanguagePreference('fr');
                
                // Redirect to English and show notice
                window.location.href = englishUrl;
            } else {
                console.log('[Language Switcher] French page exists, staying on French version');
            }
        } else {
            console.log('[Language Switcher] Not on French URL, skipping check');
        }
    }
    
    // Make navigation links language-aware with fallback checking
    async function updateNavigationLinks(lang) {
        console.log('[Language Switcher] Updating navigation links for language:', lang);
        const navLinks = document.querySelectorAll('.nav-menu a[href^="/"]');
        console.log('[Language Switcher] Found', navLinks.length, 'navigation links');
        
        let updatedCount = 0;
        
        // Process links sequentially to check French availability
        for (let index = 0; index < navLinks.length; index++) {
            const link = navLinks[index];
            const href = link.getAttribute('href');
            if (!href) {
                console.log('[Language Switcher] Link', index, 'has no href, skipping');
                continue;
            }
            
            // Skip external links
            if (href.startsWith('http') || href.startsWith('#')) {
                console.log('[Language Switcher] Link', index, 'is external or anchor, skipping:', href);
                continue;
            }
            
            // Skip language switcher links
            if (link.classList.contains('lang-link')) {
                console.log('[Language Switcher] Link', index, 'is language switcher, skipping:', href);
                continue;
            }
            
            const originalHref = href;
            // Update link based on language
            if (lang === 'fr') {
                // Convert to French URL, but check if it exists first
                let targetHref;
                if (href === '/' || href === '/index.html') {
                    targetHref = '/fr/';
                } else if (!href.startsWith('/fr/')) {
                    targetHref = `/fr${href}`;
                } else {
                    console.log('[Language Switcher] Link', index, 'already French, no change:', href);
                    continue;
                }
                
                // Check if French page exists
                const frenchExists = await pageExists(targetHref);
                if (frenchExists) {
                    link.setAttribute('href', targetHref);
                    console.log('[Language Switcher] Updated link', index, ':', originalHref, '->', targetHref, '(French exists)');
                    updatedCount++;
                } else {
                    // French doesn't exist, use English but keep preference
                    const englishHref = href === '/' || href === '/index.html' ? '/' : href;
                    link.setAttribute('href', englishHref);
                    console.log('[Language Switcher] Updated link', index, ':', originalHref, '->', englishHref, '(French not available, using English)');
                    updatedCount++;
                }
            } else {
                // Convert to English URL
                if (href === '/fr/' || href === '/fr/index.html') {
                    link.setAttribute('href', '/');
                    console.log('[Language Switcher] Updated link', index, ':', originalHref, '-> /');
                    updatedCount++;
                } else if (href.startsWith('/fr/')) {
                    const newHref = href.replace('/fr/', '/');
                    link.setAttribute('href', newHref);
                    console.log('[Language Switcher] Updated link', index, ':', originalHref, '->', newHref);
                    updatedCount++;
                } else {
                    console.log('[Language Switcher] Link', index, 'already English, no change:', href);
                }
            }
        }
        console.log('[Language Switcher] Updated', updatedCount, 'navigation links');
    }
    
    // Initialize language switcher
    async function initLanguageSwitcher() {
        console.log('[Language Switcher] Initializing language switcher...');
        // Wait a bit for header to load
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const langLinks = document.querySelectorAll('.lang-link');
        console.log('[Language Switcher] Found', langLinks.length, 'language switcher links');
        
        if (langLinks.length === 0) {
            console.warn('[Language Switcher] No language switcher links found! Header may not be loaded yet.');
            return;
        }
        
        const currentLang = getCurrentLanguage();
        const preferredLang = getLanguagePreference();
        // Use preferred language if we're on English page but preference is French
        const activeLang = (currentLang === 'en' && preferredLang === 'fr') ? 'fr' : currentLang;
        const alternateUrl = getAlternateLanguageUrl();
        
        console.log('[Language Switcher] Current language:', currentLang);
        console.log('[Language Switcher] Preferred language:', preferredLang);
        console.log('[Language Switcher] Active language for navigation:', activeLang);
        console.log('[Language Switcher] Alternate URL:', alternateUrl);
        
        // Update language preference based on current page or keep existing preference
        if (currentLang === 'fr') {
            setLanguagePreference('fr');
        } else if (preferredLang === 'fr') {
            // Keep French preference even if on English page (fallback scenario)
            setLanguagePreference('fr');
        } else {
            setLanguagePreference('en');
        }
        
        // Update navigation links using active language (prefers French if that's the preference)
        await updateNavigationLinks(activeLang);
        
        langLinks.forEach((link, index) => {
            const linkLang = link.getAttribute('data-lang');
            console.log('[Language Switcher] Processing link', index, 'with language:', linkLang);
            
            // Highlight current language
            if (linkLang === currentLang) {
                link.classList.add('active');
                link.style.fontWeight = 'bold';
                link.style.color = 'var(--primary-color)';
                console.log('[Language Switcher] Marked link', index, 'as active (current language)');
            } else {
                link.classList.remove('active');
                link.style.fontWeight = 'normal';
                link.style.color = '';
                console.log('[Language Switcher] Marked link', index, 'as inactive');
            }
            
            // Set up click handler
            link.addEventListener('click', async function(e) {
                console.log('[Language Switcher] Language link clicked!');
                console.log('[Language Switcher] Clicked link language:', linkLang);
                console.log('[Language Switcher] Current language:', currentLang);
                console.log('[Language Switcher] Alternate URL:', alternateUrl);
                
                e.preventDefault();
                e.stopPropagation();
                
                // Only switch if clicking the other language
                if (linkLang !== currentLang) {
                    console.log('[Language Switcher] Switching language from', currentLang, 'to', linkLang);
                    // Store preference and navigate
                    setLanguagePreference(linkLang);
                    
                    console.log('[Language Switcher] Navigating to:', alternateUrl);
                    // Navigate directly - let the page load handle fallback
                    window.location.href = alternateUrl;
                } else {
                    console.log('[Language Switcher] Same language clicked, no action needed');
                }
            });
        });
        
        // Check if we need to show fallback notice
        await checkFrenchPageExists();
        
        // Re-update navigation after a delay to catch dynamically loaded content
        console.log('[Language Switcher] Scheduling navigation link update in 500ms');
        setTimeout(async () => {
            console.log('[Language Switcher] Re-updating navigation links');
            const preferredLang = getLanguagePreference();
            await updateNavigationLinks(preferredLang);
        }, 500);
        
        console.log('[Language Switcher] Initialization complete');
    }
    
    // Initialize when DOM is ready
    function init() {
        console.log('[Language Switcher] Init function called, document readyState:', document.readyState);
        if (document.readyState === 'loading') {
            console.log('[Language Switcher] DOM still loading, waiting for DOMContentLoaded');
            document.addEventListener('DOMContentLoaded', () => {
                console.log('[Language Switcher] DOMContentLoaded fired');
                initLanguageSwitcher();
            });
        } else {
            console.log('[Language Switcher] DOM already ready, initializing immediately');
            initLanguageSwitcher();
        }
    }
    
    // Also listen for header load events
    document.addEventListener('headerLoaded', () => {
        console.log('[Language Switcher] headerLoaded event received');
        initLanguageSwitcher();
    });
    
    console.log('[Language Switcher] Starting initialization');
    init();
})();

