import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { getServices, type Service } from "@/services/serviceService";

const Footer: React.FC = () => {
  const location = useLocation();
  const [services, setServices] = useState<Service[]>([]);
  const basePath = location.pathname.startsWith("/demo") ? "/demo" : "";

  useEffect(() => {
    getServices()
      .then((data) => setServices(data.slice(0, 6)))
      .catch(() => setServices([]));
  }, []);

  const homeHref = basePath || "/";
  const contactHref = `${homeHref}#contact`;

  return (
    <div className="bg-black text-white px-4 md:px-10 py-10 md:py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-0">
          <div className="lg:col-span-3 px-0 lg:px-3">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase pb-4">
              Ratsch
            </div>
            <div className="text-sm md:text-base w-full ">
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
          <div className="lg:col-span-4 flex flex-col lg:flex-row gap-6 lg:gap-2 w-full lg:justify-between">
            <div className="">
              <div className="font-semibold uppercase pb-3 md:pb-4 text-base md:text-lg">
                Links
              </div>
              <div className="list-none px-0 md:px-3">
                <li className="py-1">
                  <Link
                    to={homeHref}
                    className="hover:text-red-800 cursor-pointer transition-colors duration-300 block"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Home
                  </Link>
                </li>
                <li className="py-1">
                  <Link
                    to={`${basePath}/about`}
                    className="hover:text-red-800 cursor-pointer transition-colors duration-300 block"
                  >
                    About us
                  </Link>
                </li>
                <li className="py-1">
                  <Link
                    to={contactHref}
                    className="hover:text-red-800 cursor-pointer transition-colors duration-300 block"
                    onClick={() => {
                      if (
                        location.pathname === homeHref ||
                        location.pathname === homeHref + "/"
                      ) {
                        const el = document.getElementById("contact");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Contact us
                  </Link>
                </li>
              </div>
            </div>

            <div className="">
              <div className="font-semibold uppercase pb-3 md:pb-4 text-base md:text-lg">
                Services
              </div>
              <div className="list-none px-0 md:px-3">
                {services.length > 0 ? (
                  services.map((s) => (
                    <li key={s.id} className="py-1 text-sm md:text-base">
                      <Link
                        to={`${basePath}/service/${s.id}`}
                        className="hover:text-red-800 cursor-pointer transition-colors duration-300 block"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
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
                  </>
                )}
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

        <div className="pt-12 md:pt-28 gap-8 lg:gap-0 mx-auto">
          <div className="flex justify-end items-center pt-5 lg:pt-0">
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <div className="uppercase font-semibold text-xl md:text-2xl lg:text-3xl text-center lg:text-left">
                Let's connect
              </div>
              <div className="py-4 md:py-5  lg:w-[370px] mx-auto group">
                <div className=" flex justify-between bg-[#222222] rounded-full items-center pr-6 border border-[#333333] group-hover:border-[#E30514] transition-all duration-500 cursor-pointer">
                  <input
                    type="text"
                    className="bg-[#333333] text-white rounded-full p-3 px-7 w-[300px] text-base border border-[#333333] group-hover:border-[#E30514] transition-all duration-500"
                    placeholder="info@ratschproductions.com"
                  />
                  <MdOutlineMailOutline
                    size={20}
                    className="md:w-7 md:h-7 flex-shrink-0 group-hover:text-[#E30514] transition-colors duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 order-2 lg:order-none">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-16 text-xs md:text-sm p-4 border-t-0 lg:border-t-2 border-white justify-center items-center">
              <div className="">Copyright © Ratsch Productions </div>
              <div className="flex items-center gap-2">
                <FaHeart className="text-red-600" size={12} />
                <span>Designed by TD Creatives</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
