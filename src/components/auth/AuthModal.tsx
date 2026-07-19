"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function AuthModal({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const close = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [close]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="relative w-full max-w-md animate-fade-up">
        <button
          type="button"
          onClick={close}
          aria-label="Fechar"
          className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-6">
          <Logo size="sm" tone="light" />
        </div>

        <p className="text-center text-[11px] tracking-[0.45em] uppercase text-sky-200/90 mb-3">
          {eyebrow}
        </p>
        <h2 className="text-center font-display text-xl sm:text-2xl font-extrabold tracking-[0.03em] uppercase leading-tight text-white mb-8">
          {title}
        </h2>

        <div className="rounded-lg border border-white/15 bg-white/8 backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          {children}
        </div>
      </div>
    </div>
  );
}
