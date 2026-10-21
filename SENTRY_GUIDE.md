# Sentry Setup Guide (Error Reporting & Feedback Loops)

Quick, on-point guide for setting up and configuring **Sentry** for `rektby69/TRW`.

---

## 1. Account & Project Setup

1. **Sign Up / Log In**:
   - Go to [sentry.io/signup](https://sentry.io/signup/) (or log in if you already have an account).
   - Sign up with GitHub (recommended for smooth repo integration) or email.

2. **Create Organization**:
   - Organization Name: `trw` (or your preferred team slug).

3. **Create Project**:
   - Choose your platform (e.g., **JavaScript / TypeScript / React / Node.js**).
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
VITE_SENTRY_DSN="https://examplePublicKey@o0.ingest.sentry.io/0"
SENTRY_ORG="your-org-slug"
SENTRY_PROJECT="trw"
SENTRY_AUTH_TOKEN="your-auth-token-for-build-and-sourcemaps"
```

> [!NOTE]
> For frontend code bundled via Vite, use `VITE_SENTRY_DSN` (or `NEXT_PUBLIC_SENTRY_DSN` if using Next.js). Never expose `SENTRY_AUTH_TOKEN` in client bundles.

---

## 4. Quick SDK Integration Cheat Sheet

### Install SDK
```bash
npm install @sentry/react @sentry/browser
# Or for Node / Express:
# npm install @sentry/node @sentry/profiling-node
```

### Initialize (Entry point: `main.tsx` or `index.ts`)
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: true,
    }),
    Sentry.feedbackIntegration({
      colorScheme: "system",
      buttonLabel: "Report a Bug",
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Adjust in production (e.g. 0.1)
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

---

## 5. Verification Checklist

- [ ] Trigger a test error:
  ```typescript
  // Throw test exception
  throw new Error("Sentry verification test error");
  ```
- [ ] Check Sentry Dashboard under **Issues** to confirm event arrival.
- [ ] Test the **User Feedback** modal / widget submission.
- [ ] Ensure source maps upload cleanly during production builds.
