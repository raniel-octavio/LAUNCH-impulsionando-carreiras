// src/components/profile/DeleteAccountButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export function DeleteAccountButton({ userId }: { userId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error();
      await supabase.auth.signOut();
      router.push("/");
    } catch {
      alert("Não foi possível excluir a conta.");
    } finally {
      setLoading(false);
    }
  }

  if (!confirming) {
    return (
      <button onClick={() => setConfirming(true)} className="text-xs uppercase px-4 py-2 rounded-sm border border-red-300 text-red-600 hover:bg-red-50">
        Excluir conta
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-red-600">Ação permanente. Confirmar?</span>
      <button onClick={handleDelete} disabled={loading} className="text-xs uppercase px-3 py-2 rounded-sm bg-red-600 text-white hover:bg-red-700 disabled:opacity-50">
        {loading ? "Excluindo..." : "Sim, excluir"}
      </button>
      <button onClick={() => setConfirming(false)} disabled={loading} className="text-xs uppercase px-3 py-2 text-slate-500">
        Cancelar
      </button>
    </div>
  );
}