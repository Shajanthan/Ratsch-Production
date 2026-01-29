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
    <div className="p-8 rounded-[35px] bg-[#111111] flex flex-col h-full">
      <div className="flex-1">
        <img src="/assets/images/quote.png" alt="" />
        <div className="py-3">{review}</div>
      </div>
      <div className="flex items-center gap-4 mt-auto">
        <div className="rounded-full w-12 h-12 bg-black flex items-center justify-center text-xl font-bold text-[#FF0000]">
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
        <div className="">
          <div className="text-[#FF0000] font-semibold">{name}</div>
          <div className="text-[#CCCCCC]">{position}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
