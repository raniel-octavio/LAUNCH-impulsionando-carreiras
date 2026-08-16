"use client";

import { useState, useCallback } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { LoginForm } from "@/components/auth/LoginForm";

export function useAuthModal(callbackUrl: string = "/") {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const Modal = isOpen ? (
    <AuthModal
      eyebrow="Bem-vindo de volta"
      title="Entre na sua conta"
      onClose={close}
    >
      <LoginForm callbackUrl={callbackUrl} />
    </AuthModal>
  ) : null;

  return { open, close, Modal };
}