# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start development server (Next.js 14 with Turbopack)
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm run sync` — Watch `.pen` design files and auto-sync to React components via Claude

## Architecture

**mikeroe.pl** is a freelance fullstack developer portfolio & "Productized Service" landing page, built with Next.js 14 (App Router) + Tailwind CSS v3.4 + TypeScript. Dark theme, scroll-telling narrative, designed to generate leads and maximize conversion.

### Routing & Layout

- `app/layout.tsx` — Root layout. Loads three font families via `next/font/google`:
  - Syne (`--font-syne` → `font-display`) — headings & display type
  - DM Sans (`--font-dm-sans` → `font-sans`) — body text
  - DM Mono (`--font-dm-mono` → `font-mono`) — labels, badges, code
  - Plus Jakarta Sans (`--font-jakarta` → `font-jakarta`) — hero headline
- `app/page.tsx` — Single-page site (One-Pager). Imports all section components in order.
- `app/globals.css` — Tailwind v3 setup with CSS custom properties for the design token system.
- `tailwind.config.ts` — Extends Tailwind with custom colors, fonts, and border-radius mapped to CSS variables.

### Components

Section components live in `components/sections/`. UI primitives live in `components/ui/`. The `@/*` path alias maps to `./src/*`.

**Render order:**
Navbar → HeroSection → ServicesSection → PortfolioSection → TechStackSection → PricingSection → ContactSection → FooterSection

**UI primitives:** `badge.tsx`, `button.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`, `pricing-modal.tsx` (built on Base UI / Headless — no Material UI or bloatware).

**Utilities:** `ScrollReveal.tsx` (Framer Motion wrapper), `ThemeProvider.tsx` (next-themes).

### Content Data (Flat-File CMS)

Instead of a heavy CMS, content is managed via JSON files in `content/`:

- `content/projects.json` — Portfolio project entries (name, role, stack, links, image)
- `content/services.json` — Service phases for the timeline (Discovery → Design → Development → SEO → Launch)
- `content/pricing.json` — Three pricing tiers (Starter / Biznes / Growth) with features, specs included/excluded, timeframes

Edit these JSON files to update content — zero latency, no database.

### Animation System

All scroll-triggered animations use **GSAP + ScrollTrigger** (not Framer Motion for sections). Pattern per section:

1. `useRef` for section container and animated elements
2. `useLayoutEffect` with `gsap.context()` for cleanup
3. `gsap.set()` for initial hidden states (opacity: 0, y offset, scaleX: 0 for dividers)
4. Single `gsap.timeline()` with `ScrollTrigger` on section container (`start: 'top 75%'`)
5. Staggered `.to()` calls with overlapping offsets (`'-=0.3'`)

**Framer Motion** is used only in: Navbar (AnimatePresence for mobile menu, useScroll for scroll detection), ScrollReveal utility, PricingModal (AnimatePresence).

### Forms & Backend

- Contact form: React Hook Form + Zod validation (client + server)
- Server Actions: `app/actions/contact.ts` handles form submission
- Email delivery: Resend API
- Spam protection: Honeypot field (`website` field, hidden via CSS)

### Design-to-Code Sync

The `pencil-design/` folder contains `.pen` design files edited via Pencil MCP tools. The `sync-design.js` watcher bridges design ↔ code:

- Watches `pencil-design/` for `.pen` file changes (polling, 1s interval)
- 5s debounce to detect saves (not every micro-change)
- 30s cooldown between syncs to prevent rapid-fire
- Spawns `claude -p` with a prompt that reads the `.pen` canvas and updates components to match
- One sync at a time; queues the next if one is already running

### Design Conventions

When syncing from `.pen` designs or creating new components:

- **Semantic HTML**: Use `<section>`, `<nav>`, `<footer role="contentinfo">`, `<form>` — not divs for everything. Rigorous heading hierarchy (H1 hero, H2 sections, H3 items) per SPEC.md.
- **Interactive elements**: Buttons/CTAs → `<a>` or `<button>` with `cursor-pointer`, hover states (`hover:translate-y-[-2px]`, `hover:-translate-y-1`), and `focus-visible:ring-2` for accessibility.
- **Smooth scroll**: All internal nav links use `e.preventDefault()` + `element.scrollIntoView({ behavior: 'smooth' })`.
- **Do not read `.pen` files directly** — they are encrypted. Always use Pencil MCP tools (`batch_get`, `snapshot_layout`, `get_screenshot`, etc.).

### Design Token System

All colors and spacings are defined as CSS custom properties and mapped through `tailwind.config.ts`:

| Token             | Value              | Tailwind Class               |
| ----------------- | ------------------ | ---------------------------- |
| `--bg`            | `#0a0a0f`          | `bg-bg`                      |
| `--surface`       | `#111118`          | `bg-surface`                 |
| `--surface2`      | `#18181f`          | `bg-surface2`                |
| `--border-custom` | `#2a2a38`          | `border-border`              |
| `--accent1`       | `#7c6bff` (purple) | `text-accent1`, `bg-accent1` |
| `--accent2`       | `#00d4aa` (teal)   | `text-accent2`, `bg-accent2` |
| `--accent3`       | `#ff6b6b` (red)    | `text-accent3`, `bg-accent3` |
| `--text-custom`   | `#e8e8f0`          | `text-text`                  |
| `--muted-custom`  | `#7070a0`          | `text-muted`                 |

Additional accent colors used in specific sections: `#ffd666` (yellow/warning), `#0099ff` (blue, Pricing), `#00e5ff` (cyan, TechStack), `#ff00ff` (magenta, TechStack), `#ffb703` (amber, TechStack headers).

### Static Assets

- `public/img/` — Project screenshots and hero image (`Hero.png`, `neon-burger.png`, `lexpro.png`, `ecoclean.png`)
- Images use Next.js `<Image>` component with `fill` + `sizes` prop for responsive optimization
- Hero image imported as static module: `import HeroImg from '../../img/Hero.png'`

### Section-Specific Notes

- **Navbar**: Four states — default transparent, scrolled glassmorphism (`bg-[#0a0a0f]/85 backdrop-blur-[16px]`), mobile closed, mobile open. Active section tracked via scroll position.
- **Hero**: Two-column layout (image left, text right on desktop). GSAP text-split animation for headline. Infinite ticker marquee at bottom.
- **Services**: Vertical timeline with color-gradient connector lines. Five phases with icons mapped via `iconsMap`.
- **Portfolio**: Wide 2-column grid (`max-w-[1800px]`). Laptop mockup frames with glossy screen reflection effect. Tech icons via `react-icons`.
- **TechStack**: Personality-driven taglines per technology (per SPEC.md — not a standard icon grid). Three categories: Frontend, Backend, Tooling.
- **Pricing**: Three tiers with "Tryb Pilny" toggle (+25% price, shorter timeframe). Modal for full spec details. Blue accent scheme (`#0099ff`).
- **Contact**: Two-column layout (form left, quick contact + socials right). Honeypot anti-spam. Availability card with timezone.
- **Footer**: Three-row layout (brand + nav, socials + availability pulse, legal + back-to-top). JSON-LD schema planned (see dev note).

### SEO Requirements

Per SPEC.md section 5:

- JSON-LD structured data: `Person` + `ProfessionalService` schemas (to be added in footer)
- `next/image` for all graphics (WebP/AVIF, prevent CLS)
- Metadata API for Open Graph tags
- Target: Core Web Vitals >95

## Must Follow Instructions

- After each run, track things in Git
- Never use Material UI or heavy component libraries — Headless UI / Base UI only
- All new sections must follow the established GSAP ScrollTrigger animation pattern
- Content changes go in JSON files (`content/`), not hardcoded in components
- Design decisions defer to SPEC.md as source of truth
- Each Pencil.dev prompt is scoped to one section only — no cross-section bleed
- Animation/interaction logic is documented as notes in design prompts, never implemented at design stage
