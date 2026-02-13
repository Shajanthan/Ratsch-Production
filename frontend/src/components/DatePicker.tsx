import React, { useState, useRef, useEffect } from "react";
import { HiCalendar, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

function parseToIso(value: string): string {
  if (!value.trim()) return "";
  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) {
    return d.toISOString().slice(0, 10);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(value.trim())) return value.trim();
  return "";
}

function formatDisplay(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select date",
  className = "",
  id,
}) => {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    const iso = parseToIso(value);
    if (iso) {
      const [y, m] = iso.split("-").map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date();
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const valueIso = parseToIso(value);
  const displayStr = valueIso ? formatDisplay(valueIso) : "";

  useEffect(() => {
    if (valueIso) {
      const [y, m] = valueIso.split("-").map(Number);
      setViewDate(new Date(y, m - 1, 1));
    }
  }, [valueIso]);

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

  const handleSelect = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    onChange(`${y}-${m}-${day}`);
    setOpen(false);
  };

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth + 1, 0);
  const startPad = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const rows: (number | null)[] = [];
  for (let i = 0; i < startPad; i++) rows.push(null);
  for (let i = 1; i <= daysInMonth; i++) rows.push(i);
  const selectedDate = valueIso ? new Date(valueIso + "T12:00:00") : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        className="flex items-center gap-2 w-full border border-[#333333] hover:border-[#E30514] focus-within:border-[#E30514] rounded-md py-2 bg-[#333333] px-3 text-white text-sm cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        <HiCalendar className="w-4 h-4 text-white/50 flex-shrink-0" />
        <input
          id={id}
          type="text"
          readOnly
          value={displayStr}
          placeholder={placeholder}
          className="flex-1 bg-transparent focus:ring-0 focus:outline-none cursor-pointer placeholder-white/50"
        />
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-[280px] backdrop-blur-xl bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() =>
                setViewDate(
                  (d) => new Date(d.getFullYear(), d.getMonth() - 1, 1),
                )
              }
              className="p-1.5 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-white font-medium text-sm">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={() =>
                setViewDate(
                  (d) => new Date(d.getFullYear(), d.getMonth() + 1, 1),
                )
              }
              className="p-1.5 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 text-center text-xs mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-white/50 py-1">
                {day}
              </div>
            ))}
            {rows.map((day, i) => {
              if (day === null) {
                return <div key={`e-${i}`} />;
              }
              const d = new Date(viewYear, viewMonth, day);
              const isSelected =
                selectedDate &&
                d.getDate() === selectedDate.getDate() &&
                d.getMonth() === selectedDate.getMonth() &&
                d.getFullYear() === selectedDate.getFullYear();
              const isToday =
                d.getDate() === today.getDate() &&
                d.getMonth() === today.getMonth() &&
                d.getFullYear() === today.getFullYear();
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelect(d)}
                  className={[
                    "py-2 rounded transition-colors",
                    isSelected
                      ? "bg-[#E30514] text-white font-semibold"
                      : isToday
                        ? "bg-white/20 text-white"
                        : "text-white/90 hover:bg-white/10",
                  ].join(" ")}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="text-white/60 hover:text-white text-xs uppercase font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
