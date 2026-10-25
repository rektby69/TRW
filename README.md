# Yoga Center Córdoba (TRW)

A modern, responsive web application for **Yoga Center Córdoba**, an artisanal wellness & yoga studio based in Córdoba, Spain. The application showcases studio offerings, instructor profiles, schedules, location details, and provides a multi-language (ES/EN) and dark/light experience. It is currently being extended with a full Supabase backend, client portal, on-premise payment workflows, and studio management dashboards.

---

## 🧘 Project Overview

- **Core Studio Web Presence**: High-fidelity landing experience highlighting classes (Yoga, Aerial Yoga, Meditation, Pilates, Therapeutic disciplines), class schedules, studio facilities, instructor bios, FAQs, and contact points.
- **Bilingual & Themed**: Native Spanish (`es`) and English (`en`) support with instantaneous theme switching (custom earthy color palette: `ink`, `sage`, `clay`, `ivory`).
- **Upcoming Architecture**: Role-based access control (`user`, `client`, `admin`), Supabase Auth + Postgres RLS, on-premise booking/payment tracking, and dedicated client/admin dashboards.

---

## 🛠️ Tech Stack

### Frontend & Core

- **Framework**: [React 18](https://react.dev/) (`react`, `react-dom`)
- **Build Tool / Bundler**: [Vite 7](https://vitejs.dev/) with [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with PostCSS & Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Services

- **Database & Auth**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`) — PostgreSQL with Row Level Security (RLS), Supabase Auth, and Storage.
- **UI Components (Planned - Phase 2)**: [shadcn/ui](https://ui.shadcn.com/) / Radix UI primitives (`@radix-ui/react-*`), [Sonner](https://sonner.emilkowal.ski/) toast notifications.
- **Monitoring & Error Tracking**: [Sentry React SDK](https://sentry.io/) (`@sentry/react`)

### Code Quality & Tooling

- **Linting**: [ESLint 9](https://eslint.org/) (flat config with `typescript-eslint` and React Hooks plugins)
- **Type Checking**: TypeScript compiler (`tsc --noEmit`)

---

## 📂 Project Structure

```text
TRW/
├── public/                 # Static assets & favicon
├── src/
│   ├── components/         # Reusable UI primitives (Header, Footer, Modals, Buttons)
│   ├── context/            # Global React contexts (PrefContext for Lang & Theme)
│   ├── data/               # Static studio content, translations, schedules, FAQ items
│   ├── hooks/              # Custom React hooks (e.g. usePreferences)
│   ├── sections/           # Landing page sections (Hero, Classes, Studio, Schedule, etc.)
│   ├── utils/              # Helper functions & utilities
│   ├── App.tsx             # Main application layout & section composition
│   ├── index.css           # Global Tailwind & typography styles
│   └── main.tsx            # React root, Sentry initialization
├── Implementation/         # Architecture & backend implementation specifications
│   └── IMPLEMENTATION_PLAN.md
├── SENTRY_GUIDE.md         # Sentry integration & error tracking documentation
├── GITHUB_ISSUES_GUIDE.md  # Tracking and issue management guide
├── tailwind.config.js      # Custom theme tokens (ink, sage, clay, ivory)
└── vite.config.ts          # Vite build configuration & path aliases (@/ -> src/)
```

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
   - `VITE_SENTRY_DSN`: _(Optional)_ Sentry project DSN for error reporting.
   - `VITE_SUPABASE_URL`: _(Upcoming)_ Your Supabase project URL.
   - `VITE_SUPABASE_ANON_KEY`: _(Upcoming)_ Your Supabase public anonymous key.

---

## 💻 Available Scripts

In the project root, you can run:

| Command             | Description                                                             |
| :------------------ | :---------------------------------------------------------------------- |
| `npm run dev`       | Starts Vite local development server with HMR.                          |
| `npm run build`     | Compiles TypeScript and creates optimized production bundle in `dist/`. |
| `npm run preview`   | Locally serves the production build.                                    |
| `npm run typecheck` | Validates TypeScript types without emitting files.                      |
| `npm run lint`      | Runs ESLint across the codebase.                                        |

---

## 🎨 Design System & Theming

The application uses an earth-inspired palette defined in [tailwind.config.js](file:///Users/edu/Dev/TRW/tailwind.config.js):

- **Ivory (`ivory`)**: Soft backgrounds and calm canvas tones.
- **Sage (`sage`)**: Calming herbal and organic green accents.
- **Clay (`clay`)**: Warm terracotta tones for action states and highlights.
- **Ink (`ink`)**: Deep contrast text and dark mode backgrounds.

Theme toggling and bilingual switching (`es`/`en`) are handled client-side via [PrefContext](file:///Users/edu/Dev/TRW/src/context/PrefContext.ts) and persisted in browser storage.

---

## 📖 Additional Documentation

- [Implementation/IMPLEMENTATION_PLAN.md](file:///Users/edu/Dev/TRW/Implementation/IMPLEMENTATION_PLAN.md): Detailed architectural plan for Supabase backend, RLS schemas, role promotions, and dashboards.
- [SENTRY_GUIDE.md](file:///Users/edu/Dev/TRW/SENTRY_GUIDE.md): Configuration and usage guide for Sentry monitoring.
- [GITHUB_ISSUES_GUIDE.md](file:///Users/edu/Dev/TRW/GITHUB_ISSUES_GUIDE.md): Task breakdowns and GitHub issue workflows.
