import CoreValuesCard from "@/components/CoreValuesCard";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

const CoreValueSection: React.FC = () => {
  const coreValues = [
    {
      title: "Quality",
      desc: "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      image: "/assets/images/Quality.png",
    },
    {
      title: "Creativity",
      desc: "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet.",
      image: "/assets/images/Creativity.png",
    },
    {
      title: "Results",
      desc: "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet.",
      image: "/assets/images/Results.png",
    },
  ];

  const titles = coreValues.map((v) => v.title);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSelectIndex = (index: number) => {
    setActiveIndex(index);
    swiperRef.current?.slideTo(index);
  };

  return (
    <div className="relative w-full bg-black pb-12">
      <img
        src="/assets/images/bg.png"
        className="absolute inset-0 opacity-70 w-full h-full object-cover"
      />
      <div className="z-10 py-12 relative">
        <div className="text-white">
          <div className="text-7xl text-center uppercase font-bold pb-12">
            our core values
          </div>

          <div className="">
            <div className="relative">
              <Swiper
                modules={[EffectFade, A11y]}
                slidesPerView={1}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={650}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.activeIndex);
                }}
                className="w-full"
              >
                {coreValues.map((cv, index) => (
                  <SwiperSlide key={cv.title}>
                    <CoreValuesCard
                      title={cv.title}
                      desc={cv.desc}
                      image={cv.image}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreValueSection;
