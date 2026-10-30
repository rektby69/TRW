"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/Header";

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
      <Header variant="app" />
      <div className="pt-[68px]">{children}</div>
    </ProtectedRoute>
  );
}

