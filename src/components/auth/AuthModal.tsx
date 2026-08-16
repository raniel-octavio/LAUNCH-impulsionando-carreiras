"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function AuthModal({
  eyebrow,
  title,
  children,
  onClose,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);
  const hasClosedRef = useRef(false);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") triggerClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, []);

  function triggerClose() {
    if (hasClosedRef.current) return;
    hasClosedRef.current = true;
<<<<<<< HEAD
=======

>>>>>>> a70221ea12e3549842bbcfa6703497876882ef4a
    setIsClosing(true);
    document.body.style.overflow = ""; // limpa já, não espera o unmount
    setTimeout(() => {
      onClose();
    }, 300);
  }

  return (
    <div
<<<<<<< HEAD
      className={`fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-6 py-6 overflow-y-auto bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
=======
      className={`fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
>>>>>>> a70221ea12e3549842bbcfa6703497876882ef4a
        isClosing ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) triggerClose();
      }}
    >
      <div
        className={`relative w-full max-w-md my-auto transform transition-all duration-300 ${
          isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <button
          type="button"
          onClick={triggerClose}
          aria-label="Fechar"
          className="absolute -top-10 sm:-top-12 right-0 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-4 sm:mb-6">
          <Logo size="sm" tone="light" />
        </div>

        <p className="text-center text-[10px] sm:text-[11px] tracking-[0.35em] sm:tracking-[0.45em] uppercase text-sky-200/90 mb-2.5 sm:mb-3">
          {eyebrow}
        </p>
        <h2 className="text-center font-display text-lg sm:text-xl md:text-2xl font-extrabold tracking-[0.03em] uppercase leading-tight text-white mb-6 sm:mb-8 px-2">
          {title}
        </h2>

        <div className="rounded-lg border border-white/15 bg-white/8 backdrop-blur-xl p-4 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          {children}
        </div>
      </div>
    </div>
  );
}