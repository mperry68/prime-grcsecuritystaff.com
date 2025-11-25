# Header and Footer Components

This directory contains standardized header and footer components that are loaded dynamically across all pages on the site.

## Files

- `header.html` - Standardized navigation header
- `footer.html` - Standardized footer with links and policies

## Usage

To use these components on any page:

1. Add placeholder divs in your HTML:
```html
<body>
    <div id="header-placeholder"></div>
    <!-- Your page content here -->
    <div id="footer-placeholder"></div>
    
    <script src="assets/js/load-components.js"></script>
    <script src="assets/js/script.js"></script>
</body>
```

2. The `load-components.js` script will automatically:
   - Detect if you're in a subdirectory (like `/blog/`)
   - Load the header and footer from the correct path
   - Initialize navigation functionality

## Updating

To update the header or footer across all pages:
- Simply edit `header.html` or `footer.html`
- Changes will automatically appear on all pages that use the component system

## Notes

- The script handles both root-level pages (`/`) and subdirectory pages (`/blog/`, etc.)
- Navigation is automatically initialized after the header loads
- The system falls back to absolute paths if relative paths fail

