import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Client, getClients } from "@/services/clientService";
import RevealOnScroll from "@/components/RevealOnScroll";

interface RatschClientsProps {}

const RatschClients: React.FC<RatschClientsProps> = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const isAllowedCategory = (client: Client) => {
    const category = (client.category || "all").trim().toLowerCase();
    return category === "all" || category === "creative" || category === "digital";
  };

  useEffect(() => {
    let cancelled = false;
    getClients()
      .then((allClients) => {
        if (cancelled) return;
        setClients(allClients.filter(isAllowedCategory));
      })
      .catch(() => {
        if (!cancelled) setClients([]);
      })
      .finally(() => {
        if (!cancelled) {
          // no-op; kept for future loading states if needed
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-gray-200">
      <div className="max-w-4xl mx-auto">
        {/* Mobile/Tablet: show 2 logos, remaining ones are swipeable */}
        <RevealOnScroll className="lg:hidden ">
          <Swiper
            modules={[Pagination]}
            spaceBetween={4}
            slidesPerView={3}
            pagination={{ clickable: true }}
            className="clients-swiper px-2"
          >
            {clients.map((client, index) => (
              <SwiperSlide key={index}>
                <div className="h-[90px] flex items-center justify-center ">
                  <img
                    src={client.imageUrl}
                    alt="Ratsch clients"
                    className="w-[120px] h-[70px] object-cover rounded-lg hover:scale-105 transition-all duration-500"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </RevealOnScroll>

        {/* Desktop: center logos; use swiper when more than 5 */}
        <RevealOnScroll delayMs={80} className="hidden lg:block py-4">
          {clients.length > 5 ? (
            <Swiper
              modules={[Pagination]}
              spaceBetween={24}
              slidesPerView={5}
              pagination={{ clickable: true }}
              className="clients-swiper-desktop"
            >
              {clients.map((client, index) => (
                <SwiperSlide key={index}>
                  <div className="h-[100px] w-full mx-auto rounded-xl overflow-hidden">
                    <img
                      src={client.imageUrl}
                      alt="Ratsch clients"
                      className="w-full h-full object-cover rounded-xl hover:scale-105 transition-all duration-500"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex justify-center items-center gap-7">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="h-[100px] w-full rounded-xl overflow-hidden"
                >
                  <img
                    src={client.imageUrl}
                    alt="Ratsch clients"
                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          )}
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default RatschClients;
