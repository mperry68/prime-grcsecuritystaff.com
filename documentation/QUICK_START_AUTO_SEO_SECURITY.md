# Quick Start: Automatic SEO & Security

## ✅ What's Been Set Up

Your site now has **automatic SEO and security** that works on all pages, including future ones!

## 🚀 How to Use

### For New Pages

Just add this ONE line to the `<head>` section:

```html
<script src="assets/js/load-head.js"></script>
```

That's it! The page automatically gets:
- ✅ All SEO tags (meta, Open Graph, Twitter, structured data)
- ✅ All security headers (CSP, XSS protection, etc.)
- ✅ Geographic targeting
- ✅ Bilingual support

### For Existing Pages

Add the same line to each page's `<head>`:

```html
<script src="assets/js/load-head.js"></script>
```

**Already added to:**
- ✅ index.html
- ✅ about.html

**Need to add to:**
- All other HTML pages

## 📋 What Gets Added Automatically

### SEO Tags
- Meta tags (title, description, keywords, robots)
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Canonical URLs
- Alternate language links
- Structured data (JSON-LD)
- Geographic targeting

### Security Headers
- Content Security Policy (CSP)
- XSS Protection
- Clickjacking protection
- Secure external links
- Form security
- Permissions Policy

## 🎯 Benefits

1. **Automatic**: Works for all pages, including future ones
2. **No Configuration**: Just add one script tag
3. **Smart**: Extracts info from page content (H1, etc.)
4. **Customizable**: Can override for specific pages if needed
5. **Secure**: Best security practices applied automatically

## 📝 Example

**Before:**
```html
<head>
    <title>My Page</title>
    <meta name="description" content="Page description">
</head>
```

**After (with auto system):**
```html
<head>
    <title>My Page</title>
    <meta name="description" content="Page description">
    <script src="assets/js/load-head.js"></script>
</head>
```

The system automatically adds 30+ SEO and security tags!

## 🔧 Customization

To customize for specific pages, edit `assets/js/auto-seo.js`:

```javascript
const pageOverrides = {
    '/your-page.html': {
        title: 'Custom Title',
        description: 'Custom description',
        image: '/path/to/image.jpg'
    }
};
```

## 📚 Full Documentation

See `AUTO_SEO_SECURITY_GUIDE.md` for complete details.

