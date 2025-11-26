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
            // Check if we're in /fr/ directory
            if (pathSegments[0] === 'fr') {
                return pathSegments.length > 2 ? '../../' : '../';
            }
            if (pathSegments.length > 1 && pathSegments[pathSegments.length - 1].includes('.html')) {
                return '../';
            }
            return '/';
        };
        
        const basePath = getBasePath();
        
        // Determine if we're in French version
        const isFrench = window.location.pathname.startsWith('/fr/');
        const headerFile = isFrench ? 'header-fr.html' : 'header.html';
        const footerFile = isFrench ? 'footer-fr.html' : 'footer.html';
        
        const headerPath = basePath === '/' ? `/includes/${headerFile}` : `${basePath}includes/${headerFile}`;
        const footerPath = basePath === '/' ? `/includes/${footerFile}` : `${basePath}includes/${footerFile}`;
        
        // Load Header
        loadHeader(headerPath, basePath);
        
        // Load Footer
        loadFooter(footerPath, basePath);
    });
    
    function loadHeader(path, basePath) {
        fetch(path)
            .then(response => {
                // If French header doesn't exist, fallback to English
                if (!response.ok) {
                    const isFrench = path.includes('header-fr.html');
                    if (isFrench) {
                        // Try English header as fallback
                        const englishPath = path.replace('header-fr.html', 'header.html');
                        return fetch(englishPath).then(engResponse => {
                            if (!engResponse.ok) {
                                // Final fallback to root English header
                                return fetch('/includes/header.html');
                            }
                            return engResponse;
                        });
                    }
                    // For English headers, try root if subdirectory fails
                    if (basePath !== '/') {
                        return fetch('/includes/header.html');
                    }
                    throw new Error('Failed to load header');
                }
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
                // Final fallback to English header
                fetch('/includes/header.html')
                    .then(response => response.text())
                    .then(data => {
                        const headerPlaceholder = document.getElementById('header-placeholder');
                        if (headerPlaceholder) {
                            headerPlaceholder.innerHTML = data;
                            setTimeout(initializeNavigation, 200);
                        }
                    })
                    .catch(err => console.error('Error loading header from fallback:', err));
            });
    }
    
    function loadFooter(path, basePath) {
        fetch(path)
            .then(response => {
                // If French footer doesn't exist, fallback to English
                if (!response.ok) {
                    const isFrench = path.includes('footer-fr.html');
                    if (isFrench) {
                        // Try English footer as fallback
                        const englishPath = path.replace('footer-fr.html', 'footer.html');
                        return fetch(englishPath).then(engResponse => {
                            if (!engResponse.ok) {
                                // Final fallback to root English footer
                                return fetch('/includes/footer.html');
                            }
                            return engResponse;
                        });
                    }
                    // For English footers, try root if subdirectory fails
                    if (basePath !== '/') {
                        return fetch('/includes/footer.html');
                    }
                    throw new Error('Failed to load footer');
                }
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
                // Final fallback to English footer
                fetch('/includes/footer.html')
                    .then(response => response.text())
                    .then(data => {
                        const footerPlaceholder = document.getElementById('footer-placeholder');
                        if (footerPlaceholder) {
                            footerPlaceholder.innerHTML = data;
                        }
                    })
                    .catch(err => console.error('Error loading footer from fallback:', err));
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
        
        // Smooth scrolling for anchor links - handle contact link specially
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        // Target exists on current page, scroll to it
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    } else if (href === '#contact') {
                        // Contact section doesn't exist on this page, navigate to home page
                        window.location.href = '/#contact';
                    }
                }
            });
        });
    }
})();
