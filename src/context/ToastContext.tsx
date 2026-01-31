import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

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
const TOAST_DURATION_MS = 4000;

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
            className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
            style={{ maxWidth: "min(28rem, calc(100vw - 2rem))" }}
            aria-live="polite"
          >
            {toasts.map((t) => (
              <div
                key={t.id}
                className="pointer-events-auto backdrop-blur-xl border rounded-lg px-4 py-3 shadow-lg"
                style={{
                  backgroundColor:
                    t.type === "success"
                      ? "rgba(34, 197, 94, 0.2)"
                      : "rgba(239, 68, 68, 0.2)",
                  borderColor:
                    t.type === "success"
                      ? "rgba(34, 197, 94, 0.6)"
                      : "rgba(239, 68, 68, 0.6)",
                }}
              >
                <p
                  className={`text-sm font-medium ${
                    t.type === "success" ? "text-green-200" : "text-red-200"
                  }`}
                >
                  {t.message}
                </p>
              </div>
            ))}
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
