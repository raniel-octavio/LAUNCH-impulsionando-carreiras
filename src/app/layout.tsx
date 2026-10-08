// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedPaths = [
  "/feed",
  "/perfil",
  "/vagas",
  "/match",
  "/curriculo",
  "/contatos",
  "/mensagens",
  "/membro",
  "/recrutador",
];

// só login é exclusivo para não-logados
const authOnlyPaths = ["/login"];

// rotas que não entram na checagem de perfil
const exemptPaths = ["/registro", "/auth"];

const roleRestrictedPaths: { prefix: string; allowedRoles: string[] }[] = [
  { prefix: "/membro", allowedRoles: ["candidato"] },
  { prefix: "/recrutador", allowedRoles: ["recrutador", "empresa"] },
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedPaths.some((p) => path.startsWith(p));
  const isAuthOnly = authOnlyPaths.some((p) => path.startsWith(p));
  const isExempt = exemptPaths.some((p) => path.startsWith(p));

  // rotas públicas (ex.: "/") não precisam falar com o Supabase
  if (!isProtected && !isAuthOnly) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Variáveis do Supabase ausentes no middleware");
    return isProtected
      ? NextResponse.redirect(new URL("/login", request.url))
      : NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // rota protegida sem login → manda pro login
  if (isProtected && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(redirectUrl);
  }

  // se já está logado, não deixa acessar /login
  if (isAuthOnly && user) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  // só busca o perfil em rotas protegidas
  if (user && isProtected && !isExempt) {
    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    // logado sem perfil → registro
    if (!profile) {
      const registroUrl = new URL("/registro", request.url);
      registroUrl.searchParams.set("returnTo", path);
      return NextResponse.redirect(registroUrl);
    }

    // checagem de role
    const roleRule = roleRestrictedPaths.find((r) => path.startsWith(r.prefix));
    if (roleRule && !roleRule.allowedRoles.includes(profile.role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};