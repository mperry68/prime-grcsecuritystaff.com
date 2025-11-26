# Fallback System Documentation

## Overview

The bilingual site includes an intelligent fallback system that ensures users always see content, even if French translations aren't available yet.

## How It Works

### Page-Level Fallback

When a user navigates to a French URL (e.g., `/fr/about.html`):

1. **Check if French page exists**
   - System checks if `/fr/about.html` exists
   
2. **If French page exists**
   - Shows French version normally
   - No notice banner displayed
   
3. **If French page doesn't exist**
   - Automatically redirects to English version (`/about.html`)
   - Shows bilingual notice banner at top of page
   - Updates URL in browser (no page reload needed)
   - User can dismiss notice (stored in session)

### Header/Footer Fallback

When loading header or footer:

1. **Try French version first** (`header-fr.html` or `footer-fr.html`)
2. **If not found, fallback to English** (`header.html` or `footer.html`)
3. **No errors** - always loads something

### Language Switcher Behavior

When clicking language switcher:

1. **Switching to French**
   - Checks if French page exists first
   - If exists: Navigate to French page
   - If doesn't exist: Stay on English, show notice banner

2. **Switching to English**
   - Always works (English pages always exist)
   - Navigate immediately

## Notice Banner

The fallback notice banner:

- **Appears at top of page** when viewing English content on a French URL
- **Bilingual text**: Shows message in both French and English
- **Dismissible**: User can close it with × button
- **Session memory**: Once dismissed, doesn't show again in same session
- **Responsive**: Adapts to mobile screens

### Banner Text

**French**: "Cette page n'est pas encore disponible en français. Affichage de la version anglaise."

**English**: "This page is not yet available in French. Showing English version."

## Implementation Details

### Files Involved

1. **`assets/js/language-switcher.js`**
   - Checks if pages exist before navigating
   - Shows/hides notice banner
   - Handles language switching logic

2. **`assets/js/load-components.js`**
   - Falls back to English header/footer if French versions don't exist
   - Handles path resolution for both languages

3. **`assets/css/styles.css`**
   - Styles for `.language-fallback-notice`
   - Responsive design for mobile

## Usage Examples

### Scenario 1: French Page Exists

User clicks "FR" on `/about.html`:
- ✅ Checks `/fr/about.html` exists
- ✅ Navigates to `/fr/about.html`
- ✅ Shows French content
- ✅ No notice banner

### Scenario 2: French Page Doesn't Exist

User clicks "FR" on `/faq.html`:
- ❌ Checks `/fr/faq.html` - doesn't exist
- ✅ Stays on `/faq.html` (English)
- ✅ Shows notice banner
- ✅ Updates language switcher to show EN as active

### Scenario 3: Direct French URL

User visits `/fr/resources.html` directly:
- ❌ Page doesn't exist
- ✅ Redirects to `/resources.html` (English)
- ✅ Shows notice banner
- ✅ Updates URL in browser

## Benefits

1. **No 404 Errors**: Users always see content
2. **Gradual Translation**: Translate pages as you go, no need to translate everything at once
3. **User Awareness**: Clear communication when viewing English content
4. **Seamless Experience**: Works automatically without manual configuration
5. **SEO Friendly**: English content is always accessible

## Best Practices

1. **Translate key pages first**: Homepage, About, Contact
2. **Create French header/footer early**: Even if pages aren't translated, navigation will be
3. **Use notice banner**: It's helpful for users to know when content isn't translated
4. **Test fallback**: Try accessing French URLs that don't exist to verify behavior

## Testing

To test the fallback system:

1. **Create a test page** (e.g., `/test.html`)
2. **Don't create French version** (`/fr/test.html`)
3. **Try to access French URL**: `/fr/test.html`
4. **Verify**: Should show English content with notice banner
5. **Click language switcher**: Should show notice if French doesn't exist

## Future Enhancements

Potential improvements:

- [ ] Track which pages need translation (admin dashboard)
- [ ] Show progress indicator (e.g., "3 of 10 pages translated")
- [ ] Allow users to request translation for specific pages
- [ ] Analytics to track which pages users try to access in French

