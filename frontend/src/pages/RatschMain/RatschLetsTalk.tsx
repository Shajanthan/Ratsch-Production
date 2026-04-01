import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface RatschLetsTalkProps {}

const RatschLetsTalk: React.FC<RatschLetsTalkProps> = () => {
  return (
    <div className="pt-12 " id="contact">
      <div className="bg-white z-10 py-8 md:py-16 relative">
        <div className="container lg:max-w-[1400px] mx-auto text-[#02244A] px-4 md:px-0">
          <div className="text-4xl md:text-6xl lg:text-8xl uppercase font-bold pb-6 md:pb-8">
            Lets Talk
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 py-8 md:py-12 lg:py-18">
            {/* info */}
            <div className="uppercase">
              <div className="py-2 md:py-3">
                <div className="text-sm md:text-base lg:text-lg">Email</div>
                <div className="text-lg md:text-xl lg:text-3xl font-semibold py-1 md:py-2 break-all">
                  info@ratschproductions.com
                </div>
              </div>
              <div className="py-2 md:py-3">
                <div className="text-sm md:text-base lg:text-lg">Phone</div>
                <div className="text-lg md:text-xl lg:text-3xl font-semibold py-1 md:py-2">
                  +41 78 601 36 50
                </div>
                <div className="text-lg md:text-xl lg:text-3xl font-semibold py-1 md:py-2 flex gap-3 items-center">
                  +94 72 471 8466
                  <FaWhatsapp size={24} className="text-green-500" />
                </div>
              </div>
              <div className="py-2 md:py-3">
                <div className="text-sm md:text-base lg:text-lg">Address</div>
                <div className="text-lg md:text-xl lg:text-3xl font-semibold py-1 md:py-2">
                  Sri Lanka / Switzerland
                </div>
              </div>
            </div>
            {/* Form */}
            <div className="uppercase">
              <div className="py-2 md:py-3">
                <div className="text-sm md:text-base lg:text-lg">Name</div>
                <div className="py-2 md:py-3">
                  <input
                    type="text"
                    className="border hover:cursor-default border-zinc-500 hover:border-[#02244A] transition-all duration-500 rounded-md py-3 md:py-4 bg-zinc-500 w-full lg:w-3/4 focus:ring-1 ring-[#02244A] focus:outline-none px-2 text-sm md:text-base"
                    placeholder="your name here"
                  />
                </div>
              </div>
              <div className="py-2 md:py-3">
                <div className="text-sm md:text-base lg:text-lg">Email</div>
                <div className="py-2 md:py-3">
                  <input
                    type="text"
                    className="border hover:cursor-default border-zinc-500 hover:border-[#02244A] transition-all duration-500 rounded-md py-3 md:py-4 bg-zinc-500 w-full lg:w-3/4 focus:ring-1 ring-[#02244A] focus:outline-none px-2 text-sm md:text-base"
                    placeholder="your email here"
                  />
                </div>
              </div>
              <div className="py-2 md:py-3">
                <div className="text-sm md:text-base lg:text-lg">Message</div>
                <div className="py-2 md:py-3">
                  <textarea
                    rows={6}
                    placeholder="leave your message here"
                    name=""
                    id=""
                    className="border hover:cursor-default border-zinc-500 hover:border-[#02244A] transition-all duration-500 rounded-md py-3 md:py-4 bg-zinc-500 w-full lg:w-3/4 focus:ring-1 ring-[#02244A] focus:outline-none px-2 text-sm md:text-base resize-none"
                  ></textarea>
                </div>
              </div>
              <button className="bg-[#02244A] border p-2 md:p-3 w-full lg:w-3/4 py-4 md:py-5 text-sm md:text-base lg:text-lg hover:border-[#02244A] hover:bg-[#02244A] text-white transition-all duration-500">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatschLetsTalk;
