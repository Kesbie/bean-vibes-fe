'use client';

import React from "react";
import { ClientLayout } from "@/components/shared";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import QueryProvider from "@/components/providers/QueryProvider";

export default function SearchPage() {
  return (
    <QueryProvider>
      <ClientLayout className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-1">
              <SearchFilters />
            </div>
            
            {/* Right Main Content - Search Results */}
            <div className="lg:col-span-3">
              <SearchResults />
            </div>
          </div>
        </div>
      </ClientLayout>
    </QueryProvider>
  );
} 