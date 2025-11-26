# Header and Footer Components

This directory contains standardized header and footer components that are loaded dynamically across all pages on the site. This ensures consistency and makes site-wide updates easy.

## Files

- **`header.html`** - Standardized navigation header with logo, menu items, and mobile toggle
- **`footer.html`** - Standardized footer with logo, service links, resources, contact info, and policy links

## How It Works

The header and footer are loaded dynamically using JavaScript (`load-components.js`), which:
1. Detects the current page location (root or subdirectory)
2. Loads the appropriate header/footer HTML files
3. Injects them into placeholder divs
4. Initializes navigation functionality (mobile menu, dropdowns, etc.)

## Using Header/Footer on Pages

### For Root-Level Pages (e.g., `index.html`, `blog.html`, `faq.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Your head content -->
</head>
<body>
    <!-- Header placeholder - will be loaded by load-components.js -->
    <div id="header-placeholder"></div>

    <!-- Your page content here -->
    
    <!-- Footer placeholder - will be loaded by load-components.js -->
    <div id="footer-placeholder"></div>

    <script src="assets/js/load-components.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>
```

### For Subdirectory Pages (e.g., `blog/post.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Your head content -->
</head>
<body>
    <!-- Header placeholder - will be loaded by load-components.js -->
    <div id="header-placeholder"></div>

    <!-- Your page content here -->
    
    <!-- Footer placeholder - will be loaded by load-components.js -->
    <div id="footer-placeholder"></div>

    <script src="../assets/js/load-components.js"></script>
    <script src="../assets/js/script.js"></script>
</body>
</html>
```

**Note**: The script paths use `../` because you're in a subdirectory.

## Updating Header or Footer

### To Update Navigation Menu

1. Open `includes/header.html`
2. Modify the `<ul class="nav-menu">` section
3. Add, remove, or modify menu items as needed
4. Save the file
5. Changes will appear on **all pages** automatically

### To Update Footer

1. Open `includes/footer.html`
2. Modify the footer sections as needed:
   - Logo section
   - Service links
   - Resource links
   - Contact information
   - Policy links
3. Save the file
4. Changes will appear on **all pages** automatically

## Header Structure

The header contains:
- **Logo**: Links to homepage
- **Navigation Menu**: 
  - Home
  - GRC Services (dropdown)
  - Staff Augmentation (dropdown)
  - Blog
  - FAQs
  - Contact
- **Mobile Toggle Button**: Hamburger menu for mobile devices

## Footer Structure

The footer contains:
- **Logo Section**: Prime GRC logo
- **GRC Services Section**: Links to security services
- **Staff Augmentation Section**: Links to staff augmentation services
- **Resources Section**: Links to Blog, FAQs, Contact
- **Contact Section**: Email, phone, address
- **Footer Bottom**: Copyright and policy links

## Path Handling

The `load-components.js` script automatically handles paths:
- **Root pages** (`/index.html`, `/blog.html`): Uses `/includes/header.html`
- **Subdirectory pages** (`/blog/post.html`): Uses `../includes/header.html`
- **Fallback**: If relative path fails, tries absolute path

## Navigation Initialization

After the header loads, `load-components.js` automatically:
- Initializes mobile menu toggle
- Sets up dropdown menus
- Handles smooth scrolling for anchor links
- Sets active menu item based on current page
- Closes mobile menu when clicking links

## Important Notes

1. **Always use placeholders**: Never include static `<nav>` or `<footer>` HTML in pages - always use the placeholder divs
2. **Script order matters**: Include `load-components.js` before `script.js`
3. **Path consistency**: The script handles paths automatically, but ensure your page structure matches the examples
4. **Logo paths**: Footer logo paths are automatically adjusted for subdirectories

## Troubleshooting

**Header/Footer not loading:**
- Check that placeholder divs are present: `<div id="header-placeholder"></div>` and `<div id="footer-placeholder"></div>`
- Verify `load-components.js` is included with correct path
- Check browser console for errors
- Ensure files exist in `includes/` directory

**Mobile menu not working:**
- Verify `load-components.js` is loaded
- Check that header HTML includes the nav-toggle button
- Ensure navigation initialization completes (check console for errors)

**Logo not displaying in footer:**
- Check logo path in `footer.html` (should be `/public/images/...`)
- For subdirectories, the script automatically adjusts paths
- Verify image file exists

## Best Practices

1. **Single source of truth**: Always update header/footer in `includes/` directory, never in individual pages
2. **Test after changes**: After updating header/footer, test on multiple pages to ensure consistency
3. **Mobile testing**: Always test mobile menu functionality after header changes
4. **Link consistency**: Ensure all links in header/footer use correct paths (absolute paths starting with `/` for root pages)
