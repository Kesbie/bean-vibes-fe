"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function RouteLoadingBar() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    // Listen for route changes
    const handleRouteChange = () => {
      handleStart();
      // Simulate a small delay to show the loading bar
      setTimeout(handleComplete, 300);
    };

    // Trigger on pathname or search params change
    handleRouteChange();
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-loading"></div>
      </div>
    </div>
  );
} 