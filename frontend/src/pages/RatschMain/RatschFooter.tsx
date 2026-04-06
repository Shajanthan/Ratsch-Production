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
import RevealOnScroll from "@/components/RevealOnScroll";

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

  const contactMailto =
    "mailto:info@ratschproductions.com?subject=" +
    encodeURIComponent("Inquiry from Ratsch Productions website");

  const openContactEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(contactMailto, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-[#02244A] text-white py-10 ">
      <div className="mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-6 px-4 md:px-8 xl:px-20">
          <RevealOnScroll className="xl:col-span-2 px-2  max-w-xl">
            <div className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold uppercase pb-4">
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
                <ul className="m-0 list-none p-0 uppercase font-semibold">
                  <li className="py-1 text-sm md:text-base">
                    <a
                      href="tel:+41786013650"
                      className="flex gap-2 md:gap-3 items-center hover:text-blue-500 transition-colors duration-300 text-inherit no-underline"
                    >
                      <BsTelephone className="flex-shrink-0" />
                      <span className="break-all">+41 78 601 36 50</span>
                    </a>
                  </li>
                  <li className="py-1 text-sm md:text-base">
                    <a
                      href="https://wa.me/94724718466"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-2 md:gap-3 items-center hover:text-blue-500 transition-colors duration-300 text-inherit no-underline"
                    >
                      <FaWhatsapp className="flex-shrink-0" />
                      <span className="break-all">+94 72 471 8466</span>
                    </a>
                  </li>
                  <li className="flex gap-2 md:gap-3 items-center py-1 hover:text-blue-500 cursor-pointer transition-colors duration-300 text-sm md:text-base">
                    <HiOutlineLocationMarker className="flex-shrink-0" />
                    <span>Sri Lanka / Switzerland</span>
                  </li>
                  <li className="py-1 text-sm md:text-base normal-case">
                    <a
                      href={contactMailto}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={openContactEmail}
                      className="flex gap-2 md:gap-3 items-center hover:text-blue-500 transition-colors duration-300 text-inherit no-underline cursor-pointer"
                    >
                      <MdOutlineMailOutline className="flex-shrink-0" />
                      <span className="break-all">
                        info@ratschproductions.com
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3 md:gap-4 px-0 xl:px-3 py-4 md:py-6">
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
          </RevealOnScroll>

          <RevealOnScroll
            delayMs={100}
            className="xl:col-span-4 flex flex-col xl:flex-row gap-6 xl:gap-2 w-full xl:justify-between px-3 xl:px-6"
          >
            <div className="w-full">
              {categories.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-x-6 gap-y-4 list-none">
                  <div className="2xl:pl-28">
                    <div className="w-full pb-2 text-lg cursor-pointer block font-bold uppercase text-white">
                      Links
                    </div>
                    <div className="list-none px-0">
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
                      <li className="py-0.5 xl:hidden">
                        <Link
                          to={`${basePath}/digital-projects?category=digital`}
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
                          - Digital
                        </Link>
                      </li>
                      <li className="py-0.5 xl:hidden">
                        <Link
                          to={`${basePath}/digital-projects?category=creative`}
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
                          - Creative
                        </Link>
                      </li>
                      <li className="py-0.5 xl:hidden">
                        <Link
                          to={`${basePath}/production`}
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
                          - Production
                        </Link>
                      </li>
                    </div>
                  </div>
                  {categories.map((category) => (
                    <li
                      key={category.id || category.key}
                      className="text-base md:text-lg hidden xl:block"
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
                              const subItemHref =
                                category.key === "production"
                                  ? `${basePath}/projects?${params.toString()}`
                                  : `${basePath}/digital-projects?${params.toString()}`;
                              return (
                                <li
                                  key={`${category.key}-${subItem}`}
                                  className="py-0.5"
                                >
                                  <Link
                                    to={subItemHref}
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
          </RevealOnScroll>
        </div>

        <RevealOnScroll delayMs={140} className="">
          <div className="flex justify-end items-center pt-5 xl:pt-0">
            <div className="w-full xl:w-1/3 flex flex-col items-center max-w-full">
              <div className="uppercase font-semibold text-xl md:text-2xl lg:text-2xl xl:text-3xl text-center xl:text-left">
                Let's connect
              </div>
              <div className="py-4 md:py-5 w-full max-w-[370px] xl:w-[370px] mx-auto group px-2">
                <div className="flex flex-wrap sm:flex-nowrap justify-between gap-2 bg-[#222222] rounded-full items-center pr-4 sm:pr-6 border border-[#333333] group-hover:border-blue-500 transition-all duration-500 cursor-pointer">
                  <input
                    type="text"
                    className="bg-[#333333] text-white rounded-full p-3 px-5 sm:px-7 min-w-0 flex-1 w-full max-w-[min(100%,300px)] text-base border border-[#333333] group-hover:border-blue-500 transition-all duration-500"
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
          <div className="w-full min-w-full xl:min-w-0 xl:w-1/2 order-2 xl:order-none max-w-2xl px-3 xl:px-20">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-16 text-xs md:text-sm p-4 border-t-0 xl:border-t-2 border-white justify-center items-center text-center xl:text-left">
              <div className="w-full">
                {" "}
                Copyright © Ratsch Productions - {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default RatschFooter;
