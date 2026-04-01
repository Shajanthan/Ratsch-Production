import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import { CiMail } from "react-icons/ci";
import { HiChevronDown, HiMenu, HiX } from "react-icons/hi";
import {
  type NavbarCategory,
  getNavbarCategories,
} from "../services/navbarCategoryService";

const RatschMainNavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(
    null,
  );
  const [categories, setCategories] = useState<NavbarCategory[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        const data = await getNavbarCategories();
        const sorted = data
          .slice()
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(sorted);
      } catch (error) {
        // Fallback silently; navbar still works without dropdowns
        console.error("Failed to load navbar categories", error);
      }
    })();
  }, []);

  const basePath = location.pathname.startsWith("/demo") ? "/demo" : "";
  const homePath = basePath || "/";
  const currentCategory = new URLSearchParams(location.search)
    .get("category")
    ?.trim()
    .toLowerCase();
  const isDigitalProjectsPage =
    location.pathname === `${basePath}/digital-projects` ||
    location.pathname === "/digital-projects";
  const useCreativeDigitalLogo =
    isDigitalProjectsPage &&
    (currentCategory === "creative" || currentCategory === "digital");
  const logoSrc = useCreativeDigitalLogo
    ? "https://res.cloudinary.com/dybv1h20q/image/upload/v1775051660/CREATIVE_DIGITAL_AGENCY_PNG_jh87qu.png"
    : "https://res.cloudinary.com/dybv1h20q/image/upload/v1774418189/RATSCH_GROUP_PNG_1_dkzvsu.png";
  const isOnHome =
    location.pathname === homePath ||
    location.pathname === homePath + "/" ||
    location.pathname === homePath + "//";

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setOpenMobileCategory(null);

    if (sectionId === "home") {
      if (isOnHome) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(homePath);
      }
    } else if (sectionId === "about") {
      navigate(`${basePath}/about`);
    } else if (sectionId === "contact") {
      if (isOnHome) {
        const el = document.getElementById("contact");
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`${homePath}#contact`);
      }
    } else if (sectionId === "production") {
      navigate(`${basePath}/production`);
    } else if (sectionId === "creative" || sectionId === "digital") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const params = new URLSearchParams();
      params.set("category", sectionId);
      navigate(`${basePath}/digital-projects?${params.toString()}`);
    } else {
      // Service and other sections: scroll on home, else navigate to home with state
      if (isOnHome) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(homePath, { state: { scrollTo: sectionId } });
      }
    }
  };

  const handleSubItemClick = (categoryKey: string, subLabel: string) => {
    setIsMobileMenuOpen(false);
    setOpenMobileCategory(null);
    const params = new URLSearchParams();
    params.set("category", categoryKey);
    params.set("sub", subLabel);
    if (categoryKey === "production") {
      navigate(`${basePath}/projects?${params.toString()}`);
    } else {
      navigate(`${basePath}/digital-projects?${params.toString()}`);
    }
  };

  const navItems = [
    { sectionId: "home", label: "Home" },
    { sectionId: "about", label: "About us" },
    { sectionId: "creative", label: "Creative" },
    { sectionId: "digital", label: "Digital" },
    { sectionId: "production", label: "Production" },
  ] as const;
  return (
    <div
      className={`fixed left-0 right-0 z-[51] transition-all duration-300 select-none py-4  ${
        isScrolled || isMobileMenuOpen
          ? "backdrop-blur-xl bg-white/20"
          : "border-none py-2"
      }`}
    >
      <div className="container lg:max-w-[1400px] mx-auto flex justify-between items-center px-4 md:px-2 ">
        <button
          onClick={() => {
            const currentPath = window.location.pathname;
            if (currentPath.startsWith("/demo")) {
              navigate("/demo");
            } else {
              navigate("/");
            }
          }}
          className="cursor-pointer"
        >
          <img
            className="w-[160px] md:w-[180px] lg:w-[200px]"
            src={logoSrc}
            alt="logo"
          />
        </button>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <div
            className={`rounded-full px-8 xl:px-12 py-3 xl:py-4 flex items-center gap-8 xl:gap-14 transition-all duration-300 bg-white shadow-lg shadow-black/30`}
          >
            {navItems.map((item) => {
              const cat = categories.find(
                (c) => c.key === item.sectionId,
              );
              const isCategory = !!cat && Array.isArray(cat.items) && cat.items.length > 0;
              return (
                <div key={item.sectionId} className="relative group">
                  <button
                    onClick={() => handleNavClick(item.sectionId)}
                    className="text-[#02244A] text-sm xl:text-base transition-colors relative hover:text-[#E30514]"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 h-0.5 bg-[#E30514] transition-all duration-300 w-0 group-hover:w-full"></span>
                  </button>
                  {isCategory && cat && (
                    <div className="absolute top-full pt-3 hidden group-hover:block">
                      <div className="min-w-[240px] rounded-2xl bg-white shadow-xl shadow-black/20 border border-black/5 py-4 px-5">
                        <ul className="space-y-1.5">
                          {cat.items.map((label) => (
                            <li key={label}>
                              <button
                                type="button"
                                onClick={() =>
                                  handleSubItemClick(item.sectionId, label)
                                }
                                className="w-full text-left text-xs text-[#02244A]/80 hover:text-[#E30514] cursor-pointer"
                              >
                                - {label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Desktop Button */}
        <div className="hidden lg:block">
          <Button
            isLightTheme={true}
            navButton={true}
            text="Talk with us"
            color="#333333"
            icon={<CiMail className="w-4 h-4 md:w-6 md:h-6 text-[#C90000]" />}
            onClick={() => handleNavClick("contact")}
          />
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            if (isMobileMenuOpen) setOpenMobileCategory(null);
          }}
          className="lg:hidden text-[#02244A] p-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden backdrop-blur-xl bg-[#02244A] border-t border-white/10">
          <div className="container lg:max-w-[1400px] mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => {
              const cat = categories.find((c) => c.key === item.sectionId);
              const hasSubItems =
                !!cat && Array.isArray(cat.items) && cat.items.length > 0;
              const isOpen = openMobileCategory === item.sectionId;
              return (
                <div key={item.sectionId} className="border-b border-white/10 pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleNavClick(item.sectionId)}
                      className="text-white text-base py-2 transition-colors hover:text-[#E30514] text-left font-medium"
                    >
                      {item.label}
                    </button>
                    {hasSubItems && (
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileCategory(isOpen ? null : item.sectionId)
                        }
                        className={`text-white p-2 hover:text-[#E30514] transition-all duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        aria-label={`Toggle ${item.label} subitems`}
                      >
                        <HiChevronDown className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {hasSubItems && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-4 pb-2 pt-1 flex flex-col gap-1">
                        {cat.items.map((label) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() => handleSubItemClick(item.sectionId, label)}
                            className="text-white/90 text-sm py-1 text-left hover:text-[#E30514] transition-colors"
                          >
                            - {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="pt-2 flex justify-center">
              <Button
                isLightTheme={true}
                navButton={true}
                text="Talk with us"
                color="#333333"
                icon={<CiMail className="w-4 h-4 text-[#C90000]" />}
                onClick={() => handleNavClick("contact")}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatschMainNavBar;
