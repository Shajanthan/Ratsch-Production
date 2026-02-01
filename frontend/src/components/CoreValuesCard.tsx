import React from "react";

interface CoreValuesCardProps {
  title: string;
  desc: string;
  image: string;
  className?: string;
  titles?: string[];
  activeIndex?: number;
  onSelectIndex?: (index: number) => void;
}

const CoreValuesCard: React.FC<CoreValuesCardProps> = ({
  title,
  desc,
  image,
  className,
  titles,
  activeIndex,
  onSelectIndex,
}) => {
  return (
    <div className={["w-full relative", className].filter(Boolean).join(" ")}>
      <img
        src={image}
        alt={title}
        className="w-full h-[400px] md:h-auto object-cover"
      />

      {/* Overlay: content on image */}
      <div className="absolute inset-0 flex flex-col  ">
        {/* subtle vignette for readability */}
        <div className="absolute inset-0 bg-black/25" />

        <div className="py-12 md:py-24 lg:py-32 flex flex-col flex-1 relative z-10">
          {/* Centered title + description */}
          <div className="relative flex-1 flex items-center justify-center text-center px-4 md:px-6 container lg:max-w-[1400px] mx-auto">
            <div className="max-w-3xl px-4 md:px-10">
              <div className="text-white font-extrabold uppercase tracking-widest text-3xl md:text-5xl lg:text-7xl py-2 md:py-3">
                {title}
              </div>
              <p className="text-white/90 pt-3 md:pt-4 text-sm md:text-base lg:text-lg">
                {desc}
              </p>
            </div>
          </div>

          {/* All titles ON the image (bottom overlay) */}
          {titles && titles.length > 0 && onSelectIndex ? (
            <div className="">
              <div className="container lg:max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-10 justify-center lg:justify-between px-0 lg:px-96 py-4 md:py-6 lg:py-8">
                  {titles.map((t, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => onSelectIndex(index)}
                        aria-current={isActive ? "true" : undefined}
                        className={[
                          "whitespace-nowrap capitalize transition-all",
                          "text-sm md:text-base lg:text-lg xl:text-xl",
                          isActive
                            ? "text-white font-semibold"
                            : "text-white/50 font-medium hover:text-white/80",
                        ].join(" ")}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CoreValuesCard;
