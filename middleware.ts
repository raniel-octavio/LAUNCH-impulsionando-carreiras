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

const authOnlyPaths = ["/login", "/registro"];

// Rotas onde NÃO forçamos checagem de perfil (senão vira loop de redirect)
const exemptPaths = ["/registro", "/auth"]; // troquei onboarding por registro

const roleRestrictedPaths: { prefix: string; allowedRoles: string[] }[] = [
  { prefix: "/membro", allowedRoles: ["candidato"] },
  { prefix: "/recrutador", allowedRoles: ["recrutador", "empresa"] },
];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isProtected = protectedPaths.some((p) => path.startsWith(p));
  const isAuthOnly = authOnlyPaths.some((p) => path.startsWith(p));
  const isExempt = exemptPaths.some((p) => path.startsWith(p));

  if (isProtected && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(redirectUrl);
  }

  let profile: { role: string } | null = null;

  if (user && !isExempt) {
    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    profile = data;

    if (!profile && isProtected) {
      const registroUrl = new URL("/registro", request.url);
      registroUrl.searchParams.set("returnTo", path);
      return NextResponse.redirect(registroUrl);
    }
  }

  if (isAuthOnly && user) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  if (user && profile) {
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
