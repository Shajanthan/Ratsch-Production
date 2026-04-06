import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";
import { IoAlertCircle, IoCheckmarkCircle } from "react-icons/io5";

export type ToastType = "success" | "error";

export interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 0;
const TOAST_DURATION_MS = 5000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback(
    (message: string) => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, type: "success", message }]);
      setTimeout(() => removeToast(id), TOAST_DURATION_MS);
    },
    [removeToast],
  );

  const error = useCallback(
    (message: string) => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, type: "error", message }]);
      setTimeout(() => removeToast(id), TOAST_DURATION_MS);
    },
    [removeToast],
  );

  const value = useMemo<ToastContextValue>(
    () => ({ success, error }),
    [success, error],
  );

  const toastContainer =
    mounted && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed top-4 right-4 z-[9999] flex flex-col items-end gap-3 pointer-events-none sm:top-6 sm:right-6"
            style={{ maxWidth: "min(22rem, calc(100vw - 2rem))" }}
            aria-live="polite"
          >
            {toasts.map((t) => {
              const isError = t.type === "error";
              return (
              <div
                key={t.id}
                role={isError ? "alert" : "status"}
                className={`animate-toast-slide-in pointer-events-auto flex w-full flex-col overflow-hidden rounded-xl border shadow-[0_20px_50px_-12px_rgba(15,23,42,0.28)] ring-1 ${
                  isError
                    ? "border-red-200 bg-red-50/90 text-red-950 ring-red-200/60"
                    : "border-slate-200/90 bg-white text-slate-900 ring-slate-900/5"
                }`}
              >
                <div className="flex gap-3 p-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      isError
                        ? "bg-red-100 text-red-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                    aria-hidden
                  >
                    {isError ? (
                      <IoAlertCircle className="h-6 w-6" />
                    ) : (
                      <IoCheckmarkCircle className="h-6 w-6" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p
                      className={`text-[0.8125rem] font-semibold uppercase tracking-wide ${
                        isError ? "text-red-700" : "text-slate-500"
                      }`}
                    >
                      {isError ? "Unable to send" : "Message sent"}
                    </p>
                    <p
                      className={`mt-1 text-sm leading-relaxed ${
                        isError ? "text-red-900" : "text-slate-700"
                      }`}
                    >
                      {t.message}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeToast(t.id)}
                    className={`-ml-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isError
                        ? "text-red-400 hover:bg-red-100 hover:text-red-800"
                        : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    }`}
                    aria-label="Dismiss notification"
                  >
                    <HiX className="h-5 w-5" />
                  </button>
                </div>
                <div
                  className={`h-1 w-full ${isError ? "bg-red-100" : "bg-slate-100"}`}
                >
                  <div
                    className={`animate-toast-progress h-full ${
                      isError ? "bg-red-600" : "bg-emerald-500"
                    }`}
                  />
                </div>
              </div>
              );
            })}
          </div>,
          document.body,
        )
      : null;

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toastContainer}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
