# Prime GRC Website

A professional Governance, Risk & Compliance (GRC) services marketing website built for Cloudflare Pages deployment.

## Structure

```
/
├── index.html                    # Main homepage (English)
├── fr/                           # French pages directory
│   ├── index.html                # Homepage (French)
│   └── *.html                    # Other French pages
├── blog.html                     # Blog listing page
├── faq.html                      # Frequently Asked Questions page
├── security-audits.html          # Security Audits service page
├── penetration-testing.html      # Penetration Testing service page
├── security-awareness-training.html  # Security Awareness Training page
├── staff-augmentation.html       # Staff Augmentation overview page
├── software-development.html     # Software Development service page
├── it-infrastructure.html        # IT Infrastructure service page
├── data-analytics.html           # Data & Analytics service page
├── project-management.html       # Project Management service page
├── quality-assurance.html        # Quality Assurance service page
├── privacy-policy.html           # Privacy Policy
├── quality-policy.html            # Quality Policy
├── environmental-policy.html    # Environmental Policy
├── cookies-policy.html            # Cookies Policy
├── _redirects                    # Cloudflare Pages redirect rules
├── README.md                     # This file
├── documentation/                # Documentation files
│   ├── SITE_ARCHITECTURE.md      # Complete architecture guide
│   ├── FAQ_README.md             # Guide for managing FAQs
│   └── *.md                       # Other documentation
├── assets/
│   ├── css/
│   │   └── styles.css            # Main stylesheet
│   └── js/
│       ├── script.js             # JavaScript for interactivity
│       ├── load-components.js    # Dynamic header/footer loader
│       ├── language-switcher.js  # Bilingual language switching
│       ├── load-head.js          # Auto-load SEO and security scripts
│       ├── auto-seo.js           # SEO enhancement
│       ├── security-headers.js   # Security headers
│       └── vulnerability-protection.js # Vulnerability protection
├── includes/
│   ├── header.html               # Standardized navigation header
│   ├── footer.html               # Standardized footer
│   └── README.md                 # Documentation for header/footer system
├── blog/                         # Blog posts directory
│   ├── README.md                 # Guide for adding blog posts
│   └── *.html                    # Individual blog post files
└── public/
    ├── images/                   # Image assets
    ├── documents/                # PDF documents
    └── fonts/                    # Custom fonts
```

## Key Features

- **Bilingual Support**: Full English/French support with automatic language detection and switching
- **Standardized Header/Footer System**: All pages use dynamically loaded header and footer from `includes/` directory
- **Responsive Design**: Mobile-friendly design for all devices
- **Blog System**: Easy-to-manage blog posts (see `blog/README.md`)
- **FAQ System**: Organized FAQ management (see `FAQ_README.md`)
- **SEO Enhancement**: Automatic SEO meta tag generation and enhancement
- **Security**: Built-in security headers and vulnerability protection
- **Service Pages**: Dedicated pages for GRC services and Staff Augmentation services
- **Contact Form**: Integrated contact form on homepage
- **Smooth Scrolling**: Smooth navigation for anchor links
- **Mobile Menu**: Fully functional mobile navigation menu

## Adding Content

### Adding Blog Posts

See **[blog/README.md](blog/README.md)** for complete instructions on:
- Creating new blog post files
- Adding blog posts to the listing page
- File naming conventions
- Content guidelines

### Adding FAQs

See **[FAQ_README.md](FAQ_README.md)** for complete instructions on:
- Adding new FAQ items
- Creating new FAQ categories
- Content formatting guidelines
- Best practices

### Standardized Header/Footer

See **[includes/README.md](includes/README.md)** for information about:
- How the header/footer system works
- How to update navigation or footer content
- Path handling for subdirectories

## Deployment to Cloudflare Pages

**Current Setup:**
1. Build output directory: `.` (root)
2. Images in `public/images/` are accessed via `/public/images/` paths
3. No build command needed

**Configuration:**
- All HTML files are in the root directory
- Static assets in `assets/` and `public/` directories
- Header and footer loaded dynamically via JavaScript

## Technical Details

### Header/Footer System

All pages use a standardized header and footer system:
- Pages include placeholder divs: `<div id="header-placeholder"></div>` and `<div id="footer-placeholder"></div>`
- `load-components.js` dynamically loads `includes/header.html` and `includes/footer.html`
- This ensures consistent navigation and footer across all pages
- Updates to header/footer only need to be made in one place

### Mobile Menu

The mobile menu is initialized by `load-components.js` after the header loads. It:
- Works consistently across all pages
- Uses the same implementation as other Prime sites
- Handles dropdown menus on mobile
- Closes when clicking links or overlay

### Language Switching

The site supports full bilingual (English/French) functionality:
- Language detected from URL path (`/fr/` prefix = French)
- Language preference stored in `localStorage`
- Automatic navigation link updates based on current language
- Graceful fallback to English if French page doesn't exist
- Language switcher in header (EN | FR)

### Path Handling

The system automatically handles paths for:
- Root pages (e.g., `/index.html`, `/blog.html`)
- Subdirectory pages (e.g., `/blog/post.html`)
- French pages (e.g., `/fr/index.html`, `/fr/about.html`)
- Service pages in root directory

## Contact Information

- **Email**: info@prime-consulting.ca
- **Phone**: +1 (514) 881-9888
- **Address**: 6500 Trans-Canada Hwy Suite 400, Pointe-Claire, Quebec, Canada H9R 0A5

## Documentation

- **[documentation/SITE_ARCHITECTURE.md](documentation/SITE_ARCHITECTURE.md)** - Complete site architecture and how-to guides
- **[blog/README.md](blog/README.md)** - Guide for adding blog posts
- **[documentation/FAQ_README.md](documentation/FAQ_README.md)** - Guide for managing FAQs
- **[includes/README.md](includes/README.md)** - Header/Footer system documentation
