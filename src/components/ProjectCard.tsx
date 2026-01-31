import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import { slugFromTitleLines } from "../services/projectService";

interface ProjectCardProps {
  id?: string;
  titleLine: string;
  titleLine2: string;
  description: string;
  image: string;
  date: string;
  type: string;
  client: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  titleLine,
  titleLine2,
  description,
  image,
  date,
  type,
  client,
}) => {
  const navigate = useNavigate();
  const slug = slugFromTitleLines(titleLine, titleLine2);

  const handleExplore = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (slug) {
      const currentPath = window.location.pathname;
      if (currentPath.startsWith("/demo")) {
        navigate(`/demo/project/${slug}`);
      } else {
        navigate(`/project/${slug}`);
      }
    }
  };

  return (
    <div className="">
      <div className="w-full group relative">
        <img
          src={image}
          className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 relative"
        />
        {/* Left side black gradient - only on image */}
        <div className="absolute left-0 top-0 bottom-0 w-3/4 md:w-4/5 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-4 right-4 md:top-6 md:right-6 text-white z-30">
          <button
            onClick={handleExplore}
            onTouchStart={handleExplore}
            className="uppercase rounded-3xl font-bold px-3 md:px-4 p-1.5 md:p-2 flex items-center gap-2 md:gap-3 text-xs md:text-base bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all cursor-pointer touch-manipulation"
          >
            Explore
            <BsArrowUpRight
              strokeWidth={2}
              size={10}
              className="md:w-3 md:h-3"
            />
          </button>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center w-full md:w-[600px] h-full px-4 md:px-0 z-20 pointer-events-none">
          <div className="font-bold text-2xl md:text-4xl lg:text-6xl uppercase py-2 md:py-3">
            <h1 className="">{titleLine}</h1>
            <h1 className="">{titleLine2}</h1>
          </div>
          <p className="text-white text-left text-xs md:text-sm line-clamp-2 md:line-clamp-none">
            {description}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 mt-2 md:mt-4 text-xs md:text-sm py-2 md:py-3 pointer-events-none">
            {/* Mobile: Date and Type stacked in first column, Desktop: Date only */}
            <div className="flex flex-col">
              <div className="uppercase text-xs md:text-sm text-gray-300">
                date
              </div>
              <div className="uppercase font-semibold text-xs md:text-sm">
                {date}
              </div>
              <div className="uppercase text-xs md:text-sm text-gray-300 mt-2 md:hidden">
                type
              </div>
              <div className="uppercase font-semibold text-xs md:text-sm md:hidden">
                {type}
              </div>
            </div>
            {/* Desktop: Type in second column */}
            <div className="hidden md:block">
              <div className="uppercase text-xs md:text-sm text-gray-300">
                type
              </div>
              <div className="uppercase font-semibold text-xs md:text-sm">
                {type}
              </div>
            </div>
            {/* Client in second column (mobile) or third column (desktop) */}
            <div>
              <div className="uppercase text-xs md:text-sm text-gray-300">
                client
              </div>
              <div className="uppercase font-semibold text-xs md:text-sm">
                {client}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
