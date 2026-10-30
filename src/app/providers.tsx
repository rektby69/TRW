"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { PrefContext } from "@/context/PrefContext";
import { usePreferences } from "@/hooks/usePreferences";

function PrefProvider({ children }: { children: React.ReactNode }) {
  const prefs = usePreferences();
  return <PrefContext.Provider value={prefs}>{children}</PrefContext.Provider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrefProvider>
      <AuthProvider>{children}</AuthProvider>
    </PrefProvider>
  );
}
