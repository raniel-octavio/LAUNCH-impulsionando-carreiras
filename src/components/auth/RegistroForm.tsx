"use client";

import { useState, useMemo } from "react";
import { UserRound, Building2 } from "lucide-react";
import { maskPhoneBR, isValidPhoneBR } from "@/lib/phone";

type Role = "member" | "recruiter";

export function RegistroForm({ hintedRole }: { hintedRole?: Role | null }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role | null>(hintedRole ?? null);
  const [touched, setTouched] = useState(false);
  const [consent, setConsent] = useState(false);

  const phoneError = useMemo(() => {
    if (!touched || phone.length === 0) return null;
    return isValidPhoneBR(phone) ? null : "Telefone incompleto";
  }, [phone, touched]);

  const canContinue =
    name.trim().length >= 3 &&
    isValidPhoneBR(phone) &&
    role !== null &&
    consent;

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(maskPhoneBR(e.target.value));
  }

  function handleGoogleContinue() {
    if (!canContinue) return;
    const params = new URLSearchParams({
      name: name.trim(),
      phone,
      role: role as string,
    });
    window.location.href = `/api/auth/signin/google?callbackUrl=${encodeURIComponent(
      `/onboarding/completar?${params.toString()}`
    )}`;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => setRole("member")}
          className={`flex flex-col items-center gap-2 rounded-sm border px-4 py-4 transition-all ${
            role === "member"
              ? "border-sky-300 bg-sky-300/15 text-white"
              : "border-white/20 text-white/60 hover:border-white/40 hover:text-white/85"
          }`}
        >
          <UserRound className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-[11px] tracking-[0.14em] uppercase">
            Sou candidato
          </span>
        </button>
        <button
          type="button"
          onClick={() => setRole("recruiter")}
          className={`flex flex-col items-center gap-2 rounded-sm border px-4 py-4 transition-all ${
            role === "recruiter"
              ? "border-sky-300 bg-sky-300/15 text-white"
              : "border-white/20 text-white/60 hover:border-white/40 hover:text-white/85"
          }`}
        >
          <Building2 className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-[11px] tracking-[0.14em] uppercase">
            Sou recrutador
          </span>
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2">
          Nome completo
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome completo"
          className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-sky-300/70 focus:bg-white/8 transition-colors"
        />
      </div>

      <div className="mb-4">
        <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2">
          Telefone
        </label>
        <input
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={() => setTouched(true)}
          placeholder="(11) 98888-7777"
          className={`w-full bg-white/5 border rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none transition-colors ${
            phoneError
              ? "border-red-400/60 focus:border-red-400"
              : "border-white/20 focus:border-sky-300/70 focus:bg-white/8"
          }`}
        />
        {phoneError && (
          <p className="mt-1.5 text-[11px] text-red-300">{phoneError}</p>
        )}
      </div>

      <label className="flex items-start gap-2.5 mb-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded-sm border-white/30 bg-white/5 accent-sky-300"
        />
        <span className="text-[11px] text-white/60 leading-relaxed">
          Li e aceito a{" "}
          <a
            href="/privacidade"
            target="_blank"
            className="text-sky-200 hover:text-white underline underline-offset-2"
          >
            Política de Privacidade
          </a>{" "}
          e autorizo o uso dos meus dados para fins de recrutamento.
        </span>
      </label>

      <button
        type="button"
        disabled={!canContinue}
        onClick={handleGoogleContinue}
        className="mt-5 w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-sm bg-white text-slate-900 text-sm font-semibold tracking-[0.08em] disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:bg-white/90 transition-all"
      >
        <GoogleIcon className="w-4 h-4" />
        Continuar com Google
      </button>

      <p className="mt-4 text-center text-[11px] text-white/45 leading-relaxed">
        Seu e-mail do Google será usado para identificar sua conta.
      </p>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 01-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A11.99 11.99 0 0012 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 010-4.58V6.6H1.27a12 12 0 000 10.8l4-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.6l4 3.11C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}
