---
title: Getting Started with React Bits
excerpt: 'A practical guide to adding stunning animations and interactive effects to your React projects.'
date: '2026-07-10'
category: React
---

# Getting Started with React Bits

React Bits is a collection of handcrafted animated components built with React, Three.js, and GSAP. They bring life to any project with minimal effort.

## Why React Bits?

Most animation libraries require you to write complex keyframes or manage state for every interaction. React Bits components are designed to be **drop-in ready** — import, configure props, and you're done.

Here's a quick example using the **SplitText** component:

```tsx
import SplitText from '@/components/SplitText'

function Title() {
  return (
    <SplitText
      text="Hello World"
      splitType="chars"
      delay={50}
      className="text-4xl font-bold"
    />
  )
}
```

## What's Available?

The registry includes backgrounds, text animations, and interactive components:

- **Backgrounds** — DotField, Dither, FlickerGrid
- **Text Effects** — SplitText, Glitch, Flicker, Typewriter
- **Interactive** — Hover effects, button variants

Each component is fully typed and customizable through props.

## Next Steps

Try adding a DotField background to your hero section, then overlay a SplitText title. The combination creates an immediate sense of polish.
