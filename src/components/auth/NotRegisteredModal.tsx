"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

export function NotRegisteredModal({
  returnTo,
  role,
  onClose,
}: {
  returnTo?: string | null;
  role?: string | null;
  onClose: () => void;
}) {
  const params = new URLSearchParams();
  if (role === "member" || role === "recruiter") params.set("role", role);
  if (returnTo) params.set("returnTo", returnTo);
  const registroHref = `/registro${params.toString() ? `?${params.toString()}` : ""}`;

  return (
    <AuthModal
      eyebrow="Ainda não nos conhecemos"
      title="Usuário não cadastrado"
      onClose={onClose}
    >
      <div className="flex flex-col items-center text-center gap-5 py-2">
        <p className="text-sm text-white/70 max-w-xs">
          Não encontramos uma conta com esse login. Crie sua conta para
          continuar.
        </p>
        <Link
          href={registroHref}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm bg-launch-gold text-white text-sm font-semibold tracking-[0.12em] uppercase hover:bg-launch-gold-bright transition-all hover:scale-[1.02] shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
        >
          Criar conta
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </AuthModal>
  );
}