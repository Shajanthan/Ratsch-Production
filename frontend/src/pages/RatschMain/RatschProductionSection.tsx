import React from "react";
import { useNavigate } from "react-router-dom";

interface RatschProductionSectionProps {}

const RatschProductionSection: React.FC<RatschProductionSectionProps> = () => {
  const navigate = useNavigate();
  const bgImageUrl =
    "https://res.cloudinary.com/dybv1h20q/image/upload/v1774869280/Frame_76_j4sppz.png";
  return (
    <div className="relative w-full h-screen my-10 py-10">
      <img
        src={bgImageUrl}
        alt="Production section background"
        className="absolute inset-0 w-full h-full"
      />

      {/* Light overlay to keep future text readable */}
      <div className="absolute inset-0 " aria-hidden />
      <div className="relative z-10 max-w-2xl mx-auto py-8 md:py-10 px-4 md:px-0 h-full w-full">
        <div className="grid grid-cols-1 gap-6 h-full w-full">
          <div className="relative overflow-hidden bg-white shadow-2xl rounded-[50px] h-full w-full p-8 border border-zinc-300">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full h-full">
              <div className="w-full h-full text-center">
                <div className="text-2xl lg:text-6xl font-semibold text-[#02244A] ">
                  PRODUCTION
                </div>
                <div className="text-[#02244A] pb-3 lg:pb-6 pt-2 ">
                  High-quality visuals that tell powerful stories.
                </div>
                <div className="flex justify-center items-center text-xl lg:py-6">
                  <ul className="text-[#02244A] py-2 text-left list-disc text-sm md:text-base lg:text-lg">
                    <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                      Commercial Advertising
                    </li>
                    <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                      Corporate Video Production
                    </li>
                    <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                      Promotional Videos
                    </li>
                    <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                      Music Videos
                    </li>
                    <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                      Documentary Production
                    </li>
                    <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                      Event Coverage
                    </li>
                    <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                      Cinematography
                    </li>
                    <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                      Video Editing & Post-Production
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center py-3 pb-5">
                  <div
                    className="uppercase rounded-full font-bold px-6 md:px-10 py-3 md:py-4 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-lg bg-[#0557B2] hover:scale-105 transition-all duration-300 w-full sm:w-fit group cursor-pointer text-white"
                    onClick={() => navigate("/demo/digital-projects")}
                  >
                    Explore Projects
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatschProductionSection;
