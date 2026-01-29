import React from "react";

interface ReviewCardProps {
  name: string;
  position: string;
  review: string;
  profile?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  position,
  review,
  profile,
}) => {
  return (
    <div className="p-4 md:p-6 lg:p-8 rounded-[25px] md:rounded-[35px] bg-[#111111] flex flex-col h-full">
      <div className="flex-1">
        <img
          src="/assets/images/quote.png"
          alt=""
          className="w-8 md:w-10 lg:w-auto"
        />
        <div className="py-2 md:py-3 text-sm md:text-base">{review}</div>
      </div>
      <div className="flex items-center gap-3 md:gap-4 mt-auto">
        <div className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-black flex items-center justify-center text-lg md:text-xl font-bold text-[#FF0000] flex-shrink-0">
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
          <div className="text-[#FF0000] font-semibold text-sm md:text-base">
            {name}
          </div>
          <div className="text-[#CCCCCC] text-xs md:text-sm">{position}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
