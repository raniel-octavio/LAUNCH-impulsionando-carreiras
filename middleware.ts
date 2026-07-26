import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const protectedPaths = [
  "/feed",
  "/membro",
  "/recrutador",
  "/vagas",
  "/matching",
  "/curriculo",
  "/contatos",
  "/mensagens",
  "/perfil",
];

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  if (!isProtected) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/feed/:path*",
    "/membro/:path*",
    "/recrutador/:path*",
    "/vagas/:path*",
    "/matching/:path*",
    "/curriculo/:path*",
    "/contatos/:path*",
    "/mensagens/:path*",
    "/perfil/:path*",
  ],
};