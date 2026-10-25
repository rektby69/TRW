# Sentry Setup Guide (Error Reporting & Feedback Loops)

Quick, on-point guide for setting up and configuring **Sentry** for `rektby69/TRW` on **Next.js 16 (App Router)**.

> The project is now a Next.js app — Vite-era references (`VITE_SENTRY_DSN`, `import.meta.env`, `main.tsx`) have been replaced by the Next.js conventions below.

---

## 1. Account & Project Setup

1. **Sign Up / Log In**:
   - Go to [sentry.io/signup](https://sentry.io/signup/) (or log in if you already have an account).
   - Sign up with GitHub (recommended for smooth repo integration) or email.

2. **Create Organization**:
   - Organization Name: `trw` (or your preferred team slug).

3. **Create Project**:
   - Choose your platform: **Next.js**.
   - Set alert frequency: *Alert me on every new issue* (customizable later).
   - Project Name: `trw` (or `trw-web` / `trw-api`).

---

## 2. Obtain Credentials & Keys

From the Sentry project dashboard:

1. **Client Key (DSN)**:
   - Navigate to: **Project Settings** > **Client Keys (DSN)**.
   - Copy the DSN URL (format: `https://<public_key>@<host>/<project_id>`).

2. **Auth Token** (for source maps, releases, CI/CD):
   - Navigate to: **User Settings** > **API** > **User Auth Tokens** (or **Org Settings** > **Developer Settings** > **Internal Integrations**).
   - Permissions needed: `project:read`, `event:read`, `org:read`, `project:releases`.

---

## 3. Environment Variables Configuration

Add the following to your local `.env` and `.env.example`:

```env
# Sentry Configuration

# Client DSN — safe to expose; prefixed with NEXT_PUBLIC_ so it reaches the browser.
NEXT_PUBLIC_SENTRY_DSN="https://examplePublicKey@o0.ingest.sentry.io/0"

# Build-time only — used by `@sentry/nextjs` / `sentry-cli` for source maps.
# NEVER prefix these with NEXT_PUBLIC_ and never commit real values.
SENTRY_ORG="your-org-slug"
SENTRY_PROJECT="trw"
SENTRY_AUTH_TOKEN="your-auth-token-for-build-and-sourcemaps"
```

> [!NOTE]
> `NEXT_PUBLIC_SENTRY_DSN` is the only Sentry value exposed to the browser bundle. `SENTRY_AUTH_TOKEN` is a server/build-time secret — never prefix it with `NEXT_PUBLIC_`.

---

## 4. Quick SDK Integration Cheat Sheet

### Install SDK
```bash
npm install @sentry/nextjs
```

### Initialize (Next.js App Router)

With `@sentry/nextjs`, initialization is split between a server-side instrumentation file and a client config. The Next.js wizard (`npx @sentry/wizard@latest -i nextjs`) scaffolds these for you; the minimal hand-written version is shown below.

#### `instrumentation.ts` (project root)
```typescript
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
```

#### `sentry.client.config.ts` (project root)
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: true,
    }),
  ],
  tracesSampleRate: 1.0, // Adjust in production (e.g. 0.1)
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

#### `sentry.server.config.ts` & `sentry.edge.config.ts` (project root)
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

#### `next.config.ts`
Wrap the default export with `withSentryConfig` once the SDK is installed:
```typescript
import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = { reactStrictMode: true };

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
});
```

### Route-level error boundaries (App Router)
Add `src/app/<segment>/error.tsx` files to capture render errors per route segment:
```tsx
"use client";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error); }, [error]);
  return (
    <div>
      <h2>Something went wrong.</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

---

## 5. Verification Checklist

- [ ] Trigger a test error:
  ```typescript
  // Inside a client component handler
  throw new Error("Sentry verification test error");
  ```
- [ ] Check Sentry Dashboard under **Issues** to confirm event arrival.
- [ ] Test the **User Feedback** widget submission (if `feedbackIntegration` is enabled).
- [ ] Ensure source maps upload cleanly during production builds (`npm run build`).
