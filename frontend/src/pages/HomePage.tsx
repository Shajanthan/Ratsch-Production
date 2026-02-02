import CoreValueSection from "@/layout/CoreValueSection";
import Footer from "@/layout/Footer";
import HomeSection from "@/layout/HomeSection";
import LetsConnectSection from "@/layout/LetsConnectSection";
import OurClientsSection from "@/layout/OurClientsSection";
import ProjectSection from "@/layout/ProjectSection";
import ReviewSection from "@/layout/ReviewSection";
import ServiceSection from "@/layout/ServiceSection";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HomePage: React.FC = () => {
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
      <HomeSection />
      <ServiceSection />
      <ProjectSection />
      <OurClientsSection />
      <ReviewSection />
      <CoreValueSection />
      <LetsConnectSection />
      <Footer />
    </div>
  );
};

export default HomePage;
