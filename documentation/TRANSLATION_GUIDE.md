# Translation Management Guide

## Overview

This guide explains how to manage English and French content for the bilingual website.

## File Structure

```
/
├── index.html              # English homepage
├── about.html              # English about page
├── faq.html                # English FAQ page
├── fr/                     # French language directory
│   ├── index.html          # French homepage
│   ├── about.html          # French about page
│   └── faq.html            # French FAQ page
├── includes/
│   ├── header.html         # English header
│   ├── header-fr.html     # French header
│   ├── footer.html         # English footer
│   └── footer-fr.html     # French footer
```

## Creating French Pages

### Step 1: Create the French File

1. Copy the English page (e.g., `about.html`)
2. Create new file in `/fr/` directory (e.g., `/fr/about.html`)
3. Update the `lang` attribute: `<html lang="fr">`

### Step 2: Update Paths

For pages in `/fr/`, update asset paths:
- ✅ Keep as-is: `/assets/css/styles.css` (absolute paths work)
- ✅ Keep as-is: `/public/images/...` (absolute paths work)
- ❌ Update: `assets/js/load-components.js` → `../assets/js/load-components.js` (if using relative)

Actually, since we use absolute paths starting with `/`, most paths should work as-is!

### Step 3: Translate Content

Translate all visible text:
- Page titles and meta descriptions
- Headings (h1, h2, h3, etc.)
- Paragraphs
- Button text
- Navigation items (handled in header-fr.html)

### Step 4: Update Navigation Links

In French pages, links should point to French versions:
- `/about.html` → `/fr/about.html`
- `/faq.html` → `/fr/faq.html`
- etc.

## Creating French Header/Footer

### Header (header-fr.html)

1. Copy `includes/header.html` to `includes/header-fr.html`
2. Translate all navigation items:
   - "Home" → "Accueil"
   - "About" → "À propos"
   - "GRC Services" → "Services GRC"
   - "Blog" → "Blog"
   - "FAQs" → "FAQ"
   - "Contact" → "Contact"
3. Update all links to point to `/fr/` versions:
   - `/about.html` → `/fr/about.html`
   - `/faq.html` → `/fr/faq.html`
   - etc.

### Footer (footer-fr.html)

1. Copy `includes/footer.html` to `includes/footer-fr.html`
2. Translate all text:
   - Section headings
   - Link text
   - Contact information labels
   - Copyright text

## Translation Checklist

When creating a French page:

- [ ] Copy English file to `/fr/` directory
- [ ] Update `<html lang="fr">`
- [ ] Translate page title and meta description
- [ ] Translate all headings (h1, h2, h3)
- [ ] Translate all paragraphs
- [ ] Translate button text
- [ ] Translate form labels (if applicable)
- [ ] Update internal links to `/fr/` versions
- [ ] Test language switcher works
- [ ] Verify all images load correctly
- [ ] Check mobile responsiveness

## Common Translations

### Navigation
- Home → Accueil
- About → À propos
- Services → Services
- Blog → Blog
- FAQs → FAQ
- Contact → Contact
- Resources → Ressources

### Common Phrases
- "Get Started" → "Commencer"
- "Learn More" → "En savoir plus"
- "Contact Us" → "Contactez-nous"
- "Our Services" → "Nos services"
- "Read More" → "Lire la suite"

### Buttons
- "Get Started" → "Commencer"
- "Download" → "Télécharger"
- "Subscribe" → "S'abonner"
- "Send Message" → "Envoyer un message"

## Language Switcher

The language switcher is automatically added to the header. It:
- Detects current language from URL
- Highlights the active language
- Links to the corresponding page in the other language
- Works on all pages automatically

## Testing

After creating French pages:

1. **Test Language Switcher**: Click EN/FR in navigation
2. **Test Links**: Verify all internal links work in French version
3. **Test Assets**: Ensure images, CSS, and JS load correctly
4. **Test Mobile**: Check mobile menu and language switcher on mobile
5. **Test SEO**: Verify meta tags are translated

## Maintenance

When updating content:

1. **Update English version first** (in root directory)
2. **Update French version** (in `/fr/` directory)
3. **Update headers/footers** if navigation changes
4. **Test both versions** after updates

## Tips

- Keep the same HTML structure in both languages
- Use consistent terminology (create a glossary)
- Test with native French speakers for accuracy
- Consider cultural differences, not just translation
- Keep file names the same (only location differs)

