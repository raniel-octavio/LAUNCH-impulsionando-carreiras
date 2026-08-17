import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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

  // Usa a variável de ambiente para definir o site base (local ou produção)
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
      // verifica se já existe perfil
      const { data: profile } = await supabase
        .from("users")
        .select("id")
        .eq("id", data.user.id)
        .single();

      if (profile) {
        // já existe, vai direto pro destino
        return NextResponse.redirect(`${siteUrl}${returnTo}`);
      }

      // não existe → cria registro no banco
      await supabase.from("users").insert({
        id: data.user.id,
        nome: name,
        telefone: phone,
        role,
        email: data.user.email,
      });

      // redireciona para tela inicial ou destino
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
