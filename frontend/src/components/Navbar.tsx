import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import { CiMail } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const basePath = location.pathname.startsWith("/demo") ? "/demo" : "";
  const homePath = basePath || "/";
  const isOnHome =
    location.pathname === homePath ||
    location.pathname === homePath + "/" ||
    location.pathname === homePath + "//";

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);

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

  const navItems = [
    { sectionId: "home", label: "Home" },
    { sectionId: "about", label: "About us" },
    { sectionId: "service", label: "Service" },
    { sectionId: "contact", label: "Contact us" },
  ];
  return (
    <div
      className={`fixed left-0 right-0 z-[51] transition-all duration-300 select-none py-3 ${
        isScrolled || isMobileMenuOpen
          ? "backdrop-blur-xl bg-white/5"
          : "border-none py-2"
      }`}
    >
      <div className="container lg:max-w-[1400px] mx-auto flex justify-between items-center px-4 md:px-2">
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
            className="w-[100px] md:w-[180px] lg:w-[150px]"
            src="https://res.cloudinary.com/dybv1h20q/image/upload/v1770745345/IMG_0950_xstvv3.png"
            alt="logo"
          />
        </button>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <div
            className={`rounded-full px-8 xl:px-12 py-3 xl:py-4 flex items-center gap-8 xl:gap-14 transition-all duration-300 bg-black/75`}
          >
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item.sectionId)}
                className="text-white text-sm xl:text-base transition-colors relative group hover:text-[#BF0000]"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-0.5 bg-[#BF0000] transition-all duration-300 w-0 group-hover:w-full"></span>
              </button>
            ))}
          </div>
        </div>
        {/* Desktop Button */}
        <div className="hidden lg:block">
          <Button
            navButton={true}
            text="Talk with us"
            color="#333333"
            icon={<CiMail className="w-4 h-4 md:w-6 md:h-6 text-[#C90000]" />}
            onClick={() => handleNavClick("contact")}
          />
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white p-2"
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
        <div className="lg:hidden backdrop-blur-xl bg-white/5 border-t border-white/10">
          <div className="container lg:max-w-[1400px] mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item.sectionId)}
                className="text-white text-base py-2 transition-colors hover:text-[#BF0000] text-left font-medium"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 flex justify-center">
              <Button
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

export default Navbar;
