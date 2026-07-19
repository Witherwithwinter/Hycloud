---
title: "Understanding GSAP Animations in React"
date: "2026-07-18"
category: "Animation"
excerpt: "Deep dive into how we use GreenSock Animation Platform for smooth scroll effects."
---

# Understanding GSAP Animations in React

GSAP (GreenSock Animation Platform) is one of the most powerful animation libraries available. Here's how we leverage it in Hylight.

## SplitText Component

The SplitText component breaks text into individual characters or words, enabling per-character animations:

```tsx
<SplitText
  text="Hylight"
  className="text-5xl font-bold"
  tag="h1"
  splitType="chars"
  delay={40}
  duration={1}
  ease="power3.out"
/>
```

## Scroll-triggered Animations

We use GSAP's ScrollTrigger plugin to animate elements when they enter the viewport:

```tsx
useGSAP(() => {
  gsap.fromTo(
    ".fade-in",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: ".fade-in",
        start: "top 80%",
      },
    }
  );
}, []);
```

## Performance Tips

1. **Use `will-change`**: Helps browser optimize rendering
2. **Force 3D transforms**: Use `force3D: true` for smoother animations
3. **Limit DOM queries**: Cache selectors instead of querying repeatedly

## ScrambledText Effect

The mouse-following scramble effect adds personality to text elements:

```tsx
<ScrambledText radius={120} duration={1} speed={0.5}>
  Hover over me!
</ScrambledText>
```

This creates a Matrix-style character scrambling effect that triggers when the cursor enters the configured radius.
