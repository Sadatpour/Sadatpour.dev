# {M} Mojtaba Sadatpour — Personal Portfolio

> A modern, animated, multilingual personal portfolio built with Next.js 15, GSAP, Three.js, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![GSAP](https://img.shields.io/badge/GSAP-3.12-green?style=flat-square)
![Three.js](https://img.shields.io/badge/Three.js-0.170-white?style=flat-square&logo=three.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwindcss)

---

## ✨ Features

- 🌐 **6 Languages** — Persian (FA), English (EN), German (DE), Turkish (TR), Arabic (AR), Chinese (ZH)
- 🌙 **Dark / Light Mode** — with smooth transition and localStorage persistence
- 🎨 **GSAP Animations** — ScrollTrigger, TextPlugin, parallax, stagger, timeline
- 🌌 **Three.js Background** — interactive particle field with mouse parallax
- 📱 **Fully Responsive** — mobile-first design
- ⚡ **Smooth Scroll** — powered by Lenis
- 🖱️ **Custom Cursor** — animated dot + ring with hover effects
- 📄 **Project Detail Pages** — live iframe preview with animated fallback
- 🔤 **RTL Support** — full right-to-left for Persian and Arabic
- 🧩 **Floating Navbar** — glassmorphism style inspired by Midel design

---

## 🛠️ Tech Stack

| Category       | Technology                        |
|----------------|-----------------------------------|
| Framework      | Next.js 15 (App Router)           |
| Language       | TypeScript 5                      |
| Styling        | Tailwind CSS v4                   |
| Animation      | GSAP 3 + ScrollTrigger            |
| 3D / WebGL     | Three.js 0.170                    |
| Smooth Scroll  | Lenis                             |
| i18n           | next-intl 3                       |
| Fonts          | Vazirmatn (FA/AR) + Geist (Latin) |

---

## 📁 Project Structure

```
Sadatpour.dev/
│
├── public/
│   └── logo.png                          # Site logo
│
├── messages/
│   ├── fa.json                           # Persian translations
│   ├── en.json                           # English translations
│   ├── de.json                           # German translations
│   ├── tr.json                           # Turkish translations
│   ├── ar.json                           # Arabic translations
│   └── zh.json                           # Chinese translations
│
├── src/
│   ├── middleware.ts                     # next-intl locale routing
│   ├── i18n/
│   │   ├── routing.ts                   # Locale config
│   │   └── request.ts                   # Server-side i18n config
│   │
│   ├── lib/
│   │   └── projects.ts                  # All 20 projects data
│   │
│   ├── app/
│   │   ├── globals.css                  # CSS variables, themes, base styles
│   │   └── [locale]/
│   │       ├── layout.tsx               # Root layout with theme init
│   │       ├── page.tsx                 # Main single-page app
│   │       └── projects/
│   │           └── [slug]/
│   │               └── page.tsx         # Individual project page
│   │
│   └── components/
│       ├── ui/
│       │   ├── Navbar.tsx               # Floating glassmorphism navbar
│       │   └── CustomCursor.tsx         # Animated custom cursor
│       ├── three/
│       │   └── BackgroundCanvas.tsx     # Three.js particle background
│       └── sections/
│           ├── HeroSection.tsx          # Hero with typing animation
│           ├── AboutSection.tsx         # About with stats
│           ├── SkillsSection.tsx        # Skills with progress bars
│           ├── ProjectsSection.tsx      # Filterable project grid
│           ├── ExperienceSection.tsx    # Timeline experience
│           └── ContactSection.tsx       # Contact form
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ — [nodejs.org](https://nodejs.org)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Sadatpour/My-Website.git
cd My-Website

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Open [http://localhost:3000/fa](http://localhost:3000/fa) in your browser.

---

## 🌐 Available Routes

| URL | Description |
|-----|-------------|
| `/fa` | Persian (default) |
| `/en` | English |
| `/de` | German |
| `/tr` | Turkish |
| `/ar` | Arabic |
| `/zh` | Chinese |
| `/fa/projects/[slug]` | Individual project page |
| `/en/projects/[slug]` | Individual project page (EN) |

---

## 🎨 Color Palette

| Token | Dark Mode | Light Mode |
|-------|-----------|------------|
| Background | `#212121` | `#f5f5f5` |
| Surface | `#2c2c2c` | `#ffffff` |
| Card | `#444444` | `#e8e8e8` |
| Text Primary | `#f0f0f0` | `#1a1a1a` |
| Text Secondary | `#aaaaaa` | `#555555` |
| Accent | `#e8e8e8` | `#212121` |

---

## 📦 Projects Included

| Project | Category | Role |
|---------|----------|------|
| Nerkhito Platform | WordPress | WordPress Developer |
| Otaghak Blog | WordPress | Technical Support |
| Dalili Group | WordPress | Design & Technical Support |
| Ibamo Store | WordPress | Design & Technical Support |
| Sorme Beauty Directory | WordPress | Design |
| MSI Farsi | WordPress | Design & Technical Support |
| MSI Club | Laravel | Technical Support |
| Mirrogene | WordPress | Design & Technical Support |
| Mirrogene Panel | Laravel | Design & Technical Support |
| Unique Cut | Design | Design |
| Cyra Beauty | Design | Design |
| Chameleon BC | Design | Design |
| Simply Travel & Tour | Design | Design |
| Unex Safety | Design | Design |
| Rangineh Decoration | Design | Design |
| Hub Game Store | WordPress | Design & Technical Support |
| Pejvak Co | Design | Design |
| Parchat | React | Design |
| Owj Digital | Design | Design |
| Sadatpour Portfolio | React | Design & Technical Support |

---

## 📝 Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## 🔧 Environment

No `.env` file required for basic setup. The project works out of the box after installing dependencies.

---

## 📄 License

This project is personal portfolio work by **Mojtaba Sadatpour**.  
All rights reserved © 2024 Mojtaba Sadatpour.

---

## 📬 Contact

- 🌐 Website: [sadatpour.ir](https://sadatpour.ir)
- 💼 LinkedIn: [linkedin.com/in/sadatpour](https://linkedin.com/in/sadatpour)
- 🐙 GitHub: [github.com/Sadatpour](https://github.com/Sadatpour)
- 📧 Email: hi@sadatpour.ir