# 女孩踢球

*Chinese Amateur Women’s Football Community Website*

[![Node.js](https://img.shields.io/badge/node-16.x%2F18.x-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-12-black.svg)](https://nextjs.org/)
[![styled-components](https://img.shields.io/badge/styled--components-5-DB7093.svg)](https://styled-components.com/)
[![i18n](https://img.shields.io/badge/i18n-zh%2Fen-blue.svg)](#language--copy)
[![License](https://img.shields.io/badge/license-demo%20only-lightgrey.svg)](#license)

Desktop UI with retro “windowed” design.
Mobile UI with simple tab-based layout.
Bilingual support (中文/English).

---

## ⚡ Tech Stack

* **Framework:** Next.js 12 (React 17)
* **Styling:** styled-components 5
* **Internationalization:** i18next + react-i18next
* **Language:** TypeScript
* **Metrics:** Web Vitals (CLS/FID/LCP/FCP/TTFB)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Local development
npm run dev
# → http://localhost:3000

# Build & start
npm run build
npm start

# Clean build & deps
npm run clean
```

---

## 📂 Project Structure (excerpt)

```
public/
  fonts/       # fusion-pixel.ttf, edundot.ttf
  icons/       # webp icons
  images/      # webp images
  music.m4a    # audio
  video-cover  # .webp / .gif

src/
  components/  # Layout, Windows, VideoPlayer, UI, ErrorBoundary
  mobile/      # layouts + pages (lazy-loaded)
  pages/       # _app.tsx, _document.tsx, index.tsx
  styles/      # GlobalStyles.tsx (CSS variables)
  hooks/       # gestures, preload
  utils/       # analytics, device check, responsive
```

---

## 🌍 Language & Copy

* Default language: `zh`
* Toggle at bottom-right corner (`zh` ⇆ `en`)
* Keys: `header.title`, `features.*`, `dock.*`, etc.
* Always add copy in **both** `en` & `zh`

---

## 💻 Desktop vs 📱 Mobile

* `≤768px` → Mobile layout (`MobileLayout` + lazy load)
* Desktop → Dock + multiple windows (`Desktop`, `BaseWindow`)

---

## 🎨 Styling

* Global CSS variables in `GlobalStyles.tsx`
* Components styled with **styled-components**
* Avoid fragile class-name selectors

---

## 📺 Media Player

* Retro-style player (audio + GIF/static image)
* Assets: `/music.m4a`, `/video-cover.webp`, `/video-cover.gif`

---

## 📈 Performance

* Preload fonts & images (webp only)
* Lazy load all desktop/mobile pages & windows
* Web Vitals collected in `utils/analytics.ts`

---

## 📦 Deployment

* **Vercel:** zero-config
* **Self-host:** `npm run build && npm start` (pm2/systemd recommended)
* Scripts:

  * `convert-to-webp.js`: batch convert images
  * `deploy.sh`: example deployment script

---

## 🤝 Contributing

When opening PRs/Issues, please include:

* Background & goals
* Scope of changes (pages, components, copy)
* Screenshots or GIFs (if UI-related)

---

## 📜 License

Demo & community site only.
Not for commercial use without permission.

---


