import React from "react";
import { useParams } from "react-router-dom";
import Footer from "@/layout/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ServiceData {
  id: string;
  title: string;
  tagline: string;
  image: string;
  about: string;
  aboutList?: string[];
  deliverables: string;
  works: string[];
  brands: string[];
}

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock service data - in real app, fetch by ID
  const services: ServiceData[] = [
    {
      id: "video-production",
      title: "VIDEO PRODUCTION",
      tagline: "TURNING IDEAS INTO MOTION, STORIES INTO IMPACT.",
      image: "/assets/images/shoot.png",
      about:
        "We specialize in producing high-impact commercial advertisements that capture attention and communicate brand value effectively. Our team combines creative vision with technical expertise to deliver compelling video content that resonates with your target audience.",
      aboutList: [
        "TV commercials",
        "Digital & social media ads",
        "Product launch campaigns",
        "Lifestyle & brand commercials",
      ],
      deliverables:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet.",
      works: [
        "/assets/images/wedding1.png",
        "/assets/images/wedding2.png",
        "/assets/images/wedding3.png",
        "/assets/images/wedding4.png",
      ],
      brands: [
        "/assets/images/client1.png",
        "/assets/images/client2.png",
        "/assets/images/client3.png",
        "/assets/images/client4.png",
        "/assets/images/client1.png",
      ],
    },
    {
      id: "graphic-designing",
      title: "GRAPHIC DESIGNING",
      tagline: "VISUAL STORYTELLING THAT CAPTURES ATTENTION.",
      image: "/assets/images/Service1.png",
      about:
        "We create visually stunning designs that communicate your brand's message effectively. Our graphic design services cover everything from branding to digital assets, ensuring consistency across all touchpoints.",
      aboutList: [
        "Brand identity design",
        "Print & digital graphics",
        "Social media assets",
        "Marketing materials",
      ],
      deliverables:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet.",
      works: [
        "/assets/images/Service1.png",
        "/assets/images/Service2.png",
        "/assets/images/Service3.png",
      ],
      brands: [
        "/assets/images/client1.png",
        "/assets/images/client2.png",
        "/assets/images/client3.png",
        "/assets/images/client4.png",
        "/assets/images/client1.png",
      ],
    },
    {
      id: "photography",
      title: "PHOTOGRAPHY",
      tagline: "CAPTURING MOMENTS THAT TELL YOUR STORY.",
      image: "/assets/images/Service2.png",
      about:
        "Professional photography services for commercial, lifestyle, and brand campaigns. We deliver high-quality images that showcase your products and services in the best light.",
      aboutList: [
        "Product photography",
        "Commercial shoots",
        "Lifestyle photography",
        "Event coverage",
      ],
      deliverables:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet.",
      works: [
        "/assets/images/wedding1.png",
        "/assets/images/wedding2.png",
        "/assets/images/wedding3.png",
        "/assets/images/wedding4.png",
      ],
      brands: [
        "/assets/images/client1.png",
        "/assets/images/client2.png",
        "/assets/images/client3.png",
        "/assets/images/client4.png",
        "/assets/images/client1.png",
      ],
    },
    {
      id: "sound-production",
      title: "SOUND PRODUCTION",
      tagline: "AUDIO THAT ELEVATES YOUR CONTENT.",
      image: "/assets/images/Service3.png",
      about:
        "Complete sound production services including music composition, sound design, and audio post-production. We create immersive audio experiences that enhance your video content.",
      aboutList: [
        "Music composition",
        "Sound design & foley",
        "Audio post-production",
        "Voice-over recording",
      ],
      deliverables:
        "Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet Lorem ipsum dolor sit amet consectetur. Maecenas varius sit consequat vulputate urna augue. Faucibus adipiscing aenean mi diam. Ac bibendum elementum aliquet.",
      works: [
        "/assets/images/Service1.png",
        "/assets/images/Service2.png",
        "/assets/images/Service3.png",
        "/assets/images/Service1.png",
        "/assets/images/Service2.png",
        "/assets/images/Service3.png",
      ],
      brands: [
        "/assets/images/client1.png",
        "/assets/images/client2.png",
        "/assets/images/client3.png",
        "/assets/images/client4.png",
        "/assets/images/client1.png",
        "/assets/images/client2.png",
        "/assets/images/client3.png",
      ],
    },
  ];

  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Service Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative w-full pt-12 md:pt-10">
        <img
          src="/assets/images/bg.png"
          className="absolute inset-0 opacity-70 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto min-h-screen flex items-center px-4 md:px-0 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center  w-full">
            {/* Left: Image */}
            <div className="order-2 lg:order-1 w-full flex items-center justify-center">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[350px] md:h-[800px] lg:h-[800px] object-cover"
              />
            </div>

            {/* Right: Title and Tagline */}
            <div className="order-1 lg:order-2 w-full">
              <div className="flex flex-col gap-4 flex-start  w-full">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase mb-4 text-white">
                  {service.title}
                </h1>
                <p className="text-white/90 text-lg md:text-2xl lg:text-3xl font-semibold">
                  "{service.tagline}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About The Service Section */}
      <div className="relative w-full">
        <img
          src="/assets/images/bg.png"
          className="absolute inset-0 opacity-70 w-full h-full object-cover"
        />
        <div className="bg-black z-10 relative">
          <div className="container mx-auto text-white px-4 py-12 md:pt-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center mb-8 md:mb-12">
              ABOUT THE SERVICE
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6">
                {service.about}
              </p>
              {service.aboutList && service.aboutList.length > 0 && (
                <div className="mb-6">
                  <p className="text-white/90 text-sm md:text-base mb-4">
                    We manage the complete advertising process:
                  </p>
                  <ul className="list-none font-semibold px-10 list-inside space-y-2 text-white/90 text-sm md:text-base">
                    {service.aboutList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                We craft advertisements with strong storytelling, cinematic
                visuals, and strategic messaging that drive results and build
                lasting brand connections.
              </p>
            </div>
          </div>
          <div className="container mx-auto text-white px-4 py-12 md:py-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center mb-8 md:mb-12">
              DELIVERABLES
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-white/90 text-sm md:text-base leading-relaxed text-justify">
                {service.deliverables}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Works Section */}
      {service.works && service.works.length > 0 && (
        <div className="relative w-full py-12 md:py-20">
          <img
            src="/assets/images/bg.png"
            className="absolute inset-0 opacity-70 w-full h-full object-cover"
          />
          <div className="bg-black z-10 relative">
            <div className="container mx-auto text-white px-4 py-12 md:py-20">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center mb-8 md:mb-12">
                OUR WORKS
              </h2>
              <div className="max-w-6xl mx-auto">
                {service.works.length < 3 ? (
                  <div className="flex justify-center gap-4 md:gap-6">
                    {service.works.map((work, index) => (
                      <div
                        key={index}
                        className="h-[300px] md:h-[400px] w-full max-w-[400px] overflow-hidden rounded-lg"
                      >
                        <img
                          src={work}
                          alt={`Work ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{
                      clickable: true,
                    }}
                    breakpoints={{
                      640: { slidesPerView: 2, spaceBetween: 20 },
                      1024: { slidesPerView: 3, spaceBetween: 20 },
                    }}
                    className="service-works-swiper"
                  >
                    {service.works.map((work, index) => (
                      <SwiperSlide key={index}>
                        <div className="h-[300px] md:h-[400px] overflow-hidden rounded-lg">
                          <img
                            src={work}
                            alt={`Work ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brands Section */}
      {service.brands && service.brands.length > 0 && (
        <div className="relative w-full pb-12 md:pb-20">
          <img
            src="/assets/images/bg.png"
            className="absolute inset-0 opacity-70 w-full h-full object-cover"
          />
          <div className="bg-black z-10 relative">
            <div className="container mx-auto text-white px-4 py-12 md:py-20">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center mb-8 md:mb-12">
                BRANDS
              </h2>
              <div className="max-w-7xl mx-auto">
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                  }}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 30 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                  }}
                  className="service-brands-swiper"
                >
                  {service.brands.map((brand, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full h-full md:h-[150px] flex items-center justify-center bg-white/5 rounded-lg">
                        <img
                          src={brand}
                          alt={`Brand ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServiceDetailsPage;
