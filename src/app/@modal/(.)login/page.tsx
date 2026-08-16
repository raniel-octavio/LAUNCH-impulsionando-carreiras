"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";
import { LoginForm } from "@/components/auth/LoginForm";

function LoginModalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  function handleClose() {
    // router.back() preserva a pilha de histórico que a interceptação de
    // rotas do Next.js usa como referência. Usar router.replace() aqui
    // quebra essa referência e faz o modal parar de abrir depois do
    // primeiro fechamento.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace(callbackUrl);
    }
  }

  return (
    <AuthModal
      eyebrow="Bem-vindo de volta"
      title="Entre na sua conta"
      onClose={handleClose}
    >
      <LoginForm callbackUrl={callbackUrl} />
    </AuthModal>
  );
}

export default function LoginModal() {
  return (
    <Suspense fallback={null}>
      <LoginModalContent />
    </Suspense>
  );
}