// src/app/completar-cadastro/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { createUser } from "@/lib/api/users";
import { UserRole } from "@/types";

export default function CompletarCadastroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("candidato");
  const [location, setLocation] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      await createUser({
        id: user.id,
        name,
        headline: "",
        avatar: user.user_metadata.avatar_url ?? "",
        role,
        location,
        about: "",
        skills: [],
        email: user.email!,
        phone: "",
      });

      router.push("/");
    } catch (err) {
      console.error("Erro ao criar perfil:", err);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 40, maxWidth: 400 }}>
      <h1>Complete seu cadastro</h1>

      <label>
        Nome
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>

      <label>
        Você é:
        <select value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
          <option value="candidato">Candidato</option>
          <option value="recrutador">Recrutador</option>
          <option value="empresa">Empresa</option>
        </select>
      </label>

      <label>
        Localização
        <input value={location} onChange={(e) => setLocation(e.target.value)} required />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Concluir cadastro"}
      </button>
    </form>
  );
}