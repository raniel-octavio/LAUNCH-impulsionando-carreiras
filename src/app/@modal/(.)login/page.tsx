// LoginModal.tsx
"use client";
import { Suspense } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { LoginForm } from "@/components/auth/LoginForm";
import { useModal } from "@/components/providers/ModalProvider";

type Role = "member" | "recruiter";

function LoginModalContent({
  callbackUrl = "/",
}: {
  hintedRole?: Role | null;
  callbackUrl?: string;
}) {
  const { setModal } = useModal();

  function handleClose() {
    setModal(null);
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

export default function LoginModal({
  hintedRole,
  callbackUrl = "/",
}: {
  hintedRole?: Role | null;
  callbackUrl?: string;
}) {
  return (
    <Suspense fallback={null}>
      <LoginModalContent callbackUrl={callbackUrl} />
    </Suspense>
  );
}