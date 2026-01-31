import React, { useState, useEffect, useRef } from "react";

const MIN_DISPLAY_MS = 1500;
const FADE_OUT_MS = 500;
const WELCOME_TEXT = "Welcome to Ratsch productions       ";
const TYPING_INTERVAL_MS = 80;

export { MIN_DISPLAY_MS, FADE_OUT_MS };

interface SplashScreenProps {
  /** Progress 0–100; bar fills from left to right. */
  progress?: number;
  /** True when prefetch has finished. */
  isFetchComplete?: boolean;
  /** Called when typing "Welcome to Ratsch productions" has finished. */
  onTypingComplete?: () => void;
  /** When true, fade out smoothly then call onCloseComplete. */
  isClosing?: boolean;
  /** Called after fade-out animation completes. */
  onCloseComplete?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  progress = 0,
  isFetchComplete = false,
  onTypingComplete,
  isClosing = false,
  onCloseComplete,
}) => {
  const [typedText, setTypedText] = useState("");
  const typingCompleteCalled = useRef(false);

  useEffect(() => {
    if (typedText.length >= WELCOME_TEXT.length) {
      if (!typingCompleteCalled.current) {
        typingCompleteCalled.current = true;
        onTypingComplete?.();
      }
      return;
    }
    const t = setTimeout(() => {
      setTypedText(WELCOME_TEXT.slice(0, typedText.length + 1));
    }, TYPING_INTERVAL_MS);
    return () => clearTimeout(t);
  }, [typedText, onTypingComplete]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (isClosing && e.propertyName === "opacity" && onCloseComplete) {
      onCloseComplete();
    }
  };

  const typingComplete = typedText.length >= WELCOME_TEXT.length;
  const waitingForFetch = typingComplete && !isFetchComplete;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ease-out ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onTransitionEnd={handleTransitionEnd}
      aria-hidden={isClosing}
    >
      {/* Logo */}
      <img
        src="/assets/images/RatschWhite.png"
        alt="Ratsch Productions"
        className="h-20 w-auto object-contain md:h-28"
      />
      {/* Loading bar: 0 → 100% width */}
      <div className="mt-8 h-2 w-48 overflow-hidden rounded-sm border border-white/20 bg-white/10 md:h-2.5 md:w-64">
        <div
          className="h-full rounded-sm bg-[#BF0000] transition-[width] duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {/* Typing: "Welcome to Ratsch productions" then cursor or " . . . " */}
      <p className="mt-4 min-h-[1.5rem] text-sm uppercase tracking-widest text-white/80 md:text-base">
        {typedText}
        {!typingComplete && (
          <span
            className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-white"
            aria-hidden
          />
        )}
        {waitingForFetch && (
          <span className="ml-1 inline-block animate-pulse" aria-hidden>
            {" . . . "}
          </span>
        )}
        {typingComplete && !waitingForFetch && (
          <span
            className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-white"
            aria-hidden
          />
        )}
      </p>
    </div>
  );
};

export default SplashScreen;
