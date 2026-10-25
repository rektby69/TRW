# Yoga Córdoba (TRW)

A modern, responsive web application for **Yoga Córdoba**, an artisanal wellness & yoga studio based in Córdoba, Spain. The application showcases studio offerings, instructor profiles, schedules, location details, and provides a multi-language (ES/EN) and dark/light experience. It is currently being extended with a full Supabase backend, client portal, on-premise payment workflows, and studio management dashboards.

---

## 🧘 Project Overview

- **Core Studio Web Presence**: High-fidelity landing experience highlighting classes (Yoga, Aerial Yoga, Meditation, Pilates, Therapeutic disciplines), class schedules, studio facilities, instructor bios, FAQs, and contact points.
- **Bilingual & Themed**: Native Spanish (`es`) and English (`en`) support with instantaneous theme switching (custom earthy color palette: `ink`, `sage`, `clay`, `ivory`).
- **Upcoming Architecture**: Role-based access control (`user`, `client`, `admin`), Supabase Auth + Postgres RLS, on-premise booking/payment tracking, and dedicated client/admin dashboards.

---

## 🛠️ Tech Stack

### Frontend & Core

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React Server Components) with [`react`](https://react.dev/) & [`react-dom`](https://react.dev/) 19
- **Build Tool / Bundler**: Next.js built-in **Turbopack** (no separate Vite dependency)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with PostCSS & Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Services

- **Database & Auth**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`) — PostgreSQL with Row Level Security (RLS), Supabase Auth, and Storage. Access is wired through `src/lib/supabase.ts` and reads the project URL + anon key from `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **UI Components (Planned - Phase 2)**: [shadcn/ui](https://ui.shadcn.com/) / Radix UI primitives (`@radix-ui/react-*`), [Sonner](https://sonner.emilkowal.ski/) toast notifications.
- **Monitoring & Error Tracking**: [Sentry Next.js SDK](https://sentry.io) (`@sentry/nextjs`) — initialized via `next.config.ts` instrumentation and the `NEXT_PUBLIC_SENTRY_DSN` environment variable.

### Code Quality & Tooling

- **Linting**: [ESLint 9](https://eslint.org/) with `eslint-config-next`
- **Type Checking**: TypeScript compiler (`tsc --noEmit`) and Next.js' built-in type generation

---

## 📂 Project Structure

```text
TRW/
├── public/                 # Static assets & favicon (logo.svg)
├── src/
│   ├── app/                # Next.js App Router entry points
│   │   ├── globals.css     # Global Tailwind layers, typography, scrollbar
│   │   ├── layout.tsx      # Root layout: metadata, fonts, no-flash theme script
│   │   └── page.tsx        # Landing page composition (client component)
│   ├── components/         # Reusable UI primitives (Header, Footer, Modals, Buttons)
│   ├── context/            # Global React contexts (PrefContext for Lang & Theme)
│   ├── data/               # Static studio content, translations, schedules, FAQ items
│   ├── hooks/              # Custom React hooks (usePreferences, useReveal)
│   ├── lib/                # Supabase client factory (`src/lib/supabase.ts`)
│   ├── sections/           # Landing page sections (Hero, Classes, Studio, Schedule, etc.)
│   ├── utils/              # Helper functions & utilities (`cn`)
├── Implementation/         # Architecture & backend implementation specifications
│   └── IMPLEMENTATION_PLAN.md
├── SENTRY_GUIDE.md         # Sentry integration & error tracking documentation
├── GITHUB_ISSUES_GUIDE.md  # Tracking and issue management guide
├── next.config.ts          # Next.js configuration (images, strict mode)
├── next-env.d.ts           # Next.js TypeScript ambient declarations (auto-generated)
├── tailwind.config.ts      # Custom theme tokens (ink, sage, clay, ivory)
├── postcss.config.mjs      # PostCSS pipeline (Tailwind + Autoprefixer)
├── tsconfig.json           # TypeScript config with `@/*` path alias → `src/*`
└── package.json            # Scripts: dev, build, start, lint, typecheck
```

> **Note on `main.tsx` / `index.html`**: These Vite-era entry points have been removed. Next.js owns the document shell via `src/app/layout.tsx`; the no-flash theme + language script is injected there before hydration.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18+` (or active LTS)
- **Package Manager**: `npm` (v9+)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rektby69/TRW.git
   cd TRW
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Configure your environment variables in `.env`:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase public anonymous key.
   - `SUPABASE_SERVICE_ROLE_KEY`: Server-only key — never expose to the browser. Used by Edge Functions and route handlers.
   - `NEXT_PUBLIC_SENTRY_DSN`: _(Optional)_ Sentry client DSN for error reporting.
   - `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN`: _(Optional)_ Build-time values for source map uploads.

---

## 💻 Available Scripts

In the project root, you can run:

| Command             | Description                                                                                       |
| :------------------ | :------------------------------------------------------------------------------------------------ |
| `npm run dev`       | Starts the Next.js dev server (Turbopack) with fast refresh.                                      |
| `npm run build`     | Compiles TypeScript and creates an optimized production build via Next.js + Turbopack.            |
| `npm run start`     | Serves the production build locally (Next.js server).                                             |
| `npm run lint`      | Runs ESLint (`next lint`) across the codebase.                                                    |
| `npm run typecheck` | Validates TypeScript types without emitting files (`tsc --noEmit`).                               |

---

## 🎨 Design System & Theming

The application uses an earth-inspired palette defined in [tailwind.config.ts](./tailwind.config.ts):

- **Ivory (`ivory`)**: Soft backgrounds and calm canvas tones.
- **Sage (`sage`)**: Calming herbal and organic green accents.
- **Clay (`clay`)**: Warm terracotta tones for action states and highlights.
- **Ink (`ink`)**: Deep contrast text and dark mode backgrounds.

Theme toggling and bilingual switching (`es`/`en`) are handled client-side via [PrefContext](./src/context/PrefContext.ts) and the `usePreferences` hook, persisted in `localStorage`. A no-flash inline script in `src/app/layout.tsx` applies the stored theme and language to `<html>` before React hydrates, so there is no light/dark or language flicker on first paint.

---

## 📖 Additional Documentation

- [Implementation/IMPLEMENTATION_PLAN.md](./Implementation/IMPLEMENTATION_PLAN.md): Detailed architectural plan for Supabase backend, RLS schemas, role promotions, and dashboards.
- [SENTRY_GUIDE.md](./SENTRY_GUIDE.md): Configuration and usage guide for Sentry monitoring.
- [GITHUB_ISSUES_GUIDE.md](./GITHUB_ISSUES_GUIDE.md): Task breakdowns and GitHub issue workflows.
