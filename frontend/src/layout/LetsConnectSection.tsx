import React from "react";

interface LetsConnectSectionProps {
  bottomPadding?: boolean;
}

const LetsConnectSection: React.FC<LetsConnectSectionProps> = ({
  bottomPadding = true,
}) => {
  return (
    <div className="pt-12 bg-black" id="contact">
      <div
        className={`relative w-full bg-black ${bottomPadding ? "pb-12" : ""}`}
      >
        <img
          src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927519/bg_do9pwv.png"
          className="absolute inset-0 opacity-70 w-full h-full object-cover"
        />
        <div className="bg-black z-10 py-8 md:py-16 relative">
          <div className="container lg:max-w-[1400px] mx-auto text-white px-4 md:px-0">
            <div className="text-4xl md:text-6xl lg:text-8xl uppercase font-bold pb-6 md:pb-8">
              Lets Connect
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 py-8 md:py-12 lg:py-18">
              {/* info */}
              <div className="uppercase">
                <div className="py-2 md:py-3">
                  <div className="text-sm md:text-base lg:text-lg">Email</div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-semibold py-1 md:py-2 break-all">
                    info@ratschproductions.com
                  </div>
                </div>
                <div className="py-2 md:py-3">
                  <div className="text-sm md:text-base lg:text-lg">Phone</div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-semibold py-1 md:py-2">
                    +94 7174123456
                  </div>
                </div>
                <div className="py-2 md:py-3">
                  <div className="text-sm md:text-base lg:text-lg">Address</div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-semibold py-1 md:py-2">
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
                      className="border hover:cursor-default border-[#333333] hover:border-[#FF0000] transition-all duration-500 rounded-md py-3 md:py-4 bg-[#333333] w-full lg:w-3/4 focus:ring-1 ring-[#FF0000] focus:outline-none px-2 text-sm md:text-base"
                      placeholder="your name here"
                    />
                  </div>
                </div>
                <div className="py-2 md:py-3">
                  <div className="text-sm md:text-base lg:text-lg">Email</div>
                  <div className="py-2 md:py-3">
                    <input
                      type="text"
                      className="border hover:cursor-default border-[#333333] hover:border-[#FF0000] transition-all duration-500 rounded-md py-3 md:py-4 bg-[#333333] w-full lg:w-3/4 focus:ring-1 ring-[#FF0000] focus:outline-none px-2 text-sm md:text-base"
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
                      className="border hover:cursor-default border-[#333333] hover:border-[#FF0000] transition-all duration-500 rounded-md py-3 md:py-4 bg-[#333333] w-full lg:w-3/4 focus:ring-1 ring-[#FF0000] focus:outline-none px-2 text-sm md:text-base resize-none"
                    ></textarea>
                  </div>
                </div>
                <button className="border-white border p-2 md:p-3 w-full lg:w-3/4 py-4 md:py-5 text-sm md:text-base lg:text-lg hover:border-red-800 transition-colors duration-300">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetsConnectSection;
