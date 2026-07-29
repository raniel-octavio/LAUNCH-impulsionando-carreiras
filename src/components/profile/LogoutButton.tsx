// src/components/profile/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="text-xs uppercase px-4 py-2 rounded-sm border border-slate-300 text-slate-600 hover:bg-slate-100">
      Sair
    </button>
  );
}