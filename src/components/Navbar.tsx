import React, { useState, useEffect } from "react";
import Button from "./Button";
import { CiMail } from "react-icons/ci";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { sectionId: "home", label: "Home" },
    { sectionId: "about", label: "About us" },
    { sectionId: "projects", label: "Service" },
    { sectionId: "skills", label: "Contact us" },
  ];
  return (
    <div
      className={`fixed left-0 right-0 z-[51] transition-all duration-300 select-none ${
        isScrolled ? "backdrop-blur-xl bg-white/5" : "border-none py-2"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-2">
        <img
          className="w-[130px]"
          src="/assets/images/RatschWhite.png"
          alt="logo"
        />
        <div className="flex items-center">
          <div
            className={`rounded-full px-12 py-4 flex items-center gap-14 transition-all duration-300 bg-black/75`}
          >
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                className={`text-white text-base transition-colors relative group`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#BF0000] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>
        </div>
        <Button
          navButton={true}
          text="Talk with us"
          color="#333333"
          icon={<CiMail className="w-4 h-4 md:w-6 md:h-6 text-[#C90000]" />}
        />
      </div>
    </div>
  );
};

export default Navbar;
