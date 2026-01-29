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
      <div className="bg-black z-10 py-16 relative">
        <div className="container mx-auto text-white">
          <div className="text-7xl text-center uppercase font-bold">
            Our Clients
          </div>
          <p className="text-center max-w-4xl mx-auto py-3">
            Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
            consequat vulputate urna augue. Faucibus adipiscing aenean mi diam.
            Ac bibendum elementum aliquet
          </p>
          <div className="flex justify-center items-center gap-3 py-6 ">
            {clients.map((client, index) => (
              <img
                src={client.image}
                className="hover:scale-105 transition-all duration-500"
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurClientsSection;
