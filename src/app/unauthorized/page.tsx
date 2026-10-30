"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft, Home, UserCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function UnauthorizedPage() {
  const router = useRouter();
  const { role, user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-50 dark:bg-[#0d1416] px-4 py-12 font-sans text-ink-900 dark:text-ivory-100">
      <div className="w-full max-w-lg bg-ivory-100/90 dark:bg-[#141f21] border border-sage-200/60 dark:border-white/10 rounded-3xl p-8 sm:p-10 text-center shadow-lg backdrop-blur-md">
        {/* Warning Icon Badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8 text-red-500" />
        </div>

        {/* Status / Code */}
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20 mb-3">
          Error 403 · Acceso No Autorizado
        </span>

        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-white mb-2">
          Área Restringida
        </h1>

        <p className="text-xs sm:text-sm text-ink-600 dark:text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
          No tienes permisos administrativos suficientes para acceder a este panel.
          {user && (
            <span className="block mt-2 font-mono text-[11px] text-zinc-500">
              Conectado como: <strong className="text-zinc-300">{user.email}</strong> (Rol actual: <strong className="text-amber-400 capitalize">{role || "user"}</strong>)
            </span>
          )}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/client/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold transition-all shadow-sm"
          >
            <UserCheck className="w-4 h-4" />
            Ir a mi Área de Usuario
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-sage-300 dark:border-white/15 bg-white/40 dark:bg-white/5 hover:bg-sage-100 dark:hover:bg-white/10 text-xs font-medium text-ink-700 dark:text-zinc-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

