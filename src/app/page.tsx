"use client";

import React from "react";
import { ClientLayout } from "@/components/shared";
import HeroSection from "@/components/home/HeroSection";
import PurposeSection from "@/components/home/PurposeSection";
// import CategoryFilter from "@/components/home/CategoryFilter";
// import SearchResults from "@/components/home/SearchResults";
// import StatsSection from "@/components/home/StatsSection";
import NearbyAreasSection from "@/components/home/NearbyAreasSection";
import FeaturedLocationsSection from "@/components/home/FeaturedLocationsSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import QueryProvider from "@/components/providers/QueryProvider";

export default function Home() {
  return (
    // <QueryProvider>
    <ClientLayout>
      <HeroSection />
      <PurposeSection />
      {/* <CategoryFilter /> */}
      {/* <SearchResults /> */}
      {/* <StatsSection /> */}
      <NearbyAreasSection />
      <FeaturedLocationsSection />
      <CallToActionSection />
    </ClientLayout>
    // </QueryProvider>
  );
}
