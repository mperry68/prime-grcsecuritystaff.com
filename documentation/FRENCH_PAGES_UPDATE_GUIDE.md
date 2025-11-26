# French Pages Update Guide

## Standard Modifications for Each French Page

For each page in `/fr/`, apply these modifications:

### 1. HTML Language Tag
- Change: `<html lang="en">` → `<html lang="fr">`

### 2. Meta Tags
- Change: `content="English"` → `content="French"`
- Change: `content="en-CA"` → `content="fr-CA"`
- Update title and description to French
- Update og:locale to `fr_CA`
- Update canonical URL to `/fr/` version

### 3. Asset Paths
- Change: `href="assets/` → `href="/assets/`
- Change: `src="assets/` → `src="/assets/`

### 4. Internal Links
- Change: `href="/page.html"` → `href="/fr/page.html"` (for pages that have French versions)
- Keep external links as-is

### 5. Content Translation
- Translate all headings, paragraphs, buttons, form labels
- Keep technical terms (ISO 27001, SOC 2, etc.) as-is
- Translate service names, descriptions, benefits

## Pages Status

- [x] fr/index.html - ✅ Complete
- [ ] fr/about.html - In Progress
- [ ] fr/security-audits.html
- [ ] fr/penetration-testing.html
- [ ] fr/security-awareness-training.html
- [ ] fr/grc-frameworks.html
- [ ] fr/software-development.html
- [ ] fr/it-infrastructure.html
- [ ] fr/data-analytics.html
- [ ] fr/project-management.html
- [ ] fr/quality-assurance.html

