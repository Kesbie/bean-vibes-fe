'use client';

import React from "react";
import { useHomeData } from "@/hooks/useHomeData";
import { useRouter } from "next/navigation";
import { Spin, Empty } from "antd";
import { categoryService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const NearbyAreasSection: React.FC = () => {
  const { nearbyAreas, isLoadingAreas, areasError } = useHomeData();
  const router = useRouter();

  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: () => categoryService.getCategories({ type: "region", limit: 4 }).then((res) => res.data.results),
  });

  const handleAreaClick = (place: any) => {
    // Navigate to search with district filter
    if (place.address?.district?.name) {
      router.push(`/search?district=${encodeURIComponent(place.address.district.name)}`);
    }
  };

  const getDistrictImage = (districtName: string) => {
    const images = [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center"
    ];
    
    // Simple hash to get consistent image for district
    const hash = districtName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return images[Math.abs(hash) % images.length];
  };

  if (isLoadingAreas) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Khu vực gần đây
            </h2>
          </div>
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        </div>
      </section>
    );
  }

  if (areasError) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Khu vực gần đây
            </h2>
          </div>
          <div className="flex justify-center">
            <Empty description="Không thể tải dữ liệu" />
          </div>
        </div>
      </section>
    );
  }

  // Group places by district
  const districtsMap = new Map();
  nearbyAreas.forEach(place => {
    const districtName = place.address?.district?.name;
    if (districtName) {
      if (!districtsMap.has(districtName)) {
        districtsMap.set(districtName, {
          name: districtName,
          placeCount: 0,
          image: getDistrictImage(districtName)
        });
      }
      districtsMap.get(districtName).placeCount++;
    }
  });

  const districts = Array.from(districtsMap.values()).slice(0, 4);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Khu vực nổi bật
          </h2>
        </div>

        {/* Area Cards */}
        {regions?.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {regions.map((region, index) => (
                <div
                  key={region.name}
                  className="group cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => router.push(`/search?region=${encodeURIComponent(region.slug)}`)}
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                        src={region.thumbnail}
                        alt={region.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {region.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {region.placeCount} quán cafe
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            {/* <div className="flex justify-center space-x-2">
              {regions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div> */}
          </>
        ) : (
          <div className="flex justify-center">
            <Empty description="Chưa có dữ liệu khu vực" />
          </div>
        )}
      </div>
    </section>
  );
};

export default NearbyAreasSection; 