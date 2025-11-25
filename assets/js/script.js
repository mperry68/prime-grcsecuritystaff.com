// Mobile Navigation Toggle
// This will only run if navigation is already in the DOM (static pages)
// For dynamically loaded headers, initialization is handled by load-components.js
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to see if header is being loaded dynamically
    setTimeout(function() {
        initializeNavigationIfExists();
    }, 100);
});

function initializeNavigationIfExists() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // If navigation doesn't exist or is already initialized, skip
    if (!navToggle || !navMenu || navMenu.dataset.initialized === 'true') {
        return;
    }
    
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    // Mark as initialized
    navMenu.dataset.initialized = 'true';

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

    // Close menu when clicking close button (X) - using event delegation
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

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Create mailto link (for now - can be replaced with actual form submission)
            const subject = encodeURIComponent(`Cybersecurity Inquiry: ${data.service || 'General'}`);
            const body = encodeURIComponent(
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `Company: ${data.company || 'N/A'}\n` +
                `Service: ${data.service || 'N/A'}\n\n` +
                `Message:\n${data.message}`
            );
            
            window.location.href = `mailto:info@prime-consulting.ca?subject=${subject}&body=${body}`;
            
            // Show success message
            alert('Thank you for your inquiry! Your email client should open. If not, please email us directly at info@prime-consulting.ca');
        });
    }

    // Add scroll effect to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
});

