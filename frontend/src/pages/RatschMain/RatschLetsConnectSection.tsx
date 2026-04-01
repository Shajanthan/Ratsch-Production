import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import RevealOnScroll from "@/components/RevealOnScroll";

interface RatschLetsConnectSectionProps {}

const RatschLetsConnectSection: React.FC<
  RatschLetsConnectSectionProps
> = () => {
  return (
    <div className="bg-[#DDDDDD] px-4 pt-6 sm:px-6 md:px-8 md:pt-16 md:pb-6 relative">
      <div className="container mx-auto">
        <RevealOnScroll>
          <div className="flex flex-col gap-4 md:gap-0 md:block">
            <div className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl uppercase font-bold text-[#02244A]">
              Lets Connect
            </div>
            <div className="uppercase rounded-full font-bold px-6 md:px-10 py-3 md:py-4 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-lg bg-[#02244A] hover:scale-105 transition-all duration-300 w-full sm:w-fit group cursor-pointer text-white md:absolute md:top-5 md:right-12">
              Contact Us
              <BsArrowUpRight
                strokeWidth={2}
                size={14}
                className="md:w-4 md:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll
          delayMs={100}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-base sm:text-lg md:text-xl py-6 md:py-8"
        >
          <div className="uppercase text-[#02244A] break-words">
            <div>Email</div>
            <div className="font-bold normal-case">
              info@ratschproductions.com
            </div>
          </div>
          <div className="uppercase text-[#02244A]">
            <div>Phone</div>
            <div className="font-bold normal-case">
              +94 72 471 8466 / +41 78 601 3650
            </div>
          </div>
          <div className="uppercase text-[#02244A]">
            <div>Address</div>
            <div className="font-bold normal-case">Srilanka / Switzerland</div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default RatschLetsConnectSection;
