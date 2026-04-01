import React, { useEffect, useState } from "react";
import { FaAnglesDown } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { getRatschHomeSettings } from "../../services/ratschHomeService";
import RevealOnScroll from "@/components/RevealOnScroll";

interface RatschHomeProps {}

const RatschHome: React.FC<RatschHomeProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bannerUrl, setBannerUrl] = useState<string | undefined>("");

  const handleGoDown = () => {
    const basePath = location.pathname.startsWith("/demo") ? "/demo" : "/";
    const isOnHome =
      location.pathname === basePath || location.pathname === `${basePath}/`;

    if (isOnHome) {
      const target = document.getElementById("ratsch-category");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    navigate(`${basePath}#ratsch-category`);
  };

  useEffect(() => {
    let cancelled = false;
    getRatschHomeSettings()
      .then((settings) => {
        if (cancelled) return;
        setBannerUrl(settings.bannerImageUrl);
      })
      .catch(() => {
        if (cancelled) return;
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="p-3 ">
        <div className="lg:h-[800px] h-[300px] rounded-3xl relative overflow-hidden">
          <img
            src={bannerUrl}
            alt="Ratsch home banner"
            className="absolute inset-0 w-full h-full object-cover  opacity-100"
          />
          <div className="absolute inset-0 bg-black/10" />

          <RevealOnScroll
            delayMs={80}
            className="absolute bottom-1 lg:bottom-5 left-1/2 -translate-x-1/2 z-10"
          >
            <div className="text-sm lg:text-xl text-center bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-12 py-4 rounded-full ">
              Lets GO
            </div>
            <button
              type="button"
              onClick={handleGoDown}
              className="animate-letsgo-down flex items-center justify-center py-2 w-full cursor-pointer"
              aria-label="Go to category section"
            >
              <FaAnglesDown className="lg:size-6 size-4" color="white" />
            </button>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
};

export default RatschHome;
