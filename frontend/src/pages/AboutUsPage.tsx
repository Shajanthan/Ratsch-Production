import React, { useEffect, useState } from "react";
import CoreValueSection from "@/layout/CoreValueSection";
import { getCeoSection, type CeoSection } from "@/services/aboutUsService";
import "swiper/css";
import "swiper/css/pagination";
import RatschFooter from "./RatschMain/RatschFooter";

const AboutUsPage: React.FC = () => {
  // const teamSwiperRef = useRef<SwiperType | null>(null);
  const [ceo, setCeo] = useState<CeoSection | null>(null);
  // const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getCeoSection()
      .then(setCeo)
      .catch(() => setCeo(null));
  }, []);

  // useEffect(() => {
  //   getTeamMembers()
  //     .then(setTeamMembers)
  //     .catch(() => setTeamMembers([]));
  // }, []);

  return (
    <div className="min-h-screen bg-white text-[#02244A] ">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden container lg:max-w-[1800px] mx-auto">
        <img
          src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927928/aboutus_fl8vuc.png"
          alt="About Us Background"
          className="absolute inset-0 w-full h-full object-cover mt-4 rounded-3xl p-2"
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
      <div className="py-12 md:py-16 px-4 md:px-0 bg-white">
        <div className="container lg:max-w-[1400px] mx-auto">
          <h2 className="text-3xl lg:text-8xl font-bold uppercase md:mb-16 leading-tight text-center">
            BEGAN AS A SIMPLE <span className="text-[#E30514]">IDEA</span>,
            <br /> NOW GROWN INTO A{" "}
            <span className="text-[#E30514]">JOURNEY</span>
          </h2>

          {/* Logos */}
          <div className="flex justify-center md:my-6">
            <div className="p-4 rounded-md">
              <img
                className="md:h-[100px] bg-contain"
                src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774418189/RATSCH_GROUP_PNG_1_dkzvsu.png"
                alt="logo"
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-center text-sm md:text-base leading-relaxed max-w-4xl mx-auto pt-6 font-medium">
            RATSCH Productions is a creative and production studio built on the
            power of visual storytelling. Based in Sri Lanka and working across
            international markets, we create cinematic content that elevates
            brands, shapes perception, and leaves a lasting impact.
            <br />
            <br />
            Driven by a new generation of highly skilled creatives and technical
            specialists, we merge storytelling, design, and production into a
            seamless creative process. From concept to final delivery, every
            frame we produce is intentional—crafted with precision, emotion, and
            purpose.
            <br />
            <br />
            We collaborate closely with brands, agencies, and businesses to
            translate ideas into compelling visual experiences. Whether it’s
            commercial advertising, branded films, fashion narratives, or
            experiential productions, our work is rooted in strong creative
            direction and executed with uncompromising production quality.
            <br />
            <br />
            At RATSCH Productions, we believe great visuals do more than look
            good—they communicate, inspire, and perform. Our focus is on
            creating work that not only captures attention, but also delivers
            measurable value and long-term brand impact.
          </p>
        </div>
      </div>

      {/* Meet Our CEO Section */}
      <div className="relative w-full bg-white py-12">
        <div className="bg-white z-10 py-8 md:py-16 relative">
          <div className=" text-white px-4 md:px-0">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl lg:text-7xl font-bold uppercase text-center mb-12 md:mb-16 bg-[#02244A] text-white py-3 rounded-3xl">
                MEET OUR CEO
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* CEO Image */}
                <div className="flex justify-center rounded-3xl">
                  <img
                    src={ceo?.imageUrl || ""}
                    alt={
                      ceo
                        ? `${ceo.firstName} ${ceo.lastName}`.trim() || "CEO"
                        : "CEO"
                    }
                    className="w-full max-w-md h-auto object-cover rounded-3xl"
                  />
                </div>

                {/* CEO Info */}
                <div className="h-full">
                  {ceo?.firstName || ceo?.lastName ? (
                    <h3 className="text-3xl md:text-4xl text-center lg:text-left uppercase lg:text-5xl font-bold text-[#02244A] mb-2">
                      {ceo.firstName && (
                        <span className="text-[#d80000]">{ceo.firstName} </span>
                      )}
                      {ceo.lastName}
                    </h3>
                  ) : (
                    <h3 className="text-3xl md:text-4xl uppercase lg:text-5xl font-bold text-[#02244A] mb-2 text-center lg:text-left">
                      <span className="text-[#d80000]"> Raj </span> kumar
                    </h3>
                  )}

                  <p className="text-lg md:text-xl text-[#02244A] mb-6 uppercase text-center lg:text-left">
                    <span className="text-[#FF0000]">ceo, </span>
                    RATSCH PRODUCTIONS
                  </p>

                  <p className="text-[#02244A] text-sm md:text-base leading-relaxed py-7 text-center lg:text-left">
                    {ceo?.description || (
                      <>
                        At RATSCH Productions, our mission is to combine
                        creativity and precision to craft visual stories that
                        inspire, engage, and deliver real impact. We believe
                        every project is an opportunity to push boundaries,
                        elevate brands, and leave a lasting impression on
                        audiences worldwide.
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
      {/* <div className="py-12 md:py-20 bg-white">
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
                      <h4 className="text-[#02244A] font-semibold capitalize text-base md:text-lg lg:text-xl mt-4 mb-1">
                        {member.fullName}
                      </h4>
                      <p className="text-[#E30514] uppercase text-xs md:text-sm">
                        {member.position}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div> */}

      {/* Quality Section */}
      <CoreValueSection aboutUs={true} />
      {/* Footer */}
      <RatschFooter />
    </div>
  );
};

export default AboutUsPage;
