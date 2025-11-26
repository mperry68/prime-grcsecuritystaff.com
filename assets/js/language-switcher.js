// Language Switcher Functionality
// Handles switching between English and French versions of pages
// Falls back to English if French version doesn't exist

(function() {
    'use strict';
    
    // Detect current language from URL
    function getCurrentLanguage() {
        const path = window.location.pathname;
        return path.startsWith('/fr/') ? 'fr' : 'en';
    }
    
    // Get current page name
    function getCurrentPage() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(s => s);
        const filename = segments[segments.length - 1] || 'index.html';
        return filename === '' || filename === 'fr' ? 'index.html' : filename;
    }
    
    // Get the corresponding page URL in the other language
    function getAlternateLanguageUrl() {
        const currentLang = getCurrentLanguage();
        const currentPage = getCurrentPage();
        const targetLang = currentLang === 'en' ? 'fr' : 'en';
        
        // Special case for homepage
        if (currentPage === 'index.html' || currentPage === '') {
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
    
    // Check if a page exists
    async function pageExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
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
                
                // Check if English page exists
                const englishExists = await pageExists(englishUrl);
                
                if (englishExists) {
                    // Redirect to English and show notice
                    window.history.replaceState({}, '', englishUrl);
                    showFallbackNotice();
                    // Reload header/footer to get English versions
                    location.reload();
                }
            }
        }
    }
    
    // Initialize language switcher
    async function initLanguageSwitcher() {
        const langLinks = document.querySelectorAll('.lang-link');
        const currentLang = getCurrentLanguage();
        const alternateUrl = getAlternateLanguageUrl();
        
        langLinks.forEach(link => {
            const linkLang = link.getAttribute('data-lang');
            
            // Highlight current language
            if (linkLang === currentLang) {
                link.classList.add('active');
                link.style.fontWeight = 'bold';
                link.style.color = 'var(--primary-color)';
            }
            
            // Set up click handler
            link.addEventListener('click', async function(e) {
                e.preventDefault();
                
                // Only switch if clicking the other language
                if (linkLang !== currentLang) {
                    // If switching to French, check if page exists first
                    if (linkLang === 'fr') {
                        const exists = await pageExists(alternateUrl);
                        if (exists) {
                            window.location.href = alternateUrl;
                        } else {
                            // French page doesn't exist, stay on English and show notice
                            showFallbackNotice();
                            // Update active state
                            langLinks.forEach(l => {
                                l.classList.remove('active');
                                l.style.fontWeight = 'normal';
                                l.style.color = '';
                            });
                            document.querySelector(`[data-lang="en"]`).classList.add('active');
                            document.querySelector(`[data-lang="en"]`).style.fontWeight = 'bold';
                            document.querySelector(`[data-lang="en"]`).style.color = 'var(--primary-color)';
                        }
                    } else {
                        // Switching to English - always works
                        window.location.href = alternateUrl;
                    }
                }
            });
        });
        
        // Check if we need to show fallback notice
        await checkFrenchPageExists();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
    } else {
        initLanguageSwitcher();
    }
})();

