import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "@/layout/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";

interface ProjectData {
  id: string;
  titleLine: string;
  titleLine2: string;
  description: string;
  image: string;
  date: string;
  type: string;
  client: string;
  overview?: string;
  results?: string;
  galleryImages?: string[];
}

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // Mock project data - in real app, fetch by ID
  const projects: ProjectData[] = [
    {
      id: "wedding-pre-shoot",
      titleLine: "Wedding",
      titleLine2: "Pre-Shoot",
      description:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      date: "Jan 12, 2026",
      type: "Graphic Design",
      client: "TD Creative",
      image: "/assets/images/WeddingOriginal.png",
      overview:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      results:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      galleryImages: [
        "/assets/images/wedding1.png",
        "/assets/images/wedding2.png",
        "/assets/images/wedding3.png",
        "/assets/images/wedding4.png",
      ],
    },
    {
      id: "commercial-ads",
      titleLine: "Commercial",
      titleLine2: "ADs",
      description:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      date: "Jan 12, 2026",
      type: "Graphic Design",
      client: "TD Creative",
      image: "/assets/images/car.png",
      overview:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      results:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      galleryImages: [
        "/assets/images/car.png",
        "/assets/images/car.png",
        "/assets/images/car.png",
        "/assets/images/car.png",
      ],
    },
    {
      id: "video-production",
      titleLine: "Video",
      titleLine2: "Production",
      description:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      date: "Jan 12, 2026",
      type: "Graphic Design",
      client: "TD Creative",
      image: "/assets/images/shoot.png",
      overview:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      results:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      galleryImages: [
        "/assets/images/shoot.png",
        "/assets/images/shoot.png",
        "/assets/images/shoot.png",
        "/assets/images/shoot.png",
      ],
    },
    {
      id: "2d-animation",
      titleLine: "2D Animation",
      titleLine2: "Designing",
      description:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      date: "Jan 12, 2026",
      type: "Graphic Design",
      client: "TD Creative",
      image: "/assets/images/sketch.png",
      overview:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      results:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      galleryImages: [
        "/assets/images/sketch.png",
        "/assets/images/sketch.png",
        "/assets/images/sketch.png",
        "/assets/images/sketch.png",
      ],
    },
  ];

  const project = projects.find((p) => p.id === id);

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/demo")}
            className="text-red-500 hover:text-red-600"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative w-full min-h-screen overflow-hidden">
        <img
          src={project.image}
          alt={`${project.titleLine} ${project.titleLine2}`}
          className="absolute inset-0 h-full w-full  object-cover"
        />
        <div className="absolute inset-0  z-10"></div>

        <div className="relative z-20 container mx-auto min-h-screen flex items-center py-20 px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full items-center">
            {/* Left: Title and Description */}
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase mb-4 text-white">
                {project.titleLine}
              </h1>
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase mb-6 text-white">
                {project.titleLine2}
              </h2>
              <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* Right: Project Details Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="p-2 md:p-8 w-full max-w-sm">
                <div className="space-y-2 md:space-y-4">
                  <div>
                    <div className="text-sm md:text-base text-gray-300 uppercase pb-1">
                      Date
                    </div>
                    <div className="md:text-xl font-semibold uppercase text-white pb-1 md:pb-10">
                      {project.date}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm md:text-base text-gray-300 uppercase pb-1">
                      Type
                    </div>
                    <div className="md:text-xl font-semibold uppercase text-white pb-1 md:pb-10">
                      {project.type}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm md:text-base text-gray-300 uppercase pb-1">
                      Client
                    </div>
                    <div className="md:text-xl font-semibold uppercase text-white pb-1 md:pb-10">
                      {project.client}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full py-12">
        <img
          src="/assets/images/bg.png"
          className="absolute inset-0 opacity-70 w-full h-full object-cover"
        />
        <div className="bg-black z-10 relative">
          <div className="container mx-auto text-white px-4 py-20">
            {/* Overview Section */}
            <div className="pb-32 px-4">
              <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center mb-8">
                  Overview
                </h2>
                <p className="text-white/90 text-center text-sm md:text-base leading-relaxed">
                  {project.overview || project.description}
                </p>
              </div>
            </div>

            {/* Results Section */}

            <div className="container mx-auto text-white px-4 md:px-0">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center mb-8">
                Results
              </h2>
              <p className="text-white/90 text-center text-sm md:text-base leading-relaxed">
                {project.results || project.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full bg-black pb-12">
        <img
          src="/assets/images/bg.png"
          className="absolute inset-0 opacity-70 w-full h-full object-cover"
        />
        <div className="bg-black z-10 relative">
          {/* Image Gallery */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="md:py-16 px-4 md:px-0">
              <div className="container mx-auto">
                {/* Main Large Image */}
                <div className="mb-8 px-6">
                  <img
                    src={project.galleryImages[0]}
                    alt="Gallery main"
                    className="w-full h-[400px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-500 "
                  />
                </div>

                {/* Mobile: Swiper for Smaller Images */}
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
                    className="gallery-swiper"
                  >
                    {project.galleryImages.slice(1).map((img, index) => (
                      <SwiperSlide key={index} className="flex justify-center">
                        <div className="w-full max-w-sm">
                          <img
                            src={img}
                            alt={`Gallery ${index + 2}`}
                            className="w-full h-[300px] object-cover rounded-lg"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* Mobile navigation dots - same style as HomeSection */}
                  {project.galleryImages.slice(1).length > 1 && (
                    <div className="flex gap-1.5 justify-center mt-4">
                      {project.galleryImages.slice(1).map((_, index) => (
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
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop: Grid of Smaller Images */}
                <div className="hidden md:grid grid-cols-3 gap-4 md:gap-6">
                  {project.galleryImages.slice(1).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Gallery ${index + 2}`}
                      className="w-full h-[300px] md:h-[400px] object-cover hover:scale-105 transition-transform duration-500 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectDetailsPage;
