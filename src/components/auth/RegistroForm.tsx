"use client";

import { useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { UserRound, Building2 } from "lucide-react";
import { maskPhoneBR, isValidPhoneBR } from "@/lib/phone";

type Role = "member" | "recruiter";

export function RegistroForm({
  hintedRole,
  returnTo,
}: {
  hintedRole?: Role | null;
  returnTo?: string | null;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role | null>(hintedRole ?? null);
  const [touched, setTouched] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const phoneError = useMemo(() => {
    if (!touched || phone.length === 0) return null;
    return isValidPhoneBR(phone) ? null : "Telefone incompleto";
  }, [phone, touched]);

  const canContinue =
    name.trim().length >= 3 &&
    isValidPhoneBR(phone) &&
    role !== null &&
    consent &&
    !submitting;

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(maskPhoneBR(e.target.value));
  }

  async function handleGoogleContinue() {
    if (!canContinue) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      // Usa NEXT_PUBLIC_SITE_URL para montar o callback correto
      const callbackUrl = new URL("/auth/callback", process.env.NEXT_PUBLIC_SITE_URL!);
      callbackUrl.searchParams.set("name", name.trim());
      callbackUrl.searchParams.set("phone", phone);
      callbackUrl.searchParams.set(
        "role",
        role === "recruiter" ? "recrutador" : "candidato"
      );
      if (returnTo) callbackUrl.searchParams.set("returnTo", returnTo);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: callbackUrl.toString() },
      });

      if (error) throw error;

      // A partir daqui o navegador já está saindo pro Google
    } catch (err) {
      console.error("Erro ao iniciar registro:", err);
      setSubmitError("Não foi possível continuar com o Google. Tente novamente.");
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full min-w-0">
      {/* Escolha de role */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-5 sm:mb-6">
        <button
          type="button"
          onClick={() => setRole("member")}
          className={`flex flex-col items-center justify-center gap-2 rounded-sm border px-4 py-4 transition-all ${
            role === "member"
              ? "border-sky-300 bg-sky-300/15 text-white"
              : "border-white/20 text-white/60 hover:border-white/40 hover:text-white/85"
          }`}
        >
          <UserRound className="w-5 h-5 shrink-0" strokeWidth={1.5} />
          <span className="text-[11px] uppercase tracking-wide">Sou candidato</span>
        </button>

        <button
          type="button"
          onClick={() => setRole("recruiter")}
          className={`flex flex-col items-center justify-center gap-2 rounded-sm border px-4 py-4 transition-all ${
            role === "recruiter"
              ? "border-sky-300 bg-sky-300/15 text-white"
              : "border-white/20 text-white/60 hover:border-white/40 hover:text-white/85"
          }`}
        >
          <Building2 className="w-5 h-5 shrink-0" strokeWidth={1.5} />
          <span className="text-[11px] uppercase tracking-wide">Sou recrutador</span>
        </button>
      </div>

      {/* Nome */}
      <div className="mb-4">
        <label className="block text-[10px] uppercase text-white/60 mb-2">
          Nome completo
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome completo"
          className="w-full bg-white/5 border border-white/20 rounded-sm px-3 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-sky-300/70 focus:bg-white/8 transition-colors"
        />
      </div>

      {/* Telefone */}
      <div className="mb-4">
        <label className="block text-[10px] uppercase text-white/60 mb-2">
          Telefone
        </label>
        <input
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={() => setTouched(true)}
          placeholder="(11) 98888-7777"
          className={`w-full bg-white/5 border rounded-sm px-3 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none transition-colors ${
            phoneError
              ? "border-red-400/60 focus:border-red-400"
              : "border-white/20 focus:border-sky-300/70 focus:bg-white/8"
          }`}
        />
        {phoneError && (
          <p className="mt-1 text-[11px] text-red-300">{phoneError}</p>
        )}
      </div>

      {/* Consentimento */}
      <label className="flex items-start gap-2 mb-2 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="w-4 h-4 shrink-0 rounded-sm border-white/30 bg-white/5 accent-sky-300"
        />
        <span className="text-[11px] text-white/60 leading-relaxed">
          Li e aceito a{" "}
          <a
            href="/privacidade"
            target="_blank"
            className="text-sky-200 hover:text-white underline"
          >
            Política de Privacidade
          </a>{" "}
          e autorizo o uso dos meus dados para fins de recrutamento.
        </span>
      </label>

      {submitError && (
        <p className="mt-2 text-[11px] text-red-300">{submitError}</p>
      )}

      {/* Botão Google */}
      <button
        type="button"
        disabled={!canContinue}
        onClick={handleGoogleContinue}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-white text-slate-900 text-sm font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/90 transition-all"
      >
        {submitting ? "Redirecionando..." : "Continuar com Google"}
      </button>

      <p className="mt-4 text-center text-[11px] text-white/45">
        Seu e-mail do Google será usado para identificar sua conta.
      </p>
    </div>
  );
}
