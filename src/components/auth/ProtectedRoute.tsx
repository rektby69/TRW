"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types/database";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
  forbiddenRedirectTo?: string;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/auth/login",
  forbiddenRedirectTo = "/unauthorized",
}: ProtectedRouteProps) {
  const { user, role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace(redirectTo);
      return;
    }

    if (allowedRoles && allowedRoles.length > 0 && role) {
      if (!allowedRoles.includes(role)) {
        router.replace(forbiddenRedirectTo);
      }
    }
  }, [user, role, isLoading, allowedRoles, redirectTo, forbiddenRedirectTo, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-50 dark:bg-ink-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-sage-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-ink-600 dark:text-ivory-400 font-sans">
            Cargando sesión...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (allowedRoles && allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
}

