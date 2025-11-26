# Bilingual Site - Quick Start Guide

## ✅ What's Been Set Up

1. **Language Switcher** - Added to header navigation (EN | FR)
2. **Language Detection** - Automatically detects current language from URL
3. **Path Handling** - Updated `load-components.js` to handle `/fr/` directory
4. **Example French Page** - Created `fr/about-example.html` as a template

## 🚀 How It Works

### URL Structure
- **English pages**: `/about.html`, `/faq.html`, etc. (root directory)
- **French pages**: `/fr/about.html`, `/fr/faq.html`, etc. (`/fr/` directory)

### Language Switcher
- Automatically appears in navigation
- Highlights current language (EN or FR)
- Clicking switches to the corresponding page in the other language

### Header/Footer Loading
- English pages load `header.html` and `footer.html`
- French pages load `header-fr.html` and `footer-fr.html`
- Automatically detected based on URL path

## 📝 To Add Language Switcher to Existing Pages

Add this script tag before the closing `</body>` tag (after other scripts):

```html
<script src="/assets/js/language-switcher.js"></script>
```

Or for pages in `/fr/` directory:
```html
<script src="/assets/js/language-switcher.js"></script>
```

(Since we use absolute paths starting with `/`, it works the same for both)

## 🎯 Creating Your First French Page

1. **Copy an English page** (e.g., `about.html`)
2. **Create `/fr/about.html`** (create `/fr/` directory if needed)
3. **Update these:**
   - `<html lang="fr">` (change from `lang="en"`)
   - Translate all text content
   - Update page title and meta description
4. **Keep these the same:**
   - Asset paths (they use absolute paths like `/assets/css/styles.css`)
   - HTML structure
   - CSS classes

See `fr/about-example.html` for a complete example.

## 📋 Creating French Header/Footer

1. **Copy `includes/header.html` to `includes/header-fr.html`**
2. **Translate navigation items:**
   - Home → Accueil
   - About → À propos
   - Services → Services
   - Blog → Blog
   - FAQs → FAQ
   - Contact → Contact
3. **Update links to point to `/fr/` versions:**
   - `/about.html` → `/fr/about.html`
   - `/faq.html` → `/fr/faq.html`
   - etc.

4. **Repeat for footer** (`footer.html` → `footer-fr.html`)

## 🔍 Testing

1. Visit an English page (e.g., `/about.html`)
2. Click "FR" in the language switcher
3. Should navigate to `/fr/about.html`
4. Click "EN" to switch back
5. Verify all links work in both languages

## 📚 Full Documentation

- **`BILINGUAL_SETUP.md`** - Complete setup guide
- **`TRANSLATION_GUIDE.md`** - How to manage translations
- **`fr/about-example.html`** - Example French page

## ⚠️ Important Notes

- **Absolute paths**: All asset paths use `/` (absolute), so they work from any directory
- **Language detection**: Based on URL path (`/fr/` = French, root = English)
- **Automatic fallback**: If French page doesn't exist, English version is shown with a notice banner
- **Header/Footer fallback**: If `header-fr.html` or `footer-fr.html` don't exist, English versions are used automatically
- **Script loading**: Add `language-switcher.js` to all pages for switcher to work
- **Gradual translation**: You can translate pages one at a time - missing French pages automatically show English

## 🎨 Language Switcher Styling

The language switcher is styled and responsive:
- Desktop: Appears in navigation bar
- Mobile: Appears at bottom of mobile menu
- Active language is highlighted in primary color

