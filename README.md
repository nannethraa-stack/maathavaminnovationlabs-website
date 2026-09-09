Maathavam Innovation Labs — Jamstack Build
=============================================

WHAT THIS IS
------------
Plain static HTML/CSS/JS — no WordPress, no PHP, no database, no build
step, no framework, no node_modules. This is the whole site:

    index.html
    assets/css/style.css
    assets/js/main.js
    assets/images/logo.png
    assets/images/logo-icon.png
    netlify.toml      (Netlify config — security headers, caching)
    vercel.json        (same, for Vercel)
    _headers            (same, for Cloudflare Pages)
    robots.txt

That's it. Open index.html directly in a browser (double-click it) and
it works, offline, with no server at all — all the CSS/JS/image paths in
index.html are relative (assets/css/style.css, not /assets/css/style.css),
so the browser finds them next to the file instead of looking at the
root of your hard drive. Deployed to any static host, it's a fully
working, fast, secure site with nothing to patch or update — that's the
whole point of "Jamstack": the HTML is pre-built, not generated
per-visitor by a server, so there's no PHP/MySQL layer to get hacked, go
down, or slow under load.

DEPLOY IT (pick one — all are free for a site this size)
-----------------------------------------------------------

Netlify (fastest, drag-and-drop)
1. Go to app.netlify.com, sign up free.
2. Drag this whole folder onto the "Sites" page.
3. Done — you get a live URL in seconds. Add your own domain under
   Site settings > Domain management whenever you're ready.

Vercel
1. Go to vercel.com, sign up free.
2. New Project > "Deploy" > drag and drop this folder (or connect a
   GitHub repo containing it).
3. No build command needed — leave the framework preset as "Other".

Cloudflare Pages
1. Go to pages.cloudflare.com, sign up free.
2. Create a project > "Direct Upload" > upload this folder.
3. Build command: none. Output directory: / (root).

GitHub Pages (if you'd rather host from a repo you already have)
1. Push this folder's contents to a GitHub repo.
2. Repo Settings > Pages > Deploy from branch > pick "main" / root.
3. Your site is live at yourusername.github.io/reponame.

Any of these also connect straight to a GitHub repo, so every time you
push a change, the live site updates automatically in seconds — that's
the "continuous deployment" piece of Jamstack, with zero server to
maintain.

THE LOGO
--------
Lives at assets/images/logo.png and is referenced directly in
index.html's nav — it's a real file in the repo, so there's nothing that
can go missing at runtime (unlike the earlier version that pointed at a
logo.jpg that didn't exist). To swap it, replace that file and keep the
same filename, or update the <img src="..."> path in index.html.

THE CONTACT FORM (this is the one place a static site needs help)
----------------------------------------------------------------------
Static sites can't run server code, so form submissions need a small
serverless form service. Out of the box this form still works with zero
setup — it falls back to opening the visitor's email client (mailto:),
same as before.

To actually collect submissions in an inbox/dashboard instead:

Option A — Formspree (works on any host, 2 minutes to set up)
1. Go to formspree.io, sign up free, create a new form.
2. Copy the form ID they give you.
3. In index.html, replace YOUR_FORM_ID in the form's "action" attribute
   with that ID. That's the only change needed — main.js already knows
   to submit there instead of falling back to mailto: once it's a real
   URL.

Option B — Netlify Forms (only if you deploy on Netlify, zero external
signup)
1. Add data-netlify="true" and a hidden <input type="hidden"
   name="form-name" value="contact"> to the <form> in index.html.
2. Submissions then show up automatically in Netlify's dashboard under
   Forms — no Formspree account needed.

EDITING CONTENT
----------------
Everything is in index.html as plain HTML — headline, domain
descriptions, FAQ, dropdown options. No CMS, no shortcodes, no template
engine to learn. Open it in any text editor, change the text between the
tags, save, and redeploy (or just push to GitHub if you set up
continuous deployment).

WHY THIS OVER WORDPRESS
------------------------
- Speed: no database query or PHP render on every visit — the browser
  just downloads static files from a CDN.
- Security: no PHP/MySQL/plugin surface to get hacked; nothing to patch.
- Zero bloat: no admin dashboard, no plugin overhead, no theme framework
  — just the HTML/CSS/JS this page actually needs.
- Cost: free hosting tiers on Netlify/Vercel/Cloudflare comfortably cover
  a site like this, versus paying for WordPress hosting + maintenance.

The trade-off: there's no wp-admin for non-technical content edits — any
copy change means editing index.html directly (or, later, wiring up a
headless CMS like Netlify CMS if frequent edits by non-developers becomes
a real need).
