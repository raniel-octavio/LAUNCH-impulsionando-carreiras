// app/@modal/(.)login/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  function handleClose() {
    router.push("/");
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