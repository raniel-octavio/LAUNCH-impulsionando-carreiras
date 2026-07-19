"use client";

export function LoginForm({ callbackUrl = "/" }: { callbackUrl?: string }) {
  function handleGoogleLogin() {
    window.location.href = `/api/auth/signin/google?callbackUrl=${encodeURIComponent(
      callbackUrl
    )}`;
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-sm bg-white text-slate-900 text-sm font-semibold tracking-[0.08em] hover:bg-white/90 transition-all"
      >
        <GoogleIcon className="w-4 h-4" />
        Entrar com Google
      </button>

      <p className="mt-4 text-center text-[11px] text-white/45 leading-relaxed">
        Seu e-mail do Google identifica sua conta automaticamente.
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
