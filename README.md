# Uday Gajendar — Design leadership microsite

A lightweight, one-page website built from the user-supplied *Uday Gajendar Overview — Fall 2026* PDF. All embedded portfolio images in `assets/` were extracted from that PDF and optimized for web. No framework, build step, database, or paid hosting is required.

## Publish tonight with GitHub Pages

1. Go to GitHub and create a **public** repository named `design-leadership` under the account `udanium`.
2. Choose **Add file → Upload files**, and upload **the contents** of this folder (`index.html`, `styles.css`, `script.js`, `assets/`, and any documentation you like). Do **not** upload the ZIP itself as the website.
3. Commit the files to the `main` branch.
4. In your repository, go to **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, `main`, `/ (root)`, then **Save**.
5. Your default site URL will be `https://udanium.github.io/design-leadership/`. Open it on desktop and mobile.
6. Before posting on LinkedIn, paste that URL into the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to make it fetch the updated title, description, and social preview image.

If you pick a *different repository name or custom domain*, update the `canonical`, `og:url`, `og:image`, and `twitter:image` URLs in the `<head>` of `index.html`. The local CSS, scripts, and images use relative URLs and will continue to work.

## Quick edits

- **Hero and About copy:** edit `index.html`.
- **Colors, type, spacing, and layouts:** edit CSS variables and rules in `styles.css`.
- **Case-study detail modals:** edit the `projects` object in `script.js`. These are based on pages 7–8 of the original PDF.
- **Portfolio images:** replace WebP images in `assets/` (keep the file names to avoid touching HTML) with original Figma exports if you have sharper sources.
- **Email CTA:** currently sends to `udanium@gmail.com`, a publicly listed contact address. To change, find-and-replace in `index.html`.
- **LinkedIn CTA:** currently points to `https://www.linkedin.com/in/udanium`.

## Included interactions

- Mobile navigation (tap to expand, closes on section selection)
- Subtle reveal-on-scroll animation (disabled when the visitor requests reduced motion)
- Reading progress indicator
- Expandable approach cards
- Two project-detail dialogs
- Filterable six-item artifact gallery
- Keyboard-accessible artifact lightbox (left/right arrows, Escape)
- Semantic sections, skip link, focus indication, and alt text

## Important content checks before sharing

The outcomes shown are **reported product/team results** from the PDF, not claims of sole individual attribution. Review exact metric wording and any client confidentiality restrictions before publishing. The company names are shown in text; confirm any trademark and image usage rights where necessary. The crop quality varies because the graphics came from composite PDF pages—re-exporting individual images from their source files would improve legibility.

## Hosting notes

Google Fonts (Inter Tight, DM Sans, IBM Plex Mono, Instrument Serif) load over the network. System fallbacks are provided. No tracking scripts or cookies are installed. The SVG favicon and 1200×630 PNG Open Graph image are bundled with the site.

## Suggested launch QA

- Desktop and mobile sizes; top navigation; email and LinkedIn links
- Gallery filter & image enlargement; project-detail dialogs; keyboard Escape
- No overflow or clipped headline at 320px and 375px widths
- Social preview with LinkedIn Post Inspector
- Confirm Pages is configured for `main`/root and all assets load

## November 9 typography refinement (v2)

- Project results now use uncondensed DM Sans numeric typesetting, with a distinct unit style and properly spaced `%` / `M+`.
- The “Meet folks where they are” statement now uses an editorial serif and a quieter secondary line.
- “Systems thinker” uses an italic serif for a more human contrast; the isolated decorative arrow and the large ornamental asterisk are removed.
- The package includes no build dependencies; replace files in your repository root to update an existing GitHub Pages site.
