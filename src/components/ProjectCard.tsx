import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

interface ProjectCardProps {
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
  return (
    <div className="">
      <div className="w-full group relative">
        <img
          src={image}
          className="w-full h-[500px] object-fit grayscale group-hover:grayscale-0 transition-all duration-200"
        />
        <div className="absolute top-6 right-6 text-white z-20">
          <button className="uppercase rounded-3xl font-bold px-4 p-2 flex items-center gap-3 text-base bg-white/10">
            Explore
            <BsArrowUpRight strokeWidth={2} size={12} />
          </button>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center w-[600px] h-full">
          <div className="font-bold text-6xl uppercase py-3">
            <h1 className="">{titleLine}</h1>
            <h1 className="">{titleLine2}</h1>
          </div>
          <p className="text-white text-left text-sm">{description}</p>
          <div className="grid grid-cols-3 gap-6 mt-4 text-sm py-3">
            <div className="">
              <div className="uppercase text-small text-gray-300">date</div>
              <div className="uppercase font-semibold">{date}</div>
            </div>
            <div className="">
              <div className="uppercase text-small text-gray-300">type</div>
              <div className="uppercase font-semibold">{type}</div>
            </div>
            <div className="">
              <div className="uppercase text-small text-gray-300">client</div>
              <div className="uppercase font-semibold">{client}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
