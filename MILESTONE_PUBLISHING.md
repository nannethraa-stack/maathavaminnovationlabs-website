# Publishing Maathavam milestones

The website uses a lightweight static publishing workflow. No CMS, database, framework or paid service is required.

## Add an announcement

1. Open `assets/js/milestones-data.js`.
2. Add an object inside `window.MAATHAVAM_MILESTONES = [ ... ]`.
3. Set `published: true` only after the announcement and wording are approved for public release.
4. Commit to a feature branch and preview the site before merging into `main`.

## Fields

- `id`: unique, URL-friendly identifier for internal tracking.
- `published`: must be `true` for the entry to appear.
- `category`: e.g. `University collaboration`, `Intellectual property`, `Commercial partnership`, or `Company milestone`.
- `date`: announcement date in `YYYY-MM-DD` format.
- `title`: concise headline.
- `partner`: optional official partner name.
- `summary`: short, approved public description.
- `link`: optional public HTTP(S) announcement URL.
- `linkLabel`: optional link text; defaults to `Read announcement`.

Entries are shown newest first. Only published entries appear; if there are none, the page displays a neutral empty state. The card layout inherits the existing navy-and-gold design tokens and adapts to mobile screens.

## Before publishing

- Obtain approval to announce the relationship and use any partner name or logo.
- Do not publish confidential, NDA-protected or unpublished technical information.
- Verify all dates, names, URLs and legal wording.
- For intellectual property, distinguish accurately between an application being filed, an application being allowed, and a patent being granted.
- Preview the page on desktop and mobile before merging.

## Previewing locally

Because this is a static website, opening the HTML file directly works for the page itself. If your browser blocks local scripts or assets in your setup, use VS Code's Live Server extension or another local static HTTP server.
