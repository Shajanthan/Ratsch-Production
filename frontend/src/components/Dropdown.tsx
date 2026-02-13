import React, { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";

export interface DropdownOption {
  value: string;
  label: string;
  imageUrl?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  id?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select…",
  label,
  className = "",
  id,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-white text-sm uppercase mb-2">
          {label}
        </label>
      )}
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 border border-[#333333] hover:border-[#E30514] focus:border-[#E30514] transition-all duration-300 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white text-left min-h-[52px]"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label || placeholder}
      >
        <span className="flex items-center gap-3 min-w-0 flex-1">
          {selectedOption?.imageUrl && (
            <img
              src={selectedOption.imageUrl}
              alt=""
              className="w-10 h-10 object-contain rounded bg-white/5 flex-shrink-0"
            />
          )}
          <span
            className={value ? "text-white truncate" : "text-white/50 truncate"}
          >
            {displayText}
          </span>
        </span>
        <HiChevronDown
          className={`w-5 h-5 flex-shrink-0 text-white/70 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto border border-white/10 rounded-md bg-[#1a1a1a] shadow-xl py-1"
        >
          <li role="option">
            <button
              type="button"
              onClick={() => handleSelect("")}
              className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              {placeholder}
            </button>
          </li>
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
            >
              <button
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`w-full flex items-center gap-3 text-left px-4 py-2.5 text-sm transition-colors ${
                  value === opt.value
                    ? "bg-[#E30514]/20 text-white"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {opt.imageUrl && (
                  <img
                    src={opt.imageUrl}
                    alt=""
                    className="w-10 h-10 object-contain rounded bg-white/5 flex-shrink-0"
                  />
                )}
                <span className="truncate">{opt.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
