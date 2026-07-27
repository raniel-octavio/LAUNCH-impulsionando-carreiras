// src/components/GoogleLoginButton.tsx
"use client";

import { signInWithGoogle } from "@/lib/auth";

export default function GoogleLoginButton() {
  async function handleLogin() {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    }
  }

  return <button onClick={handleLogin}>Entrar com Google</button>;
}