"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["user", "client", "admin"]} redirectTo="/auth/login">
      {children}
    </ProtectedRoute>
  );
}

