"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { refreshProfile } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`.trim(),
            phone_number: phone,
            preferred_lang: "es",
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        await refreshProfile();
        router.push("/client/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error al registrar la cuenta");
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
            Crear Cuenta
          </h1>
          <p className="text-xs text-ink-600 dark:text-ivory-400 mt-1">
            Únete a nuestra comunidad de movimiento consciente
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-clay-500/10 border border-clay-500/30 text-clay-600 dark:text-clay-400 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-700 dark:text-ivory-300 mb-1.5">
                Nombre
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Elena"
                className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-ink-700 bg-white dark:bg-ink-950 text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 dark:text-ivory-300 mb-1.5">
                Apellidos
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="García"
                className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-ink-700 bg-white dark:bg-ink-950 text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-700 dark:text-ivory-300 mb-1.5">
              Teléfono
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+34 600 000 000"
              className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-ink-700 bg-white dark:bg-ink-950 text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
            />
          </div>

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
            <label className="block text-xs font-medium text-ink-700 dark:text-ivory-300 mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-ink-700 bg-white dark:bg-ink-950 text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-full bg-sage-600 hover:bg-sage-700 text-white font-medium text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registrando..." : "Crear mi cuenta"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-ink-600 dark:text-ivory-400">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/auth/login"
            className="text-sage-600 dark:text-sage-400 font-medium hover:underline"
          >
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
}

