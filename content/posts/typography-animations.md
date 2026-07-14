---
title: Typography in the Age of Animations
excerpt: 'How SplitText and GSAP bring words to life without sacrificing readability or elegance.'
date: '2026-07-02'
category: Typography
---

# Typography in the Age of Animations

Great typography has always been about hierarchy, spacing, and rhythm. Animations add a fourth dimension: **time**.

## The Problem with Over-Animation

Not every word needs to bounce, spin, or slide in. The best text animations are the ones you barely notice — they guide the eye without demanding it.

## SplitText Done Right

The SplitText component from React Bits works by splitting text into individual characters, words, or lines, then animating each unit independently.

Key principles:

- **Stagger, don't flood** — Small delays between characters feel elegant; simultaneous animations feel chaotic
- **Direction matters** — Fade up feels like revelation; fade down feels like arrival
- **Easing is everything** — `power3.out` gives a snappy start with a smooth landing

```tsx
<SplitText
  text="Hello"
  splitType="chars"
  delay={40}
  from={{ opacity: 0, y: 30 }}
  to={{ opacity: 1, y: 0 }}
  ease="power3.out"
/>
```

## Readability First

Animation should enhance reading, not interrupt it. Keep durations under 1.5 seconds and always respect `prefers-reduced-motion`.
