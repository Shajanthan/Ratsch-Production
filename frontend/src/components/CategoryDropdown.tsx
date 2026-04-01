import React, { useEffect, useRef, useState } from "react";
import { HiCheck, HiChevronDown } from "react-icons/hi";

export type CategoryValue = "all" | "creative" | "digital" | "production";

interface CategoryDropdownProps {
  value: CategoryValue;
  onChange: (value: CategoryValue) => void;
}

const OPTIONS: { value: CategoryValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "creative", label: "Creative & Digital" },
  { value: "production", label: "Production" },
];

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const normalizedValue: CategoryValue =
    value === "digital" ? "creative" : value;
  const current = OPTIONS.find((o) => o.value === normalizedValue) ?? OPTIONS[0];

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full border border-[#333333] hover:border-[#E30514] focus:border-[#E30514] transition-all duration-500 rounded-md py-3 bg-[#333333] px-4 text-white flex items-center justify-between"
      >
        <span>{current.label}</span>
        <HiChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-md border border-white/20 bg-[#1f1f1f] shadow-2xl overflow-hidden">
          {OPTIONS.map((option) => {
            const active = option.value === normalizedValue;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                <span>{option.label}</span>
                {active && <HiCheck className="w-4 h-4 text-[#E30514]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
