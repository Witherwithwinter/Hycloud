---
title: "Getting Started with Hylight"
date: "2026-07-19"
category: "Tutorial"
excerpt: "Learn how to set up and customize your own blog using the Hylight theme."
---

# Getting Started with Hylight

Welcome to Hylight! This guide will walk you through setting up your own blog using this minimalist theme.

## Prerequisites

Before you begin, make sure you have:

- Node.js 18 or later installed
- npm or yarn package manager
- Basic knowledge of React and TypeScript

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/hylight.git
cd hylight
npm install
```

## Project Structure

```
hylight/
├── content/posts/    # Your markdown blog posts
├── src/
│   ├── components/   # React components
│   ├── lib/          # Utilities (markdown rendering)
│   └── assets/       # Global styles
├── package.json
└── vite.config.ts
```

## Writing Posts

Create new posts in the `content/posts/` directory as `.md` files. Each post needs frontmatter:

```yaml
---
title: "My First Post"
date: "2026-07-19"
category: "Tutorial"
excerpt: "A brief description of your post."
---
```

## Customization

### Colors

Edit `src/assets/index.css` to customize the color scheme. The theme uses CSS custom properties for easy theming.

### Components

- **Hero**: Homepage title animation
- **PostList**: Article grid layout
- **ArticlePage**: Full article view with TOC
- **NavBar**: Navigation bar with blur effect

## Deployment

Hylight is optimized for Cloudflare Pages deployment. Simply connect your GitHub repository and configure:

- Build command: `npm run build`
- Output directory: `dist`

That's it! You're ready to start blogging with Hylight.
