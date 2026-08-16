// src/app/api/account/delete/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const { userId } = await req.json();

  // IMPORTANTE: valide a sessão autenticada aqui (cookies/server client)
  // e confirme que ela corresponde a esse userId antes de prosseguir.

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // nunca expor no client
  );

  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // se "users" tiver FK com ON DELETE CASCADE pra auth.users, a linha já some.
  // senão: await admin.from("users").delete().eq("id", userId);

  return NextResponse.json({ success: true });
}