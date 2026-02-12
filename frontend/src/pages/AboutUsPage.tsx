import React, { useEffect, useRef, useState } from "react";
import Footer from "@/layout/Footer";
import type { Swiper as SwiperType } from "swiper";
import CoreValueSection from "@/layout/CoreValueSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { getCeoSection, type CeoSection } from "@/services/aboutUsService";
import { getTeamMembers, type TeamMember } from "@/services/teamMemberService";
import "swiper/css";
import "swiper/css/pagination";

const AboutUsPage: React.FC = () => {
  const teamSwiperRef = useRef<SwiperType | null>(null);
  const [ceo, setCeo] = useState<CeoSection | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getCeoSection()
      .then(setCeo)
      .catch(() => setCeo(null));
  }, []);

  useEffect(() => {
    getTeamMembers()
      .then(setTeamMembers)
      .catch(() => setTeamMembers([]));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white ">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden container lg:max-w-[1400px] mx-auto">
        <img
          src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927928/aboutus_fl8vuc.png"
          alt="About Us Background"
          className="absolute inset-0 w-full h-full object-cover mt-20 lg:mt-28"
        />

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 ">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase pb-2 text-white">
            ABOUT US
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl uppercase text-white/90">
            KNOW OUR PATH
          </p>
        </div>
      </div>

      {/* Introductory Section */}
      <div className="py-12 md:py-16 px-4 md:px-0 bg-black">
        <div className="container lg:max-w-[1400px] mx-auto">
          <h2 className="text-5xl lg:text-8xl font-bold uppercase md:mb-16 leading-tight">
            BEGAN AS A SIMPLE <span className="text-[#FF0000]">IDEA</span>,
            <br /> NOW GROWN INTO A{" "}
            <span className="text-[#FF0000]">JOURNEY</span>
          </h2>

          {/* Logos */}
          <div className="py-4 flex justify-center h-[240px] lg:h-[400px]">
            <img
              src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769928007/logos_kceqmn.png"
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
      <div className="relative w-full bg-black py-12">
        <img
          src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927519/bg_do9pwv.png"
          className="absolute inset-0 opacity-70 w-full h-full object-cover"
        />
        <div className="bg-black z-10 py-8 md:py-16 relative">
          <div className=" text-white px-4 md:px-0">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-5xl lg:text-7xl font-bold uppercase text-center mb-12 md:mb-16">
                MEET OUR CEO
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* CEO Image */}
                <div className="flex justify-center md:justify-start">
                  <img
                    src={ceo?.imageUrl || ""}
                    alt={
                      ceo
                        ? `${ceo.firstName} ${ceo.lastName}`.trim() || "CEO"
                        : "CEO"
                    }
                    className="w-full max-w-md h-auto object-cover"
                  />
                </div>

                {/* CEO Info */}
                <div className="h-full">
                  {ceo?.firstName || ceo?.lastName ? (
                    <h3 className="text-3xl md:text-4xl uppercase lg:text-5xl font-bold text-white mb-2">
                      {ceo.firstName && (
                        <span className="text-[#d80000]">{ceo.firstName} </span>
                      )}
                      {ceo.lastName}
                    </h3>
                  ) : (
                    <h3 className="text-3xl md:text-4xl uppercase lg:text-5xl font-bold text-white mb-2">
                      <span className="text-[#d80000]"> Raj </span> kumar
                    </h3>
                  )}
                  {(ceo?.position || ceo?.companyName) && (
                    <p className="text-lg md:text-xl text-white/80 mb-6 uppercase">
                      {ceo.position && (
                        <span className="text-red-800">{ceo.position}</span>
                      )}
                      {ceo.position && ceo.companyName && " "}
                      {ceo.companyName}
                    </p>
                  )}
                  <p className="text-white/90 text-sm md:text-base leading-relaxed py-7">
                    {ceo?.description || (
                      <>
                        Lorem ipsum dolor sit amet consectetur. Maecenas varius
                        sit consequat vulputate urna augue. Faucibus adipiscing
                        aenean mi diam. Ac bibendum elementum aliquet Lorem
                        ipsum dolor sit amet consectetur. Maecenas varius sit
                        consequat vulputate urna augue. Faucibus adipiscing
                        aenean mi diam. Ac bibendum elementum aliquet Lorem
                        ipsum dolor sit amet consectetur. Maecenas varius sit
                        consequat vulputate urna augue. Faucibus adipiscing
                        aenean mi diam. Ac bibendum elementum aliquet Lorem
                        ipsum dolor sit amet consectetur. Maecenas varius sit
                        consequat vulputate urna augue. Faucibus adipiscing
                        aenean mi diam. Ac bibendum elementum aliquet
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team Section - image, full name, position */}
      <div className="py-12 md:py-20 bg-black">
        <div className="container lg:max-w-[1400px] mx-auto max-w-7xl px-4">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase text-center mb-12 md:mb-16">
            OUR TEAM
          </h2>

          {teamMembers.length === 0 ? (
            <p className="text-white/50 text-center py-8">
              No team members yet.
            </p>
          ) : (
            <div
              onMouseEnter={() => teamSwiperRef.current?.autoplay?.stop()}
              onMouseLeave={() => teamSwiperRef.current?.autoplay?.start()}
            >
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={teamMembers.length > 1}
                onSwiper={(swiper) => {
                  teamSwiperRef.current = swiper;
                }}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 10 },
                }}
                className={`team-swiper ${
                  teamMembers.length <= 1
                    ? "center-slides-1"
                    : teamMembers.length <= 3
                      ? "center-slides-few"
                      : ""
                }`}
              >
                {teamMembers.map((member) => (
                  <SwiperSlide key={member.id}>
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="w-60 h-60 rounded-full overflow-hidden bg-gray-700 shrink-0">
                        <img
                          src={member.imageUrl}
                          alt={member.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-white font-semibold capitalize text-base md:text-lg lg:text-xl mt-4 mb-1">
                        {member.fullName}
                      </h4>
                      <p className="text-[#FF0000] uppercase text-xs md:text-sm">
                        {member.position}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
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
