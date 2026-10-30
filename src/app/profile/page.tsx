"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";
import {
  User,
  Mail,
  Phone,
  MapPin,
  HeartPulse,
  Shield,
  Save,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  LayoutDashboard,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, role, refreshProfile, signOut } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+34");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [country, setCountry] = useState("España");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [healthNotes, setHealthNotes] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setPhonePrefix(profile.phone_prefix || "+34");
      setPhoneNumber(profile.phone_number || profile.phone || "");
      setAddressLine1(profile.address_line1 || "");
      setAddressLine2(profile.address_line2 || "");
      setPostCode(profile.post_code || "");
      setCity(profile.city || "");
      setCounty(profile.county || "");
      setCountry(profile.country || "España");
      setEmergencyName(profile.emergency_contact_name || "");
      setEmergencyPhone(profile.emergency_contact_phone || "");
      setHealthNotes(profile.health_notes || "");
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    setFeedback(null);

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || user.email?.split("@")[0] || "";

    try {
      const updates = {
        first_name: firstName.trim() || null,
        last_name: lastName.trim() || null,
        full_name: fullName,
        phone_prefix: phonePrefix,
        phone_number: phoneNumber.trim() || null,
        phone: phoneNumber.trim() || null,
        address_line1: addressLine1.trim() || null,
        address_line2: addressLine2.trim() || null,
        post_code: postCode.trim() || null,
        city: city.trim() || null,
        county: county.trim() || null,
        country: country.trim() || "España",
        emergency_contact_name: emergencyName.trim() || null,
        emergency_contact_phone: emergencyPhone.trim() || null,
        health_notes: healthNotes.trim() || null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await (supabase.from("profiles") as any)
        .update(updates)
        .eq("id", user.id);

      if (error) throw error;

      await refreshProfile();
      setFeedback({ type: "success", message: "Perfil actualizado correctamente." });
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Error al guardar el perfil." });
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    if (profile?.full_name) {
      return profile.full_name.substring(0, 2).toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || "YC";
  };

  const dashboardHref = role === "admin" ? "/admin/dashboard" : "/client/dashboard";

  return (
    <ProtectedRoute redirectTo="/auth/login">
      <div className="min-h-screen bg-ivory-50 dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 font-sans antialiased">
        {/* Header Bar */}
        <header className="border-b border-sage-200/60 dark:border-white/5 bg-ivory-100/80 dark:bg-[#111a1c]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="font-display text-xl tracking-wide text-ink-900 dark:text-white hover:opacity-90"
              >
                Yoga Córdoba
              </Link>
              <span className="text-zinc-400 dark:text-zinc-600">/</span>
              <span className="text-xs uppercase tracking-wider text-sage-600 dark:text-sage-400 font-semibold">
                Mi Perfil
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={dashboardHref}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-sage-300 dark:border-white/10 hover:bg-sage-100 dark:hover:bg-white/5 text-xs text-ink-700 dark:text-zinc-300 transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Panel</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 py-10">
          {/* Back link */}
          <div className="mb-6">
            <Link
              href={dashboardHref}
              className="inline-flex items-center gap-1.5 text-xs text-ink-500 dark:text-zinc-400 hover:text-sage-600 dark:hover:text-sage-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Volver al panel
            </Link>
          </div>

          {/* Profile Header Card */}
          <div className="rounded-3xl border border-sage-200/60 dark:border-white/5 bg-ivory-100/90 dark:bg-[#141f21] p-6 sm:p-8 mb-8 backdrop-blur-md shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {/* Avatar with fallback placeholder */}
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name || "Avatar"}
                    className="w-20 h-20 rounded-full object-cover border-2 border-sage-500 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sage-500 to-sage-700 text-white flex items-center justify-center font-display text-2xl font-semibold shadow-sm">
                    {getInitials()}
                  </div>
                )}

                <div>
                  <h1 className="font-display text-2xl font-light text-ink-900 dark:text-white">
                    {profile?.full_name || user?.email?.split("@")[0]}
                  </h1>
                  <p className="text-xs text-ink-500 dark:text-zinc-400 mt-0.5">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-2.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-sage-500/15 text-sage-700 dark:text-sage-300 border border-sage-500/20">
                      <Shield className="w-3 h-3" />
                      Rol: {role || "user"}
                    </span>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {profile?.status || "active"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback message */}
          {feedback && (
            <div
              className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 text-xs ${
                feedback.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                  : "bg-clay-500/10 border-clay-500/20 text-clay-700 dark:text-clay-300"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-6">
            {/* Section 1: Datos Personales */}
            <div className="rounded-3xl border border-sage-200/60 dark:border-white/5 bg-ivory-100/60 dark:bg-[#141f21] p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-4 h-4 text-sage-600 dark:text-sage-400" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-900 dark:text-white">
                  Información Personal
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-ink-700 dark:text-zinc-300 mb-1.5">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Elena"
                    className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-white/10 bg-white dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-700 dark:text-zinc-300 mb-1.5">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="García Pérez"
                    className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-white/10 bg-white dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-700 dark:text-zinc-300 mb-1.5">
                    Correo Electrónico (No modificable)
                  </label>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-sage-200/60 dark:border-white/5 bg-sage-50/50 dark:bg-white/5 text-ink-500 dark:text-zinc-500 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-700 dark:text-zinc-300 mb-1.5">
                    Teléfono
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={phonePrefix}
                      onChange={(e) => setPhonePrefix(e.target.value)}
                      placeholder="+34"
                      className="w-20 px-3 py-2.5 rounded-xl border border-sage-200 dark:border-white/10 bg-white dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40 text-center"
                    />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="600 000 000"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-sage-200 dark:border-white/10 bg-white dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Dirección */}
            <div className="rounded-3xl border border-sage-200/60 dark:border-white/5 bg-ivory-100/60 dark:bg-[#141f21] p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-4 h-4 text-sage-600 dark:text-sage-400" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-900 dark:text-white">
                  Dirección
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-ink-700 dark:text-zinc-300 mb-1.5">
                    Dirección (Línea 1)
                  </label>
                  <input
                    type="text"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="Calle Cruz Conde, 12, 2ºA"
                    className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-white/10 bg-white dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-700 dark:text-zinc-300 mb-1.5">
                    Dirección (Línea 2 - opcional)
                  </label>
                  <input
                    type="text"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    placeholder="Edificio San Rafael"
                    className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-white/10 bg-white dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-ink-700 dark:text-zinc-300 mb-1.5">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      value={postCode}
                      onChange={(e) => setPostCode(e.target.value)}
                      placeholder="14001"
                      className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-white/10 bg-white dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-700 dark:text-zinc-300 mb-1.5">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Córdoba"
                      className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-white/10 bg-white dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-700 dark:text-zinc-300 mb-1.5">
                      Provincia
                    </label>
                    <input
                      type="text"
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      placeholder="Córdoba"
                      className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-white/10 bg-white dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-700 dark:text-zinc-300 mb-1.5">
                      País
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="España"
                      className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-white/10 bg-white dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Contacto de Emergencia & Salud */}
            <div className="rounded-3xl border border-sage-200/60 dark:border-white/5 bg-ivory-100/60 dark:bg-[#141f21] p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <HeartPulse className="w-4 h-4 text-sage-600 dark:text-sage-400" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-900 dark:text-white">
                  Contacto de Emergencia y Salud
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-ink-700 dark:text-zinc-300 mb-1.5">
                    Nombre de Contacto
                  </label>
                  <input
                    type="text"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    placeholder="Manuel García"
                    className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-white/10 bg-white dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-700 dark:text-zinc-300 mb-1.5">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="+34 611 222 333"
                    className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-white/10 bg-white dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-700 dark:text-zinc-300 mb-1.5">
                  Notas de Salud o Lesiones (Confidencial para profesores)
                </label>
                <textarea
                  rows={3}
                  value={healthNotes}
                  onChange={(e) => setHealthNotes(e.target.value)}
                  placeholder="Lesión en hombro izquierdo, hernia discal L4-L5, hipertensión..."
                  className="w-full px-4 py-2.5 rounded-xl border border-sage-200 dark:border-white/10 bg-white dark:bg-[#0d1416] text-ink-900 dark:text-ivory-100 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/40 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-sage-600 hover:bg-sage-700 text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  );
}
