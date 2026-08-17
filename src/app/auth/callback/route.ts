// src/app/auth/callback/route.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

// Só aceita caminhos internos (começam com "/" mas não com "//")
function safeRedirectPath(path: string | null): string {
  if (!path) return "/";
  if (!path.startsWith("/") || path.startsWith("//")) return "/";
  return path;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const returnTo = safeRedirectPath(searchParams.get("returnTo"));
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const role = searchParams.get("role");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

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
      // client admin com service role (ignora RLS)
      const admin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      // verifica se já existe perfil
      const { data: profile } = await admin
        .from("users")
        .select("id")
        .eq("id", data.user.id)
        .single();

      if (profile) {
        return NextResponse.redirect(`${siteUrl}${returnTo}`);
      }

      // cria registro no banco
      await admin.from("users").insert({
        id: data.user.id,
        nome: name,
        telefone: phone,
        role,
        email: data.user.email,
      });

      return NextResponse.redirect(`${siteUrl}${returnTo}`);
    }

    console.error("Erro na troca de código:", error);
    return NextResponse.redirect(
      `${siteUrl}/auth/error?message=${encodeURIComponent(error?.message ?? "erro desconhecido")}`
    );
  }

  return NextResponse.redirect(
    `${siteUrl}/auth/error?message=${encodeURIComponent("nenhum código recebido")}`
  );
}
