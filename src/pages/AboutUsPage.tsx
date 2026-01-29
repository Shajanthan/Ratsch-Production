import React, { useEffect } from "react";
import Footer from "@/layout/Footer";
import CoreValueSection from "@/layout/CoreValueSection";

const AboutUsPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white ">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden container mx-auto">
        <img
          src="/assets/images/aboutus.png"
          alt="About Us Background"
          className="absolute inset-0 w-full h-full object-cover mt-12 lg:mt-28"
        />

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 ">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold uppercase mb-4 text-white">
            ABOUT US
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl uppercase text-white/90">
            KNOW OUR PATH
          </p>
        </div>
      </div>

      {/* Introductory Section */}
      <div className="py-12 md:py-16 px-4 md:px-0 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase text-center mb-12 md:mb-16 leading-tight">
            BEGAN AS A SIMPLE <span className="text-[#BF0000]">IDEA</span>,
            <br /> NOW GROWN INTO A{" "}
            <span className="text-[#BF0000]">JOURNEY</span>
          </h2>

          {/* Logos */}
          <div className="py-4 flex justify-center h-[300px]">
            <img
              src="/assets/images/logos.png"
              alt="About Us Background"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Description */}
          <p className="text-white/90 text-center text-sm md:text-base leading-relaxed max-w-4xl mx-auto pt-6">
            Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
            consequat vulputate urna augue. Faucibus adipiscing aenean mi diam.
            Ac bibendum elementum aliquet Lorem ipsum dolor sit amet
            consectetur. Maecenas varius sit consequat vulputate urna augue.
            Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet
            Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
            consequat vulputate urna augue. Faucibus adipiscing aenean mi diam.
            Ac bibendum elementum aliquet Lorem ipsum dolor sit amet
            consectetur. Maecenas varius sit consequat vulputate urna augue.
            Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet
          </p>
        </div>
      </div>

      {/* Meet Our CEO Section */}
      <div className="py-12 md:py-16 px-4 md:px-0 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase text-center mb-12 md:mb-16">
            MEET OUR CEO
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* CEO Image */}
            <div className="flex justify-center md:justify-start">
              <img
                src="/assets/images/profile.png"
                alt="CEO"
                className="w-full max-w-md h-auto rounded-lg object-cover"
              />
            </div>

            {/* CEO Info */}
            <div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#BF0000] mb-2">
                RAJ KUMAR
              </h3>
              <p className="text-lg md:text-xl text-white/80 mb-6 uppercase">
                FOUNDER & CEO
              </p>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
                consequat vulputate urna augue. Faucibus adipiscing aenean mi
                diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet
                consectetur. Maecenas varius sit consequat vulputate urna augue.
                Faucibus adipiscing aenean mi diam. Ac bibendum elementum
                aliquet
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="py-12 md:py-20 px-4 md:px-0 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase text-center mb-12 md:mb-16">
            OUR TEAM
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-700">
                  <img
                    src="/assets/images/profile.png"
                    alt={`Team Member ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-white font-semibold text-sm md:text-base mb-1">
                  John Cena
                </h4>
                <p className="text-white/70 text-xs md:text-sm">The Founder</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Section */}
      <CoreValueSection aboutUs={true} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;
