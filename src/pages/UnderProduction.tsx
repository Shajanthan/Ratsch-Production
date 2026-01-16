import Button from "@/components/Button";
import React from "react";
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import { GrFormNext } from "react-icons/gr";

const UnderProduction: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen bg-under-production bg-center bg-cover bg-no-repeat text-white relative">
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-between">
        {/* Logo */}
        <div className="bg-white absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[200px] rounded-b-[50px] flex items-center justify-center">
          <img
            src="/assets/images/Favicon.png"
            alt="logo"
            className="object-cover"
          />
        </div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          {/* Heading */}
          <div className="flex flex-col text-center pt-16">
            <span className="text-xl font-poppins font-medium leading-tight">
              The Website is
            </span>
            <span className="uppercase text-[70px] font-bold font-raleway leading-tight">
              Under
            </span>
            <span className="uppercase text-[110px] font-extrabold font-raleway leading-none tracking-superwide">
              Production
            </span>
          </div>
          {/* Contact us button */}
          <div className="pt-10">
            <Button
              text="Contact Us"
              textIcon={<GrFormNext size={24} />}
              color="#333333"
              icon={<CiMail size={24} />}
            />
          </div>
        </div>

        {/* Social Media Icons - Bottom */}
        <div className="pb-28 flex items-center justify-center gap-4">
          <div className="bg-white rounded-full p-2 shadow-lg text-[#CCCCCC] hover:bg-[#333333] hover:text-white transition-colors duration-500 cursor-pointer">
            <FaFacebook size={28} />
          </div>
          <div className="bg-white rounded-full p-2 shadow-lg text-[#CCCCCC] hover:bg-[#333333] hover:text-white transition-colors duration-500 cursor-pointer">
            <FaInstagram size={28} />
          </div>
          <div className="bg-white rounded-full p-2 shadow-lg text-[#CCCCCC] hover:bg-[#333333] hover:text-white transition-colors duration-500 cursor-pointer">
            <FaXTwitter size={28} />
          </div>
          <div className="bg-white rounded-full p-2 shadow-lg text-[#CCCCCC] hover:bg-[#333333] hover:text-white transition-colors duration-500 cursor-pointer">
            <FaYoutube size={28} />
          </div>
          <div className="bg-white rounded-full p-2 shadow-lg text-[#CCCCCC] hover:bg-[#333333] hover:text-white transition-colors duration-500 cursor-pointer">
            <FaTiktok size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderProduction;
