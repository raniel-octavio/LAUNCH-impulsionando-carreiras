"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";
import { RegistroForm } from "@/components/auth/RegistroForm";

function RegistroModalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const hintedRole = role === "member" || role === "recruiter" ? role : null;

  function handleClose() {
    router.back();
  }

  return (
    <AuthModal eyebrow="Crie sua conta" title="Complete seu cadastro" onClose={handleClose}>
      <RegistroForm hintedRole={hintedRole} />
    </AuthModal>
  );
}

export default function RegistroModal() {
  return (
    <Suspense fallback={null}>
      <RegistroModalContent />
    </Suspense>
  );
}