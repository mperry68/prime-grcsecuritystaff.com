// Load Header and Footer components
document.addEventListener('DOMContentLoaded', function() {
    // Fallback: try to initialize navigation if it already exists (for static pages)
    setTimeout(function() {
        if (document.querySelector('.nav-toggle') && !document.querySelector('.nav-menu')?.dataset.initialized) {
            initializeNavigation();
        }
    }, 200);
    // Determine the correct base path based on current location
    const getBasePath = function() {
        const path = window.location.pathname;
        // If we're in a subdirectory (like /blog/), go up one level
        if (path.split('/').filter(p => p && !p.includes('.html')).length > 1) {
            return '../';
        }
        return '/';
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
    
    // Prevent double-firing on mobile (touch + click)
    let touchHandled = false;
    
    navToggle.addEventListener('touchstart', function() {
        touchHandled = false;
    }, { passive: true });
    
    navToggle.addEventListener('touchend', function(e) {
        if (!touchHandled) {
            touchHandled = true;
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        }
    });
    
    // Click handler (for desktop and as fallback)
    navToggle.addEventListener('click', function(e) {
        if (touchHandled) {
            e.preventDefault();
            e.stopPropagation();
            touchHandled = false;
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking the X button area (top-right corner)
    // Only handle clicks that are NOT on links or interactive elements
    navMenu.addEventListener('click', function(e) {
        const target = e.target;
        
        // If clicking on a link or any element inside a link, let it handle the click
        if (target.tagName === 'A' || target.closest('a')) {
            return; // Don't interfere with link clicks
        }
        
        // Check if clicking in the close button area (top-right corner)
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

    // Handle dropdown menus on mobile
    const dropdownToggles = document.querySelectorAll('.nav-dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // Only prevent default if this is a dropdown toggle (has href="#")
                const href = this.getAttribute('href');
                if (href && (href === '#' || href.startsWith('#services') || href.startsWith('#staff-augmentation'))) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking on a link (non-dropdown links)
    const navLinks = document.querySelectorAll('.nav-menu > li > a:not(.nav-dropdown > a), .dropdown-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default - let the link work normally
            // Just close the menu after a short delay to allow navigation
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

