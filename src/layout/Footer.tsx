import React from "react";
import { BsTelephone, BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";

const Footer: React.FC = () => {
  return (
    <div className="bg-black text-white px-10 py-20 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-7">
          <div className="col-span-3 px-3">
            <div className="text-6xl font-bold uppercase pb-4">Ratsch</div>
            <div className="text-sm w-[500px]">
              Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
              consequat vulputate urna augue. Faucibus adipiscing aenean mi
              diam. Ac bibendum elementum aliquet
            </div>
            <div className="flex gap-4 px-3 py-6">
              <div className="hover:text-red-800 cursor-pointer transition-colors duration-300">
                <FaFacebook size={28} />
              </div>
              <div className="hover:text-red-800 cursor-pointer transition-colors duration-300">
                <FaInstagram size={28} />
              </div>
              <div className="hover:text-red-800 cursor-pointer transition-colors duration-300">
                <FaYoutube size={28} />
              </div>
              <div className="hover:text-red-800 cursor-pointer transition-colors duration-300">
                <BsTwitterX size={28} />
              </div>
              <div className="hover:text-red-800 cursor-pointer transition-colors duration-300">
                <FaTiktok size={28} />
              </div>
            </div>
          </div>
          <div className="col-span-4 flex gap-2 w-full justify-between">
            <div className="">
              <div className="font-semibold uppercase pb-4 text-lg">Links</div>
              <div className="list-none px-3">
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
              <div className="font-semibold uppercase pb-4 text-lg">
                Services
              </div>
              <div className="list-none px-3">
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1">
                  Commercial Production
                </li>
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1">
                  Video Production
                </li>
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1">
                  Post Production
                </li>
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1">
                  Sound Design & Finishing
                </li>
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1">
                  Animation & Motion Graphics
                </li>
                <li className="hover:text-red-800 cursor-pointer transition-colors duration-300 py-1">
                  Professional Photography
                </li>
              </div>
            </div>

            <div className="text-lg">
              <div className="list-none uppercase font-semibold">
                <li className="flex gap-3 items-center py-1 hover:text-red-800 cursor-pointer transition-colors duration-300 ">
                  <BsTelephone />
                  +94 77 14141411
                </li>
                <li className="flex gap-3 items-center py-1 hover:text-red-800 cursor-pointer transition-colors duration-300 ">
                  <HiOutlineLocationMarker />
                  Sri Lanka / Switzerland
                </li>
                <li className="flex gap-3 items-center py-1 hover:text-red-800 cursor-pointer transition-colors duration-300 ">
                  <MdOutlineMailOutline />
                  info@ratschproductions.com
                </li>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-28 flex items-center">
          <div className="grid grid-cols-6">
            <div className="flex gap-16 text-sm p-4 border-t-2 border-white col-span-3">
              <div className="">Copyright © Ratsch Productions </div>
              <li>Designed by TD Creatives </li>
            </div>
          </div>

          <div className="">
            <div className="uppercase font-semibold text-3xl text-center">
              Let's connect
            </div>
            <div className="py-5">
              <div className="flex justify-between bg-[#222222] rounded-full items-center pr-12 ">
                <div className="bg-[#333333] text-white rounded-full p-5 px-10 mr-8">
                  info@ratschproductions.com
                </div>
                <MdOutlineMailOutline size={26} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
