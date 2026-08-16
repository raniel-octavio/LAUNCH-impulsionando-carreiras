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
<<<<<<< HEAD
    router.replace("/"); // ou outra rota padrão, se preferir
  }

  return (
    <AuthModal
      eyebrow="Crie sua conta"
      title="Complete seu cadastro"
      onClose={handleClose}
    >
=======
    router.back();
  }

  return (
    <AuthModal eyebrow="Crie sua conta" title="Complete seu cadastro" onClose={handleClose}>
>>>>>>> a70221ea12e3549842bbcfa6703497876882ef4a
      <RegistroForm hintedRole={hintedRole} />
    </AuthModal>
  );
}
