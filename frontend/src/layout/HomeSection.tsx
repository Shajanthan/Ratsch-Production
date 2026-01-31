import HomeProjectCard from "@/components/HomeProjectCard";
import React, { useState, useEffect, useRef } from "react";
import { getHomepageSettings } from "../services/homepageService";
import { getProjects } from "../services/projectService";

interface HomeProject {
  title: string;
  description: string;
  image: string;
}

const PLACEHOLDER_IMAGE = "/assets/images/HomeBg.png";

const HomeSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const touchContainerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<HomeProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getHomepageSettings(), getProjects()])
      .then(([settings, allProjects]) => {
        if (cancelled) return;
        const ids = [
          settings.projectId1,
          settings.projectId2,
          settings.projectId3,
        ];
        const list: HomeProject[] = [];
        for (const id of ids) {
          if (!id) continue;
          const p = allProjects.find((x) => x.id === id);
          if (!p) continue;
          list.push({
            title: `${p.titleLine1} ${p.titleLine2}`.trim() || "Project",
            description: p.smallDescription,
            image:
              p.coverImageUrl ||
              (p.imageUrls?.length ? p.imageUrls[0] : "") ||
              PLACEHOLDER_IMAGE,
          });
        }
        setProjects(list);
      })
      .catch(() => {
        if (!cancelled) setProjects([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  // Keep activeIndex in bounds when project list changes (e.g. only 2 selected)
  useEffect(() => {
    setActiveIndex((prev) =>
      projects.length ? Math.min(prev, projects.length - 1) : 0
    );
  }, [projects.length]);

  // Auto-rotate active card every 8 seconds (infinite loop)
  useEffect(() => {
    if (projects.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [projects.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Infinite loop: if at last, go to first
      setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }
    if (isRightSwipe) {
      // Infinite loop: if at first, go to last
      setActiveIndex(
        (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
      );
    }
  };

  if (loading) {
    return (
      <div className="w-full md:h-screen relative overflow-hidden flex items-center justify-center bg-black">
        <p className="text-white/70">Loading…</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="w-full md:h-screen relative overflow-hidden flex items-center justify-center bg-black">
        <p className="text-white/50">No homepage projects configured.</p>
      </div>
    );
  }

  return (
    <div className="w-full md:h-screen relative overflow-hidden">
      {/* Mobile: Image section */}
      <div
        className="md:hidden w-full relative overflow-hidden"
        ref={touchContainerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${activeIndex * 100}vw)`,
            transition: "transform 0.6s ease-in-out",
            width: `${projects.length * 100}vw`,
          }}
        >
          {projects.map((project, index) => (
            <img
              key={index}
              src={project.image}
              alt={`Home Banner ${index + 1}`}
              className="object-contain flex-shrink-0 bg-black"
              style={{
                width: "100vw",
                minWidth: "100vw",
                height: "auto",
                display: "block",
              }}
            />
          ))}
        </div>
        {/* Black linear gradient over image – polished look (mobile) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      </div>

      {/* Desktop: Background Images with Slide Animation */}
      <div className="hidden md:block absolute inset-0">
        <div
          className="absolute inset-0 flex"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: "transform 0.6s ease-in-out",
          }}
        >
          {projects.map((project, index) => (
            <img
              key={index}
              src={project.image}
              alt={`Home Banner ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
              style={{ minWidth: "100%" }}
            />
          ))}
        </div>
        {/* Black linear gradient over image – polished look (desktop) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.75) 100%)",
          }}
        />
      </div>

      {/* Mobile: Project details below image */}
      <div
        className="md:hidden bg-black py-4 px-4 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${activeIndex * 100}vw)`,
            transition: "transform 0.6s ease-in-out",
            width: `${projects.length * 100}vw`,
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{
                width: "100vw",
                minWidth: "100vw",
              }}
            >
              <div className="container mx-auto flex flex-col items-center gap-3 px-4">
                <HomeProjectCard
                  title={project.title}
                  description={project.description}
                  isActive={activeIndex === index}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Mobile navigation dots */}
        <div className="flex gap-1.5 justify-center mt-4">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-[#BF0000] w-4" : "bg-white/50 w-1.5"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Content */}
      <div className="hidden md:flex relative z-20 items-end h-full pb-10 md:pb-20 justify-center container mx-auto px-4 md:px-6 gap-6 md:gap-8 lg:gap-16">
        {projects.map((project, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className="cursor-pointer w-full md:w-auto"
          >
            <HomeProjectCard
              title={project.title}
              description={project.description}
              isActive={activeIndex === index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSection;
