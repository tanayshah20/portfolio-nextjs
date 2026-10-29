# Tanay Shah — Portfolio

Single-page résumé site built with Next.js and exported as static HTML.

## Updating content

All text on the page lives in [`data/resume.js`](data/resume.js): profile, links, experience, projects, skills and education. Edit that file; the components render whatever is there.

- **Résumé download:** save the PDF as `public/Tanay_Shah_Resume.pdf` (the name is `profile.resumeFile`) and rebuild. The Download Résumé button appears automatically when the file exists.
- **Hero terminal:** the lines it ticks off come from `profile.terminalChecks`.
- **Project links:** add `repo` and/or `url` to a project to show Code / Live links on its card.

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
```

## Building

```bash
npm run build   # static site in out/
npm run lint
```

`out/` can be hosted on any static host (e.g. GitHub Pages).
