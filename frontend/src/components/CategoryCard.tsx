import React, { useRef, useState } from "react";
import { BsArrowUpRight, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

interface CategoryCardItem {
  projectTitle1: string;
  projectTitle2: string;
  date: string;
  image: string;
  onExplore?: () => void;
}

interface CategoryCardProps {
  title?: string;
  desc?: string;
  items?: CategoryCardItem[];
}

function ProjectTile({ item }: { item: CategoryCardItem }) {
  return (
    <div className="relative aspect-square overflow-hidden bg-white/10 group hover:cursor-pointer">
      <img
        src={item.image}
        alt={item.projectTitle1}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
      <div className="absolute top-3 right-3 md:top-4 md:right-4 text-white z-20">
        <button
          onClick={item.onExplore}
          className="uppercase rounded-3xl font-bold px-3 md:px-4 p-1.5 md:p-2 flex items-center gap-2 md:gap-3 text-xs md:text-base bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        >
          Explore
          <BsArrowUpRight
            strokeWidth={2}
            size={10}
            className="md:w-3 md:h-3"
          />
        </button>
      </div>
      <div className="absolute inset-0 flex items-center justify-center px-4 z-10 flex-col">
        <h3 className="select-none font-bold text-xl md:text-2xl lg:text-5xl uppercase text-white text-center">
          {item.projectTitle1}
        </h3>
        <h3 className="select-none font-bold text-xl md:text-2xl lg:text-5xl uppercase text-white text-center">
          {item.projectTitle2}
        </h3>
      </div>
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 lg:bottom-6 lg:left-6 z-10">
        <div className="select-none text-xs md:text-sm lg:text-base">
          <div className="uppercase text-white/70">Date </div>
          <div className="text-white">{item.date}</div>
        </div>
      </div>
    </div>
  );
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  desc,
  items = [],
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="py-10 my-8 bg-black">
      <div className="container lg:max-w-[1400px] mx-auto">
        <div className="text-3xl md:text-5xl lg:text-6xl uppercase font-bold">
          {title}
        </div>
        <p className="text-white/80 text-sm md:text-base py-4">{desc}</p>

        {/* One row: 3 visible, rest via swipe / Prev / Next */}
        {items.length > 0 ? (
          <div className="relative pt-2 px-2 md:px-8">
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                updateNavState(swiper);
              }}
              onSlideChange={(swiper) => updateNavState(swiper)}
              className="category-projects-swiper"
            >
              {items.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-square overflow-hidden">
                    <ProjectTile item={item} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={isBeginning}
                className={`p-3 rounded-full transition-all ${
                  isBeginning
                    ? " text-gray-500"
                    : " text-red-700 cursor-pointer"
                }`}
                aria-label="Previous"
              >
                <BsArrowLeft size={20} />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                disabled={isEnd}
                className={`p-3 rounded-full transition-all ${
                  isEnd ? " text-gray-500" : " text-red-700 cursor-pointer"
                }`}
                aria-label="Next"
              >
                <BsArrowRight size={20} />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CategoryCard;
