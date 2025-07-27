'use client';

import React from "react";
import { ClientLayout } from "@/components/shared";
import HeroSection from "@/components/home/HeroSection";
import PurposeSection from "@/components/home/PurposeSection";
import NearbyAreasSection from "@/components/home/NearbyAreasSection";
import FeaturedLocationsSection from "@/components/home/FeaturedLocationsSection";
import CallToActionSection from "@/components/home/CallToActionSection";

export default function Home() {
  return (
    <ClientLayout>
      <HeroSection />
      <PurposeSection />
      <NearbyAreasSection />
      <FeaturedLocationsSection />
      <CallToActionSection />
    </ClientLayout>
  );
}
