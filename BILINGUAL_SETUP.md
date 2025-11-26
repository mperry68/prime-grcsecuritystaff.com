# Bilingual Site Setup Guide

## Overview

This guide explains how to set up and manage English and French versions of the website.

## Recommended Approach: Language Subdirectories

We'll use a structure where:
- **English (default)**: Root directory (`/`) - existing pages stay as-is
- **French**: `/fr/` subdirectory for French versions

This approach:
- ✅ SEO-friendly (separate URLs for each language)
- ✅ Easy to manage (clear file structure)
- ✅ Maintains backward compatibility (English stays in root)
- ✅ Works with Cloudflare Pages

## File Structure

```
/
├── index.html                    # English homepage (default)
├── about.html                    # English about page
├── faq.html                      # English FAQ page
├── ... (other English pages)
├── fr/                           # French language directory
│   ├── index.html               # French homepage
│   ├── about.html               # French about page
│   ├── faq.html                 # French FAQ page
│   └── ... (other French pages)
├── assets/                       # Shared assets (CSS, JS, images)
├── includes/
│   ├── header.html              # English header
│   ├── header-fr.html           # French header
│   ├── footer.html              # English footer
│   └── footer-fr.html            # French footer
└── translations/                 # Optional: JSON translation files
    ├── en.json
    └── fr.json
```

## Implementation Steps

### Step 1: Add Language Switcher to Header

The header will include a language switcher that:
- Shows current language
- Links to the corresponding page in the other language
- Works on all pages

### Step 2: Create French Versions

For each page, create a French version in `/fr/`:
- Copy the English page
- Translate all content
- Update `lang="en"` to `lang="fr"` in HTML tag
- Update paths (assets use `/assets/`, not `../assets/`)

### Step 3: Update Navigation

- English header links to English pages (root)
- French header links to French pages (`/fr/`)
- Language switcher detects current page and links to corresponding version

## Content Management Options

### Option A: Separate HTML Files (Recommended)
- **Pros**: Simple, clear, easy to edit
- **Cons**: Need to update both versions when structure changes
- **Best for**: Static content, full control

### Option B: Translation JSON Files
- **Pros**: Centralized translations, easier to maintain
- **Cons**: Requires JavaScript, more complex setup
- **Best for**: Dynamic content, frequent updates

### Option C: Hybrid Approach
- Static pages for main content
- JSON for reusable components (buttons, labels, etc.)

## Language Detection

We can add:
1. **Browser detection**: Detect user's preferred language
2. **Manual switcher**: Always show language selector
3. **URL-based**: `/en/` and `/fr/` paths

## Implementation Status

✅ **Completed:**
1. Language switcher component added to header
2. Language switcher JavaScript (`assets/js/language-switcher.js`) with fallback support
3. CSS styles for language switcher and fallback notice banner
4. Updated `load-components.js` to detect language and load appropriate header/footer with fallback
5. Example French page created (`fr/about-example.html`)
6. Translation guide created (`TRANSLATION_GUIDE.md`)
7. **Automatic fallback system** - English content shown if French version doesn't exist

## Fallback System

The site now includes an intelligent fallback system:

### How It Works
- **If French page exists**: Shows French version normally
- **If French page doesn't exist**: 
  - Automatically shows English version
  - Displays a bilingual notice banner at the top
  - User can dismiss the notice
  - Language switcher still works (clicking FR shows notice if page doesn't exist)

### Fallback Features
1. **Page-level fallback**: If `/fr/about.html` doesn't exist, shows `/about.html` with notice
2. **Header/Footer fallback**: If `header-fr.html` or `footer-fr.html` don't exist, uses English versions
3. **Smart navigation**: Language switcher checks if target page exists before navigating
4. **User-friendly notice**: Bilingual banner explains that French version isn't available yet

### Benefits
- ✅ No 404 errors - always shows content
- ✅ Gradual translation - translate pages as you go
- ✅ Clear communication - users know when viewing English content
- ✅ Seamless experience - works automatically

## Next Steps

1. **Create `/fr/` directory** (if not exists)
2. **Create French header** (`includes/header-fr.html`) - translate navigation items
3. **Create French footer** (`includes/footer-fr.html`) - translate footer content
4. **Create French versions of pages**:
   - Start with key pages: `index.html`, `about.html`, `faq.html`, `resources.html`
   - Use `fr/about-example.html` as a template
5. **Add language switcher script** to all pages:
   ```html
   <script src="/assets/js/language-switcher.js"></script>
   ```
6. **Test language switching** on all pages

## Maintenance

When adding new content:
1. Create English version in root
2. Create French version in `/fr/`
3. Update both headers/footers if needed
4. Test both language versions

