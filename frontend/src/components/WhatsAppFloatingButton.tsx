import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloatingButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/94724718466"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 flex items-center justify-center hover:scale-105 transition-transform duration-300"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppFloatingButton;
