import React from "react";

interface RatschReviewCardProps {
  name: string;
  position: string;
  review: string;
  profile?: string;
}

const RatschReviewCard: React.FC<RatschReviewCardProps> = ({
  name,
  position,
  review,
  profile,
}) => {
  return (
    <div className="p-4 md:p-6 lg:p-8 rounded-[25px] md:rounded-[35px] bg-white border-zinc-200 border shadow-md flex flex-col h-full">
      <div className="flex-1">
        <img
          src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774872292/1_yihbgx.png"
          alt=""
          className="w-8 md:w-10 lg:w-auto"
        />
        <div className="py-2 md:py-3 text-sm md:text-base">{review}</div>
      </div>
      <div className="flex items-center gap-3 md:gap-4 mt-auto">
        <div className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-black flex items-center justify-center text-lg md:text-xl font-bold text-[#0557B2]">
          {profile ? (
            <img
              src={profile}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            name.charAt(0)
          )}
        </div>
        <div className="min-w-0">
          <div className="text-[#0557B2] font-semibold text-sm md:text-base">
            {name}
          </div>
          <div className="text-zinc-500 text-xs md:text-sm">{position}</div>
        </div>
      </div>
    </div>
  );
};

export default RatschReviewCard;
