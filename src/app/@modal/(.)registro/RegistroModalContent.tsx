"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";
import { RegistroForm } from "@/components/auth/RegistroForm";

export function RegistroModalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const hintedRole = role === "member" || role === "recruiter" ? role : null;
  const returnTo = searchParams.get("returnTo");

  function handleClose() {
    // router.back() preserva a pilha de histórico que a interceptação de
    // rotas do Next.js usa como referência. Usar router.replace() aqui
    // quebra essa referência e faz o modal parar de abrir depois do
    // primeiro fechamento.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  return (
    <AuthModal
      eyebrow="Crie sua conta"
      title="Complete seu cadastro"
      onClose={handleClose}
    >
      <RegistroForm hintedRole={hintedRole} returnTo={returnTo} />
    </AuthModal>
  );
}