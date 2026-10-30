"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If the logged in user is an admin, redirect them directly to their admin dashboard
    if (!isLoading && role === "admin") {
      router.replace("/admin/dashboard");
    }
  }, [role, isLoading, router]);

  return (
    <ProtectedRoute allowedRoles={["user", "client"]} redirectTo="/auth/login">
      {children}
    </ProtectedRoute>
  );
}

