import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App.tsx';
import './index.css';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN || 'https://614b3f716abfa91c7e13c4ff248b330f@o4512302143111168.ingest.de.sentry.io/4512307526893648';

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Tracing
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE,
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={({ error }) => (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-ivory-100 dark:bg-ink-950 text-ink-900 dark:text-ivory-100">
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-sm opacity-80 mb-4">{error instanceof Error ? error.message : 'An unexpected error occurred.'}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-clay-600 px-4 py-2 text-white hover:bg-clay-700 transition-colors"
        >
          Reload Page
        </button>
      </div>
    )}>
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>
);

