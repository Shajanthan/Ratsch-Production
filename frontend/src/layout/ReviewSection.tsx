import ReviewCard from "@/components/ReviewCard";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import { getClientReviews } from "@/services/clientReviewService";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const ReviewSection: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [reviews, setReviews] = useState<
    { name: string; position: string; review: string; profile?: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getClientReviews()
      .then((data) => {
        if (!cancelled) {
          setReviews(
            data.map((r) => ({
              name: `${r.firstName} ${r.lastName}`,
              position: r.companyName
                ? `${r.position} at ${r.companyName}`
                : r.position,
              review: r.review,
              profile: r.profilePictureUrl || undefined,
            }))
          );
        }
      })
      .catch(() => {
        if (!cancelled) setReviews([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative w-full bg-black">
      <img
        src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927519/bg_do9pwv.png"
        className="absolute inset-0 opacity-70 w-full h-full object-cover"
      />
      <div className="bg-black z-10 py-8 md:py-16 relative">
        <div className="container mx-auto text-white px-4 md:px-0">
          <div className="text-3xl md:text-5xl lg:text-6xl text-center uppercase font-bold">
            Client Reviews
          </div>
          <p className="text-center max-w-4xl mx-auto py-3 text-sm md:text-base px-4">
            Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
            consequat vulputate urna augue. Faucibus adipiscing aenean mi diam.
            Ac bibendum elementum aliquet
          </p>

          <div
            className="relative mt-8 md:mt-12 px-4 md:px-10 lg:px-20"
            onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
            onMouseLeave={() => swiperRef.current?.autoplay?.start()}
          >
            {/* Left edge gradient (slider start) – desktop only */}
            <div
              className="hidden md:block absolute left-0 top-0 bottom-0 w-20 lg:w-96 z-20 pointer-events-none bg-gradient-to-r from-black to-transparent"
              aria-hidden
            />
            {/* Right edge gradient (slider end) – desktop only */}
            <div
              className="hidden md:block absolute right-0 top-0 bottom-0 w-20 lg:w-96 z-20 pointer-events-none bg-gradient-to-l from-black to-transparent"
              aria-hidden
            />
            {loading ? (
              <div className="min-h-[200px] flex items-center justify-center text-white/60 text-sm">
                Loading reviews…
              </div>
            ) : reviews.length === 0 ? (
              <div className="min-h-[200px] flex items-center justify-center text-white/50 text-sm">
                No client reviews yet.
              </div>
            ) : (
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={reviews.length > 1}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                pagination={{
                  clickable: true,
                }}
                autoplay={
                  reviews.length > 1
                    ? {
                        delay: 3000,
                        disableOnInteraction: false,
                      }
                    : false
                }
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className="review-swiper"
              >
                {reviews.map((review, index) => (
                  <SwiperSlide key={index} className="h-auto">
                    <div className="h-full">
                      <ReviewCard
                        name={review.name}
                        position={review.position}
                        review={review.review}
                        profile={review.profile}
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
  );
};

export default ReviewSection;
