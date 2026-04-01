import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsTelephone, BsTwitterX } from "react-icons/bs";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import {
  getNavbarCategories,
  type NavbarCategory,
} from "@/services/navbarCategoryService";

const RatschFooter: React.FC = () => {
  const location = useLocation();
  const [categories, setCategories] = useState<NavbarCategory[]>([]);
  const basePath = location.pathname.startsWith("/demo") ? "/demo" : "";

  useEffect(() => {
    getNavbarCategories()
      .then((data) =>
        setCategories(
          data.slice().sort((a, b) => (a.order || 0) - (b.order || 0)),
        ),
      )
      .catch(() => setCategories([]));
  }, []);

  const homeHref = basePath || "/";
  const contactHref = `${homeHref}#contact`;
  const categoryHref = (key: string) => {
    if (key === "home") return homeHref;
    if (key === "about") return `${basePath}/about`;
    if (key === "contact") return contactHref;
    if (key === "production") return `${basePath}/production`;
    if (key === "creative" || key === "digital") {
      const params = new URLSearchParams();
      params.set("category", key);
      return `${basePath}/digital-projects?${params.toString()}`;
    }
    return `${homeHref}#${key}`;
  };

  return (
    <div className="bg-[#02244A] text-white px-4 md:px-10 py-10 md:py-20">
      <div className="mx-auto lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-0">
          <div className="lg:col-span-2 px-2 max-w-lg">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase pb-4">
              Ratsch
            </div>
            <div className="text-sm md:text-base w-full ">
              RATSCH Productions is a creative studio focused on cinematic
              storytelling and high-quality visual production. We partner with
              brands and businesses to craft purposeful, engaging content that
              inspires and delivers impact.
            </div>

            <div className="py-4">
              <div className="text-base md:text-lg">
                <div className="list-none uppercase font-semibold">
                  <li className="flex gap-2 md:gap-3 items-center py-1 hover:text-blue-500 cursor-pointer transition-colors duration-300 text-sm md:text-base">
                    <BsTelephone className="flex-shrink-0" />
                    <span className="break-all">+94 77 14141411</span>
                  </li>
                  <li className="flex gap-2 md:gap-3 items-center py-1 hover:text-blue-500 cursor-pointer transition-colors duration-300 text-sm md:text-base">
                    <FaWhatsapp className="flex-shrink-0" />
                    <span className="break-all">+94 77 14141411</span>
                  </li>
                  <li className="flex gap-2 md:gap-3 items-center py-1 hover:text-blue-500 cursor-pointer transition-colors duration-300 text-sm md:text-base">
                    <HiOutlineLocationMarker className="flex-shrink-0" />
                    <span>Sri Lanka / Switzerland</span>
                  </li>
                  <li className="flex gap-2 md:gap-3 items-center py-1 hover:text-blue-500 cursor-pointer transition-colors duration-300 text-sm md:text-base">
                    <MdOutlineMailOutline className="flex-shrink-0" />
                    <span className="break-all">
                      info@ratschproductions.com
                    </span>
                  </li>
                </div>
              </div>
            </div>
            <div className="flex gap-3 md:gap-4 px-0 lg:px-3 py-4 md:py-6">
              <div className="hover:text-blue-500 cursor-pointer transition-colors duration-300">
                <FaFacebook size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="hover:text-blue-500 cursor-pointer transition-colors duration-300">
                <FaInstagram size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="hover:text-blue-500 cursor-pointer transition-colors duration-300">
                <FaYoutube size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="hover:text-blue-500 cursor-pointer transition-colors duration-300">
                <BsTwitterX size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="hover:text-blue-500 cursor-pointer transition-colors duration-300">
                <FaTiktok size={24} className="md:w-7 md:h-7" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col lg:flex-row gap-6 lg:gap-2 w-full lg:justify-between px-3 lg:px-6">
            <div className="">
              {categories.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-4 list-none">
                  <div className="">
                    <div className="pb-2 text-lg cursor-pointer block font-bold uppercase text-white">
                      Links
                    </div>
                    <div className="list-none px-0 md:px-3">
                      <li className="py-0.5">
                        <Link
                          to={homeHref}
                          className="hover:text-blue-500 font-semibold cursor-pointer transition-colors duration-300 block text-sm text-white/80"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          - Home
                        </Link>
                      </li>
                      <li className="py-0.5">
                        <Link
                          to={`${basePath}/about`}
                          className="hover:text-blue-500 font-semibold cursor-pointer transition-colors duration-300 block text-sm text-white/80"
                        >
                          - About us
                        </Link>
                      </li>
                      <li className="py-0.5">
                        <Link
                          to={contactHref}
                          className="hover:text-blue-500 font-semibold cursor-pointer transition-colors duration-300 block text-sm text-white/80"
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
                          - Contact us
                        </Link>
                      </li>
                    </div>
                  </div>

                  {categories.map((category) => (
                    <li
                      key={category.id || category.key}
                      className="text-base md:text-lg"
                    >
                      <Link
                        to={categoryHref(category.key)}
                        className="hover:text-blue-500 pb-2 text-lg cursor-pointer transition-colors duration-300 block font-bold uppercase text-white"
                      >
                        {category.title}
                      </Link>
                      {Array.isArray(category.items) &&
                        category.items.length > 0 && (
                          <ul className="">
                            {category.items.map((subItem) => {
                              const params = new URLSearchParams();
                              params.set("category", category.key);
                              params.set("sub", subItem);
                              return (
                                <li
                                  key={`${category.key}-${subItem}`}
                                  className="py-0.5"
                                >
                                  <Link
                                    to={`${basePath}/digital-projects?${params.toString()}`}
                                    className="hover:text-blue-500 font-semibold cursor-pointer transition-colors duration-300 block text-sm text-white/80"
                                  >
                                    - {subItem}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              ) : (
                <li className="py-1 text-sm md:text-base text-white/70">
                  No categories available
                </li>
              )}
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex justify-end items-center pt-5 lg:pt-0">
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <div className="uppercase font-semibold text-xl md:text-2xl lg:text-3xl text-center lg:text-left">
                Let's connect
              </div>
              <div className="py-4 md:py-5  lg:w-[370px] mx-auto group">
                <div className=" flex justify-between bg-[#222222] rounded-full items-center pr-6 border border-[#333333] group-hover:border-blue-500 transition-all duration-500 cursor-pointer">
                  <input
                    type="text"
                    className="bg-[#333333] text-white rounded-full p-3 px-7 w-[300px] text-base border border-[#333333] group-hover:border-blue-500 transition-all duration-500"
                    placeholder="info@ratschproductions.com"
                  />
                  <MdOutlineMailOutline
                    size={20}
                    className="md:w-7 md:h-7 flex-shrink-0 group-hover:text-blue-500 transition-colors duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 order-2 lg:order-none max-w-lg px-3">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-16 text-xs md:text-sm p-4 border-t-0 lg:border-t-2 border-white justify-center items-center">
              <div className="">
                {" "}
                Copyright © Ratsch Productions - {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatschFooter;
