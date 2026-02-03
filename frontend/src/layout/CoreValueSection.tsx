import CoreValuesCard from "@/components/CoreValuesCard";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, A11y, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { getCoreValues, type CoreValue } from "../services/coreValueService";
import { getHomepageSettings } from "../services/homepageService";

import "swiper/css";
import "swiper/css/effect-fade";

interface CoreValueSectionProps {
  aboutUs?: boolean;
}

const CoreValueSection: React.FC<CoreValueSectionProps> = ({ aboutUs }) => {
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getHomepageSettings(), getCoreValues()])
      .then(([settings, allCoreValues]) => {
        if (cancelled) return;
        const ids = [
          settings.coreValueId1,
          settings.coreValueId2,
          settings.coreValueId3,
        ].filter(Boolean);
        const byId = new Map(allCoreValues.map((v) => [v.id, v]));
        const ordered = ids
          .map((id) => byId.get(id))
          .filter((v): v is CoreValue => v != null);
        setCoreValues(ordered.length > 0 ? ordered : allCoreValues);
      })
      .catch(() => {
        if (!cancelled) setCoreValues([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const titles = coreValues.map((v) => v.title);

  const handleSelectIndex = (index: number) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      // Stop autoplay when user manually selects
      swiperRef.current.autoplay?.stop();
      if (coreValues.length > 1 && swiperRef.current.params.loop) {
        swiperRef.current.slideToLoop(index);
      } else {
        swiperRef.current.slideTo(index);
      }
      // Restart autoplay after a delay
      setTimeout(() => {
        swiperRef.current?.autoplay?.start();
      }, 3000);
    }
  };

  return (
    <div className="relative w-full bg-black pb-12">
      <img
        src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927519/bg_do9pwv.png"
        className="absolute inset-0 opacity-70 w-full h-full object-cover"
      />
      <div className="z-10 py-6 md:py-12 relative">
        <div className="text-white">
          {!aboutUs && (
            <div className="text-3xl md:text-5xl lg:text-6xl text-center uppercase font-bold pb-6 md:pb-12 px-4">
              our core values
            </div>
          )}

          <div className="">
            {loading ? (
              <div className="flex justify-center py-12 text-white/50">
                Loading…
              </div>
            ) : coreValues.length === 0 ? null : (
              <div
                className="relative"
                onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                onMouseLeave={() => swiperRef.current?.autoplay?.start()}
              >
                <Swiper
                  modules={[EffectFade, A11y, Autoplay]}
                  slidesPerView={1}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  speed={650}
                  loop={coreValues.length > 1}
                  allowTouchMove={false}
                  autoplay={{ delay: 2000 }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                  }}
                  className="w-full"
                >
                  {coreValues.map((cv, index) => (
                    <SwiperSlide key={cv.id ?? cv.title}>
                      <CoreValuesCard
                        title={cv.title}
                        desc={cv.description}
                        image={cv.imageUrl}
                        titles={titles}
                        activeIndex={activeIndex}
                        onSelectIndex={handleSelectIndex}
                        className={
                          index === activeIndex ? "animate-corevalue-in" : ""
                        }
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreValueSection;
