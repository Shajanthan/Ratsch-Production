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
    if (scrollToSection) {
      const timer = setTimeout(() => {
        const element = document.getElementById(scrollToSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
    const id = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => clearTimeout(id);
  }, [location.pathname, scrollToSection]);

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
