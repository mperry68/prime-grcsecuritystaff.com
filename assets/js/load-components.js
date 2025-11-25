// Standardized Header and Footer Loader
// This script handles loading the header/footer and initializing navigation consistently across ALL pages

(function() {
    'use strict';
    
    // Global navigation initialization flag
    let navigationInitialized = false;
    
    // Load Header and Footer components
    document.addEventListener('DOMContentLoaded', function() {
        const getBasePath = () => {
            const pathSegments = window.location.pathname.split('/').filter(segment => segment !== '');
            if (pathSegments.length > 1 && pathSegments[pathSegments.length - 1].includes('.html')) {
                return '../';
            }
            return '/';
        };
        
        const basePath = getBasePath();
        const headerPath = basePath === '/' ? '/includes/header.html' : '../includes/header.html';
        const footerPath = basePath === '/' ? '/includes/footer.html' : '../includes/footer.html';
        
        // Load Header
        loadHeader(headerPath, basePath);
        
        // Load Footer
        loadFooter(footerPath, basePath);
    });
    
    function loadHeader(path, basePath) {
        fetch(path)
            .then(response => {
                if (!response.ok && basePath !== '/') {
                    return fetch('/includes/header.html');
                }
                if (!response.ok) throw new Error('Failed to load header');
                return response;
            })
            .then(response => response.text())
            .then(data => {
                const headerPlaceholder = document.getElementById('header-placeholder');
                if (headerPlaceholder) {
                    headerPlaceholder.innerHTML = data;
                    // Initialize navigation after header loads
                    setTimeout(initializeNavigation, 200);
                }
            })
            .catch(error => {
                console.error('Error loading header:', error);
                // Retry with absolute path
                if (basePath !== '/') {
                    fetch('/includes/header.html')
                        .then(response => response.text())
                        .then(data => {
                            const headerPlaceholder = document.getElementById('header-placeholder');
                            if (headerPlaceholder) {
                                headerPlaceholder.innerHTML = data;
                                setTimeout(initializeNavigation, 200);
                            }
                        })
                        .catch(err => console.error('Error loading header from absolute path:', err));
                }
            });
    }
    
    function loadFooter(path, basePath) {
        fetch(path)
            .then(response => {
                if (!response.ok && basePath !== '/') {
                    return fetch('/includes/footer.html');
                }
                if (!response.ok) throw new Error('Failed to load footer');
                return response;
            })
            .then(response => response.text())
            .then(data => {
                const footerPlaceholder = document.getElementById('footer-placeholder');
                if (footerPlaceholder) {
                    footerPlaceholder.innerHTML = data;
                    // Fix logo paths in subdirectories
                    if (basePath !== '/') {
                        const logoImages = footerPlaceholder.querySelectorAll('.footer-logo-image');
                        logoImages.forEach(img => {
                            const currentSrc = img.getAttribute('src');
                            if (currentSrc && currentSrc.startsWith('/')) {
                                img.setAttribute('src', '../' + currentSrc.substring(1));
                            }
                        });
                    }
                }
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }
    
    // Initialize navigation - SINGLE SOURCE OF TRUTH
    function initializeNavigation() {
        // Prevent multiple initializations
        if (navigationInitialized) {
            return;
        }
        
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!navToggle || !navMenu) {
            // Retry once if elements aren't ready
            if (!navigationInitialized) {
                setTimeout(initializeNavigation, 200);
            }
            return;
        }
        
        // Mark as initialized
        navigationInitialized = true;
        navMenu.dataset.initialized = 'true';
        
        // Remove any existing overlay
        const existingOverlay = document.querySelector('.menu-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        // Create overlay
        const menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
        
        // Toggle menu function
        function toggleMenu() {
            const isActive = navMenu.classList.contains('active');
            if (isActive) {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                navMenu.classList.add('active');
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
        
        // Toggle button click
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking overlay (but NOT the menu itself)
        menuOverlay.addEventListener('click', function(e) {
            // Check if click is actually on the menu (not overlay)
            const menuRect = navMenu.getBoundingClientRect();
            const clickX = e.clientX;
            const clickY = e.clientY;
            
            // If click is within menu bounds, don't close
            if (clickX >= menuRect.left && clickX <= menuRect.right &&
                clickY >= menuRect.top && clickY <= menuRect.bottom) {
                return;
            }
            
            // Click is on overlay, close menu
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close menu when clicking X button (top-right corner)
        // Use mousedown to avoid interfering with link clicks
        navMenu.addEventListener('mousedown', function(e) {
            // Don't interfere with link clicks
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const rect = navMenu.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            // Close button area: top-right 60x60px
            if (clickX > rect.width - 60 && clickY < 60) {
                e.preventDefault();
                e.stopPropagation();
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Also handle touch for mobile
        navMenu.addEventListener('touchstart', function(e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const rect = navMenu.getBoundingClientRect();
            const touch = e.touches[0];
            const clickX = touch.clientX - rect.left;
            const clickY = touch.clientY - rect.top;
            
            if (clickX > rect.width - 60 && clickY < 60) {
                e.preventDefault();
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle dropdown toggles on mobile
        const dropdownToggles = document.querySelectorAll('.nav-dropdown > a');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    const href = this.getAttribute('href');
                    if (href === '#' || href.startsWith('#services') || href.startsWith('#staff-augmentation')) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    const dropdown = this.parentElement;
                    dropdown.classList.toggle('active');
                }
            });
        });
        
        // Close menu when clicking regular navigation links
        // Use event delegation to catch all link clicks
        navMenu.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;
            
            // Don't close if it's a dropdown toggle
            if (link.parentElement.classList.contains('nav-dropdown') && 
                (link.getAttribute('href') === '#' || 
                 link.getAttribute('href')?.startsWith('#services') || 
                 link.getAttribute('href')?.startsWith('#staff-augmentation'))) {
                return;
            }
            
            // For all other links, close menu after navigation
            setTimeout(function() {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }, 150);
        }, true); // Use capture phase
        
        // Set active menu item
        const currentPath = window.location.pathname;
        const menuItems = document.querySelectorAll('.nav-menu > li > a');
        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPath || (currentPath === '/' && href === '/')) {
                item.classList.add('active');
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
})();
