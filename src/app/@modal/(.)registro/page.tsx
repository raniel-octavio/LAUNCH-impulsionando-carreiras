"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";
import { RegistroForm } from "@/components/auth/RegistroForm";

export default function RegistroModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const hintedRole = role === "member" || role === "recruiter" ? role : null;

  function handleClose() {
    router.replace("/"); // ou outra rota padrão, se preferir
  }

  return (
    <AuthModal
      eyebrow="Crie sua conta"
      title="Complete seu cadastro"
      onClose={handleClose}
    >
      <RegistroForm hintedRole={hintedRole} />
    </AuthModal>
  );
}
