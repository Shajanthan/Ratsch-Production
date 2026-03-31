import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface RatschClientsProps {}

const RatschClients: React.FC<RatschClientsProps> = () => {
  const logos = Array.from({ length: 5 });

  return <div className="bg-gray-200">
    <div className="max-w-3xl mx-auto">
      {/* Mobile/Tablet: show 2 logos, remaining ones are swipeable */}
      <div className="lg:hidden py-4">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          pagination={{ clickable: true }}
          className="clients-swiper"
        >
          {logos.map((_, index) => (
            <SwiperSlide key={index}>
              <div className="h-[100px] rounded-lg overflow-hidden px-2">
                <img
                  src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769935486/projects/dsq3tEikFp5cQo1o0zJe_banner.png"
                  alt="Ratsch clients"
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-all duration-500"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: show all logos in a grid */}
      <div className="hidden lg:grid grid-cols-5 py-4 gap-5">
        {logos.map((_, index) => (
          <div key={index} className="h-[100px] rounded-xl overflow-hidden">
            <img
              src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769935486/projects/dsq3tEikFp5cQo1o0zJe_banner.png"
              alt="Ratsch clients"
              className="w-full h-full object-cover rounded-xl hover:scale-105 transition-all duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  </div>;
};

export default RatschClients;
