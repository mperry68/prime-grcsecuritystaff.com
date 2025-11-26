# SEO, AEO, GEO Implementation Guide

This guide documents the comprehensive SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) implementation for Prime Consulting Group website.

## Overview

The site includes comprehensive SEO optimization for:
- **Traditional Search Engines** (Google, Bing, etc.)
- **Answer Engines** (Perplexity, ChatGPT, etc.)
- **Generative AI** (Claude, GPT-4, etc.)

## Implementation

### 1. Meta Tags

All pages include:
- **Title tags**: Optimized, unique, 50-60 characters
- **Meta descriptions**: 150-160 characters, compelling
- **Keywords**: Relevant, natural keyword usage
- **Language tags**: `lang="en"` or `lang="fr"` for bilingual support
- **Canonical URLs**: Prevent duplicate content issues
- **Alternate language links**: `hreflang` tags for EN/FR versions

### 2. Open Graph Tags

For social media sharing:
- `og:title` - Page title
- `og:description` - Page description
- `og:type` - Content type (website, article, etc.)
- `og:url` - Canonical URL
- `og:image` - Social sharing image (1200x630px recommended)
- `og:locale` - Language/region (en_CA, fr_CA)
- `og:site_name` - Site name

### 3. Twitter Card Tags

- `twitter:card` - Card type (summary_large_image)
- `twitter:title` - Page title
- `twitter:description` - Page description
- `twitter:image` - Image for Twitter cards
- `twitter:site` - Twitter handle

### 4. Structured Data (JSON-LD)

Schema.org markup for better AI understanding:
- **Organization** schema
- **ProfessionalService** schema
- **LocalBusiness** schema (address, phone, etc.)
- **BreadcrumbList** for navigation
- **FAQPage** for FAQ pages
- **Article** for blog posts

### 5. Robots Meta Tags

- `robots`: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
- `googlebot`: `index, follow`
- `bingbot`: `index, follow`

### 6. Geographic Targeting

- `geo.region`: CA-QC (Quebec, Canada)
- `geo.placename`: Pointe-Claire, Quebec, Canada
- `geo.position`: Coordinates
- `ICBM`: Coordinates

### 7. AEO/GEO Optimization

For AI search engines and answer engines:
- **Clear, structured content** with headings (H1, H2, H3)
- **Semantic HTML** with proper markup
- **Structured data** (JSON-LD) for context
- **Natural language** content optimized for AI understanding
- **FAQ sections** with clear Q&A format
- **Comprehensive coverage** of topics

### 8. Technical SEO

- **Mobile-friendly**: Responsive design
- **Fast loading**: Optimized assets
- **HTTPS**: Secure connection
- **Clean URLs**: Descriptive, keyword-rich
- **Internal linking**: Logical site structure
- **Alt text**: All images have descriptive alt attributes

## File Structure

```
/
├── robots.txt                    # Search engine crawler instructions
├── sitemap.xml                  # Site structure (to be generated)
├── assets/js/seo-tags.js        # Dynamic SEO tag injection
└── SEO_IMPLEMENTATION_GUIDE.md  # This file
```

## Usage

### Automatic SEO Tags

The `seo-tags.js` script automatically adds SEO tags based on page path. To use:

1. Include the script in your page:
```html
<script src="/assets/js/seo-tags.js"></script>
```

2. Add page configuration in `seo-tags.js` for custom pages

### Manual SEO Tags

For pages not in the config, add tags manually in the `<head>`:

```html
<!-- Basic SEO -->
<title>Page Title - Prime Consulting Group</title>
<meta name="description" content="Page description (150-160 chars)">
<meta name="keywords" content="keyword1, keyword2, keyword3">

<!-- Open Graph -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:type" content="website">
<meta property="og:url" content="https://prime-grcsecuritystaff.com/page.html">
<meta property="og:image" content="https://prime-grcsecuritystaff.com/image.jpg">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page description">
<meta name="twitter:image" content="https://prime-grcsecuritystaff.com/image.jpg">

<!-- Canonical -->
<link rel="canonical" href="https://prime-grcsecuritystaff.com/page.html">

<!-- Language -->
<link rel="alternate" hreflang="en" href="https://prime-grcsecuritystaff.com/page.html">
<link rel="alternate" hreflang="fr" href="https://prime-grcsecuritystaff.com/fr/page.html">
```

## Best Practices

1. **Unique Titles**: Each page should have a unique, descriptive title
2. **Compelling Descriptions**: Write descriptions that encourage clicks
3. **Keyword Research**: Use natural, relevant keywords
4. **Image Optimization**: Use descriptive alt text and optimized images
5. **Internal Linking**: Link related pages together
6. **Content Quality**: High-quality, comprehensive content
7. **Mobile Optimization**: Ensure mobile-friendly design
8. **Page Speed**: Optimize for fast loading
9. **Structured Data**: Use schema.org markup where appropriate
10. **Regular Updates**: Keep content fresh and updated

## Monitoring

- Use Google Search Console for SEO monitoring
- Monitor rankings for target keywords
- Track organic traffic and conversions
- Review crawl errors and fix issues
- Monitor Core Web Vitals

## Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

