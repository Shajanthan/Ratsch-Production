import Button from "@/components/Button";
import React from "react";
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import { GrFormNext } from "react-icons/gr";

const UNDER_PRODUCTION_IMG =
  "https://res.cloudinary.com/dybv1h20q/image/upload/v1769929837/Error_Page-_Under_Maintenance_1_asbgqs.png";
const UNDER_PRODUCTION_MOBILE_IMG =
  "https://res.cloudinary.com/dybv1h20q/image/upload/v1769929836/Mobile_View_2_ndhcp2.png";

const UnderProduction: React.FC = () => {
  const socialMediaIcons = [
    { Icon: FaFacebook },
    { Icon: FaInstagram },
    { Icon: FaXTwitter },
    { Icon: FaYoutube },
    { Icon: FaTiktok },
  ];
  return (
    <div className="w-screen min-h-[100dvh] h-screen bg-no-repeat bg-center text-white relative bg-full-size-mobile lg:bg-cover under-prod-bg">
      <style>{`
        .under-prod-bg { background-image: url(${UNDER_PRODUCTION_MOBILE_IMG}); }
        @media (min-width: 768px) { .under-prod-bg { background-image: url(${UNDER_PRODUCTION_IMG}); } }
      `}</style>
      <div className="w-full h-full min-h-[100dvh] flex flex-col items-center justify-between">
        {/* Logo */}
        <div className="bg-white lg:pt-12 pt-6 absolute top-0 left-1/2 transform -translate-x-1/2 w-[70%] max-w-[600px] h-[100px] lg:h-[170px] rounded-b-[30px] sm:rounded-b-[40px] md:rounded-b-[50px] flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769930090/RB_1_1_nlaoej.png"
            alt="logo"
            className="object-fill w-1/2 sm:w-1/3 lg:w-1/2"
          />
        </div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 sm:gap-4 w-full">
          {/* Heading */}
          <div className="flex flex-col text-center pt-40 md:pt-16">
            <span className="text-[12px] sm:text-base md:text-lg lg:text-xl font-poppins font-medium leading-tight">
              The Website is
            </span>
            <span className="uppercase text-[32px] sm:text-[45px] md:text-[55px] lg:text-[70px] font-bold font-raleway leading-tight">
              Under
            </span>
            <span className="uppercase text-[40px] sm:text-[70px] md:text-[90px] lg:text-[110px] font-extrabold font-raleway leading-none tracking-superwide">
              Production
            </span>
          </div>
          {/* Contact us button */}
          <div className="pt-4 lg:pt-10">
            <Button
              text="Contact Us"
              textIcon={<GrFormNext size={24} />}
              color="#333333"
              icon={<CiMail className="w-4 h-4 md:w-6 md:h-6" />}
              navButton={false}
            />
          </div>
        </div>

        {/* Social Media Icons - Bottom */}
        <div className="pb-48 lg:pb-28 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
          {socialMediaIcons.map(({ Icon }, index) => (
            <div
              key={index}
              className="bg-white rounded-full p-1.5 sm:p-2 shadow-lg text-[#CCCCCC] hover:bg-[#333333] hover:text-white transition-colors duration-500 cursor-pointer"
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnderProduction;
