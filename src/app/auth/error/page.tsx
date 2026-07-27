// src/app/auth/error/page.tsx
"use client";

import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Erro ao entrar</h1>
      <p>Não foi possível concluir o login. Tente novamente.</p>
      <Link href="/login">Voltar ao login</Link>
    </div>
  );
}