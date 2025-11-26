# Automatic SEO & Security System Guide

## Overview

The site now includes **automatic SEO and security systems** that work on **all pages**, including future pages you add. No manual configuration needed!

## How It Works

### 1. Automatic SEO (`auto-seo.js`)

**Automatically adds to every page:**
- ✅ Complete meta tags (title, description, keywords, robots, geographic)
- ✅ Open Graph tags (Facebook, LinkedIn sharing)
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Alternate language links (hreflang)
- ✅ Structured data (JSON-LD schema.org)
- ✅ Geographic targeting tags

**How it works:**
- Extracts page title from `<h1>` tag
- Generates SEO-friendly title and description
- Adds all required meta tags automatically
- Creates appropriate structured data
- Works for English and French pages

### 2. Automatic Security (`security-headers.js`)

**Automatically adds to every page:**
- ✅ Content Security Policy (CSP)
- ✅ Permissions Policy
- ✅ X-Content-Type-Options
- ✅ X-Frame-Options
- ✅ X-XSS-Protection
- ✅ Referrer-Policy
- ✅ Secure external links (noopener, noreferrer)
- ✅ Form security attributes

**How it works:**
- Adds security meta tags automatically
- Secures all external links
- Adds security attributes to forms
- Monitors dynamic content changes

### 3. Universal Loader (`load-head.js`)

**Automatically loads both systems:**
- Ensures SEO and security scripts are on every page
- Works for existing and future pages
- Handles path resolution automatically

## Usage

### For New Pages

Simply include the loader script in your page's `<head>`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Basic meta tags (optional - auto-seo will enhance) -->
    <title>Your Page Title - Prime Consulting Group</title>
    <meta name="description" content="Your page description">
    
    <!-- Fonts and styles -->
    <link rel="stylesheet" href="assets/css/styles.css">
    
    <!-- Auto-load SEO and Security (REQUIRED) -->
    <script src="assets/js/load-head.js"></script>
</head>
<body>
    <!-- Your content -->
    <h1>Page Title</h1>
    
    <!-- Footer -->
    <div id="footer-placeholder"></div>
    
    <!-- Other scripts -->
    <script src="assets/js/load-components.js"></script>
</body>
</html>
```

### For Existing Pages

Add this single line to the `<head>` section (before closing `</head>`):

```html
<script src="assets/js/load-head.js"></script>
```

Or for pages in subdirectories (like blog posts):

```html
<script src="../assets/js/load-head.js"></script>
```

## What Gets Added Automatically

### SEO Tags (from `auto-seo.js`)

**Meta Tags:**
- Title, description, keywords
- Robots, googlebot, bingbot
- Language and geographic targeting
- Open Graph (og:*) tags
- Twitter Card tags

**Links:**
- Canonical URL
- Alternate language links (hreflang)

**Structured Data:**
- JSON-LD schema.org markup
- Appropriate schema type (WebPage, Service, Article, etc.)

### Security Headers (from `security-headers.js`)

**Meta Tags:**
- Content-Security-Policy
- Permissions-Policy
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

**Link Security:**
- External links get `rel="noopener noreferrer"`
- Secure preconnect links

**Form Security:**
- Appropriate autocomplete attributes
- Security best practices

## Customization

### Override SEO for Specific Pages

Edit `assets/js/auto-seo.js` and add to `pageOverrides` object:

```javascript
const pageOverrides = {
    '/your-page.html': {
        title: 'Custom Title - Prime Consulting Group',
        description: 'Custom description',
        image: '/public/images/custom-image.jpg',
        schemaType: 'Service'
    }
};
```

### Adjust Security Policies

Edit `assets/js/security-headers.js` and modify `securityConfig`:

```javascript
const securityConfig = {
    csp: {
        'default-src': "'self'",
        // Add your CSP directives
    },
    permissionsPolicy: {
        // Add your permissions
    }
};
```

## Server-Level Security Headers

For Cloudflare Pages or other hosting, use `_security-headers.json`:

1. **Cloudflare Pages**: Place `_security-headers.json` in root
2. **Netlify**: Use `_headers` file
3. **Apache**: Use `.htaccess`
4. **Nginx**: Configure in server block

## Testing

### Test SEO Tags

1. View page source - check for meta tags
2. Use Google Rich Results Test
3. Use Schema.org Validator
4. Test Open Graph with Facebook Sharing Debugger
5. Test Twitter Cards with Twitter Card Validator

### Test Security Headers

1. Use securityheaders.com
2. Check browser DevTools → Network → Headers
3. Verify CSP is working (check console for violations)
4. Test external links have noopener

## Benefits

### For SEO
- ✅ All pages automatically optimized
- ✅ Consistent meta tags across site
- ✅ Proper structured data
- ✅ Social sharing optimization
- ✅ Geographic targeting
- ✅ Bilingual support

### For Security
- ✅ Protection against XSS attacks
- ✅ Clickjacking protection
- ✅ MIME type sniffing protection
- ✅ Secure external links
- ✅ Content Security Policy
- ✅ Best practices applied automatically

### For Maintenance
- ✅ No manual tag management
- ✅ Works for future pages automatically
- ✅ Centralized configuration
- ✅ Easy to update globally

## Files

- `assets/js/auto-seo.js` - Automatic SEO system
- `assets/js/security-headers.js` - Automatic security system
- `assets/js/load-head.js` - Universal loader
- `_security-headers.json` - Server-level headers config
- `PAGE_TEMPLATE.html` - Template for new pages
- `AUTO_SEO_SECURITY_GUIDE.md` - This guide

## Next Steps

1. **Add loader to existing pages**: Add `<script src="assets/js/load-head.js"></script>` to all pages
2. **Use template for new pages**: Copy `PAGE_TEMPLATE.html` when creating new pages
3. **Test**: Verify SEO and security tags are working
4. **Customize**: Adjust overrides in `auto-seo.js` for specific pages if needed

## Notes

- The system is **non-intrusive** - it won't override manually set tags
- Tags are marked with `data-auto-seo` or `data-auto-security` attributes
- Works with existing pages - just add the loader script
- Future pages automatically get full SEO and security

