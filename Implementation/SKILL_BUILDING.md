# SKILL_BUILDING — Engineering Playbook (TRW / Yoga Córdoba)

> **What this is**: A living log of every phase completed on this project — architectural decisions, security lessons, and exact patterns used. Feed this file to an AI agent at the start of any new project and say:
>
> *"Read `SKILL_BUILDING.md`. Use its lifecycle, security invariants, and conventions as the baseline for this new project. Start with Step 1: create the tracking issue and the implementation plan before writing any code."*

---

## How this file works

- One section per phase, added as phases complete.
- Each section: what was built, key decisions, gotchas/fixes, reusable patterns.
- Keep it short. No theory — only things that were actually done and learned.

---

## Phase 1 — Foundation, Auth & Dashboards ✅

**Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Supabase JS v2, Lucide React, Sentry, Vercel Analytics.

### 1.1 Project Bootstrap Sequence (do this first, every time)

1. Create a GitHub Issue for the work before writing code.
2. Branch off `main` as `feat/issue-X-short-description`.
3. Write `IMPLEMENTATION_PLAN.md` with phased checklist before any implementation.
4. Create `.env.example` documenting every required env var (public vs secret).
5. Confirm `.gitignore` excludes `.env`, `.env.local`, `.next/`, build artifacts.

### 1.2 Database Architecture (Supabase / PostgreSQL)

**Migration files** under `supabase/migrations/YYYYMMDD_NNNNNN_name.sql`.

**Enums defined** (never use enums for dynamic domain values like class types — use a table instead):
```sql
user_role    → 'user' | 'client' | 'admin'
user_status  → 'active' | 'banned' | 'rejected'
booking_status, payment_status, session_status, recurrence_type
```

**Core tables**: `profiles`, `instructors`, `session_types`, `session_templates`, `session_instances`, `bookings`, `user_roles_history`, `user_login_history`, `audit_logs`.

**Profile auto-creation trigger** (required — runs on every new `auth.users` insert):
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, status, full_name)
  VALUES (NEW.id, 'user', 'active',
          COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

**Role promotion trigger**: `user` → `client` automatically on first confirmed booking.

**Admin promotion**: manual SQL only — `UPDATE public.profiles SET role = 'admin' WHERE id = '...';`

### 1.3 Row Level Security (RLS) — Critical Lessons

Enable RLS on every table. Users read/write their own rows via `auth.uid() = id`.

> [!CAUTION]
> **Infinite Recursion Trap**: An admin policy like `EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')` placed directly on the `profiles` table causes PostgreSQL to recurse infinitely. The policy queries the table it's protecting.
>
> **Fix — always use a `SECURITY DEFINER` helper**:
> ```sql
> CREATE OR REPLACE FUNCTION public.is_admin(p_user_id UUID DEFAULT auth.uid())
> RETURNS BOOLEAN AS $$
> BEGIN
>   RETURN EXISTS (SELECT 1 FROM public.profiles WHERE id = p_user_id AND role = 'admin');
> END;
> $$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
>
> -- Then use it in policies:
> CREATE POLICY "Users read own profile or admin reads all"
>   ON public.profiles FOR SELECT
>   USING (auth.uid() = id OR public.is_admin());
> ```
> This lives in a separate migration file (`000002_fix_rls_recursion.sql`).

### 1.4 TypeScript Integration

- Full schema types in `src/types/database.ts` — `Row`, `Insert`, `Update` per table plus `Views`, `Functions`, `Enums` sections (all required, even if empty — Supabase generic types break without them).
- Typed client in `src/lib/supabase.ts`: `createClient<Database>(url, key)`.

### 1.5 Auth Context (`src/context/AuthContext.tsx`)

Wraps the whole app via `src/app/providers.tsx` → `src/app/layout.tsx`.

Exposes: `user`, `session`, `profile`, `role`, `status`, `isAdmin`, `isClient`, `loading`, `signOut()`, `refreshProfile()`.

Listens to `supabase.auth.onAuthStateChange` — always syncs DB profile on every session event.

### 1.6 Route Protection

**`src/components/auth/ProtectedRoute.tsx`** — wraps any page/layout:
- No session → `router.replace('/auth/login')`
- Wrong role → `router.replace(forbiddenRedirectTo)` ← **must use `replace`, not `push`**

> [!WARNING]
> **`router.push` creates back-button loops on forbidden routes.** Always use `router.replace()` for security redirects so the forbidden URL is never in history.

**Admin layout** (`src/app/admin/layout.tsx`): only `admin` role, others → `/unauthorized`.  
**Client layout** (`src/app/client/layout.tsx`): only `user`/`client`, admins → `/admin/dashboard`.

### 1.7 Pages Built

| Route | Role | Description |
|---|---|---|
| `/auth/login` | public | Email/password login, role-based redirect post-login |
| `/auth/signup` | public | Email/password signup with name + phone metadata |
| `/admin/dashboard` | admin | KPIs (revenue, clients, sessions, pending), bookings, system logs |
| `/client/dashboard` | user/client | Profile snapshot, role badge, booking info |
| `/profile` | all authenticated | Universal: personal info, address, emergency/health, avatar upload |
| `/unauthorized` | public | 403 page with links to dashboard and home |

### 1.8 Shared Header Component (`src/components/Header.tsx`)

The `<Header />` is a single component used across all pages — homepage, dashboards, and profile. Mount it in each **layout file**, not each page, to avoid duplication.

- **Guest**: "Log in" button.
- **Authenticated**: Avatar pill (photo or initials fallback) → dropdown with:
  - Identity + role badge
  - Profile link (`/profile`)
  - Dashboard link — label and icon adapt to role:
    - `user` / `client` → `LayoutDashboard` + "Mi Panel" / "My Dashboard" → `/client/dashboard`
    - `admin` → `ShieldCheck` + "Panel Admin" / "Admin Panel" → `/admin/dashboard`
  - Sign Out
- **Fixed position** (`fixed inset-x-0 top-0 z-50`) — transparent over hero, solid with blur on scroll.
- Add `pt-[72px]` to the page wrapper in each layout to compensate for the fixed header height.
- **Dropdown must use solid background** (`bg-white dark:bg-ink-900`) not semi-transparent — glassmorphism becomes unreadable against varied page content.
- Language toggle shows the **opposite** label (`EN` when in ES, `ES` when in EN).

### 1.9 i18n & Theme — How It Works

Both are **zero-config for new users**:

| Preference | First visit | Manual override | Persisted |
|---|---|---|---|
| Language | `navigator.language` → `es` if Spanish, `en` otherwise | Globe/lang toggle button | `localStorage['lang']` |
| Theme | `prefers-color-scheme` media query | Sun/Moon toggle | `localStorage['theme']` |

A **no-flash inline script** in `src/app/layout.tsx` reads `localStorage` and applies the `dark` class + `lang` attribute to `<html>` before React hydrates — eliminates theme/language flash on page load.

All UI strings go in `src/data/content.ts` as `Record<Lang, ...>` objects. The `UI` export covers header/nav labels; all other sections (hero, schedule, etc.) have their own exports. Add new keys to both `es` and `en` simultaneously.

### 1.10 Avatar Upload (Supabase Storage)

**Bucket**: `avatars` — private (not public), 2 MB limit, image types only.

**File path convention**: `avatars/<user_id>/avatar.<ext>` — the user ID as the folder name enables RLS to be path-based.

**RLS on `storage.objects`** (use `storage.foldername(name))[1]` to extract the user folder):
- Users: upload/update/delete/read their own folder only
- Admins (`public.is_admin()`): read all folders

**Frontend flow**: pick file → validate (type + size) → show local preview immediately → `supabase.storage.from('avatars').upload(path, file, { upsert: true })` → `createSignedUrl(path, 10_years)` → save signed URL to `profiles.avatar_url` → `refreshProfile()` propagates to header.

> [!NOTE]
> Signed URLs expire. For production, prefer short-lived URLs regenerated on load, or switch to a public bucket with RLS enforced via policies rather than URL secrecy. For a studio app where privacy isn't critical, the 10-year signed URL is fine for now.

### 1.11 Quirks & Environment Notes

| Issue | Fix |
|---|---|
| Turbopack build fails (Sentry + instrumentation) | Always build with `npx next build --webpack` |
| `NEXT_PUBLIC_SUPABASE_URL` pointing to dead project | URL and anon key must be from the **same** Supabase project |
| TypeScript `Argument of type ... not assignable to 'never'` on Supabase update | Add `Views`, `Functions`, `Enums` sections to `Database` interface (can be empty, must exist) |
| `PrefContext` has no exported Provider component | Use `PrefContext.Provider` directly in `src/app/page.tsx`; never import `PrefProvider` |
| Smooth scroll jitter on Next.js route transitions | Add `data-scroll-behavior="smooth"` to `<html>` alongside `className="scroll-smooth"` |
| Dropdown unreadable over page content | Use solid `bg-white dark:bg-ink-900` — not semi-transparent — for dropdown menus |
| `router.push` on forbidden routes causes back-button loops | Always use `router.replace()` for security redirects |
| `<Header />` used in dashboard but layout has no padding | Add `pt-[72px]` wrapper div in the layout, not each page |

### 1.12 Decisions Made

- **On-premise payments only** — no Stripe. Payment statuses: `pending_on_premise`, `paid_on_premise`, `waived`, `refunded`.
- **Slug-based routes over modals** — modals only for confirmations.
- **Spanish UI copy default** with EN toggle; brand palette: `ivory`, `ink`, `sage`, `clay`.
- **Anon key is safe in browser** as long as RLS is enabled. Never use the service role key client-side.
- **Single `<Header />` component** shared across all pages — mounted in layout files, not individual pages.
- **`SECURITY DEFINER` helper `is_admin()`** — required whenever an admin RLS policy on `profiles` would self-reference the same table (causes infinite recursion).

---

## Phase 2 — Design System, Layouts & Toasts 🔲

> *To be logged when Phase 2 is complete.*

Planned: Sonner toasts (top-right), Radix UI primitives, shared layout components, design token audit.

---

## Phase 3 — Session Management & Scheduling 🔲

> *To be logged when Phase 3 is complete.*

Planned: Session types, templates, instances, instructor assignment, recurrence logic.

---

## Phase 4 — Booking Flow & Client Area 🔲

> *To be logged when Phase 4 is complete.*

Planned: Booking creation, waitlist, cancellations, client booking history.

---

## Phase 5 — Admin Operations & Reporting 🔲

> *To be logged when Phase 5 is complete.*

Planned: Payment tracking, occupancy reports, user management, audit log viewer.
