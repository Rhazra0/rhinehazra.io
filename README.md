# Rhine Hazra — Research Portfolio

A single-page site showcasing three research projects (econometrics, GIS, and
mixed-methods fieldwork), built with plain HTML/CSS/JS so it deploys on GitHub
Pages with zero build step.

## Deploy on GitHub Pages

1. Create a new repository on GitHub (e.g. `your-username.github.io` for a
   root-level site, or any name for a project site).
2. Push these files to the repo:
   ```bash
   cd site
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**. Under "Build and deployment",
   set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`
   (or `https://<your-username>.github.io/` if you named the repo
   `<your-username>.github.io`).

## Before you publish — things to personalize

Everything below is marked `TODO` inline in the code too.

- **Contact info** (`index.html`, `#contact` section): replace the placeholder
  email, LinkedIn, and GitHub links with your real ones.
- **CV**: add a real PDF at `assets/docs/CV_Rhine_Hazra.pdf`. The two "Download
  CV" buttons already point at that path — they just need the file to exist.
- **Photo**: the About section currently uses a placeholder grid graphic.
  Drop a real photo at `assets/img/portrait.jpg` and swap the `<svg>` block in
  `index.html` for an `<img>` tag if you'd like a photo instead.
- **Favicon**: there's an inline placeholder favicon in the `<head>` — swap
  for a real one if you want.
- **Site title / meta description**: update the `<title>` and
  `<meta name="description">` tags in `index.html` for search/social previews.

## Structure

```
index.html              — the entire site (single page, anchor-linked sections)
assets/css/style.css     — design tokens + all styling
assets/js/main.js        — mobile nav toggle + scroll-reveal animation
assets/img/              — figures pulled from the actual theses/paper
assets/docs/             — downloadable source papers (PDF/DOCX)
```

## Content notes

- The three research summaries on the page are written in portfolio voice and
  paraphrase your actual abstracts — edit freely in `index.html` under each
  `<article class="project">` block.
- The figures under `assets/img/` were cropped directly from your submitted
  PDFs/DOCX (the Gobar Dhan diagram/map/event-study chart, the Holyoke
  walkability & land-cover maps, and the Chianti land-use & elevation maps).
  Swap in higher-resolution versions any time by replacing the files with the
  same names.
- "Replication code — coming soon" is a disabled placeholder button on the
  Gobar Dhan project — point it at a real GitHub repo once you have one, or
  delete the button.

## Local preview

No build step needed — just open `index.html` in a browser, or run a tiny
local server if you want relative paths to behave exactly like production:

```bash
cd site
python3 -m http.server 8000
# visit http://localhost:8000
```
