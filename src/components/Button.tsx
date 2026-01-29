import React from "react";

interface ButtonProps {
  text: string;
  color: string;
  icon: React.ReactNode;
  textIcon?: React.ReactNode;
  navButton: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  color,
  icon,
  textIcon,
  navButton,
}) => {
  return (
    <>
      {navButton ? (
        <button className="border rounded-full p-3 bg-[#1f0000] flex items-center gap-3 px-5 border-[#770101]">
          {icon} <span className="text-white">{text}</span>
        </button>
      ) : (
        <button
          style={{ backgroundColor: color }}
          className="text-white p-2 lg:p-3 shadow-lg text-xs lg:text-sm rounded-full w-fit flex items-center justify-center gap-2 group hover:opacity-90 transition-opacity duration-300"
        >
          {icon && (
            <div className="p-1 rounded-full bg-white text-black flex items-center justify-center">
              {icon}
            </div>
          )}
          <div className="flex items-center justify-center gap-1">
            {text}
            {textIcon && (
              <div className="group-hover:animate-slide-right">{textIcon}</div>
            )}
          </div>
        </button>
      )}
    </>
  );
};

export default Button;
