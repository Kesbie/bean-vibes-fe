"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Spin,
  Empty
} from "antd";
import { placeService } from "@/services";
import ClientLayout from "@/components/shared/ClientLayout";
import QueryProvider from "@/components/providers/QueryProvider";
import PlaceDetail from "@/components/place/PlaceDetail";
import { PlaceRating, PlaceReview } from "@/components/place";
import PlaceContent from "@/components/place/PlaceContent";
import React from "react";
import PlaceMenu from "@/components/place/PlaceMenu";

export default function PlaceDetailPage() {
  const params = useParams();
  const placeSlug = params.slug as string;

  const {
    data: place,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["place", placeSlug],
    queryFn: () =>
      placeService.getPublicPlaceBySlug(placeSlug).then((res) => res.data),
    enabled: !!placeSlug,
  });

  React.useEffect(() => {
    function fetchPlace() {
      refetch();
    }

    window.addEventListener("refetch-place", fetchPlace);

    return () => {
      window.removeEventListener("refetch-place", fetchPlace);
    };
  }, []);

  if (isLoading) {
    return (
      <QueryProvider>
        <ClientLayout>
          <div className="flex justify-center items-center min-h-screen">
            <Spin size="large" />
          </div>
        </ClientLayout>
      </QueryProvider>
    );
  }

  if (error || !place) {
    return (
      <QueryProvider>
        <ClientLayout>
          <div className="flex justify-center items-center min-h-screen">
            <Empty description="Không tìm thấy địa điểm" />
          </div>
        </ClientLayout>
      </QueryProvider>
    );
  }

  return (
    <QueryProvider>
      <ClientLayout>
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-4">
          <PlaceContent place={place} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PlaceRating place={place} />
            <PlaceDetail place={place} />
            <PlaceMenu place={place} />
          </div>
          <PlaceReview place={place} />
        </div>
      </ClientLayout>
    </QueryProvider>
  );
}
