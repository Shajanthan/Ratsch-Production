import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Footer from "@/layout/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  getProjects,
  slugFromTitleLines,
  type Project,
} from "../services/projectService";

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

function projectToData(p: Project): ProjectData {
  return {
    id: p.id ?? "",
    titleLine: p.titleLine1,
    titleLine2: p.titleLine2,
    description: p.smallDescription,
    image: p.coverImageUrl || (p.imageUrls?.length ? p.imageUrls[0] : "") || "",
    date: p.date,
    type: p.type,
    client: p.client,
    overview: p.overview,
    results: p.results,
    galleryImages: p.imageUrls?.length ? p.imageUrls : undefined,
  };
}

const ProjectDetailsPage: React.FC = () => {
  const { id: slugOrId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    if (!slugOrId) {
      setProject(null);
      setLoading(false);
      return;
    }
    getProjects()
      .then((list) => {
        if (cancelled) return;
        const found =
          list.find(
            (p) => slugFromTitleLines(p.titleLine1, p.titleLine2) === slugOrId,
          ) ?? list.find((p) => p.id === slugOrId);
        setProject(found ? projectToData(found) : null);
      })
      .catch(() => {
        if (!cancelled) setProject(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slugOrId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slugOrId]);

  useEffect(() => {
    if (!isFullscreenOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreenOpen(false);
      } else if (e.key === "ArrowLeft" && project?.galleryImages) {
        setFullscreenIndex((prev) =>
          prev > 0 ? prev - 1 : project.galleryImages!.length - 1,
        );
      } else if (e.key === "ArrowRight" && project?.galleryImages) {
        setFullscreenIndex((prev) =>
          prev < project.galleryImages!.length - 1 ? prev + 1 : 0,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreenOpen, project?.galleryImages]);

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
    setIsFullscreenOpen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreenOpen(false);
  };

  const navigateFullscreen = (direction: "prev" | "next") => {
    if (!project?.galleryImages) return;
    if (direction === "prev") {
      setFullscreenIndex((prev) =>
        prev > 0 ? prev - 1 : project.galleryImages!.length - 1,
      );
    } else {
      setFullscreenIndex((prev) =>
        prev < project.galleryImages!.length - 1 ? prev + 1 : 0,
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/70">Loading…</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Project Not Found</h1>
          <button
            onClick={() =>
              navigate(
                window.location.pathname.startsWith("/demo") ? "/demo" : "/",
              )
            }
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
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent from-[0%] to-black" />

      {/* Hero Section */}
      <div className="relative w-full min-h-screen overflow-hidden">
        <img
          src={project.image}
          alt={`${project.titleLine} ${project.titleLine2}`}
          className="absolute inset-0 h-full w-full  object-cover"
        />
        <div className="absolute inset-0  z-10"></div>

        <div className="relative z-20 container lg:max-w-[1400px] mx-auto min-h-screen flex items-center py-20 px-4 lg:px-0">
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
          src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927519/bg_do9pwv.png"
          className="absolute inset-0 opacity-70 w-full h-full object-cover"
        />
        <div className="bg-black z-10 relative">
          <div className="container lg:max-w-[1400px] mx-auto text-white px-4 py-20">
            {/* Overview Section */}
            <div className="pb-32 px-4">
              <div className="container lg:max-w-[1400px] mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center mb-8">
                  Overview
                </h2>
                <p className="text-white/90 text-center text-sm md:text-base leading-relaxed">
                  {project.overview || project.description}
                </p>
              </div>
            </div>

            {/* Results Section */}

            <div className="container lg:max-w-[1400px] mx-auto text-white px-4 md:px-0">
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
              <div className="container lg:max-w-[1400px] mx-auto max-w-7xl">
                {/* Main Big Image - shows center/selected gallery image */}
                <div className="mb-6 md:mb-8">
                  <div
                    onClick={() => openFullscreen(swiperActiveIndex)}
                    className="cursor-pointer group relative"
                  >
                    <img
                      src={project.galleryImages[swiperActiveIndex]}
                      alt={`Gallery ${swiperActiveIndex + 1}`}
                      className="w-full h-[280px] md:h-[700px] object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-sm md:text-base uppercase font-semibold transition-opacity duration-300">
                        Click to view full image
                      </span>
                    </div>
                  </div>
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
                      768: { slidesPerView: 4, spaceBetween: 8 },
                    }}
                    className={`gallery-thumbs-swiper ${
                      project.galleryImages.length <= 2
                        ? "center-slides-1"
                        : project.galleryImages.length <= 4
                          ? "center-slides-few"
                          : ""
                    }`}
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
                          className={`rounded-lg w-[250px] overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                            swiperActiveIndex === index
                              ? "border-[#E30514] opacity-100"
                              : "border-transparent opacity-60 hover:opacity-80"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-[80px] md:h-[130px] object-cover"
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

      {/* Fullscreen Image Modal */}
      {isFullscreenOpen && project.galleryImages && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
            aria-label="Close"
          >
            <HiX className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {project.galleryImages.length > 1 && (
            <>
              <button
                onClick={() => navigateFullscreen("prev")}
                className="absolute left-4 md:left-6 z-50 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                aria-label="Previous image"
              >
                <BsChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <button
                onClick={() => navigateFullscreen("next")}
                className="absolute right-4 md:right-6 z-50 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                aria-label="Next image"
              >
                <BsChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </>
          )}

          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={project.galleryImages[fullscreenIndex]}
              alt={`Gallery ${fullscreenIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {project.galleryImages.length > 1 && (
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/60 px-4 py-2 rounded-full text-white text-sm">
              {fullscreenIndex + 1} / {project.galleryImages.length}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectDetailsPage;
