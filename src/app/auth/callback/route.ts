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
  const url = new URL(request.url);
  const { searchParams } = url;
  const code = searchParams.get("code");
  const returnTo = safeRedirectPath(searchParams.get("returnTo"));
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const role = searchParams.get("role");

  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const siteUrl =
    rawSiteUrl && rawSiteUrl !== "undefined" ? rawSiteUrl : url.origin;

  function buildRedirect(path: string) {
    return NextResponse.redirect(new URL(path, siteUrl));
  }

  function errorRedirect(message: string) {
    return buildRedirect(`/auth/error?message=${encodeURIComponent(message)}`);
  }

  function goToNaoCadastrado() {
    const homeUrl = new URL("/", siteUrl);
    homeUrl.searchParams.set("notice", "nao-cadastrado");
    if (returnTo) homeUrl.searchParams.set("returnTo", returnTo);
    return NextResponse.redirect(homeUrl);
  }

  try {
    if (!code) {
      return errorRedirect("nenhum código recebido");
    }

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

    if (error || !data.user) {
      console.error("Erro na troca de código:", error);
      return errorRedirect(error?.message ?? "erro desconhecido");
    }

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("id")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Erro ao verificar perfil existente:", profileError);
      return errorRedirect(
        "Não foi possível verificar seu cadastro: " + profileError.message
      );
    }

    if (profile) {
      return buildRedirect(returnTo);
    }

    // perfil não existe e não veio dado de registro → é um login,
    // não um cadastro → mostra o aviso "usuário não cadastrado"
    if (!name || !role) {
      return goToNaoCadastrado();
    }

    const { error: insertError } = await supabase.from("users").insert({
      id: data.user.id,
      name: name,
      phone: phone,
      email: data.user.email,
      role,
    });

    if (insertError) {
      console.error("Erro ao criar perfil:", insertError);
      return errorRedirect(
        "Não foi possível concluir o cadastro: " + insertError.message
      );
    }

    return buildRedirect(returnTo);
  } catch (err) {
    console.error("Erro inesperado no callback de auth:", err);
    return errorRedirect(
      err instanceof Error ? err.message : "erro inesperado no servidor"
    );
  }
}