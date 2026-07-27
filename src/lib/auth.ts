// src/lib/auth.ts
import { supabase } from "@/lib/supabaseClient";

export async function signInWithGoogle(redirectPath: string = "/auth/callback") {
  const redirectTo = redirectPath.startsWith("/auth/callback")
    ? `${window.location.origin}${redirectPath}`
    : `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectPath)}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });

  if (error) {
    console.error("Erro ao entrar com Google:", error);
    throw error;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Erro ao sair:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}