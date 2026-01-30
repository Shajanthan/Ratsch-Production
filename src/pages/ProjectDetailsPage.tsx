import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "@/layout/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

        <div className="relative z-20 container mx-auto min-h-screen flex items-center py-20 px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full items-center">
            {/* Left: Title and Description */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold uppercase mb-4 text-white">
                {project.titleLine}
              </h1>
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold uppercase mb-6 text-white">
                {project.titleLine2}
              </h2>
              <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* Right: Project Details Card */}
            <div className="flex justify-start lg:justify-end">
              <div className="p-2 lg:p-8 w-full max-w-sm">
                <div className="space-y-2 md:space-y-4">
                  <div className="flex items-center gap-5 lg:block ">
                    <div className="md:text-base text-gray-300 uppercase pb-1 w-[80px] lg:w-full">
                      Date
                    </div>
                    <div className="md:text-xl font-semibold uppercase text-white pb-1 lg:pb-10">
                      {project.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-5 lg:block ">
                    <div className="md:text-base text-gray-300 uppercase pb-1 w-[80px] lg:w-full">
                      Type
                    </div>
                    <div className="lg:text-xl font-semibold uppercase text-white pb-1 lg:pb-10">
                      {project.type}
                    </div>
                  </div>
                  <div className="flex items-center gap-5 lg:block ">
                    <div className="md:text-base text-gray-300 uppercase pb-1 w-[80px] lg:w-full">
                      Client
                    </div>
                    <div className="lg:text-xl font-semibold uppercase text-white pb-1 lg:pb-10">
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
        <div className="bg-black z-10 relative">
          {/* Image Gallery: big image = selected, swiper thumbnails below */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="py-8 md:py-12 px-4 md:px-0">
              <div className="container mx-auto max-w-7xl">
                {/* Main Big Image - shows center/selected gallery image */}
                <div className="mb-6 md:mb-8">
                  <img
                    src={project.galleryImages[swiperActiveIndex]}
                    alt={`Gallery ${swiperActiveIndex + 1}`}
                    className="w-full h-[280px] md:h-[650px] object-cover rounded-lg transition-opacity duration-300"
                  />
                </div>

                {/* Thumbnail Swiper - 2 on mobile, 4 on desktop */}
                <div className="max-w-4xl mx-auto">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={12}
                    slidesPerView={3}
                    pagination={{
                      clickable: true,
                    }}
                    onSlideChange={(swiper) => {
                      setSwiperActiveIndex(swiper.activeIndex);
                    }}
                    breakpoints={{
                      768: { slidesPerView: 6, spaceBetween: 12 },
                    }}
                    className="gallery-thumbs-swiper"
                  >
                    {project.galleryImages.map((img, index) => (
                      <SwiperSlide key={index}>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => setSwiperActiveIndex(index)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSwiperActiveIndex(index);
                            }
                          }}
                          className={`rounded-lg w-[100px] overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                            swiperActiveIndex === index
                              ? "border-[#BF0000] opacity-100"
                              : "border-transparent opacity-60 hover:opacity-80"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-[80px] md:h-[100px] object-cover"
                            draggable={false}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
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
