# Max Adolfsson — Portfolio Context
> This file is intended as a project context document for Claude Code or any AI-assisted frontend build.

---

## Identity

- **Name:** Max Adolfsson
- **Role:** Frontend Developer & UI Designer
- **One-liner:** Frontend developer with a fullstack foundation and interests in the overlap between engineering and design.
- **Target audience:** Agencies and design studios
- **Language:** English
- **Tone:** Creative, bold, editorial — not corporate, not minimal-for-minimal's-sake

---

## About

Max studied computer science (with a master's degree) and has hands-on experience across fullstack development, AI/LLM engineering, and frontend/UI work. He is most excited by making interactions feel like they should, and appear with a clear message. He's looking for frontend and UI roles at agencies or design studios where craft is valued.

---

## Projects

### 1. LLM Chatbot (Master's Thesis)
- **Headline:** Giving a database a voice.
- **Description:** An LLM-powered chatbot built for the master's thesis, capable of making live calls against to a structured database. Translates plain-language questions into real-time queries. The project explored interface design for AI systems that aren't always predictable.
- **Tags:** AI / LLM, Tool calling, UX for AI, Research
- **Visual suggestion:** Schematic flow diagram (user → chatbot → tool calls → database), or UI screenshot if available
- **Tone:** Technical, ambitious, research-oriented

### 2. And The Revolution (WordPress)
- **Headline:** Patchwork for the coolest bike shop in Stockholm.
- **Description:** And The Revolution is a modular bicycle concept store in central Stockholm — customers configure their own bike component by component. Their WordPress site had accumulated interaction bugs and design inconsistencies that undermined the brand. Max resolved core technical issues and contributed to a design lift that aligned the site with the shop's bold identity.
- **Tags:** WordPress, UI/UX, Bug fixing, Brand consistency
- **Visual suggestion:** Before/after split screenshot, or brand imagery with overlay
- **Tone:** Grounded, confident, slightly playful

### 3. Stronglift Tracker (Personal Project)
- **Headline:** Track workouts and stay focused
- **Description:** A personal web app built around the Stronglift 5×5 training programme. Lets Max log sessions, track progression over time, and access assistive features. No over-engineering — just a tool that solves a real personal need.
- **Tags:** Personal project, Frontend, Data & tracking, Self-initiated
- **Visual suggestion:** Dashboard/tracker UI screenshot
- **Tone:** Personal, honest, a little self-aware

---

## Skills

### Frontend & UI
- React / Next.js
- CSS / Tailwind
- Figma / InDesign
- WordPress

### Fullstack
- Node.js
- REST APIs
- Databases
- Git

### AI & Emerging
- LLM integration
- Tool calling / function calling
- Prompt design
- Agentic UX

---

## Design System

### Color Palette
```
--color-bg:        #0E0E0E   /* Primary background */
--color-surface:   #1A1A1A   /* Card / section backgrounds */
--color-text:      #F5F0E8   /* Primary text, off-white */
--color-accent:    #FF4D00   /* Burnt orange — bold, energetic */
--color-muted:     #888888   /* Secondary text, labels */
```

### Typography
- **Display / Headlines:** Neue Haas Grotesk Display, or ABC Whyte — strong, modern, characterful
- **Body:** Söhne or Inter — readable, neutral
- **Accent / Pull quotes:** Freight Text Italic or similar serif italic — for contrast and editorial feel
- **Scale suggestions:**
  - Hero headline: 64–96pt
  - Section headline: 40–52pt
  - Project headline: 28–36pt
  - Body: 16–18px (web) / 9–10pt (print)
  - Labels/tags: 11–12px uppercase tracked

### Grid
- 12-column grid
- Margins: 10mm (print) / 80px max-width centered (web)
- Gutter: 4mm / 24px
- Baseline grid: 14pt / 8px (web)

### Motion & Interaction (web)
- Subtle fade-in on scroll (no aggressive animations)
- Hover states on project cards: slight lift (`translateY(-4px)`) + accent border reveal
- Cursor: consider custom cursor dot in accent color
- Background detail: low-opacity animated grid or noise texture on hero

---

## Page Structure / Sections

1. **Hero** — Name, tagline, subtext, optional abstract visual element
2. **About** — Two-column editorial layout, personal voice
3. **Projects** — 3 project cards/spreads (LLM chatbot, And The Revolution, Stronglift)
4. **Skills** — Three-column table, minimal borders
5. **Contact / CTA** — Full-width dark section, large type, email + LinkedIn + GitHub

---

## Copy Snippets

### Hero
> **Built with logic. Designed with intent.**
> I'm Max — a frontend developer with a fullstack foundation and a genuine obsession with the overlap between engineering and design. I build things that work beautifully.

### About headline
> Engineer by training. Designer by choice.

### Contact headline
> Let's build something worth using.

### Contact subtext
> I'm currently open to frontend and UI roles at agencies and design studios. If you work somewhere where craft matters — let's talk.

---

## Notes for Development

- Framework suggestion: **Next.js** (App Router) with **Tailwind CSS**
- Consider **Framer Motion** for scroll animations
- Fonts: self-host via **Fontsource** or use **Adobe Fonts** (licensed)
- No heavy libraries — keep bundle lean
- Accessibility: ensure contrast ratios pass WCAG AA, focus states visible
- Mobile: design desktop-first given agency audience, but fully responsive
