import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

interface RatschDigitalSectionTwoProps {}

const RatschDigitalSectionTwo: React.FC<RatschDigitalSectionTwoProps> = () => {
  const bgImageUrl =
    "https://res.cloudinary.com/dybv1h20q/image/upload/v1774861628/Frame_71_zy7obm.png";

  return (
    <div className="relative w-full my-10">
      <img
        src={bgImageUrl}
        alt="Digital section background"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* Light overlay to keep future text readable */}
      <div className="absolute inset-0 " aria-hidden />

      <div className="relative z-10 max-w-5xl mx-auto py-8 md:py-10 px-4 md:px-0">
        <div className="grid grid-cols-1 gap-6">
          <div className="relative overflow-hidden bg-white shadow-2xl p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="">
                <div className="text-2xl sm:text-3xl font-bold text-[#02244A] uppercase">
                  digital
                </div>
                <div className="text-[#02244A]">
                  Smart digital solutions that grow your online presence
                </div>
              </div>
              <div className="uppercase rounded-full font-bold px-6 md:px-10 py-3 md:py-4 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-lg bg-[#0557B2] hover:scale-105 transition-all duration-300 w-full sm:w-fit group cursor-pointer text-white">
                Explore
                <BsArrowUpRight
                  strokeWidth={2}
                  size={14}
                  className="md:w-4 md:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 py-6 md:py-8 gap-8 lg:gap-0">
              <div className="lg:pr-4">
                {/* Mobile: 2x2 equal boxes */}
                <div className="grid grid-cols-2 gap-4 sm:hidden">
                  {[
                    "https://res.cloudinary.com/dybv1h20q/image/upload/v1774871238/Rectangle_23_5_rhweqc.png",
                    "https://res.cloudinary.com/dybv1h20q/image/upload/v1774871235/Rectangle_23_7_saehxy.png",
                    "https://res.cloudinary.com/dybv1h20q/image/upload/v1774871237/Rectangle_23_6_e7c76g.png",
                    "https://res.cloudinary.com/dybv1h20q/image/upload/v1774871237/Rectangle_23_4_rvqy0t.png",
                  ].map((src, i) => (
                    <div
                      key={src}
                      className="relative w-full rounded-3xl overflow-hidden bg-[#EAF2FF] shadow-sm"
                      style={{ paddingTop: "100%" }}
                    >
                      <img
                        src={src}
                        alt={`Creative ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Desktop/Tablet: collage layout */}
                <div className="hidden sm:grid grid-cols-2 gap-4 sm:gap-5">
                  {/* Left stack: tall image + small icon */}
                  <div className="flex flex-col gap-5">
                    <div className="rounded-3xl overflow-hidden h-[220px] md:h-[250px]">
                      <img
                        src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774871238/Rectangle_23_5_rhweqc.png"
                        alt="Creative work"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="rounded-3xl h-[220px] md:h-[250px] w-full flex items-center justify-end shadow-sm">
                      <img
                        src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774871237/Rectangle_23_6_e7c76g.png"
                        alt="After Effects"
                        className="w-full h-full object-contain rounded-3xl"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Right stack: top square + bottom wide */}
                  <div className="flex flex-col gap-5">
                    <div className="rounded-3xl overflow-hidden  h-[220px] md:h-[130px] ">
                      <img
                        src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774871235/Rectangle_23_7_saehxy.png"
                        alt="3D design"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="rounded-3xl overflow-hidden h-[220px] md:h-[400px] w-full">
                      <img
                        src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774871237/Rectangle_23_4_rvqy0t.png"
                        alt="Design references"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-start">
                <ul className="list-disc list-inside text-sm sm:text-base md:text-lg lg:text-xl text-[#02244A] px-2 sm:px-4">
                  <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                    Website Design
                  </li>
                  <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                    Website Development
                  </li>
                  <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                    Digital Marketing
                  </li>
                  <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                    Social Media Management
                  </li>
                  <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                    SEO Optimization
                  </li>
                  <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                    Online Advertising Campaigns
                  </li>
                  <li className="py-2 sm:py-3 hover:text-[#005EC8]">
                    Content Strategy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatschDigitalSectionTwo;
