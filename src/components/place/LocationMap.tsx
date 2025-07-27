'use client';

import React from "react";

interface LocationMapProps {
  location: {
    lat: number;
    lng: number;
    parking: string;
    seating: string;
  };
}

const LocationMap: React.FC<LocationMapProps> = ({ location }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Địa điểm cụ thể</h3>
      
      {/* Map Placeholder */}
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
        {/* Simple map representation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
          {/* Map grid lines */}
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Location marker */}
            <circle cx="200" cy="100" r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2"/>
            <circle cx="200" cy="100" r="4" fill="#ffffff"/>
          </svg>
        </div>
        
        {/* Location marker overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg"></div>
        </div>
      </div>

      {/* Location Details */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Đỗ xe:</span>
          <span className="text-gray-900">{location.parking}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Chỗ ngồi:</span>
          <span className="text-gray-900">{location.seating}</span>
        </div>
      </div>
    </div>
  );
};

export default LocationMap; 