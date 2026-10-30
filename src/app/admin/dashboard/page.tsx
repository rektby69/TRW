"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Users,
  Calendar,
  Sparkles,
  TrendingUp,
  LogOut,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, profile, role, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-ivory-50 dark:bg-ink-950 font-sans text-ink-900 dark:text-ivory-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-sage-200/60 dark:border-ink-800 bg-ivory-100/80 dark:bg-ink-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-display text-xl font-light tracking-wide text-ink-900 dark:text-ivory-100"
            >
              Yoga Córdoba
            </Link>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-clay-500/15 text-clay-700 dark:text-clay-300 border border-clay-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Panel de Administración
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-ink-900 dark:text-ivory-100">
                {profile?.full_name || user?.email}
              </p>
              <p className="text-[10px] text-ink-500 dark:text-ivory-400 capitalize">
                Rol: {role}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sage-300 dark:border-ink-700 hover:bg-sage-50 dark:hover:bg-ink-800 text-xs text-ink-700 dark:text-ivory-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Shell */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-sage-600 to-sage-700 text-white shadow-sm mb-8">
          <h1 className="font-display text-2xl sm:text-3xl font-light">
            Hola, {profile?.first_name || "Admin"}
          </h1>
          <p className="text-sage-100 text-sm mt-1 max-w-xl">
            Este es el panel administrativo de prueba. Tu usuario ha sido verificado con éxito con el rol <strong className="underline underline-offset-2">admin</strong>.
          </p>
        </div>

        {/* Studio Health Metrics (Mockup Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl border border-sage-200/60 dark:border-ink-800 bg-ivory-100/60 dark:bg-ink-900/60 backdrop-blur-sm">
            <div className="flex items-center justify-between text-ink-500 dark:text-ivory-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Sesiones Hoy</span>
              <Calendar className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            </div>
            <div className="text-2xl font-display font-semibold">4</div>
            <p className="text-[11px] text-ink-500 dark:text-ivory-400 mt-1">2 mañana · 2 tarde</p>
          </div>

          <div className="p-5 rounded-2xl border border-sage-200/60 dark:border-ink-800 bg-ivory-100/60 dark:bg-ink-900/60 backdrop-blur-sm">
            <div className="flex items-center justify-between text-ink-500 dark:text-ivory-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Yogis Registrados</span>
              <Users className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            </div>
            <div className="text-2xl font-display font-semibold">28</div>
            <p className="text-[11px] text-ink-500 dark:text-ivory-400 mt-1">Capacidad al 82%</p>
          </div>

          <div className="p-5 rounded-2xl border border-sage-200/60 dark:border-ink-800 bg-ivory-100/60 dark:bg-ink-900/60 backdrop-blur-sm">
            <div className="flex items-center justify-between text-ink-500 dark:text-ivory-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Pagos en Sala</span>
              <Sparkles className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            </div>
            <div className="text-2xl font-display font-semibold">12 pendientes</div>
            <p className="text-[11px] text-clay-600 dark:text-clay-400 mt-1">A cobrar al entrar</p>
          </div>

          <div className="p-5 rounded-2xl border border-sage-200/60 dark:border-ink-800 bg-ivory-100/60 dark:bg-ink-900/60 backdrop-blur-sm">
            <div className="flex items-center justify-between text-ink-500 dark:text-ivory-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Ocupación Mensual</span>
              <TrendingUp className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            </div>
            <div className="text-2xl font-display font-semibold">89%</div>
            <p className="text-[11px] text-sage-600 dark:text-sage-400 mt-1">+6% vs mes anterior</p>
          </div>
        </div>

        {/* Quick Management Links */}
        <div className="border border-sage-200/60 dark:border-ink-800 rounded-3xl p-6 bg-ivory-100/40 dark:bg-ink-900/40">
          <h2 className="text-base font-semibold mb-4">Módulos Administrativos (Próximamente en Fase 4)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-sage-200/40 dark:border-ink-800 bg-white/50 dark:bg-ink-950/50 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold">Gestión de Sesiones</p>
                <p className="text-[11px] text-ink-500 dark:text-ivory-400">Crear clases y asignar salas</p>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-400" />
            </div>
            <div className="p-4 rounded-xl border border-sage-200/40 dark:border-ink-800 bg-white/50 dark:bg-ink-950/50 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold">Directorio de Alumnos</p>
                <p className="text-[11px] text-ink-500 dark:text-ivory-400">Roles, estados y asistencias</p>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-400" />
            </div>
            <div className="p-4 rounded-xl border border-sage-200/40 dark:border-ink-800 bg-white/50 dark:bg-ink-950/50 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold">Ajustes del Estudio</p>
                <p className="text-[11px] text-ink-500 dark:text-ivory-400">Ventana de 14 días y horarios</p>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-400" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

