'use client';

import React from "react";
import { ClientLayout } from "@/components/shared";
import PlaceDetail from "@/components/place/PlaceDetail";

interface PlacePageProps {
  params: {
    id: string;
  };
}

export default function PlacePage({ params }: PlacePageProps) {
  return (
    <ClientLayout>
      <PlaceDetail placeId={params.id} />
    </ClientLayout>
  );
} 