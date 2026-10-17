# Shadik Rahman — 3D portfolio

A single-page, 3D brain-themed portfolio: a WebGL neuron network the camera flies through as you scroll, a pinned project deck, a tech-stack orbit, competitive programming stats and a leadership corridor.

Plain static HTML — no build step. Three.js, GSAP (ScrollTrigger) and Lenis load from CDNs.

```
public/
  index.html   the whole site (markup, styles, scripts)
  avatar.jpg   hero photo
  shots/       project screenshots
vercel.json    deploys public/ as a static site
```

Run locally by opening `public/index.html`, or serve the folder:

```bash
npx serve public
```

Live: https://portfolio-shadikrahman.vercel.app
