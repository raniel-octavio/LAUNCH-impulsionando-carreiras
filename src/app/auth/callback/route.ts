// src/app/auth/callback/route.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const returnTo = searchParams.get("returnTo");

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Verifica SEMPRE se o perfil já existe
      const { data: profile } = await supabase
        .from("users")
        .select("id")
        .eq("id", data.user.id)
        .single();

      if (profile) {
        // Já tem conta → vai pro destino pós-login (ou home)
        return NextResponse.redirect(`${origin}${returnTo || "/"}`);
      } else {
        // Não tem conta ainda → vai pro onboarding (com dados prontos, se vieram)
        return NextResponse.redirect(`${origin}${next || "/onboarding/completar"}`);
      }
    }

    console.error("Erro na troca de código:", error);
    return NextResponse.redirect(
      `${origin}/auth/error?message=${encodeURIComponent(error?.message ?? "erro desconhecido")}`
    );
  }

  return NextResponse.redirect(`${origin}/auth/error?message=${encodeURIComponent("nenhum código recebido")}`);
}