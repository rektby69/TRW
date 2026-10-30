"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Calendar, UserCheck, Sparkles, MapPin } from "lucide-react";

export default function ClientDashboardPage() {
  const { user, profile, role } = useAuth();

  return (
    <div className="min-h-screen bg-ivory-50 dark:bg-ink-950 font-sans text-ink-900 dark:text-ivory-100">
      <main className="max-w-6xl w-full mx-auto px-6 py-8">

        {/* Welcome Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-ivory-100 dark:bg-ink-900 border border-sage-200/60 dark:border-ink-800 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-sage-600 dark:text-sage-400">
                Bienvenido/a a tu espacio
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-light text-ink-900 dark:text-ivory-100 mt-1">
                Hola, {profile?.first_name || "Yogi"}
              </h1>
              <p className="text-ink-600 dark:text-ivory-400 text-xs sm:text-sm mt-1 max-w-xl">
                Tu cuenta está activa con rol{" "}
                <span className="font-semibold text-sage-600 dark:text-sage-400">"{role}"</span>.
                {role === "user"
                  ? " Tras reservar tu primera clase pasarás automáticamente al rol 'client'."
                  : " Ya eres cliente confirmado de nuestro estudio."}
              </p>
            </div>
            <Link
              href="/#horarios"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sage-600 hover:bg-sage-700 text-white text-xs font-medium transition-all shadow-sm shrink-0"
            >
              <Calendar className="w-4 h-4" />
              Ver Horarios de Clases
            </Link>
          </div>
        </div>

        {/* Profile summary + payment info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl border border-sage-200/60 dark:border-ink-800 bg-white/60 dark:bg-ink-900/60 backdrop-blur-sm">
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sage-600" />
              Detalles de tu Perfil
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-sage-100 dark:border-ink-800">
                <span className="text-ink-500 dark:text-ivory-400">Nombre completo</span>
                <span className="font-medium">{profile?.full_name || "—"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sage-100 dark:border-ink-800">
                <span className="text-ink-500 dark:text-ivory-400">Correo</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sage-100 dark:border-ink-800">
                <span className="text-ink-500 dark:text-ivory-400">Teléfono</span>
                <span className="font-medium">{profile?.phone_number || profile?.phone || "—"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sage-100 dark:border-ink-800">
                <span className="text-ink-500 dark:text-ivory-400">Rol</span>
                <span className="px-2 py-0.5 rounded-full bg-sage-500/10 text-sage-600 dark:text-sage-400 font-semibold capitalize text-[11px] flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  {role}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-ink-500 dark:text-ivory-400">Estado de cuenta</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold capitalize text-[11px]">
                  {profile?.status || "active"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-sage-200/60 dark:border-ink-800 bg-white/60 dark:bg-ink-900/60 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sage-600" />
                Pago en Sala (On-Premise)
              </h2>
              <p className="text-xs text-ink-600 dark:text-ivory-400 leading-relaxed">
                Todas las reservas en Yoga Córdoba se realizan online y el abono se formaliza en recepción antes de comenzar la sesión (en efectivo o tarjeta).
              </p>
            </div>
            <div className="pt-4 border-t border-sage-100 dark:border-ink-800 flex justify-between items-center text-xs">
              <span className="text-ink-500 dark:text-ivory-400">Reservas activas:</span>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
