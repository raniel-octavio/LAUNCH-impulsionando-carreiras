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
    router.replace(callbackUrl); // ou use router.back(), conforme sua lógica
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
