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
      <div className="absolute top-4 right-4 text-white z-20">
        <button className="uppercase rounded-3xl font-bold px-4 p-2 flex items-center gap-3 text-base bg-white/10">
          Explore
          <BsArrowUpRight strokeWidth={2} size={12} />
        </button>
      </div>
      <div className="h-[380px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-fit group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="text-xl uppercase font-bold text-[#FFFFFF]">
          {title}
        </div>
        <div className="text-[#CCCCCC] leading-relaxed px-4 text-sm">
          {description}
        </div>
        <div className="flex flex-wrap gap-2 mt-2 px-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm rounded font-semibold"
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
