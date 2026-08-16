"use client";

<<<<<<< HEAD
=======
import { Suspense } from "react";
>>>>>>> a70221ea12e3549842bbcfa6703497876882ef4a
import { useRouter, useSearchParams } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";
import { LoginForm } from "@/components/auth/LoginForm";

<<<<<<< HEAD
export default function LoginModal() {
=======
function LoginModalContent() {
>>>>>>> a70221ea12e3549842bbcfa6703497876882ef4a
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  function handleClose() {
<<<<<<< HEAD
    router.replace(callbackUrl);
  }

  return (
    <AuthModal
      eyebrow="Bem-vindo de volta"
      title="Entre na sua conta"
      onClose={handleClose}
    >
=======
    router.back();
  }

  return (
    <AuthModal eyebrow="Bem-vindo de volta" title="Entre na sua conta" onClose={handleClose}>
>>>>>>> a70221ea12e3549842bbcfa6703497876882ef4a
      <LoginForm callbackUrl={callbackUrl} />
    </AuthModal>
  );
}
<<<<<<< HEAD
=======

export default function LoginModal() {
  return (
    <Suspense fallback={null}>
      <LoginModalContent />
    </Suspense>
  );
}
>>>>>>> a70221ea12e3549842bbcfa6703497876882ef4a
