"use client";

import { Suspense } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { RegistroForm } from "@/components/auth/RegistroForm";
import { useModal } from "@/components/providers/ModalProvider";

type Role = "member" | "recruiter";

function RegistroModalContent({
  hintedRole,
  returnTo,
}: {
  hintedRole?: Role | null;
  returnTo?: string | null;
}) {
  const { setModal } = useModal();

  function handleClose() {
    setModal(null);
  }

  return (
    <AuthModal
      eyebrow="Crie sua conta"
      title="Complete seu cadastro"
      onClose={handleClose}
    >
      <RegistroForm hintedRole={hintedRole} returnTo={returnTo ?? "/"} />
    </AuthModal>
  );
}

export default function RegistroModal({
  hintedRole,
  returnTo,
}: {
  hintedRole?: Role | null;
  returnTo?: string | null;
}) {
  return (
    <Suspense fallback={null}>
      <RegistroModalContent hintedRole={hintedRole} returnTo={returnTo} />
    </Suspense>
  );
}
