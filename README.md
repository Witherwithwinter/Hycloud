# Hycloud Blog Theme

[**中文文档**](README_CN.md)

A minimalist blog theme built with React, TypeScript, and Tailwind CSS. Clean typography, smooth animations, and Markdown-powered content — designed for clarity and readability.

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Witherwithwinter/Hycloud)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Features

- **Minimalist Design** — Clean typography with neutral colors, no distractions
- **GSAP Animations** — Scroll-triggered text reveals, mouse-following scramble effects, and smooth transitions
- **Click Spark Effect** — Interactive spark animation on every click across the entire site
- **Bilingual Support** — English / 中文 language toggle, persisted in localStorage
- **Markdown Posts** — Write articles in Markdown with frontmatter (title, date, category, excerpt)
- **Table of Contents** — Auto-generated TOC with scroll-spy and smooth anchor navigation
- **Reading Progress Bar** — Visual indicator of article progress
- **Prev/Next Navigation** — Easy navigation between chronological posts
- **Responsive Layout** — Optimized for mobile, tablet, and desktop
- **Cloudflare Pages Ready** — One-click deploy with `wrangler.toml` pre-configured

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Animations | GSAP (SplitText, ScrambledText, LineSidebar) |
| Markdown | remark + rehype pipeline |
| Deployment | Cloudflare Pages |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Witherwithwinter/Hycloud.git

# Install dependencies
cd Hycloud
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
    PillNav.tsx       # Pill-style navigation bar with mobile menu
    Hero.tsx          # Landing hero section
    PostList.tsx      # Blog post listing
    PostCard.tsx      # Individual post card
    ArticlePage.tsx   # Article reading page with TOC sidebar
    ArchivePage.tsx   # Archive page with line sidebar navigation
    AboutPage.tsx     # About page with scrambled text effect
    Footer.tsx        # Site footer
    ClickSpark.tsx    # Global click spark canvas effect
    ScrambledText.tsx # GSAP-based text scramble animation
    SplitText.tsx     # GSAP character/word split animation
    LineSidebar.tsx   # Interactive line-based sidebar navigation
  lib/              # Markdown rendering utilities
  assets/           # Global styles and fonts
```

## Bilingual Support

The theme includes built-in English / 中文 language switching via a context-based i18n system (no external dependencies). Language preference is persisted in `localStorage`.

To add your own translations, edit the language files in `src/i18n/`:

- `en.json` — English translations
- `zh-CN.json` — Simplified Chinese translations

## Deploy to Cloudflare Pages

1. Push this repository to GitHub
2. Connect to Cloudflare Pages
3. Framework preset: **React (Vite)**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Save and Deploy**

A `wrangler.toml` is included for convenience.
