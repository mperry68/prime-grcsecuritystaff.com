# FAQ Management Guide

This guide explains how to add, update, and manage Frequently Asked Questions (FAQs) on the site.

## File Location

All FAQs are managed in a single file: `faq.html` in the root directory.

## FAQ Structure

FAQs are organized into categories, with each category containing multiple FAQ items. Each FAQ item has a question and an answer.

### Current Categories

1. **Cybersecurity Services** - Questions about security audits, penetration testing, compliance, etc.
2. **Staff Augmentation - Benefits & Advantages** - Questions about the benefits of staff augmentation
3. **Cost Savings** - Questions about pricing and cost savings
4. **How It Works** - Questions about the staff augmentation process
5. **Security & Compliance** - Questions about security and compliance for staff augmentation

## Adding a New FAQ

### Step 1: Open faq.html

Open the `faq.html` file in the root directory.

### Step 2: Find the Appropriate Category

Locate the category where your FAQ should be added. If the category doesn't exist, you can create a new one (see "Adding a New Category" below).

### Step 3: Add the FAQ Item

Add a new FAQ item within the category's `<div class="faq-category">` section. Use this structure:

```html
<div class="faq-item">
    <div class="faq-question">
        <h4>Your Question Here?</h4>
        <span class="faq-toggle">+</span>
    </div>
    <div class="faq-answer">
        <p>Your answer here. You can use multiple paragraphs, lists, and other HTML elements.</p>
        <ul>
            <li>List item 1</li>
            <li>List item 2</li>
        </ul>
        <p>Additional content as needed.</p>
    </div>
</div>
```

### Step 4: Complete Example

Here's a complete example of an FAQ item:

```html
<div class="faq-item">
    <div class="faq-question">
        <h4>How quickly can you provide staff augmentation professionals?</h4>
        <span class="faq-toggle">+</span>
    </div>
    <div class="faq-answer">
        <p>We can typically provide qualified professionals within 1-2 weeks, depending on the specific skills required:</p>
        <ul>
            <li><strong>Common skills:</strong> 3-5 business days</li>
            <li><strong>Specialized skills:</strong> 1-2 weeks</li>
            <li><strong>Rare/expert skills:</strong> 2-4 weeks</li>
        </ul>
        <p>We maintain a network of pre-vetted professionals to ensure rapid deployment when you need them most.</p>
    </div>
</div>
```

## Adding a New Category

If you need to add a completely new FAQ category:

1. Find the FAQ content section in `faq.html` (look for `<div class="faq-content">`)
2. Add a new category section after the existing ones:

```html
<div class="faq-category">
    <h3>Your New Category Name</h3>
    
    <div class="faq-item">
        <div class="faq-question">
            <h4>First question in this category?</h4>
            <span class="faq-toggle">+</span>
        </div>
        <div class="faq-answer">
            <p>Answer to the first question.</p>
        </div>
    </div>

    <!-- Add more FAQ items as needed -->
</div>
```

## FAQ Content Guidelines

### Question Format
- Start with a capital letter
- End with a question mark (?)
- Be clear and specific
- Use proper grammar
- Keep questions concise (ideally one sentence)

### Answer Format
- Provide comprehensive, helpful answers
- Use proper HTML structure (paragraphs, lists, etc.)
- Use `<strong>` tags for emphasis on key terms
- Include bullet points or numbered lists when appropriate
- Keep answers focused and relevant

### HTML Elements You Can Use

- `<p>` - Paragraphs
- `<ul>` and `<li>` - Unordered lists
- `<ol>` and `<li>` - Ordered lists
- `<strong>` - Bold/emphasis
- `<em>` - Italics
- `<a href="...">` - Links
- `<br>` - Line breaks (use sparingly)

## FAQ Item Structure Breakdown

```html
<div class="faq-item">                    <!-- Container for entire FAQ -->
    <div class="faq-question">            <!-- Clickable question area -->
        <h4>Question text?</h4>           <!-- The actual question -->
        <span class="faq-toggle">+</span>  <!-- Toggle icon (don't change) -->
    </div>
    <div class="faq-answer">              <!-- Answer content (hidden by default) -->
        <!-- Your answer content here -->
    </div>
</div>
```

## Important Notes

1. **Don't modify the structure**: Keep the class names and structure exactly as shown. The JavaScript depends on these classes.

2. **Toggle icon**: Always include `<span class="faq-toggle">+</span>` - this is required for the expand/collapse functionality.

3. **Question heading**: Always use `<h4>` for the question text.

4. **Order matters**: FAQs are displayed in the order they appear in the HTML. Place the most common/important questions first within each category.

5. **Header/Footer**: The FAQ page uses the standardized header/footer system (loaded via `load-components.js`), so you don't need to modify navigation.

## Editing Existing FAQs

To edit an existing FAQ:

1. Open `faq.html`
2. Find the FAQ item you want to edit
3. Modify the question text in the `<h4>` tag
4. Modify the answer content in the `<div class="faq-answer">` section
5. Save the file

## FAQ Functionality

The FAQ page includes automatic JavaScript functionality:
- Clicking a question expands/collapses the answer
- Only one FAQ item can be open at a time (clicking a new question closes the previous one)
- The toggle icon changes from `+` to `-` when expanded

This functionality is handled automatically - you don't need to add any JavaScript.

## Checklist for Adding FAQs

- [ ] Opened `faq.html` file
- [ ] Found or created appropriate category
- [ ] Added FAQ item with correct HTML structure
- [ ] Question is clear and ends with `?`
- [ ] Answer is comprehensive and well-formatted
- [ ] Used proper HTML elements (p, ul, strong, etc.)
- [ ] Included `<span class="faq-toggle">+</span>` in question div
- [ ] Tested FAQ expands/collapses correctly
- [ ] Verified FAQ appears in correct category on the page

## Troubleshooting

**FAQ doesn't expand when clicked:**
- Check that you included `<span class="faq-toggle">+</span>`
- Verify the HTML structure matches the template exactly
- Check browser console for JavaScript errors

**FAQ appears in wrong category:**
- Verify the FAQ item is inside the correct `<div class="faq-category">` section
- Check that category divs are properly closed

**Styling looks wrong:**
- Ensure you're using the correct class names (`faq-item`, `faq-question`, `faq-answer`, `faq-toggle`)
- Check that CSS file is loading correctly

## Best Practices

1. **Group related questions**: Keep similar questions in the same category
2. **Order by importance**: Place the most frequently asked questions first
3. **Keep answers concise**: Provide complete information but avoid unnecessary verbosity
4. **Use formatting**: Break up long answers with lists, paragraphs, and emphasis
5. **Update regularly**: Review and update FAQs as services or policies change
6. **Test after changes**: Always test that FAQs expand/collapse correctly after adding new ones

