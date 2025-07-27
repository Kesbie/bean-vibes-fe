'use client';

import React, { useState } from "react";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Main Image */}
        <div className="md:col-span-3">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={images[selectedImage]}
              alt="Main cafe image"
              className="w-full h-full object-cover"
            />
            {images.length > 4 && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                {images.length} ảnh
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Images */}
        <div className="md:col-span-1 space-y-2">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                selectedImage === index ? 'ring-2 ring-red-500' : 'hover:opacity-80'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`Cafe image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    +{images.length - 4}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery; 