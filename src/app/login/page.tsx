// app/login/page.tsx
"use client";

import { Suspense } from "react";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "@/components/auth/LoginForm";
import { useSearchParams } from "next/navigation";

const HERO_IMAGE = "/home.png";

function LoginPageContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div className="relative min-h-screen flex flex-col bg-launch-void text-launch-white overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 animate-fade-in hero-image-veil z-0"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 hero-mesh z-10 bg-black/55" />
      </div>

      <header className="relative z-20 flex items-center justify-center px-5 sm:px-8 lg:px-14 py-6 animate-fade-in">
        <Logo size="md" tone="light" />
      </header>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <p className="text-[11px] tracking-[0.45em] uppercase text-sky-200/90 mb-3">
          Bem-vindo de volta
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white mb-10">
          Entre na sua conta
        </h2>
        <div className="w-full max-w-md rounded-lg border border-white/15 bg-white/8 backdrop-blur-xl p-8">
          <LoginForm callbackUrl={callbackUrl} />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
