import HomeProjectCard from "@/components/HomeProjectCard";
import React, { useState, useEffect, useRef } from "react";

const HomeSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const touchContainerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  const projects = [
    {
      title: "Project Title",
      description:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      image: "/assets/images/HomeBg.png",
    },
    {
      title: "Project Title 2",
      description:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      image: "/assets/images/Home2.png",
    },
    {
      title: "Project Title 3",
      description:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      image: "/assets/images/Home3.png",
    },
  ];

  // Auto-rotate active card every 8 seconds (infinite loop)
  useEffect(() => {
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
        (prevIndex) => (prevIndex - 1 + projects.length) % projects.length,
      );
    }
  };

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
        {/* Top black shade overlay for desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10"></div>
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
