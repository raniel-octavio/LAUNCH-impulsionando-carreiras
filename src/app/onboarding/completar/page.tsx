"use client";

import { Suspense } from "react";
import { RegistroForm } from "@/components/auth/RegistroForm";

export default function CompletarCadastroPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}><p>Carregando...</p></div>}>
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Complete seu cadastro</h2>
        <RegistroForm />
      </div>
    </Suspense>
  );
}
