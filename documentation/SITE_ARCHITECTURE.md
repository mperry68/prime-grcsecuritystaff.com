# Site Architecture Documentation

This document provides a comprehensive overview of the Prime GRC website architecture, implementation details, and step-by-step guides for common tasks.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Core Systems](#core-systems)
3. [File Structure](#file-structure)
4. [How-To Guides](#how-to-guides)
   - [Adding a New Page](#adding-a-new-page)
   - [Adding a Blog Post](#adding-a-blog-post)
   - [Adding a Resource](#adding-a-resource)
   - [Adding an FAQ](#adding-an-faq)
   - [Adding French Translation](#adding-french-translation)
5. [Technical Details](#technical-details)

---

## Architecture Overview

The Prime GRC website is a static site built for Cloudflare Pages deployment. It uses a component-based architecture with dynamically loaded headers and footers, automatic SEO enhancement, security headers, and bilingual support (English/French).

### Key Architectural Principles

1. **Component-Based**: Headers and footers are loaded dynamically to ensure consistency across all pages
2. **SEO-First**: Automatic SEO meta tag generation and enhancement
3. **Security-Focused**: Built-in security headers and vulnerability protection
4. **Bilingual**: Full English/French support with automatic language detection and switching
5. **Responsive**: Mobile-first design that works on all devices
6. **Maintainable**: Centralized configuration and reusable components

---

## Core Systems

### 1. Header/Footer System (`load-components.js`)

**Purpose**: Ensures consistent navigation and footer across all pages without code duplication.

**How it works**:
- Each page includes placeholder divs: `<div id="header-placeholder"></div>` and `<div id="footer-placeholder"></div>`
- `load-components.js` detects the page location and loads the appropriate header/footer
- Automatically handles path resolution for root pages, subdirectories, and French pages
- Loads French headers/footers (`header-fr.html`, `footer-fr.html`) when on `/fr/` URLs

**Files**:
- `assets/js/load-components.js` - Main loader script
- `includes/header.html` - English header
- `includes/header-fr.html` - French header
- `includes/footer.html` - English footer
- `includes/footer-fr.html` - French footer

**Path Resolution**:
- Root pages (`/index.html`): Uses `/includes/header.html`
- Subdirectory pages (`/blog/post.html`): Uses `../includes/header.html`
- French pages (`/fr/page.html`): Uses `../includes/header-fr.html` or `../../includes/header-fr.html`

### 2. Language Switcher System (`language-switcher.js`)

**Purpose**: Enables seamless switching between English and French versions of pages.

**How it works**:
- Detects current language from URL path (`/fr/` prefix = French)
- Stores language preference in `localStorage`
- Updates all navigation links to match current language
- Automatically redirects to English if French page doesn't exist
- Shows fallback notice when viewing English content on French URL

**Features**:
- URL-based language detection
- Persistent language preference
- Automatic navigation link updates
- Graceful fallback for missing translations

**Files**:
- `assets/js/language-switcher.js` - Main language switcher
- Language links in headers: `<a href="#" class="lang-link" data-lang="en">EN</a>`

### 3. SEO Enhancement System (`auto-seo.js`)

**Purpose**: Automatically enhances SEO meta tags for all pages.

**How it works**:
- Loaded automatically via `load-head.js`
- Enhances existing meta tags with additional SEO data
- Adds structured data (JSON-LD) for better search engine understanding
- Generates Open Graph and Twitter Card meta tags
- Handles canonical URLs and alternate language links

**Files**:
- `assets/js/load-head.js` - Loads SEO and security scripts
- `assets/js/auto-seo.js` - SEO enhancement engine

### 4. Security System

**Purpose**: Implements security headers and vulnerability protection.

**Components**:
- `assets/js/security-headers.js` - Sets security headers
- `assets/js/vulnerability-protection.js` - Protects against common vulnerabilities
- `_security-headers.json` - Security header configuration

**Files**:
- `assets/js/load-head.js` - Auto-loads security scripts
- `assets/js/security-headers.js` - Security headers implementation
- `assets/js/vulnerability-protection.js` - Vulnerability protection

### 5. Navigation System

**Purpose**: Provides consistent, responsive navigation across all pages.

**Features**:
- Mobile hamburger menu
- Dropdown menus for service categories
- Active page highlighting
- Smooth scrolling for anchor links
- Language switcher integration

**Initialization**: Handled by `load-components.js` after header loads.

---

## File Structure

```
/
├── index.html                          # Homepage (English)
├── fr/                                 # French pages directory
│   ├── index.html                      # Homepage (French)
│   ├── about.html                      # About page (French)
│   └── [other-french-pages].html
├── blog/                               # Blog posts directory
│   ├── README.md                       # Blog guide
│   └── *.html                          # Individual blog posts
├── includes/                           # Reusable components
│   ├── header.html                     # English header
│   ├── header-fr.html                  # French header
│   ├── footer.html                     # English footer
│   ├── footer-fr.html                  # French footer
│   └── README.md                       # Header/footer guide
├── assets/
│   ├── css/
│   │   └── styles.css                  # Main stylesheet
│   └── js/
│       ├── load-components.js          # Header/footer loader
│       ├── language-switcher.js        # Language switching
│       ├── load-head.js                # Auto-load SEO/security
│       ├── auto-seo.js                 # SEO enhancement
│       ├── security-headers.js         # Security headers
│       ├── vulnerability-protection.js # Vulnerability protection
│       └── script.js                   # General page functionality
├── public/
│   ├── images/                         # Image assets
│   ├── documents/                      # PDF documents
│   └── fonts/                          # Custom fonts
├── documentation/                      # Documentation files
│   ├── SITE_ARCHITECTURE.md            # This file
│   ├── FAQ_README.md                   # FAQ management guide
│   └── [other-docs].md
├── PAGE_TEMPLATE.html                  # Page template
├── _redirects                          # Cloudflare redirects
├── _security-headers.json              # Security headers config
└── README.md                           # Main README
```

---

## How-To Guides

### Adding a New Page

#### Step 1: Create the HTML File

Create a new HTML file in the root directory (or `fr/` for French pages) with a descriptive filename:

- ✅ Good: `new-service.html`, `contact-us.html`
- ❌ Bad: `page1.html`, `New Page.html`

#### Step 2: Use the Page Template

Copy the structure from `PAGE_TEMPLATE.html` or an existing page. Your page should include:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Basic Meta Tags (auto-seo.js will enhance these) -->
    <title>Your Page Title - Prime Consulting Group</title>
    <meta name="description" content="Page description for SEO (150-160 characters)">
    
    <!-- Fonts and Styles -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="icon" type="image/png" href="/public/images/fav.png">
    
    <!-- Auto-Load SEO and Security Scripts -->
    <script src="assets/js/load-head.js"></script>
</head>
<body>
    <!-- Header placeholder - will be loaded by load-components.js -->
    <div id="header-placeholder"></div>

    <!-- Your page content here -->
    <main>
        <section class="page-header">
            <div class="container">
                <h1>Your Page Title</h1>
                <p>Page subtitle or description</p>
            </div>
        </section>

        <section class="page-content">
            <div class="container">
                <!-- Your content here -->
            </div>
        </section>
    </main>

    <!-- Footer placeholder - will be loaded by load-components.js -->
    <div id="footer-placeholder"></div>

    <!-- Required Scripts (in this order) -->
    <script src="assets/js/load-components.js"></script>
    <script src="assets/js/language-switcher.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>
```

#### Step 3: Important Requirements

**Required Elements**:
1. **Header placeholder**: `<div id="header-placeholder"></div>` (at top of body)
2. **Footer placeholder**: `<div id="footer-placeholder"></div>` (at bottom of body)
3. **Scripts** (in this order):
   - `load-components.js` - Loads header/footer
   - `language-switcher.js` - Enables language switching
   - `script.js` - General functionality

**Path Considerations**:
- **Root pages**: Use `assets/css/styles.css` and `assets/js/*.js`
- **Subdirectory pages** (e.g., `blog/`): Use `../assets/css/styles.css` and `../assets/js/*.js`
- **French pages** (`fr/`): Use `/assets/css/styles.css` and `/assets/js/*.js` (absolute paths)

**SEO**:
- Include basic `<title>` and `<meta name="description">` tags
- `auto-seo.js` will automatically enhance these with additional SEO data
- Use descriptive, keyword-rich titles and descriptions

#### Step 4: Add to Navigation (Optional)

If you want the page in the main navigation:

1. Open `includes/header.html` (English) or `includes/header-fr.html` (French)
2. Add a new navigation item in the appropriate section:

```html
<li><a href="/your-page.html">Your Page Name</a></li>
```

#### Step 5: Create French Version (If Needed)

1. Create the same file in the `fr/` directory: `fr/your-page.html`
2. Translate all content to French
3. Update the `<html lang="fr">` attribute
4. Use absolute paths for assets: `/assets/css/styles.css`
5. The language switcher will automatically link the two versions

#### Checklist

- [ ] Created HTML file with proper filename
- [ ] Used page template structure
- [ ] Included header and footer placeholders
- [ ] Added all required scripts in correct order
- [ ] Set correct CSS/JS paths for file location
- [ ] Added SEO title and description
- [ ] Tested page loads correctly
- [ ] Tested header/footer load properly
- [ ] Tested language switcher works
- [ ] Added to navigation (if needed)
- [ ] Created French version (if needed)

---

### Adding a Blog Post

**See `blog/README.md` for complete instructions.**

Quick summary:
1. Create HTML file in `blog/` directory with descriptive filename
2. Use blog post template structure
3. Add entry to `blog.html` blog-grid section
4. Use relative paths: `../assets/css/styles.css`

**Key Points**:
- Blog posts go in `blog/` directory
- Must be added to `blog.html` to appear in listing
- Use `../assets/` paths for CSS/JS
- Include header/footer placeholders

---

### Adding a Resource

Resources are managed on the `resources.html` page. To add a new downloadable resource:

#### Step 1: Upload the Resource File

Upload your resource file (PDF, document, etc.) to `public/documents/`:

```
public/documents/
├── your-resource.pdf
└── [other-resources]
```

#### Step 2: Add to Resources Page

Open `resources.html` and find the downloads section. Add a new download item:

```html
<div class="download-item">
    <h3>Your Resource Title</h3>
    <p>Description of the resource and what users will learn or gain from downloading it.</p>
    <div class="download-links">
        <a href="/public/documents/your-resource.pdf" class="download-link" download>
            📥 Download PDF
        </a>
        <!-- Add additional language versions if available -->
        <a href="/public/documents/your-resource-fr.pdf" class="download-link" download>
            📥 Télécharger PDF (FR)
        </a>
    </div>
</div>
```

#### Step 3: Organize by Category (Optional)

Resources can be organized into sections. Wrap related resources in a section:

```html
<div class="download-section">
    <h2>Category Name</h2>
    <div class="downloads-list">
        <!-- Your download items here -->
    </div>
</div>
```

#### Step 4: Add Case Study (If Applicable)

If your resource is a case study, add it to the case studies section:

```html
<div class="case-study">
    <h3>Case Study Title</h3>
    <p><strong>Client:</strong> Client Name</p>
    <p><strong>Challenge:</strong> Description of the challenge...</p>
    <p><strong>Solution:</strong> Description of the solution...</p>
    <p><strong>Results:</strong> Description of the results...</p>
    <a href="/public/documents/case-study.pdf" class="download-link">Download Case Study →</a>
</div>
```

#### Checklist

- [ ] Uploaded resource file to `public/documents/`
- [ ] Added download item to `resources.html`
- [ ] Included clear title and description
- [ ] Tested download link works
- [ ] Added French version (if available)
- [ ] Added to appropriate category/section

---

### Adding an FAQ

**See `documentation/FAQ_README.md` for complete instructions.**

Quick summary:
1. Open `faq.html`
2. Find appropriate category or create new one
3. Add FAQ item with proper HTML structure
4. Use `<h4>` for question, `<div class="faq-answer">` for answer

**Key Structure**:
```html
<div class="faq-item">
    <div class="faq-question">
        <h4>Your question here?</h4>
        <span class="faq-toggle">+</span>
    </div>
    <div class="faq-answer">
        <p>Your answer here.</p>
    </div>
</div>
```

---

### Adding French Translation

#### Step 1: Create French Page

Create the French version in the `fr/` directory:

```
fr/your-page.html
```

#### Step 2: Translate Content

Translate all content to French:
- Page title and headings
- Body text
- Meta descriptions
- Navigation items (if custom)
- Button text
- Form labels

#### Step 3: Update HTML Attributes

```html
<html lang="fr">
```

#### Step 4: Update Meta Tags

Update language-specific meta tags:

```html
<meta name="language" content="French">
<meta http-equiv="content-language" content="fr-CA">
<meta property="og:locale" content="fr_CA">
<link rel="alternate" hreflang="fr" href="https://prime-grcsecuritystaff.com/fr/your-page.html">
<link rel="alternate" hreflang="en" href="https://prime-grcsecuritystaff.com/your-page.html">
```

#### Step 5: Use Absolute Paths

French pages should use absolute paths for assets:

```html
<link rel="stylesheet" href="/assets/css/styles.css">
<script src="/assets/js/load-components.js"></script>
```

#### Step 6: Language Switcher Integration

The language switcher will automatically:
- Detect the French page exists
- Link English and French versions
- Update navigation links to match language
- Store language preference

#### Checklist

- [ ] Created file in `fr/` directory
- [ ] Translated all content to French
- [ ] Updated `<html lang="fr">`
- [ ] Updated language meta tags
- [ ] Used absolute paths for assets
- [ ] Tested page loads correctly
- [ ] Tested language switcher works
- [ ] Verified navigation links are in French

---

## Technical Details

### Path Resolution System

The site uses intelligent path resolution based on page location:

**Root Pages** (`/index.html`, `/about.html`):
- CSS: `assets/css/styles.css`
- JS: `assets/js/script.js`
- Includes: `/includes/header.html`

**Subdirectory Pages** (`/blog/post.html`):
- CSS: `../assets/css/styles.css`
- JS: `../assets/js/script.js`
- Includes: `../includes/header.html`

**French Pages** (`/fr/page.html`):
- CSS: `/assets/css/styles.css` (absolute)
- JS: `/assets/js/script.js` (absolute)
- Includes: `/includes/header-fr.html` (absolute)

**Blog Posts** (`/blog/post.html`):
- CSS: `../assets/css/styles.css`
- JS: `../assets/js/script.js`
- Includes: `../includes/header.html`

### Language Detection

Language is detected from URL path:
- URLs starting with `/fr/` = French
- All other URLs = English

The language switcher:
1. Detects current language from URL
2. Stores preference in `localStorage`
3. Updates navigation links to match language
4. Redirects to English if French page doesn't exist

### SEO System

**Automatic Enhancement**:
- `load-head.js` automatically loads `auto-seo.js`
- `auto-seo.js` enhances existing meta tags
- Adds structured data (JSON-LD)
- Generates Open Graph and Twitter Card tags

**Manual SEO Tags**:
- Always include basic `<title>` and `<meta name="description">`
- Add keywords if relevant
- Include canonical URL
- Add alternate language links

### Security System

**Automatic Protection**:
- `load-head.js` automatically loads security scripts
- `security-headers.js` sets security headers
- `vulnerability-protection.js` protects against common attacks

**Configuration**:
- Security headers configured in `_security-headers.json`
- Headers set via Cloudflare Pages or JavaScript

### Component Loading Order

Scripts must be loaded in this order:

1. `load-head.js` (in `<head>`) - Loads SEO and security scripts
2. `load-components.js` (in `<body>`) - Loads header/footer
3. `language-switcher.js` (in `<body>`) - Initializes language switcher
4. `script.js` (in `<body>`) - General page functionality

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled
- Uses modern CSS features (CSS Grid, Flexbox)

### Performance Considerations

- Static HTML files (fast loading)
- Minimal JavaScript (only essential scripts)
- Optimized images in `public/images/`
- Font preloading for faster rendering
- Lazy loading for images (if implemented)

---

## Best Practices

### Page Creation

1. **Always use the template**: Start from `PAGE_TEMPLATE.html` or existing page
2. **Include placeholders**: Never hardcode header/footer HTML
3. **Test paths**: Verify CSS/JS load correctly based on page location
4. **SEO first**: Always include title and description meta tags
5. **Mobile responsive**: Test on mobile devices

### Content Management

1. **Consistent structure**: Use standard page sections (page-header, page-content)
2. **Semantic HTML**: Use proper HTML5 elements
3. **Accessibility**: Include alt text for images, proper heading hierarchy
4. **Bilingual**: Always consider French translation

### File Organization

1. **Descriptive filenames**: Use clear, URL-friendly names
2. **Consistent structure**: Follow existing patterns
3. **Documentation**: Update relevant README files when adding content

### Maintenance

1. **Update navigation**: Add new pages to header navigation if needed
2. **Test language switcher**: Verify English/French linking works
3. **Check SEO**: Verify meta tags are correct
4. **Test mobile**: Always test on mobile devices

---

## Troubleshooting

### Header/Footer Not Loading

**Symptoms**: Page shows without navigation or footer

**Solutions**:
- Verify `load-components.js` is included
- Check browser console for 404 errors
- Verify placeholder divs are present: `<div id="header-placeholder"></div>`
- Check path resolution (relative vs absolute paths)

### Language Switcher Not Working

**Symptoms**: Clicking EN/FR doesn't switch languages

**Solutions**:
- Verify `language-switcher.js` is included
- Check that language links have `class="lang-link"` and `data-lang` attributes
- Verify French page exists in `fr/` directory
- Check browser console for JavaScript errors

### Styles Not Loading

**Symptoms**: Page appears unstyled

**Solutions**:
- Check CSS path is correct for page location
- Verify `styles.css` exists
- Check browser console for 404 errors
- Use absolute paths for French pages: `/assets/css/styles.css`

### SEO Tags Not Appearing

**Symptoms**: Missing meta tags in page source

**Solutions**:
- Verify `load-head.js` is included in `<head>`
- Check that `auto-seo.js` is loading (browser console)
- Ensure basic title and description tags are present
- Check for JavaScript errors in console

---

## Additional Resources

- **Blog Guide**: `blog/README.md`
- **FAQ Guide**: `documentation/FAQ_README.md`
- **Header/Footer Guide**: `includes/README.md`
- **Main README**: `README.md`
- **Security Documentation**: `documentation/SECURITY_BEST_PRACTICES.md`

---

## Support

For questions or issues:
- Review relevant documentation files
- Check browser console for errors
- Verify file paths and structure match examples
- Test in multiple browsers

---

*Last updated: January 2025*

