import React from "react";

const LetsConnectSection: React.FC = () => {
  return (
    <div className="relative w-full bg-black pb-12">
      <img
        src="/assets/images/bg.png"
        className="absolute inset-0 opacity-70 w-full h-full object-cover"
      />
      <div className="bg-black z-10 py-16 relative">
        <div className="container mx-auto text-white">
          <div className="text-8xl  uppercase font-bold">Lets Connect</div>
          <div className="grid grid-cols-2 py-18">
            {/* info */}
            <div className="uppercase">
              <div className="py-3">
                <div className="text-lg">Email</div>
                <div className="text-3xl font-semibold py-2">
                  info@ratschproductions.com
                </div>
              </div>
              <div className="py-3">
                <div className="text-lg">Phone</div>
                <div className="text-3xl font-semibold py-2">
                  +94 7174123456
                </div>
              </div>
              <div className="py-3">
                <div className="text-lg">Address</div>
                <div className="text-3xl font-semibold py-2">
                  Sri Lanka / Switzerland
                </div>
              </div>
            </div>
            {/* Form */}
            <div className="uppercase">
              <div className="py-3">
                <div className="text-lg">Name</div>
                <div className="py-3">
                  <input
                    type="text"
                    className="py-4 bg-[#333333] w-3/4 focus:ring-0 focus:outline-none px-2"
                    placeholder="your name here"
                  />
                </div>
              </div>
              <div className="py-3">
                <div className="text-lg">Email</div>
                <div className="py-3">
                  <input
                    type="text"
                    className="py-4 bg-[#333333] w-3/4 focus:ring-0 focus:outline-none px-2"
                    placeholder="your email here"
                  />
                </div>
              </div>
              <div className="py-3">
                <div className="text-lg">Message</div>
                <div className="py-3">
                  <textarea
                    rows={7}
                    placeholder="leave your message here"
                    name=""
                    id=""
                    className="py-4 bg-[#333333] w-3/4 focus:ring-0 focus:outline-none px-2"
                  ></textarea>
                </div>
              </div>
              <button className="border-white border p-3 w-3/4 py-5 text-lg hover:border-red-800 transition-colors duration-300">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetsConnectSection;
