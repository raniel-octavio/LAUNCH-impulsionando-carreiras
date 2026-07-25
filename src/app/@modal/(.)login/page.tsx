"use client";

import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginModal({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const router = useRouter();
  // Como searchParams agora é assíncrono, e este componente virou client,
  // você precisa ajustar como pega o callbackUrl (ver nota abaixo)

  return (
    <AuthModal
      eyebrow="Bem-vindo de volta"
      title="Entre na sua conta"
      onClose={() => router.back()}
    >
      <LoginForm callbackUrl={"/"} />
    </AuthModal>
  );
}