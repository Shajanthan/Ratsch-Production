import CoreValueSection from "@/layout/CoreValueSection";
import Footer from "@/layout/Footer";
import HomeSection from "@/layout/HomeSection";
import LetsConnectSection from "@/layout/LetsConnectSection";
import OurClientsSection from "@/layout/OurClientsSection";
import ProjectSection from "@/layout/ProjectSection";
import ReviewSection from "@/layout/ReviewSection";
import ServiceSection from "@/layout/ServiceSection";
import React from "react";

const HomePage: React.FC = () => {
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
