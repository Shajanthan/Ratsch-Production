import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RevealOnScroll from "@/components/RevealOnScroll";

interface RatschCategoryProps {
  
}

const RatschCategory: React.FC<RatschCategoryProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.startsWith("/demo") ? "/demo" : "";

  return (
    <div id="ratsch-category" className="max-w-5xl mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative p-2">
        <RevealOnScroll>
          <div className="group h-[400px] md:h-[480px] xl:h-[550px] rounded-3xl flex items-center justify-center relative overflow-hidden">
            <div className="relative w-full h-full">
              <img
                src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774859045/Frame_64_1_kkrrhz.png"
                alt="Category background"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#005229]/75 transition-colors duration-500 group-hover:bg-[#005229]/68" />
              <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center pb-10 transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-center capitalize xl:text-2xl text-xl text-white font-semibold">
                    your
                  </div>
                  <div className="text-center capitalize xl:text-3xl text-2xl text-white font-semibold">
                    Digital presence,
                  </div>
                  <div className="text-center uppercase lg:text-5xl xl:text-6xl text-4xl text-white font-bold px-2">
                    perfected.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`${basePath}/digital-projects`)}
                  className="mt-10 text-center capitalize xl:text-lg text-base text-white bg-[#00CF69] p-4 px-8 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-black/30 transition-all duration-300 cursor-pointer"
                >
                  Let's Design
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={120}>
          <div className="group h-[400px] md:h-[480px] xl:h-[550px] rounded-3xl flex items-center justify-center relative overflow-hidden">
            <div className="relative w-full h-full">
              <img
                src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774859130/Frame_66_mfse3f.png"
                alt="Category background"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#02244A]/80 transition-colors duration-500 group-hover:bg-[#02244A]/72" />
              <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center pb-10 transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-center capitalize text-xl text-white font-semibold">
                    from
                  </div>
                  <div className="text-center capitalize xl:text-2xl text-xl text-white font-semibold">
                    Concept
                  </div>
                  <div className="text-center capitalize xl:text-3xl text-2xl text-white font-semibold">
                    to
                  </div>
                  <div className="text-center uppercase lg:text-5xl xl:text-6xl text-4xl text-white font-bold px-2">
                    Screen.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`${basePath}/projects?category=production`)}
                  className="mt-10 text-center capitalize xl:text-lg text-base text-white bg-[#0557B2] p-4 px-8 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-black/30 transition-all duration-300 cursor-pointer"
                >
                  Tell your story
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Bottom-center logo between both cards */}
        <RevealOnScroll
          delayMs={220}
          className="hidden md:block absolute -bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="bg-white rounded-3xl shadow-2xl px-5 py-4 transition-transform duration-300 hover:-translate-y-1">
          <img
            src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774418955/RATSCH_GROUP_PNG_1_ozkz1e.png"
            alt="Ratsch group logo"
            className="w-[70px] h-auto"
          />
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default RatschCategory;