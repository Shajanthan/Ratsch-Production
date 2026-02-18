import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import Footer from "@/layout/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  getServices,
  slugFromTitle,
  type Service,
} from "../services/serviceService";

interface ServiceData {
  id: string;
  title: string;
  tagline: string;
  image: string;
  about: string;
  deliverables: string;
  works: string[];
  brands: string[];
}

function mapApiServiceToPageData(s: Service): ServiceData {
  return {
    id: s.id ?? "",
    title: s.title,
    tagline: s.tagLine,
    image: s.mainImageUrl || "",
    about: s.aboutDescription || "",
    deliverables: s.deliverables || "",
    works: Array.isArray(s.serviceImageUrls) ? s.serviceImageUrls : [],
    brands: Array.isArray(s.brandImageUrls) ? s.brandImageUrls : [],
  };
}

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Start at top when opening or changing service
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const param = id ?? "";
    if (!param) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    getServices()
      .then((list) => {
        if (cancelled) return;
        const bySlug = list.find((s) => slugFromTitle(s.title) === param);
        const byId = list.find((s) => s.id === param);
        const match = bySlug ?? byId;
        if (!match?.id) {
          setNotFound(true);
          setService(null);
          setLoading(false);
          return;
        }
        // Use list data directly (already prefetched); detail is cached so no extra wait
        setService(mapApiServiceToPageData(match));
      })
      .catch(() => {
        if (!cancelled) {
          setNotFound(true);
          setService(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!id || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">
            {loading ? "Loading…" : "Service Not Found"}
          </h1>
        </div>
      </div>
    );
  }

  if (notFound || !service) {
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
          src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927519/bg_do9pwv.png"
          className="absolute inset-0 opacity-70 w-full h-full object-cover"
        />
        <div className="relative z-20 container lg:max-w-[1400px] mx-auto min-h-screen flex items-center px-4 md:px-0 w-full">
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
                <p className="text-white/90 text-lg md:text-2xl lg:text-3xl font-semibold uppercase">
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
          src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927519/bg_do9pwv.png"
          className="absolute inset-0 opacity-70 w-full h-full object-cover"
        />
        <div className="bg-black z-10 relative">
          <div className="container lg:max-w-[1400px] mx-auto text-white px-4 py-12 md:pt-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center mb-8 md:mb-12">
              ABOUT THE SERVICE
            </h2>
            <div className="max-w-4xl mx-auto">
              {service.about ? (
                <div
                  className="text-white/90 text-sm md:text-base leading-relaxed whitespace-pre-wrap"
                  style={{ fontFamily: "inherit" }}
                >
                  {service.about}
                </div>
              ) : null}
            </div>
          </div>
          <div className="container lg:max-w-[1400px] mx-auto text-white px-4 py-12 md:py-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center mb-8 md:mb-12">
              DELIVERABLES
            </h2>
            <div className="max-w-4xl mx-auto">
              {service.deliverables ? (
                <div
                  className="text-white/90 text-sm md:text-base leading-relaxed whitespace-pre-wrap"
                  style={{ fontFamily: "inherit" }}
                >
                  {service.deliverables}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Our Works Section */}
      {service.works && service.works.length > 0 && (
        <div className="relative w-full py-12 md:py-20">
          <img
            src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927519/bg_do9pwv.png"
            className="absolute inset-0 opacity-70 w-full h-full object-cover"
          />
          <div className="bg-black z-10 relative">
            <div className="container lg:max-w-[1400px] mx-auto text-white px-4 py-12 md:py-20">
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
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                        <div className="h-[300px] md:h-[400px] overflow-hidden rounded-lg ">
                          <img
                            src={work}
                            alt={`Work ${index + 1}`}
                            className="w-full h-full object-cover "
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
        <div className="relative w-full pb-12">
          <img
            src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927519/bg_do9pwv.png"
            className="absolute inset-0 opacity-70 w-full h-full object-cover"
          />
          <div className="bg-black z-10 relative">
            <div className="container lg:max-w-[1400px] mx-auto text-white px-4 py-12 md:py-20">
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
                          className="w-full h-full object-contain"
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

      <div className="relative w-full pb-6">
        <img
          src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927519/bg_do9pwv.png"
          className="absolute inset-0 opacity-70 w-full h-full object-cover"
        />
        <div className="bg-black z-10 relative">
          <div className="bg-black z-10 py-8 md:py-16 relative">
            <div className="container mx-auto text-white px-4 md:px-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 md:pb-8">
                <div className="text-4xl md:text-5xl lg:text-6xl uppercase font-bold">
                  Lets Connect
                </div>
                <button
                  type="button"
                  onClick={() =>
                    navigate("/demo", { state: { scrollTo: "contact" } })
                  }
                  className="flex-shrink-0 uppercase rounded-full font-bold px-6 md:px-10 py-2 md:py-3 flex items-center gap-2 md:gap-3 text-sm md:text-lg bg-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 w-fit group"
                >
                  contact us
                  <BsArrowUpRight
                    strokeWidth={2}
                    size={14}
                    className="md:w-4 md:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </button>
              </div>

              {/* info */}
              <div className="uppercase grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                <div className="py-2 md:py-3">
                  <div className="text-sm md:text-base lg:text-lg">Email</div>
                  <div className="text-xl md:text-2xl font-semibold py-1 md:py-2 break-all">
                    info@ratschproductions.com
                  </div>
                </div>
                <div className="py-2 md:py-3">
                  <div className="text-sm md:text-base lg:text-lg">Phone</div>
                  <div className="text-xl md:text-2xl font-semibold py-1 md:py-2">
                    +94 7174123456
                  </div>
                </div>
                <div className="py-2 md:py-3">
                  <div className="text-sm md:text-base lg:text-lg">Address</div>
                  <div className="text-xl md:text-2xl font-semibold py-1 md:py-2">
                    Sri Lanka / Switzerland
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServiceDetailsPage;
