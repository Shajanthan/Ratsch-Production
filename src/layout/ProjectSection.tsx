import ProjectCard from "@/components/ProjectCard";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

const ProjectSection: React.FC = () => {
  const projects = [
    {
      titleLine: "Wedding",
      titleLine2: "Pre-Shoot",
      description:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet",
      date: "Jan 12, 2026",
      type: "Graphic Design",
      client: "TD Creative",
      image: "/assets/images/wedding.png",
    },
    {
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
      <div className="relative z-10 py-12">
        <div className=" bg-black py-12">
          <div className="container mx-auto">
            <div className="text-white flex justify-between">
              <div className="text-6xl uppercase font-bold">
                Latest Projects
              </div>
              <button className="uppercase rounded-full font-bold px-10 flex items-center gap-3 text-lg bg-white/10">
                more projects
                <BsArrowUpRight strokeWidth={2} size={16} />
              </button>
            </div>
            <p className="text-white w-1/2 py-4">
              Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
              consequat vulputate urna augue. Faucibus adipiscing aenean mi
              diam. Ac bibendum elementum aliquet
            </p>

            <div className="text-white flex flex-col gap-3 px-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
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
