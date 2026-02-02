import React, { useRef, useState } from "react";
import { BsArrowUpRight, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

interface CategoryCardItem {
  projectTitle1: string;
  projectTitle2: string;
  shortdesc : string;
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
    <div className="relative aspect-square overflow-hidden bg-black group hover:cursor-pointer transition-all duration-400 ease-out hover:ring-2 hover:ring-[#BF0000]/50 hover:ring-inset">
      <img
        src={item.image}
        alt={item.projectTitle1}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-100 group-hover:from-black/85 group-hover:via-black/50 transition-all duration-400 ease-out" />
      {/* Explore - top right */}
      <div className="absolute top-3 right-3 md:top-4 md:right-4 text-white z-20">
        <button
          onClick={item.onExplore}
          className="uppercase rounded-3xl font-bold px-3 md:px-4 p-1.5 md:p-2 flex items-center gap-2 md:gap-3 text-xs md:text-base bg-white/10 hover:bg-white/20 border border-transparent transition-all duration-300 ease-out cursor-pointer"
        >
          Explore
          <BsArrowUpRight
            strokeWidth={2}
            size={10}
            className="md:w-3 md:h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
      {/* Title - center when not hovering, hidden on hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
        <h3 className="select-none font-bold text-xl md:text-2xl lg:text-5xl uppercase text-white text-center drop-shadow-sm">
          {item.projectTitle1}
        </h3>
        <h3 className="select-none font-bold text-xl md:text-2xl lg:text-5xl uppercase text-white text-center drop-shadow-sm">
          {item.projectTitle2}
        </h3>
      </div>
      {/* On hover: title above shortdesc, centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 md:px-6 z-10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none delay-75 gap-3 md:gap-4">
        <h3 className="select-none font-bold text-lg md:text-xl lg:text-3xl uppercase text-white text-center drop-shadow-md">
          {item.projectTitle1} {item.projectTitle2}
        </h3>
        <p className="text-white/95 text-center text-sm md:text-base leading-relaxed line-clamp-5 max-w-full drop-shadow-md">
          {item.shortdesc}
        </p>
      </div>
      {/* Date - bottom left */}
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
