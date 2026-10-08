"use client";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";
import { LoginForm } from "@/components/auth/LoginForm";

function LoginModalContent({ callbackUrl = "/" }: { callbackUrl?: string }) {
  const router = useRouter();

  return (
    <AuthModal
      eyebrow="Bem-vindo de volta"
      title="Entre na sua conta"
      onClose={() => router.back()}
    >
      <LoginForm callbackUrl={callbackUrl} />
    </AuthModal>
  );
}

export default function LoginModal({
  callbackUrl = "/",
}: {
  hintedRole?: "member" | "recruiter" | null;
  callbackUrl?: string;
}) {
  return (
    <Suspense fallback={null}>
      <LoginModalContent callbackUrl={callbackUrl} />
    </Suspense>
  );
}