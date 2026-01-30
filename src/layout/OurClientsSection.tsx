import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const OurClientsSection: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const clients = [
    { image: "/assets/images/client1.png" },
    { image: "/assets/images/client2.png" },
    { image: "/assets/images/client3.png" },
    { image: "/assets/images/client4.png" },
  ];
  return (
    <div className="relative w-full bg-black pb-12">
      <img
        src="/assets/images/bg.png"
        className="absolute inset-0 opacity-70 w-full h-full object-cover"
      />
      <div className="bg-black z-10 py-8 md:py-16 relative">
        <div className="container mx-auto text-white px-4 md:px-0">
          <div className="text-3xl md:text-5xl lg:text-7xl text-center uppercase font-bold">
            Our Clients
          </div>
          <p className="text-center max-w-4xl mx-auto py-3 text-sm md:text-base px-4">
            Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
            consequat vulputate urna augue. Faucibus adipiscing aenean mi diam.
            Ac bibendum elementum aliquet
          </p>

          {/* Mobile & Tablet: Swiper */}
          <div className="lg:hidden py-4">
            <Swiper
              modules={[Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              centeredSlides
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                  centeredSlides: false,
                },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="clients-swiper"
            >
              {clients.map((client, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center px-4 md:px-2 h-[200px] md:h-[250px]">
                    <img
                      src={client.image}
                      className="hover:scale-105 transition-all duration-500 w-full max-w-[280px] md:max-w-full h-full object-contain"
                      alt={`Client ${index + 1}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden lg:flex lg:flex-wrap justify-center items-center gap-6 py-4 md:py-6">
            {clients.map((client, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={client.image}
                  className="hover:scale-105 transition-all duration-500 w-24 lg:w-auto"
                  alt={`Client ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurClientsSection;
