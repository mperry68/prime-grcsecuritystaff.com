// Load Header and Footer components
document.addEventListener('DOMContentLoaded', function() {
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
                // Re-initialize navigation after loading
                initializeNavigation();
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
                            initializeNavigation();
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
    if (!navToggle || !navMenu || navMenu.dataset.initialized === 'true') return;
    
    // Mark as initialized to prevent duplicate initialization
    navMenu.dataset.initialized = 'true';

    // Remove existing overlay if any
    const existingOverlay = document.querySelector('.menu-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    // Toggle menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Handle dropdown menus on mobile
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

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-dropdown > a)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
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

