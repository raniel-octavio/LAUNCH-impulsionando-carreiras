// src/app/onboarding/completar/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { createUser, getUserById } from "@/lib/api/users";
import { UserRole } from "@/types";

function mapFormRole(formRole: string | null): UserRole {
  if (formRole === "recruiter") return "recrutador";
  return "candidato";
}

function CompletarCadastroContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function completeSignup() {
      const { data: { user } } = await supabase.auth.getUser();
      const returnTo = searchParams.get("returnTo") || "/";

      if (!user) {
        router.push("/login");
        return;
      }

      const existingProfile = await getUserById(user.id);
      if (existingProfile) {
        router.push(returnTo);
        return;
      }

      const name = searchParams.get("name") ?? user.user_metadata?.full_name ?? "";
      const phone = searchParams.get("phone") ?? "";
      const role = mapFormRole(searchParams.get("role"));

      if (!name) {
        setStatus("error");
        setErrorMessage("Dados do cadastro não encontrados. Volte e tente novamente.");
        return;
      }

      try {
        await createUser({
          id: user.id,
          name,
          headline: "",
          avatar: user.user_metadata?.avatar_url ?? "",
          role,
          location: "",
          about: "",
          skills: [],
          email: user.email!,
          phone,
        });

        router.push(returnTo);
      } catch (err) {
        console.error("Erro ao completar cadastro:", err);
        setStatus("error");
        setErrorMessage("Não foi possível concluir seu cadastro. Tente novamente.");
      }
    }

    completeSignup();
  }, [router, searchParams]);

  if (status === "error") {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p>{errorMessage}</p>
        <button onClick={() => router.push("/login")}>Voltar ao login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <p>Concluindo seu cadastro...</p>
    </div>
  );
}

export default function CompletarCadastroPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}><p>Carregando...</p></div>}>
      <CompletarCadastroContent />
    </Suspense>
  );
}