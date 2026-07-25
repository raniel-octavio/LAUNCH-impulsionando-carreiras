"use client";

import { Logo } from "@/components/ui/Logo";
import { useAuthModal } from "@/hooks/useAuthModal";

const HERO_IMAGE = "/home.png";

export default function LoginPage() {
  const { open, Modal } = useAuthModal();

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
        <h2 className="text-white text-2xl font-bold mb-10">Entre na sua conta</h2>

        <button
          onClick={open}
          className="px-6 py-3 bg-sky-600 text-white rounded hover:bg-sky-500 transition"
        >
          Abrir login
        </button>
      </div>

      {Modal}
    </div>
  );
}
