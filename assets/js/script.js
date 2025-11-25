// Navigation initialization is handled by load-components.js
// This file only handles other page-specific functionality

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

