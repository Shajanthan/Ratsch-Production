import React from "react";
import { FaAnglesDown } from "react-icons/fa6";

interface RatschHomeProps {}

const RatschHome: React.FC<RatschHomeProps> = () => {
  return (
    <div>
      <div className="p-3 ">
        <div className="lg:h-[800px] h-[350px] rounded-3xl relative overflow-hidden">
          <img
            src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769935486/projects/dsq3tEikFp5cQo1o0zJe_banner.png"
            alt="Ratsch home banner"
            className="absolute inset-0 w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute bottom-1 lg:bottom-5 left-1/2 -translate-x-1/2 z-10">
            <div className="text-sm lg:text-xl text-center bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-6 py-2 rounded-full ">
              Lets GO
            </div>
            <div className="animate-letsgo-down flex items-center justify-center py-2">
                <FaAnglesDown className="lg:size-6 size-4" color="white"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatschHome;
