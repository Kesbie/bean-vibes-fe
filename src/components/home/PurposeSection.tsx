'use client';

import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const PurposeSection: React.FC = () => {
  const purposes = [
    {
      id: 1,
      title: "Chill",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop&crop=center",
      description: "Thư giãn và tận hưởng"
    },
    {
      id: 2,
      title: "Đọc Sách",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop&crop=center",
      description: "Không gian yên tĩnh để đọc"
    },
    {
      id: 3,
      title: "Hẹn Hò",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=300&fit=crop&crop=center",
      description: "Lãng mạn và ấm cúng"
    },
    {
      id: 4,
      title: "Làm Việc",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=300&fit=crop&crop=center",
      description: "Không gian làm việc chuyên nghiệp"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mục đích bạn cần ?
          </h2>
        </div>

        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          loop={true}
          spaceBetween={20}
          slidesPerView={3}
          modules={[Pagination, Navigation]}
          className="needs-section-swiper"
        >
          {purposes.map((purpose) => (
            <SwiperSlide
              key={purpose.id}
              className="relative rounded-lg overflow-hidden group"
            >
              {/* <a href="#" className="bg-pink-200 opacity-50 absolute z-10 top-0 left-0 w-full h-full"></a> */}
              <div className="relative bg-black">
                <img src={purpose.image} alt={purpose.title} className="w-full h-full object-cover aspect-[16/9] group-hover:scale-105 opacity-50 transition-all duration-300" />
                <div className="p-4 text-center absolute top-1/2 -translate-y-1/2 left-0 w-full z-[1]">
                  <h3 className="text-2xl font-bold text-white">
                    {purpose.title}
                  </h3>
                  <p className="text-md font-semibold text-white mt-1">
                    {purpose.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PurposeSection; 