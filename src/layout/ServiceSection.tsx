import ServiceCard from "@/components/ServiceCard";
import React, { useState } from "react";
import { BsArrowUpRight, BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface ServiceSectionProps {}

const ServiceSection: React.FC<ServiceSectionProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const servicesPerPage = 3;
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
        <div className="relative z-10 py-12">
          <div className=" bg-black py-12">
            <div className="container mx-auto">
              <div className="text-white flex justify-between">
                <div className="text-6xl uppercase font-bold">Services</div>
                <button className="uppercase rounded-full font-bold px-10 flex items-center gap-3 text-lg bg-white/10">
                  more services
                  <BsArrowUpRight strokeWidth={2} size={16} />
                </button>
              </div>
              <p className="text-white w-1/2 py-4">
                Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
                consequat vulputate urna augue. Faucibus adipiscing aenean mi
                diam. Ac bibendum elementum aliquet
              </p>

              {/* Service cards */}
              <div className="relative pt-2 px-8">
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
                        style={{ width: "calc(33.333% - 26.67px)" }}
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

                {/* Navigation Arrows */}
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
        {/* Service 2 */}
        <div className="min-h-screen relative">
          <img
            src="/assets/images/ServicesBg.png"
            alt="Service Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 container mx-auto h-screen flex items-center">
            <div className="grid grid-cols-2 gap-16 w-full ">
              <div className="text-white pb-80 px-10">
                <div className="text-6xl uppercase font-bold">
                  Stories worth watching
                </div>
                <p className="font-thin py-3">
                  Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
                  consequat vulputate urna augue. Faucibus adipiscing aenean mi
                  diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet
                  consectetur. Maecenas varius sit consequat vulputate urna
                  augue. Faucibus adipiscing aenean mi diam. Ac bibendum
                  elementum aliquet
                </p>
                <div className="flex justify-end">
                  <button className="uppercase rounded-full font-bold px-10 py-4 flex items-center gap-3 text-lg bg-white/10">
                    about us
                    <BsArrowUpRight strokeWidth={2} size={16} />
                  </button>
                </div>
              </div>
              <div className="text-white pt-80 px-10">
                <div className="text-6xl uppercase font-bold">
                  Our Work in Action
                </div>
                <p className="font-thin py-3">
                  Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
                  consequat vulputate urna augue. Faucibus adipiscing aenean mi
                  diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet
                  consectetur. Maecenas varius sit consequat vulputate urna
                  augue. Faucibus adipiscing aenean mi diam. Ac bibendum
                  elementum aliquet
                </p>
                <div className="flex justify-start">
                  <button className="uppercase rounded-full font-bold px-10 py-4 flex items-center gap-3 text-lg bg-white/10">
                    Our Services
                    <BsArrowUpRight strokeWidth={2} size={16} />
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
