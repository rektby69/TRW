"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { role, refreshProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        await refreshProfile();
        // Check profile role or direct accordingly
        const { data: profileData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        const userRole = (profileData as { role?: string } | null)?.role;
        if (userRole === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/client/dashboard");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error al iniciar sesión");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-50 dark:bg-ink-950 px-4 py-12">
      <div className="w-full max-w-md bg-ivory-100/90 dark:bg-ink-900/90 border border-sage-200/60 dark:border-ink-800 rounded-3xl p-8 shadow-sm backdrop-blur-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="font-display text-2xl font-light tracking-wide text-ink-900 dark:text-ivory-100"
          >
            Yoga Córdoba
          </Link>
          <h1 className="text-xl font-semibold text-ink-900 dark:text-ivory-100 mt-4">
            Iniciar Sesión
          </h1>
          <p className="text-xs text-ink-600 dark:text-ivory-400 mt-1">
            Accede a tu portal de reservas y gestión
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-clay-500/10 border border-clay-500/30 text-clay-600 dark:text-clay-400 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-ink-700 dark:text-ivory-300 mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-ink-700 bg-white dark:bg-ink-950 text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-medium text-ink-700 dark:text-ivory-300">
                Contraseña
              </label>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-ink-700 bg-white dark:bg-ink-950 text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-full bg-sage-600 hover:bg-sage-700 text-white font-medium text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Iniciando..." : "Entrar a mi cuenta"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-ink-600 dark:text-ivory-400">
          ¿Aún no tienes cuenta?{" "}
          <Link
            href="/auth/signup"
            className="text-sage-600 dark:text-sage-400 font-medium hover:underline"
          >
            Crear cuenta nueva
          </Link>
        </div>
      </div>
    </div>
  );
}
