# Google Analytics Setup Guide

## Security Headers Configuration

The security headers have been configured to allow Google Analytics while maintaining strong security practices.

### Allowed Domains

The following Google Analytics domains are now allowed in the Content Security Policy:

- `https://www.google-analytics.com`
- `https://www.googletagmanager.com`
- `https://ssl.google-analytics.com`
- `https://www.analytics.google.com`
- `https://stats.g.doubleclick.net`

### Implementation

To add Google Analytics to your site, add the following code to the `<head>` section of your HTML pages (or in `load-head.js`):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your actual Google Analytics Measurement ID (e.g., `G-XXXXXXXXXX`).

### Security Features Maintained

Even with Google Analytics enabled, the following security features remain active:

- XSS Protection
- CSRF Protection
- Clickjacking Protection
- MIME Sniffing Protection
- Secure External Links (noopener, noreferrer)
- Input Sanitization
- Form Security

### Performance Optimizations

The following performance optimizations are in place:

- DNS Prefetch for Google Analytics domains
- Async loading of analytics scripts
- Non-blocking script execution

