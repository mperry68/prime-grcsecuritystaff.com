# Blog Posts Guide

This directory contains individual blog post HTML files. This guide explains how to add new blog posts to the site.

## File Structure

All blog posts should be placed directly in the `blog/` directory with descriptive, URL-friendly filenames.

```
blog/
├── 5-key-benefits-staff-augmentation.html
├── strategic-advantages-staff-augmentation.html
├── cost-savings-staff-augmentation.html
├── best-practices-integrating-staff.html
├── security-compliance-staff-augmentation.html
├── future-trends-staff-augmentation.html
└── README.md
```

## Adding a New Blog Post

### Step 1: Create the HTML File

Create a new HTML file in the `blog/` directory with a descriptive filename (use hyphens, lowercase):
- ✅ Good: `how-to-choose-staff-augmentation.html`
- ❌ Bad: `Blog Post 1.html` or `new_post.html`

### Step 2: Use the Standard Template

Copy the structure from an existing blog post. Your blog post HTML file should follow this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Blog Post Title - Prime GRC</title>
    <meta name="description" content="A brief description of your blog post for SEO (150-160 characters).">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/styles.css">
    <link rel="icon" type="image/png" href="/public/images/fav.png">
</head>
<body>
    <!-- Header placeholder - will be loaded by load-components.js -->
    <div id="header-placeholder"></div>

    <section class="blog-post-content">
        <div class="container">
            <div class="blog-post-header">
                <div class="blog-post-meta">January 20, 2025 | Category</div>
                <h1>Your Blog Post Title</h1>
            </div>

            <!-- Your blog post content here -->
            <p>Introduction paragraph...</p>

            <h2>Section Heading</h2>
            <p>Content...</p>

            <!-- More content sections as needed -->
        </div>
    </section>

    <!-- Footer placeholder - will be loaded by load-components.js -->
    <div id="footer-placeholder"></div>

    <script src="../assets/js/load-components.js"></script>
    <script src="../assets/js/script.js"></script>
</body>
</html>
```

### Step 3: Important Notes

1. **Header/Footer**: Always use the placeholder divs:
   - `<div id="header-placeholder"></div>` (replaces static navigation)
   - `<div id="footer-placeholder"></div>` (replaces static footer)
   - These are automatically loaded by `load-components.js`

2. **CSS Path**: Use `../assets/css/styles.css` (relative path from blog/ directory)

3. **JavaScript Paths**: Use:
   - `../assets/js/load-components.js` (required for header/footer)
   - `../assets/js/script.js` (for other functionality)

4. **Image Paths**: Use absolute paths starting with `/`:
   - `/public/images/your-image.jpg`

### Step 4: Add to Blog Listing Page

After creating your blog post file, you **must** add it to `blog.html` so it appears on the blog listing page.

1. Open `blog.html`
2. Find the `<div class="blog-grid">` section
3. Add a new `<article class="blog-card">` entry:

```html
<article class="blog-card">
    <div class="blog-card-image">📝</div>  <!-- Use an emoji or icon -->
    <div class="blog-card-content">
        <div class="blog-card-meta">January 20, 2025 | Category</div>
        <h3>Your Blog Post Title</h3>
        <p>Brief description/excerpt of your blog post (2-3 sentences).</p>
        <a href="blog/your-blog-post-filename.html" class="blog-card-link">Read More →</a>
    </div>
</article>
```

**Important**: Add new blog posts at the **top** of the blog-grid (most recent first).

### Step 5: Blog Post Content Guidelines

- **Title**: Clear, descriptive, and SEO-friendly
- **Meta Description**: 150-160 characters summarizing the post
- **Date Format**: Use format "Month Day, Year" (e.g., "January 20, 2025")
- **Category**: Use categories like: Benefits, Strategy, Cost Savings, Best Practices, Security, Trends, etc.
- **Content Structure**: Use proper HTML headings (h1, h2, h3) for structure
- **Links**: Use relative paths for internal links (e.g., `../blog.html` or `/blog.html`)

## Example Blog Post Entry

Here's a complete example of a blog card entry in `blog.html`:

```html
<article class="blog-card">
    <div class="blog-card-image">💼</div>
    <div class="blog-card-content">
        <div class="blog-card-meta">January 15, 2025 | Benefits</div>
        <h3>5 Key Benefits of IT Staff Augmentation for Canadian Companies</h3>
        <p>Discover how staff augmentation can help your company access specialized talent, reduce costs, and scale your team flexibly without the overhead of permanent hires.</p>
        <a href="blog/5-key-benefits-staff-augmentation.html" class="blog-card-link">Read More →</a>
    </div>
</article>
```

## File Naming Convention

- Use lowercase letters
- Use hyphens to separate words
- Be descriptive but concise
- Examples:
  - `how-to-choose-staff-augmentation.html`
  - `cybersecurity-best-practices-2025.html`
  - `cost-savings-staff-augmentation.html`

## Checklist for New Blog Posts

- [ ] Created HTML file in `blog/` directory with proper filename
- [ ] Used header and footer placeholders (not static nav/footer)
- [ ] Set correct CSS path (`../assets/css/styles.css`)
- [ ] Set correct JavaScript paths (`../assets/js/load-components.js` and `../assets/js/script.js`)
- [ ] Added proper meta title and description
- [ ] Added blog post entry to `blog.html` blog-grid
- [ ] Used proper date format and category
- [ ] Tested the blog post page loads correctly
- [ ] Tested navigation works (mobile menu, links, etc.)

## Troubleshooting

**Blog post doesn't appear on blog.html:**
- Make sure you added the blog card entry to `blog.html`
- Check that the file path in the `href` attribute is correct

**Header/Footer not loading:**
- Ensure you're using the placeholder divs, not static HTML
- Check that `load-components.js` is included in the correct path
- Verify the file is in the `blog/` directory (not a subdirectory)

**Styling looks wrong:**
- Verify CSS path is `../assets/css/styles.css`
- Check browser console for 404 errors on CSS/JS files
