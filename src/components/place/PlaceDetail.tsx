'use client';

import React from "react";
import ImageGallery from "./ImageGallery";
import PlaceInfo from "./PlaceInfo";
import RatingSection from "./RatingSection";
import ReviewSection from "./ReviewSection";
import SuggestedPlaces from "./SuggestedPlaces";
import LocationMap from "./LocationMap";

interface PlaceDetailProps {
  placeId: string;
}

const PlaceDetail: React.FC<PlaceDetailProps> = ({ placeId }) => {
  // Mock data for the place
  const placeData = {
    id: placeId,
    name: "Timeline Coffee - Hoàn Kiếm",
    address: "7 Đình Liệt, Hàng Đào, Hoàn Kiếm",
    priceRange: "10.000₫ - 50.000₫",
    status: "Đang đóng cửa",
    phone: "091 180 59 99",
    email: "timelinecoffee79260@gmail.com",
    rating: 5,
    totalReviews: 5,
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop&crop=center"
    ],
    amenities: [
      { name: "Khu vực hút thuốc", icon: "🚬" },
      { name: "Bánh ngọt", icon: "🍰" },
      { name: "Chỗ đậu ôtô", icon: "🚗" },
      { name: "Thanh toán bằng thẻ", icon: "💳" }
    ],
    categoryTags: [
      "Timeline Coffee - Hoàn Kiếm",
      "Cafe Ngoài Trời - Cafe View Đẹp"
    ],
    location: {
      lat: 21.0285,
      lng: 105.8542,
      parking: "Giờ xe máy",
      seating: "Bên ngoài trời"
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Place Info */}
          <PlaceInfo place={placeData} />
          
          {/* Image Gallery */}
          <ImageGallery images={placeData.images} />
          
          {/* Rating Section */}
          <RatingSection rating={placeData.rating} totalReviews={placeData.totalReviews} />
          
          {/* Review Section */}
          <ReviewSection />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          {/* Location Map */}
          <LocationMap location={placeData.location} />
          
          {/* Suggested Places */}
          <SuggestedPlaces />
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail; 