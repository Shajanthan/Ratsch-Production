import React from "react";

interface HomeProjectCardProps {
  title: string;
  description: string;
  isActive?: boolean;
}

const HomeProjectCard: React.FC<HomeProjectCardProps> = ({
  title,
  description,
  isActive = false,
}) => {
  return (
    <div
      className={`w-full h-full flex flex-col text-white transition-all duration-300 ${
        isActive ? "scale-105" : "scale-100"
      }`}
    >
      <h2
        className={`font-semi text-base md:text-lg transition-all duration-300 py-2 md:py-4 ${
          isActive ? "text-white" : "text-white/70"
        }`}
      >
        {title}
      </h2>
      <p
        className={`font-thin transition-all duration-300 text-sm md:text-base flex-1 min-h-0 ${
          isActive ? "text-white" : "text-white/60"
        }`}
      >
        {description}
      </p>
      {/* Red indicator bottom - Desktop only */}
      <div
        className={`hidden md:block mt-2 md:mt-4 flex-shrink-0 h-1 rounded-full transition-all duration-300 ${
          isActive ? "w-full bg-[#BF0000]" : "w-0 bg-[#BF0000]"
        }`}
      ></div>
    </div>
  );
};

export default HomeProjectCard;
