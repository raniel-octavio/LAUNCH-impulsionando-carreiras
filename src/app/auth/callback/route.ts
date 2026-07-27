// src/app/auth/callback/route.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const returnTo = searchParams.get("returnTo");
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const role = searchParams.get("role");

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
      const { data: profile } = await supabase
        .from("users")
        .select("id")
        .eq("id", data.user.id)
        .single();

      if (profile) {
        // Usuário já existe → volta pra onde ele queria ir
        return NextResponse.redirect(`${origin}${returnTo || "/"}`);
      }

      // Usuário novo → sempre onboarding, carregando junto os dados
      // de cadastro (se vieram) e o returnTo (pra usar depois de criar o perfil)
      const onboardingParams = new URLSearchParams();
      if (name) onboardingParams.set("name", name);
      if (phone) onboardingParams.set("phone", phone);
      if (role) onboardingParams.set("role", role);
      if (returnTo) onboardingParams.set("returnTo", returnTo);

      const query = onboardingParams.toString();
      return NextResponse.redirect(
        `${origin}/onboarding/completar${query ? `?${query}` : ""}`
      );
    }

    console.error("Erro na troca de código:", error);
    return NextResponse.redirect(
      `${origin}/auth/error?message=${encodeURIComponent(error?.message ?? "erro desconhecido")}`
    );
  }

  return NextResponse.redirect(`${origin}/auth/error?message=${encodeURIComponent("nenhum código recebido")}`);
}