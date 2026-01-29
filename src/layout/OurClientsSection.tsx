import React from "react";

const OurClientsSection: React.FC = () => {
  const clients = [
    { image: "/assets/images/client1.png" },
    { image: "/assets/images/client2.png" },
    { image: "/assets/images/client3.png" },
    { image: "/assets/images/client4.png" },
  ];
  return (
    <div className="relative w-full bg-black pb-12">
      <img
        src="/assets/images/bg.png"
        className="absolute inset-0 opacity-70 w-full h-full object-cover"
      />
      <div className="bg-black z-10 py-8 md:py-16 relative">
        <div className="container mx-auto text-white px-4 md:px-0">
          <div className="text-3xl md:text-5xl lg:text-7xl text-center uppercase font-bold">
            Our Clients
          </div>
          <p className="text-center max-w-4xl mx-auto py-3 text-sm md:text-base px-4">
            Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
            consequat vulputate urna augue. Faucibus adipiscing aenean mi diam.
            Ac bibendum elementum aliquet
          </p>
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-2 md:gap-4 lg:gap-6 py-4 md:py-6">
            {clients.map((client, index) => (
              <div key={index} className="flex justify-center md:block">
                <img
                  src={client.image}
                  className="hover:scale-105 transition-all duration-500 w-full max-w-[240px] md:w-24 md:max-w-none lg:w-auto"
                  alt={`Client ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurClientsSection;
