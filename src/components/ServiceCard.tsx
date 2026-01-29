import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

interface ServiceCardProps {
  title: string;
  tags: string[];
  description: string;
  image: string;
  tagColor: string;
  textColor: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  tags,
  description,
  image,
  tagColor,
  textColor,
}) => {
  return (
    <div className="bg-[#222222] w-full flex flex-col relative group">
      <div className="absolute top-3 right-3 md:top-4 md:right-4 text-white z-20">
        <button className="uppercase rounded-3xl font-bold px-3 md:px-4 p-1.5 md:p-2 flex items-center gap-2 md:gap-3 text-xs md:text-base bg-white/10">
          Explore
          <BsArrowUpRight strokeWidth={2} size={10} className="md:w-3 md:h-3" />
        </button>
      </div>
      <div className="h-[250px] md:h-[320px] lg:h-[380px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-3 md:p-4 flex flex-col gap-2 md:gap-3">
        <div className="text-lg md:text-xl uppercase font-bold text-[#FFFFFF]">
          {title}
        </div>
        <div className="text-[#CCCCCC] leading-relaxed px-2 md:px-4 text-xs md:text-sm line-clamp-3 md:line-clamp-none">
          {description}
        </div>
        <div className="flex flex-wrap gap-2 mt-1 md:mt-2 px-2 md:px-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 md:px-3 py-1 text-xs md:text-sm rounded font-semibold"
              style={{ backgroundColor: tagColor, color: textColor }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
