import ReviewCard from "@/components/ReviewCard";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const ReviewSection: React.FC = () => {
  const reviews = [
    {
      name: "John Doe",
      position: "CEO, Company A",
      review:
        "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
      profile: "/assets/images/profile.png",
    },
    {
      name: "Jane Smith",
      position: "CEO, Company B",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "Mark Smith",
      position: "CEO, Company C",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      profile: "/assets/images/profile.png",
    },
    {
      name: "William Johnson",
      position: "CEO, Company D",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      profile: "/assets/images/profile.png",
    },
  ];
  return (
    <div className="relative w-full bg-black pb-12">
      <img
        src="/assets/images/bg.png"
        className="absolute inset-0 opacity-70 w-full h-full object-cover"
      />
      <div className="bg-black z-10 py-16 relative">
        <div className="container mx-auto text-white">
          <div className="text-7xl text-center uppercase font-bold">
            Client Reviews
          </div>
          <p className="text-center max-w-4xl mx-auto py-3">
            Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
            consequat vulputate urna augue. Faucibus adipiscing aenean mi diam.
            Ac bibendum elementum aliquet
          </p>

          <div className="mt-12 px-20">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
