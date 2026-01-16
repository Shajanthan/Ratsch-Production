import React from "react";

interface ButtonProps {
  text: string;
  color: string;
  icon: React.ReactNode;
  textIcon: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ text, color, icon, textIcon }) => {
  return (
    <button
      style={{ backgroundColor: color }}
      className="text-white p-3 shadow-lg text-sm rounded-full w-fit flex items-center justify-center gap-2 group hover:opacity-90 transition-opacity duration-300"
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
  );
};

export default Button;
