'use client';

import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onMount?: () => void;
}

export default function ClientOnly({ 
  children, 
  fallback = null, 
  onMount 
}: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    onMount?.();
  }, [onMount]);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
} 