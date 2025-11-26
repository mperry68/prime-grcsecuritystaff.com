# SEO Head Template

Use this template for adding comprehensive SEO tags to any page. Replace the placeholders with page-specific content.

## Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary Meta Tags -->
    <title>[Page Title] - Prime Consulting Group</title>
    <meta name="title" content="[Page Title] - Prime Consulting Group">
    <meta name="description" content="[150-160 character description optimized for search engines]">
    <meta name="keywords" content="[relevant, comma-separated keywords]">
    <meta name="author" content="Prime Consulting Group">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow">
    <meta name="bingbot" content="index, follow">
    <meta name="language" content="English">
    <meta http-equiv="content-language" content="en-CA">
    
    <!-- Geographic Targeting -->
    <meta name="geo.region" content="CA-QC">
    <meta name="geo.placename" content="Pointe-Claire, Quebec, Canada">
    <meta name="geo.position" content="45.4487;-73.8169">
    <meta name="ICBM" content="45.4487, -73.8169">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://prime-grcsecuritystaff.com/[page-url]">
    <meta property="og:title" content="[Page Title] - Prime Consulting Group">
    <meta property="og:description" content="[Description for social sharing]">
    <meta property="og:image" content="https://prime-grcsecuritystaff.com/[image-path]">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="[Image description]">
    <meta property="og:site_name" content="Prime Consulting Group">
    <meta property="og:locale" content="en_CA">
    <meta property="og:locale:alternate" content="fr_CA">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://prime-grcsecuritystaff.com/[page-url]">
    <meta name="twitter:title" content="[Page Title]">
    <meta name="twitter:description" content="[Description for Twitter]">
    <meta name="twitter:image" content="https://prime-grcsecuritystaff.com/[image-path]">
    <meta name="twitter:image:alt" content="[Image description]">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://prime-grcsecuritystaff.com/[page-url]">
    
    <!-- Alternate Languages -->
    <link rel="alternate" hreflang="en" href="https://prime-grcsecuritystaff.com/[page-url]">
    <link rel="alternate" hreflang="fr" href="https://prime-grcsecuritystaff.com/fr/[page-url]">
    <link rel="alternate" hreflang="x-default" href="https://prime-grcsecuritystaff.com/[page-url]">
    
    <!-- Structured Data (JSON-LD) - Customize per page type -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "[PageType]",
        "name": "[Page Title]",
        "description": "[Page description]",
        "url": "https://prime-grcsecuritystaff.com/[page-url]"
    }
    </script>
    
    <!-- Fonts and Styles -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="icon" type="image/png" href="/public/images/fav.png">
    
    <!-- Additional SEO Script -->
    <script src="assets/js/seo-tags.js" defer></script>
</head>
```

## Page-Specific Structured Data Types

### Service Page
```json
{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Service Name",
    "description": "Service description",
    "provider": {
        "@type": "ProfessionalService",
        "name": "Prime Consulting Group"
    },
    "areaServed": {
        "@type": "Country",
        "name": "Canada"
    }
}
```

### About Page
```json
{
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Prime Consulting Group",
    "description": "About us description"
}
```

### FAQ Page
```json
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
        "@type": "Question",
        "name": "Question text?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Answer text"
        }
    }]
}
```

### Blog Post
```json
{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Blog post title",
    "description": "Blog post description",
    "author": {
        "@type": "Organization",
        "name": "Prime Consulting Group"
    },
    "datePublished": "2025-01-XX",
    "publisher": {
        "@type": "Organization",
        "name": "Prime Consulting Group"
    }
}
```

## Best Practices

1. **Title Tags**: 50-60 characters, include primary keyword
2. **Meta Descriptions**: 150-160 characters, compelling and action-oriented
3. **Keywords**: Natural, relevant, don't overstuff
4. **Images**: Use high-quality images (1200x630px for OG), add alt text
5. **Canonical URLs**: Always include to prevent duplicate content
6. **Structured Data**: Use appropriate schema.org types
7. **Language Tags**: Include hreflang for bilingual pages
8. **Mobile**: Ensure responsive design
9. **Speed**: Optimize images and assets
10. **Content**: High-quality, comprehensive content

