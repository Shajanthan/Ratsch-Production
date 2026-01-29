import React from "react";
import { BsTelephone, BsTwitterX } from "react-icons/bs";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";

const Footer: React.FC = () => {
  return (
    <div className="bg-black text-white px-4 md:px-10 py-10 md:py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-0">
          <div className="lg:col-span-3 px-0 lg:px-3">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase pb-4">
              Ratsch
            </div>
            <div className="text-sm md:text-base w-full lg:w-[500px]">
              Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
              consequat vulputate urna augue. Faucibus adipiscing aenean mi
              diam. Ac bibendum elementum aliquet
            </div>
            <div className="flex gap-3 md:gap-4 px-0 lg:px-3 py-4 md:py-6">
              <div className="hover:text-red-800 cursor-pointer transition-colors duration-300">
                <FaFacebook size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="hover:text-red-800 cursor-pointer transition-colors duration-300">
                <FaInstagram size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="hover:text-red-800 cursor-pointer transition-colors duration-300">
                <FaYoutube size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="hover:text-red-800 cursor-pointer transition-colors duration-300">
                <BsTwitterX size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="hover:text-red-800 cursor-pointer transition-colors duration-300">
                <FaTiktok size={24} className="md:w-7 md:h-7" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col md:flex-row gap-6 md:gap-2 w-full justify-between">
            <div className="">
              <div className="font-semibold uppercase pb-3 md:pb-4 text-base md:text-lg">
                Links
              </div>
              <div className="list-none px-0 md:px-3">
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1">
                  Home
                </li>
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1">
                  About us
                </li>
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1">
                  Contact us
                </li>
              </div>
            </div>

            <div className="">
              <div className="font-semibold uppercase pb-3 md:pb-4 text-base md:text-lg">
                Services
              </div>
              <div className="list-none px-0 md:px-3">
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1 text-sm md:text-base">
                  Commercial Production
                </li>
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1 text-sm md:text-base">
                  Video Production
                </li>
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1 text-sm md:text-base">
                  Post Production
                </li>
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1 text-sm md:text-base">
                  Sound Design & Finishing
                </li>
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1 text-sm md:text-base">
                  Animation & Motion Graphics
                </li>
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1 text-sm md:text-base">
                  Professional Photography
                </li>
              </div>
            </div>

            <div className="text-base md:text-lg">
              <div className="list-none uppercase font-semibold">
                <li className="flex gap-2 md:gap-3 items-center py-1 hover:text-red-800 cursor-pointer transition-colors duration-300 text-sm md:text-base">
                  <BsTelephone className="flex-shrink-0" />
                  <span className="break-all">+94 77 14141411</span>
                </li>
                <li className="flex gap-2 md:gap-3 items-center py-1 hover:text-red-800 cursor-pointer transition-colors duration-300 text-sm md:text-base">
                  <HiOutlineLocationMarker className="flex-shrink-0" />
                  <span>Sri Lanka / Switzerland</span>
                </li>
                <li className="flex gap-2 md:gap-3 items-center py-1 hover:text-red-800 cursor-pointer transition-colors duration-300 text-sm md:text-base">
                  <MdOutlineMailOutline className="flex-shrink-0" />
                  <span className="break-all">info@ratschproductions.com</span>
                </li>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 md:pt-28 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 max-w-7xl mx-auto">
          <div className="w-full md:w-auto order-2 md:order-none">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-16 text-xs md:text-sm p-4 border-t-0 md:border-t-2 border-white">
              <div className="">Copyright © Ratsch Productions </div>
              <div className="flex items-center gap-2">
                <FaHeart className="text-red-600" size={12} />
                <span>Designed by TD Creatives</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-col items-center md:items-start order-1 md:order-none">
            <div className="uppercase font-semibold text-xl md:text-2xl lg:text-3xl text-center lg:text-left">
              Let's connect
            </div>
            <div className="py-4 md:py-5 w-full max-w-[250px] md:max-w-none mx-auto md:mx-0">
              <div className="flex justify-between bg-[#222222] rounded-full items-center pr-4 md:pr-12">
                <div className="bg-[#333333] text-white rounded-full p-3 md:p-5 px-4 md:px-10 mr-2 md:mr-8 text-xs md:text-base">
                  info@ratschproductions.com
                </div>
                <MdOutlineMailOutline
                  size={20}
                  className="md:w-7 md:h-7 flex-shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
