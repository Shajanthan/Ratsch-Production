import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Client, getClients } from "@/services/clientService";
import { getHomepageSettings } from "@/services/homepageService";

interface RatschClientsProps {}

const RatschClients: React.FC<RatschClientsProps> = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getHomepageSettings(), getClients()])
      .then(([settings, allClients]) => {
        if (cancelled) return;
        const ids = [
          settings.clientId1,
          settings.clientId2,
          settings.clientId3,
          settings.clientId4,
        ].filter(Boolean);
        const byId = new Map(allClients.map((c) => [c.id, c]));
        const ordered = ids
          .map((id) => byId.get(id))
          .filter((c): c is Client => c != null);
        setClients(ordered.length > 0 ? ordered : allClients);
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
        <div className="lg:hidden py-4">
          <Swiper
            modules={[Pagination]}
            spaceBetween={4}
            slidesPerView={2}
            pagination={{ clickable: true }}
            className="clients-swiper max-w-[312px] mx-auto"
          >
            {clients.map((client, index) => (
              <SwiperSlide key={index}>
                <div className="h-[100px] flex items-center justify-center ">
                  <img
                    src={client.imageUrl}
                    alt="Ratsch clients"
                    className="w-[120px] h-[90px] object-fill rounded-lg hover:scale-105 transition-all duration-500"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop: center logos; use swiper when more than 5 */}
        <div className="hidden lg:block py-4">
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
        </div>
      </div>
    </div>
  );
};

export default RatschClients;
