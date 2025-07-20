"use client";

import { ReactNode } from "react";
import AntdProvider from "./AntdProvider";
import QueryProvider from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <AntdProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </AntdProvider>
    </QueryProvider>
  );
}
