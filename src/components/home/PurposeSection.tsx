'use client';

import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CATEGORY_TYPES  } from "@/constants";

const PurposeSection: React.FC = () => {
  const purposes = [
    {
      id: 1,
      name: 'Sống ảo',
      description: 'Không gian yên tĩnh phù hợp cho việc học tập, làm việc',
      type: CATEGORY_TYPES.PURPOSE,
      thumbnail: 'https://toidicafe.vn/static/images/purpose/song-ao-1647441301274.jpeg?w=960',
      slug: 'song-ao'
    },
    {
      id: 2,
      name: 'Hẹn hò',
      description: 'Không gian lãng mạn phù hợp cho các cặp đôi',
      type: CATEGORY_TYPES.PURPOSE,
      thumbnail: 'https://toidicafe.vn/static/images/purpose/hen-ho-1647441284779.jpeg',
      slug: 'hen-ho'
    },
    {
      id: 3,
      name: 'Làm việc',
      description: 'Không gian thoải mái cho việc gặp gỡ bạn bè, đối tác',
      type: CATEGORY_TYPES.PURPOSE,
      thumbnail: 'https://toidicafe.vn/static/images/purpose/lam-viec-1647441292275.jpeg?w=960',
      slug: 'lam-viec'
    },
    {
      id: 4,
      name: 'Đọc sách',
      description: 'Không gian yên bình để thư giãn, đọc sách',
      type: CATEGORY_TYPES.PURPOSE,
      thumbnail: 'https://toidicafe.vn/static/images/purpose/doc-sach-1647441276414.jpeg',
      slug: 'doc-sach'
    },
    {
      id: 5,
      name: 'Chill',
      description: 'Không gian thoải mái để thư giãn, nghe nhạc',
      type: CATEGORY_TYPES.PURPOSE,
      thumbnail: 'https://toidicafe.vn/static/images/purpose/chill-1647441264959.jpeg?w=960',
      slug: 'chill'
    },
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
                <img src={purpose.thumbnail} alt={purpose.name} className="w-full h-full object-cover aspect-[16/9] group-hover:scale-105 opacity-50 transition-all duration-300" />
                <div className="p-4 text-center absolute top-1/2 -translate-y-1/2 left-0 w-full z-[1]">
                  <h3 className="text-2xl font-bold text-white">
                    {purpose.name}
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