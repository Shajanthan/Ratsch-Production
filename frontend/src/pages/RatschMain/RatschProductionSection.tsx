import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getNavbarCategories } from "@/services/navbarCategoryService";

interface RatschProductionSectionProps {}

const RatschProductionSection: React.FC<RatschProductionSectionProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subItems, setSubItems] = useState<string[]>([]);
  const bgImageUrl =
    "https://res.cloudinary.com/dybv1h20q/image/upload/v1774974864/Production_BG_New_600x-8_ybd6oy.png";

  useEffect(() => {
    let cancelled = false;
    getNavbarCategories()
      .then((data) => {
        if (cancelled) return;
        const production = data.find(
          (cat) => (cat.key || "").toLowerCase() === "production",
        );
        setSubItems(Array.isArray(production?.items) ? production.items : []);
      })
      .catch(() => {
        if (!cancelled) setSubItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const basePath = location.pathname.startsWith("/demo") ? "/demo" : "";

  const navigateToSubProjects = (subItem: string) => {
    const params = new URLSearchParams();
    params.set("category", "production");
    params.set("sub", subItem);
    navigate(`${basePath}/projects?${params.toString()}`);
  };
  return (
    <div className="relative w-full my-5 py-3">
      <img
        src={bgImageUrl}
        alt="Production section background"
        className="absolute inset-0 w-full h-full bg-cover"
      />

      {/* Light overlay to keep future text readable */}
      <div className="absolute inset-0 " aria-hidden />
      <div className="relative z-10 max-w-2xl mx-auto py-4 md:py-10 px-4 md:px-0 w-full">
        <div className="flex justify-center items-center gap-6 h-full max-w-lg w-full mx-auto">
          <div className="relative overflow-hidden rounded-[50px] h-full w-full py-8 border border-white/50 bg-[#f1f2f4]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(2,36,74,0.25)]">
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
                    {subItems.length > 0 ? (
                      subItems.map((item) => (
                        <li key={item} className="py-2 sm:py-3">
                          <button
                            type="button"
                            onClick={() => navigateToSubProjects(item)}
                            className="hover:text-[#005EC8] transition-colors text-left"
                          >
                            {item}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="py-2 sm:py-3 text-[#02244A]/70 list-none">
                        No production sub-items configured.
                      </li>
                    )}
                  </ul>
                </div>
                <div className="flex justify-center items-center py-3">
                  <div
                    className="uppercase rounded-full font-bold px-6 md:px-10 py-3 md:py-4 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-lg bg-[#0557B2] hover:scale-105 transition-all duration-300 w-full sm:w-fit group cursor-pointer text-white"
                    onClick={() => navigate(`${basePath}/projects?category=production`)}
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
