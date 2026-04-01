import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import RatschHome from "./RatschMain/RatschHome";
import RatschClients from "./RatschMain/RatschClients";
import RatschCategory from "./RatschMain/RatschCategory";
import RatschDigitalSection from "./RatschMain/RatschDigitalSection";
import RatschProductionSection from "./RatschMain/RatschProductionSection";
import RatschDigitalSectionTwo from "./RatschMain/RatschDigitalSectionTwo";
import RatschClientReview from "./RatschMain/RatschClientReview";
import RatschLetsConnectSection from "./RatschMain/RatschLetsConnectSection";
import RatschLetsTalk from "./RatschMain/RatschLetsTalk";
import RatschFooter from "./RatschMain/RatschFooter";
import CoreValueSection from "@/layout/CoreValueSection";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const RatchHomePage: React.FC = () => {
  const location = useLocation();
  const scrollToSection = (location.state as { scrollTo?: string })?.scrollTo;

  useEffect(() => {
    const hashId = location.hash?.slice(1);
    if (scrollToSection || hashId) {
      const sectionId = scrollToSection ?? hashId;
      const timer = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
    const id = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => clearTimeout(id);
  }, [location.pathname, location.hash, scrollToSection]);

  return (
    <div className="select-none">
      <RatschHome />
      <RatschClients />
      <RatschCategory />
      <RatschDigitalSection />
      <RatschProductionSection />
      <RatschDigitalSectionTwo />
      <RatschClientReview />
      <RatschLetsConnectSection />
      <CoreValueSection aboutUs={true} />
      <RatschLetsTalk />
      <RatschFooter />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default RatchHomePage;
