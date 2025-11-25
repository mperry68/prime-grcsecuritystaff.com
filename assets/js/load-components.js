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
                    // Initialize navigation after header loads - use same simple approach as working site
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
    
    // Initialize navigation - EXACT REPLICATION OF WORKING VERSION
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
        
        // Create overlay - EXACTLY like working version
        const menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
        
        // Toggle menu - EXACTLY like working version
        if (navToggle) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                menuOverlay.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }
        
        // Close menu when clicking overlay - EXACTLY like working version
        menuOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close menu when clicking close button (X) - EXACTLY like working version
        navMenu.addEventListener('click', function(e) {
            // Check if clicking on the close button area (top right)
            const rect = navMenu.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            // Close button is in top right (within 60px from right, 60px from top)
            if (clickX > rect.width - 60 && clickY < 60) {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle dropdown menus on mobile - EXACTLY like working version
        const dropdownToggles = document.querySelectorAll('.nav-dropdown > a');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = this.parentElement;
                    dropdown.classList.toggle('active');
                }
            });
        });
        
        // Close mobile menu when clicking on a link - EXACTLY like working version
        const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-dropdown > a)');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Set active menu item based on current page - EXACTLY like working version
        const currentPath = window.location.pathname;
        const menuItems = document.querySelectorAll('.nav-menu > li > a');
        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPath || (currentPath === '/' && href === '/')) {
                item.classList.add('active');
            }
        });
        
        // Smooth scrolling for anchor links - EXACTLY like working version
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
