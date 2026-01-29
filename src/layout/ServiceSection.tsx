import ServiceCard from "@/components/ServiceCard";
import React, { useState, useEffect, useRef } from "react";
import { BsArrowUpRight, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";

interface ServiceSectionProps {}

const ServiceSection: React.FC<ServiceSectionProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [servicesPerPage, setServicesPerPage] = useState(3);
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const updateServicesPerPage = () => {
      if (window.innerWidth < 768) {
        setServicesPerPage(1);
      } else {
        setServicesPerPage(3);
      }
    };

    updateServicesPerPage();
    window.addEventListener("resize", updateServicesPerPage);
    return () => window.removeEventListener("resize", updateServicesPerPage);
  }, []);

  const services = [
    {
      title: "Graphic Designing",
      tags: ["Graphic Design"],
      description:
        "Lorem ipsum dolor sit amet consectetur. Accumsan pharetra donec non mi in faucibus platea risus. Aliquam a massa morbi vel ac. Adipiscing aliquam mauris condimentum enim tortor eu. Sit egestas diam ornare sit mi at..",
      image: "/assets/images/Service1.png",
      tagColor: "#FF7C7C",
      textColor: "#8B0000",
    },
    {
      title: "Sound Production",
      tags: ["Sound Design"],
      description:
        "Lorem ipsum dolor sit amet consectetur. Accumsan pharetra donec non mi in faucibus platea risus. Aliquam a massa morbi vel ac. Adipiscing aliquam mauris condimentum enim tortor eu. Sit egestas diam ornare sit mi at..",
      image: "/assets/images/Service3.png",
      tagColor: "#FFCD7C",
      textColor: "#8B6600",
    },
    {
      title: "Photography",
      tags: ["Photography"],
      description:
        "Lorem ipsum dolor sit amet consectetur. Accumsan pharetra donec non mi in faucibus platea risus. Aliquam a massa morbi vel ac. Adipiscing aliquam mauris condimentum enim tortor eu. Sit egestas diam ornare sit mi at..",
      image: "/assets/images/Service2.png",
      tagColor: "#7CC4FF",
      textColor: "#003C8B",
    },
    {
      title: "Sound Production",
      tags: ["Sound Design"],
      description:
        "Lorem ipsum dolor sit amet consectetur. Accumsan pharetra donec non mi in faucibus platea risus. Aliquam a massa morbi vel ac. Adipiscing aliquam mauris condimentum enim tortor eu. Sit egestas diam ornare sit mi at..",
      image: "/assets/images/Service3.png",
      tagColor: "#FFCD7C",
      textColor: "#8B6600",
    },
  ];

  const maxIndex = Math.max(0, services.length - servicesPerPage);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };
  return (
    <div className="min-h-screen w-full bg-black">
      <div className="h-full w-full relative">
        <img
          src="/assets/images/bg.png"
          className="absolute inset-0 opacity-70 w-full h-full object-cover"
        />
        <div className="relative z-10 py-6 md:py-12">
          <div className=" bg-black py-6 md:py-12">
            <div className="container mx-auto px-4 md:px-0">
              <div className="text-white flex flex-col lg:flex-row lg:justify-between gap-4 w-full">
                <div className="text-3xl md:text-5xl lg:text-6xl uppercase font-bold">
                  Services
                </div>
                <button className="uppercase rounded-full font-bold px-6 md:px-10 py-2 md:py-3 flex items-center gap-2 md:gap-3 text-sm md:text-lg bg-white/10 w-fit sm:ml-0">
                  more services
                  <BsArrowUpRight
                    strokeWidth={2}
                    size={14}
                    className="md:w-4 md:h-4"
                  />
                </button>
              </div>
              <p className="text-white w-full md:w-1/2 py-4 text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
                consequat vulputate urna augue. Faucibus adipiscing aenean mi
                diam. Ac bibendum elementum aliquet
              </p>

              {/* Service cards */}
              <div className="relative pt-2 px-2 md:px-8">
                {/* Mobile: Swiper */}
                <div className="md:hidden">
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    centeredSlides={true}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) =>
                      setSwiperActiveIndex(swiper.activeIndex)
                    }
                    className="service-swiper"
                  >
                    {services.map((service, index) => (
                      <SwiperSlide key={index} className="flex justify-center">
                        <div className="w-full max-w-sm">
                          <ServiceCard
                            title={service.title}
                            description={service.description}
                            tags={service.tags}
                            image={service.image}
                            tagColor={service.tagColor}
                            textColor={service.textColor}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* Mobile navigation dots - same style as HomeSection */}
                  <div className="flex gap-1.5 justify-center mt-4">
                    {services.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          swiperRef.current?.slideTo(index);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          swiperActiveIndex === index
                            ? "bg-[#BF0000] w-4"
                            : "bg-white/50 w-1.5"
                        }`}
                        aria-label={`Go to service ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Desktop: Original carousel */}
                <div className="hidden md:block">
                  <div className="overflow-hidden ">
                    <div
                      className="flex gap-10 transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(calc(-${currentIndex} * (33.333% + 13.33px)))`,
                      }}
                    >
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0"
                          style={{
                            width: `calc(33.333% - 26.67px)`,
                          }}
                        >
                          <ServiceCard
                            title={service.title}
                            description={service.description}
                            tags={service.tags}
                            image={service.image}
                            tagColor={service.tagColor}
                            textColor={service.textColor}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Arrows - Desktop only */}
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      className={`p-3 rounded-full transition-all ${
                        currentIndex === 0
                          ? " text-gray-500"
                          : " text-red-700 cursor-pointer"
                      }`}
                    >
                      <BsArrowLeft size={20} />
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentIndex >= maxIndex}
                      className={`p-3 rounded-full transition-all ${
                        currentIndex >= maxIndex
                          ? " text-gray-500"
                          : " text-red-700 cursor-pointer"
                      }`}
                    >
                      <BsArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Service 2 */}
        <div className="min-h-screen relative">
          <img
            src="/assets/images/ServicesBg.png"
            alt="Service Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Mobile: Flip Card */}
          <div className="md:hidden relative z-10 container mx-auto min-h-screen flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-4xl">
              <div
                className="relative w-full h-[500px] perspective-1000"
                style={{ perspective: "1000px" }}
              >
                {/* Card Inner - Flip Container */}
                <div
                  className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d"
                  style={{
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Front Card - Stories worth watching */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl p-6 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/20 via-white/15 to-white/10 border-2 border-white/30 rounded-2xl p-6 h-full flex flex-col justify-between shadow-2xl shadow-black/50 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none">
                      <div className="text-white relative z-10">
                        <div className="text-3xl uppercase font-bold drop-shadow-lg">
                          Stories worth watching
                        </div>
                        <p className="font-thin py-3 text-sm drop-shadow-md">
                          Lorem ipsum dolor sit amet consectetur. Maecenas
                          varius sit consequat vulputate urna augue. Faucibus
                          adipiscing aenean mi diam. Ac bibendum elementum
                          aliquet Lorem ipsum dolor sit amet consectetur.
                          Maecenas varius sit consequat vulputate urna augue.
                          Faucibus adipiscing aenean mi diam. Ac bibendum
                          elementum aliquet
                        </p>
                      </div>
                      <div className="flex justify-between items-end pt-4 relative z-10">
                        <button className="uppercase rounded-full font-bold px-6 py-3 flex items-center gap-2 text-sm text-white bg-white/30 hover:bg-white/40 backdrop-blur-md border border-white/40 transition-all shadow-lg">
                          about us
                          <BsArrowUpRight
                            strokeWidth={2}
                            size={14}
                            className="text-white"
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(!isFlipped);
                          }}
                          className="w-10 h-10 rounded-full bg-white/30 hover:bg-white/40 backdrop-blur-md border border-white/40 flex items-center justify-center transition-all shadow-lg"
                          aria-label="Flip card"
                        >
                          <BsArrowRight className="text-white" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Back Card - Our Work in Action */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl p-6 flex flex-col justify-between rotate-y-180"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/20 via-white/15 to-white/10 border-2 border-white/30 rounded-2xl p-6 h-full flex flex-col justify-between shadow-2xl shadow-black/50 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none">
                      <div className="text-white relative z-10">
                        <div className="text-3xl uppercase font-bold drop-shadow-lg">
                          Our Work in Action
                        </div>
                        <p className="font-thin py-3 text-sm drop-shadow-md">
                          Lorem ipsum dolor sit amet consectetur. Maecenas
                          varius sit consequat vulputate urna augue. Faucibus
                          adipiscing aenean mi diam. Ac bibendum elementum
                          aliquet Lorem ipsum dolor sit amet consectetur.
                          Maecenas varius sit consequat vulputate urna augue.
                          Faucibus adipiscing aenean mi diam. Ac bibendum
                          elementum aliquet
                        </p>
                      </div>
                      <div className="flex justify-between items-end pt-4 relative z-10">
                        <button className="uppercase rounded-full font-bold px-6 py-3 flex items-center gap-2 text-sm text-white bg-white/30 hover:bg-white/40 backdrop-blur-md border border-white/40 transition-all shadow-lg">
                          Our Services
                          <BsArrowUpRight
                            strokeWidth={2}
                            size={14}
                            className="text-white"
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(!isFlipped);
                          }}
                          className="w-10 h-10 rounded-full bg-white/30 hover:bg-white/40 backdrop-blur-md border border-white/40 flex items-center justify-center transition-all shadow-lg"
                          aria-label="Flip card"
                        >
                          <BsArrowLeft className="text-white" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Original Grid Layout */}
          <div className="hidden md:flex relative z-10 container mx-auto min-h-screen items-center justify-center py-12 md:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 w-full  px-4 md:px-0">
              <div className="text-white pb-0 lg:pb-80 px-0 md:px-10">
                <div className="text-3xl md:text-5xl lg:text-6xl uppercase font-bold">
                  Stories worth watching
                </div>
                <p className="font-thin py-3 text-sm md:text-base">
                  Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
                  consequat vulputate urna augue. Faucibus adipiscing aenean mi
                  diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet
                  consectetur. Maecenas varius sit consequat vulputate urna
                  augue. Faucibus adipiscing aenean mi diam. Ac bibendum
                  elementum aliquet
                </p>
                <div className="flex justify-start lg:justify-end pt-4">
                  <button className="uppercase rounded-full font-bold px-6 md:px-10 py-3 md:py-4 flex items-center gap-2 md:gap-3 text-sm md:text-lg bg-white/10">
                    about us
                    <BsArrowUpRight
                      strokeWidth={2}
                      size={14}
                      className="md:w-4 md:h-4"
                    />
                  </button>
                </div>
              </div>
              <div className="text-white pt-0 lg:pt-80 px-0 md:px-10">
                <div className="text-3xl md:text-5xl lg:text-6xl uppercase font-bold">
                  Our Work in Action
                </div>
                <p className="font-thin py-3 text-sm md:text-base">
                  Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
                  consequat vulputate urna augue. Faucibus adipiscing aenean mi
                  diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet
                  consectetur. Maecenas varius sit consequat vulputate urna
                  augue. Faucibus adipiscing aenean mi diam. Ac bibendum
                  elementum aliquet
                </p>
                <div className="flex justify-start pt-4">
                  <button className="uppercase rounded-full font-bold px-6 md:px-10 py-3 md:py-4 flex items-center gap-2 md:gap-3 text-sm md:text-lg bg-white/10">
                    Our Services
                    <BsArrowUpRight
                      strokeWidth={2}
                      size={14}
                      className="md:w-4 md:h-4"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
