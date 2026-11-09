# Finals love notes

A small, responsive static website for LLB finals from 10 to 19 November 2026. It includes a live countdown, an interactive calendar with a note for each day, and both exam details.

## Preview locally

Open `index.html` in a browser, or run any simple local HTTP server from this folder.

## Publish with GitHub and Vercel

1. Create a GitHub repository and upload the contents of this folder so `index.html` sits at the repository root.
2. In Vercel, import that GitHub repository. If keeping this project inside the larger workspace repository, set Vercel's **Root Directory** to `outputs`.
3. Leave the framework preset as **Other** and the build and output settings blank. Vercel will serve the static site directly.

The countdown uses the `Africa/Johannesburg` time zone (SAST), so the stated 12:30 exam times stay consistent. The fonts are loaded from Google Fonts, with system fallbacks if they are unavailable.
