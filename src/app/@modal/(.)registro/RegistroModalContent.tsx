"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";
import { RegistroForm } from "@/components/auth/RegistroForm";
import { useModal } from "@/components/providers/ModalProvider";

function RegistroModalContent({
  hintedRole,
  returnTo,
}: {
  hintedRole?: "member" | "recruiter" | null;
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
  hintedRole?: "member" | "recruiter" | null;
  returnTo?: string | null;
}) {
  return (
    <Suspense fallback={null}>
      <RegistroModalContent hintedRole={hintedRole} returnTo={returnTo} />
    </Suspense>
  );
}

