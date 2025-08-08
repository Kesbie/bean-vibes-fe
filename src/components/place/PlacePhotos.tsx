import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  FreeMode,
  Thumbs
} from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Fancybox from "@/components/fancy-box";

type Props = {
  photos: App.Types.Place.Photo[];
};

const PlacePhotos = (props: Props) => {
  const { photos } = props;

  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const [swiperIndex, setSwiperIndex] = React.useState(0);
  return (
    <>
      <div className="hidden md:flex items-center justify-center h-[355px] gap-1 rounded-lg overflow-hidden">
        <Fancybox>
          {photos?.map((photo, index) => {
            if (index < 2) {
              return (
                <div
                  key={index}
                  data-fancybox="gallery"
                  data-src={photo?.url}
                  style={{
                    backgroundImage: `url(${photo?.url})`,
                    backgroundPosition: "50%"
                  }}
                  className={`relative w-full h-[355px] bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer`}
                >
                  <Image
                    alt="cafe-app"
                    layout="fill"
                    objectFit="cover"
                    src={photo?.url}
                    className="hidden"
                  />
                </div>
              );
            }
          })}
          {photos?.length > 2 && (
            <div className="flex flex-col w-full h-[355px]">
              {photos[2] && (
                <div
                  data-fancybox="gallery"
                  data-src={photos[2]?.url}
                  style={{
                    backgroundImage: `url(${photos[2]?.url})`,
                    backgroundPosition: "50%"
                  }}
                  className="relative w-full h-full bg-white bg-cover mb-1 after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer"
                >
                  <Image
                    alt="cafe-app"
                    layout="fill"
                    objectFit="cover"
                    src={photos[2]?.url}
                    className="hidden"
                  />
                </div>
              )}
              {photos?.length === 4 && photos[3] && (
                <div
                  data-fancybox="gallery"
                  data-src={photos[3]?.url || photos[3]}
                  style={{
                    backgroundImage: `url(${photos[3]?.url || photos[3]})`,
                    backgroundPosition: "50%"
                  }}
                  className="relative w-full h-full bg-white bg-cover mb-1 after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer"
                >
                  <Image
                    alt="cafe-app"
                    layout="fill"
                    objectFit="cover"
                    src={photos[3]?.url}
                    className="hidden"
                  />
                </div>
              )}
              {photos[3] && photos[4] && (
                <div className="flex w-full h-full">
                  <div
                    data-fancybox="gallery"
                    data-src={photos[3]?.url}
                    style={{
                      backgroundImage: `url(${photos[3]?.url})`,
                      backgroundPosition: "50%"
                    }}
                    className="relative w-full h-auto bg-white bg-cover mr-1 after:block after:absolute after:inset-0 after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer"
                  >
                    <Image
                      alt="cafe-app"
                      layout="fill"
                      objectFit="cover"
                      src={photos[3]?.url}
                      className="hidden"
                    />
                  </div>
                  <div
                    data-fancybox="gallery"
                    data-src={photos[5]?.url || photos[5]}
                    style={{
                      backgroundImage: `url(${photos[5]?.url || photos[5]})`,
                      backgroundPosition: "50%"
                    }}
                    className="relative w-full h-auto bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-100 after:transition cursor-pointer"
                  >
                    <Image
                      alt="cafe-app"
                      layout="fill"
                      objectFit="cover"
                      src={photos[5]?.url}
                      className="hidden"
                    />
                    {photos.length > 5 && (
                      <span className="absolute z-10 flex justify-center items-center w-full h-full text-slate-200 text-xl font-bold">
                        {"+"}
                        {photos.length - 5}
                        {" ảnh"}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {photos?.map((photo, index) => {
                if (index > 4) {
                  return (
                    <div
                      key={index}
                      data-fancybox="gallery"
                      data-src={photo?.url}
                      style={{
                        backgroundImage: `url(${photo?.url})`,
                        backgroundPosition: "50%"
                      }}
                      className={`hidden relative w-full h-[355px] bg-white bg-cover after:block after:absolute after:inset-0 after after:bg-black/30 after:opacity-0 hover:after:opacity-100 after:transition cursor-pointer`}
                    >
                      <Image
                        alt="cafe-app"
                        layout="fill"
                        objectFit="cover"
                        src={photo?.url}
                        className="hidden"
                      />
                    </div>
                  );
                }
              })}
            </div>
          )}
        </Fancybox>
      </div>
      <div className="block md:hidden">
        <Fancybox>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff"
            } as React.CSSProperties & {
              "--swiper-navigation-color": string;
              "--swiper-pagination-color": string;
            }}
            loop={false}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Pagination]}
            className="!w-full !max-h-full rounded-[0.25rem] overflow-hidden"
          >
            {photos?.map((photo, index) => {
              return (
                <SwiperSlide key={index} onChange={() => setSwiperIndex(index)}>
                  <a
                    className="relative"
                    data-fancybox="1"
                    data-src={photo?.url}
                  >
                    <figure className="m-0 bg-black/[0.3] pb-[56.0141509434%] pe-none">
                      <Image
                        alt="cafe-app"
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full object-cover absolute left-0 top-0 blur-[15px] z-[1]"
                        src={photo?.url}
                      />
                      <Image
                        alt="cafe-app"
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full object-contain absolute left-0 top-0 z-[2]"
                        src={photo?.url}
                      />
                    </figure>
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Fancybox>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false}
          spaceBetween={10}
          slidesPerView={8.3}
          breakpoints={{
            0: {
              slidesPerView: 4.3
            },
            768: {
              slidesPerView: 5.3
            },
            1200: {
              slidesPerView: 8.3
            }
          }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mt-2"
        >
          {photos?.map((photo, index) => {
            return (
              <SwiperSlide
                key={index}
                onClick={() => setSwiperIndex(index)}
                className={`hover:border-blue-600/60 border-4 ${
                  swiperIndex === index ? "border-blue-600/60" : "border-white"
                } !transition !duration-300 rounded-[0.25rem] cursor-pointer`}
              >
                <figure className="m-0 bg-slate-200 pb-[56.0141509434%] pe-none">
                  <Image
                    alt="cafe-app"
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-contain absolute left-0 top-0 z-[2]"
                    src={photo?.url}
                  />
                </figure>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default PlacePhotos;
