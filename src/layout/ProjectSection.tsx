import ProjectCard from "@/components/ProjectCard";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

const ProjectSection: React.FC = () => {
  const projects = [
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
    },
  ];
  return (
    <div className="min-h-screen w-full bg-black relative">
      <img
        src="/assets/images/bg.png"
        className="absolute inset-0 opacity-50 w-full h-full object-cover"
      />
      <div className="relative z-10 py-6 md:py-12">
        <div className=" bg-black py-6 md:py-12">
          <div className="container mx-auto px-4 md:px-0">
            <div className="text-white flex flex-col sm:flex-row justify-between gap-4">
              <div className="text-3xl md:text-5xl lg:text-6xl uppercase font-bold">
                Latest Projects
              </div>
              <button className="uppercase rounded-full font-bold px-6 md:px-10 py-2 md:py-3 flex items-center gap-2 md:gap-3 text-sm md:text-lg bg-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 w-fit group">
                more projects
                <BsArrowUpRight
                  strokeWidth={2}
                  size={14}
                  className="md:w-4 md:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                />
              </button>
            </div>
            <p className="text-white w-full md:w-1/2 py-4 text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
              consequat vulputate urna augue. Faucibus adipiscing aenean mi
              diam. Ac bibendum elementum aliquet
            </p>

            <div className="text-white flex flex-col gap-3 px-2 md:px-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  id={project.id}
                  titleLine={project.titleLine}
                  titleLine2={project.titleLine2}
                  description={project.description}
                  image={project.image}
                  date={project.date}
                  type={project.type}
                  client={project.client}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
