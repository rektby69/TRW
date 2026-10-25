"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="bg-ink-950 text-ivory-100">
        <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="font-serif text-4xl">Algo salió mal</h1>
          <p className="text-ivory-300">
            No pudimos cargar esta página. Inténtalo de nuevo.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-clay-500 px-6 py-3 font-medium text-ink-950 transition-colors hover:bg-clay-400"
          >
            Intentar de nuevo
          </button>
        </main>
      </body>
    </html>
  );
}
