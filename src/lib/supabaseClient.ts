// src/lib/supabaseClient.ts
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Faltam NEXT_PUBLIC_SUPABASE_URL e/ou NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local"
  );
}

export const supabase = createBrowserClient<Database>(url, anonKey);