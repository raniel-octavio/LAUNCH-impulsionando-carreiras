// src/app/auth/error/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Erro ao entrar</h1>
      <p>Não foi possível concluir o login.</p>
      {message && (
        <p style={{ color: "red", fontFamily: "monospace", marginTop: 12 }}>
          {message}
        </p>
      )}
      <Link href="/login">Voltar ao login</Link>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={null}>
      <AuthErrorContent />
    </Suspense>
  );
}