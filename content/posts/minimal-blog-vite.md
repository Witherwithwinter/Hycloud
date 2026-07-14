---
title: Building a Minimal Blog with Vite
excerpt: 'Why Vite + React is the perfect stack for a fast, simple blog that stays out of your way.'
date: '2026-07-08'
category: Tooling
---

# Building a Minimal Blog with Vite

When you strip away the noise, a blog needs three things: **fast loading**, **great typography**, and **simple content management**.

## Why Vite?

Vite is blazingly fast because it serves your code natively in the browser during development and uses Rollup for production builds. No webpack configuration needed.

```
npm create vite@latest my-blog -- --template react-ts
```

That's it. You have a React + TypeScript project ready to go.

## The Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Vite + React | Instant HMR, tiny bundles |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| Content | Markdown files | Write in your editor |
| Hosting | Cloudflare Pages | Free, fast, global CDN |

## Keeping It Simple

The beauty of this approach is that there's **nothing to break**. No database, no CMS, no build pipeline to maintain. Your content lives in markdown files alongside your code.

Push to git, and Cloudflare deploys automatically. That's the entire infrastructure.
