// src/lib/auth.ts
import { supabase } from "@/lib/supabaseClient";

interface SignInOptions {
  returnTo?: string; // pra onde voltar após o login (ou após o onboarding)
  onboardingData?: {
    name: string;
    phone: string;
    role: string;
  };
}

export async function signInWithGoogle(options: SignInOptions = {}) {
  const params = new URLSearchParams();

  if (options.returnTo) params.set("returnTo", options.returnTo);
  if (options.onboardingData) {
    params.set("name", options.onboardingData.name);
    params.set("phone", options.onboardingData.phone);
    params.set("role", options.onboardingData.role);
  }

  const query = params.toString();
  const redirectTo = `${window.location.origin}/auth/callback${query ? `?${query}` : ""}`;

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