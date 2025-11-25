// Load Header and Footer components
document.addEventListener('DOMContentLoaded', function() {
    // Fallback: try to initialize navigation if it already exists (for static pages)
    setTimeout(function() {
        if (document.querySelector('.nav-toggle') && !document.querySelector('.nav-menu')?.dataset.initialized) {
            initializeNavigation();
        }
    }, 200);

    const getBasePath = () => {
        const pathSegments = window.location.pathname.split('/').filter(segment => segment !== '');
        // If the current path is a subdirectory (e.g., /blog/post.html), we need to go up one level
        // If it's a root page (e.g., /index.html), we stay at root
        if (pathSegments.length > 1 && pathSegments[pathSegments.length - 1].includes('.html')) {
            return '../'; // For files in subdirectories like /blog/post.html
        }
        return '/'; // For files in the root or main directories like /blog.html, /index.html
    };
    
    const basePath = getBasePath();
    const headerPath = basePath === '/' ? '/includes/header.html' : '../includes/header.html';
    const footerPath = basePath === '/' ? '/includes/footer.html' : '../includes/footer.html';
    
    // Load Header
    fetch(headerPath)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
                // Wait a moment for DOM to update, then initialize navigation
                setTimeout(function() {
                    initializeNavigation();
                }, 100);
            }
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback: try absolute path
            if (basePath !== '/') {
                fetch('/includes/header.html')
                    .then(response => response.text())
                    .then(data => {
                        const headerPlaceholder = document.getElementById('header-placeholder');
                        if (headerPlaceholder) {
                            headerPlaceholder.innerHTML = data;
                            setTimeout(function() {
                                initializeNavigation();
                            }, 100);
                        }
                    })
                    .catch(err => console.error('Error loading header from absolute path:', err));
            }
        });

    // Load Footer
    fetch(footerPath)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
                // Fix logo paths in subdirectories
                if (basePath !== '/') {
                    const logoImages = footerPlaceholder.querySelectorAll('.footer-logo-image');
                    logoImages.forEach(img => {
                        const currentSrc = img.getAttribute('src');
                        if (currentSrc.startsWith('/')) {
                            img.setAttribute('src', '../' + currentSrc.substring(1));
                        }
                    });
                }
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // Fallback: try absolute path
            if (basePath !== '/') {
                fetch('/includes/footer.html')
                    .then(response => response.text())
                    .then(data => {
                        const footerPlaceholder = document.getElementById('footer-placeholder');
                        if (footerPlaceholder) {
                            footerPlaceholder.innerHTML = data;
                        }
                    })
                    .catch(err => console.error('Error loading footer from absolute path:', err));
            }
        });
});

// Initialize navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) {
        console.warn('Navigation elements not found');
        return;
    }
    
    // If already initialized, remove old listeners and reinitialize
    if (navMenu.dataset.initialized === 'true') {
        // Remove old event listeners by cloning the elements
        const newNavToggle = navToggle.cloneNode(true);
        const newNavMenu = navMenu.cloneNode(true);
        navToggle.parentNode.replaceChild(newNavToggle, navToggle);
        navMenu.parentNode.replaceChild(newNavMenu, navMenu);
        // Get fresh references
        const freshNavToggle = document.querySelector('.nav-toggle');
        const freshNavMenu = document.querySelector('.nav-menu');
        return initializeNavigationWithElements(freshNavToggle, freshNavMenu);
    }
    
    // Mark as initialized to prevent duplicate initialization
    navMenu.dataset.initialized = 'true';
    initializeNavigationWithElements(navToggle, navMenu);
}

function initializeNavigationWithElements(navToggle, navMenu) {
    if (!navToggle || !navMenu) return;

    // Remove existing overlay if any
    const existingOverlay = document.querySelector('.menu-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
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
    
    // Toggle button click handler
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function(e) {
        // Don't close if clicking on the menu itself
        if (e.target === navMenu || navMenu.contains(e.target)) {
            return;
        }
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking the X button (top-right corner)
    navMenu.addEventListener('click', function(e) {
        // Don't interfere with link clicks
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        
        // Check if clicking in close button area (top-right 60x60px)
        const rect = navMenu.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        if (clickX > rect.width - 60 && clickY < 60) {
            e.preventDefault();
            e.stopPropagation();
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
                // Only prevent default for anchor-only dropdown toggles
                if (href === '#' || href.startsWith('#services') || href.startsWith('#staff-augmentation')) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking on regular navigation links
    const regularNavLinks = document.querySelectorAll('.nav-menu > li > a:not(.nav-dropdown > a), .dropdown-menu a');
    regularNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close menu after a short delay to allow navigation
            setTimeout(function() {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }, 100);
        });
    });

    // Set active menu item based on current page
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
