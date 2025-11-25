# Prime Cybersecurity Website

A professional cybersecurity services marketing website built for Cloudflare Pages deployment.

## Structure

```
/
├── index.html                    # Main homepage
├── phishing-training.html        # Dedicated page for phishing training services
├── audits-pentests.html          # Dedicated page for security audits and penetration testing
├── _redirects                    # Cloudflare Pages redirect rules
├── README.md                     # This file
├── assets/
│   ├── css/
│   │   └── styles.css            # Main stylesheet
│   └── js/
│       └── script.js             # JavaScript for interactivity
├── src/                          # Source files and development assets
├── blog/                         # Blog posts and articles
└── public/
    ├── images/                   # Image assets
    ├── documents/                # PDF documents
    └── fonts/                    # Custom fonts
```

## Deployment to Cloudflare Pages

**Option 1: Build output = root (current setup)**
1. Set build output directory to `.` (root)
2. Images in `public/images/` are accessed via `/public/images/` paths
3. No build command needed

**Option 2: Build output = public (alternative)**
1. Set build output directory to `public/`
2. Move HTML files to `public/` folder OR update image paths to `/images/`
3. Images in `public/images/` would be accessed via `/images/` paths

**Current setup uses Option 1** - all image paths are `/public/images/`

## Features

- Responsive design for all devices
- Modern, professional UI
- Service pages for:
  - Phishing Training & Email Security
  - Security Audits & Penetration Testing
- Contact form integration
- Smooth scrolling navigation
- Mobile-friendly menu

## Contact Information

- Email: info@prime-consulting.ca
- Phone: +1 (514) 881-9888
- Address: 6500 Trans-Canada Hwy Suite 400, Pointe-Claire, Quebec, Canada H9R 0A5

