// Lazy Loading and Performance Optimization
// Implements lazy loading for images and optimizes resource loading

(function() {
    'use strict';
    
    // Configuration
    const config = {
        // Intersection Observer options
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01,
        
        // Image placeholder (optional - can use blur-up technique)
        placeholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'
    };
    
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: Load all images immediately
        loadAllImages();
        return;
    }
    
    // Initialize lazy loading when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLazyLoading);
    } else {
        initLazyLoading();
    }
    
    function initLazyLoading() {
        // Lazy load images
        lazyLoadImages();
        
        // Lazy load background images
        lazyLoadBackgroundImages();
        
        // Optimize font loading
        optimizeFontLoading();
        
        // Preload critical resources
        preloadCriticalResources();
    }
    
    // Lazy load regular images
    function lazyLoadImages() {
        // Only handle images with data-src (enhanced lazy loading)
        // Images with loading="lazy" use native browser lazy loading
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length === 0) {
            // No data-src images, native lazy loading will handle it
            return;
        }
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: config.rootMargin,
            threshold: config.threshold
        });
        
        // Observe all lazy images with data-src
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Load a single image
    function loadImage(img) {
        const dataSrc = img.getAttribute('data-src');
        if (!dataSrc) return;
        
        // Add loading class
        img.classList.add('lazy-loading');
        
        // Create new image to preload
        const imageLoader = new Image();
        
        imageLoader.onload = function() {
            // Image loaded successfully
            img.src = dataSrc;
            img.removeAttribute('data-src');
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-loaded');
            
            // Trigger custom event
            img.dispatchEvent(new CustomEvent('lazyloaded', { bubbles: true }));
        };
        
        imageLoader.onerror = function() {
            // Image failed to load
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-error');
            console.warn('Failed to load image:', dataSrc);
        };
        
        // Start loading
        imageLoader.src = dataSrc;
    }
    
    // Lazy load background images
    function lazyLoadBackgroundImages() {
        const elements = document.querySelectorAll('[data-bg]');
        
        if (elements.length === 0) return;
        
        const bgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const bgImage = element.getAttribute('data-bg');
                    
                    // Apply background image
                    element.style.backgroundImage = `url(${bgImage})`;
                    element.removeAttribute('data-bg');
                    element.classList.add('lazy-bg-loaded');
                    
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: config.rootMargin,
            threshold: config.threshold
        });
        
        elements.forEach(element => {
            bgObserver.observe(element);
        });
    }
    
    // Fallback: Load all images immediately (for browsers without Intersection Observer)
    function loadAllImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
                img.src = dataSrc;
                img.removeAttribute('data-src');
            }
        });
    }
    
    // Optimize font loading
    function optimizeFontLoading() {
        // Check if fonts are already loaded
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                document.documentElement.classList.add('fonts-loaded');
            });
        }
        
        // Preload critical fonts
        const fontPreloads = [
            { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap', as: 'style' }
        ];
        
        fontPreloads.forEach(font => {
            if (!document.querySelector(`link[rel="preload"][href="${font.href}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = font.href;
                link.as = font.as || 'style';
                if (font.crossorigin) link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            }
        });
    }
    
    // Preload critical resources
    function preloadCriticalResources() {
        // Preload hero image (above the fold)
        const heroImage = document.querySelector('.hero-image img, .hero img');
        if (heroImage && heroImage.src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = heroImage.src;
            link.setAttribute('fetchpriority', 'high');
            document.head.appendChild(link);
        }
        
        // Preload critical CSS
        const criticalCSS = document.querySelector('link[rel="stylesheet"]');
        if (criticalCSS && !criticalCSS.hasAttribute('data-preloaded')) {
            criticalCSS.setAttribute('data-preloaded', 'true');
        }
    }
    
    // Handle dynamically added images
    const mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Element node
                    // Check for lazy images
                    if (node.tagName === 'IMG' && (node.hasAttribute('data-src') || node.getAttribute('loading') === 'lazy')) {
                        if (node.hasAttribute('data-src')) {
                            const imageObserver = new IntersectionObserver((entries, observer) => {
                                entries.forEach(entry => {
                                    if (entry.isIntersecting) {
                                        loadImage(entry.target);
                                        observer.unobserve(entry.target);
                                    }
                                });
                            }, {
                                rootMargin: config.rootMargin,
                                threshold: config.threshold
                            });
                            imageObserver.observe(node);
                        }
                    }
                    
                    // Check for lazy background images
                    if (node.hasAttribute && node.hasAttribute('data-bg')) {
                        const bgObserver = new IntersectionObserver((entries, observer) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    const element = entry.target;
                                    const bgImage = element.getAttribute('data-bg');
                                    element.style.backgroundImage = `url(${bgImage})`;
                                    element.removeAttribute('data-bg');
                                    observer.unobserve(element);
                                }
                            });
                        }, {
                            rootMargin: config.rootMargin,
                            threshold: config.threshold
                        });
                        bgObserver.observe(node);
                    }
                }
            });
        });
    });
    
    // Start observing
    if (document.body) {
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
    
    // Export for external use
    window.lazyLoad = {
        loadImage: loadImage,
        loadAllImages: loadAllImages
    };
})();

