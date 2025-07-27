"use client";

import { ReactNode, Suspense } from "react";
import AntdProvider from "./AntdProvider";
import QueryProvider from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "./AuthProvider";

interface ProvidersProps {
  children: ReactNode;
}

function AuthGate({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <AntdProvider>
        <AuthProvider>
          <AuthGate>{children}</AuthGate>
        </AuthProvider>
      </AntdProvider>
    </QueryProvider>
  );
}
