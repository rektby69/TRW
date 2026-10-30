"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute
      allowedRoles={["admin"]}
      redirectTo="/auth/login"
      forbiddenRedirectTo="/unauthorized"
    >
      {children}
    </ProtectedRoute>
  );
}

