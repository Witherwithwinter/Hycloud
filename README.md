# Hylight

A minimalist blog theme built with React, TypeScript, and Tailwind CSS. Clean typography, smooth animations, and Markdown-powered content — designed for clarity and readability.

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Features

- **Minimalist Design** — Clean typography with neutral colors, no distractions
- **GSAP Animations** — Scroll-triggered text reveals, mouse-following scramble effects, and smooth transitions
- **Markdown Posts** — Write articles in Markdown with frontmatter (title, date, category, excerpt)
- **Table of Contents** — Auto-generated TOC with scroll-spy and smooth anchor navigation
- **Responsive Layout** — Optimized for mobile, tablet, and desktop
- **Reading Progress Bar** — Visual indicator of article progress
- **Prev/Next Navigation** — Easy navigation between chronological posts
- **Cloudflare Pages Ready** — One-click deploy with `wrangler.toml` pre-configured

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Animations | GSAP (SplitText, ScrambledText) |
| Markdown | remark + rehype pipeline |
| Deployment | Cloudflare Pages |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
content/posts/    # Markdown blog posts
src/
  components/     # React components
  lib/            # Markdown rendering utilities
  assets/         # Global styles and fonts
```

## Deploy to Cloudflare Pages

1. Push this repository to GitHub
2. Connect to Cloudflare Pages
3. Framework preset: **React (Vite)**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Save and Deploy**

A `wrangler.toml` is included for convenience.
