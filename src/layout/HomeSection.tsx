import HomeProjectCard from "@/components/HomeProjectCard";
import React, { useState, useEffect } from "react";

const HomeSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const projects = [
    {
      title: "Project Title",
      description:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      image: "/assets/images/HomeBg.png",
    },
    {
      title: "Project Title",
      description:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      image: "/assets/images/Home2.png",
    },
    {
      title: "Project Title",
      description:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      image: "/assets/images/Home3.png",
    },
  ];

  // Auto-rotate active card every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Background Images with Slide Animation */}
      <div className="absolute inset-0 flex" style={{ transform: `translateX(-${activeIndex * 100}%)`, transition: 'transform 0.6s ease-in-out' }}>
        {projects.map((project, index) => (
          <img
            key={index}
            src={project.image}
            alt={`Home Banner ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            style={{ minWidth: '100%' }}
          />
        ))}
      </div>

      {/* Top black shade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex items-end h-full pb-20 justify-center container mx-auto px-6 gap-16">
        {projects.map((project, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className="cursor-pointer"
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
