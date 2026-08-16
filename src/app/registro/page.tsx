import { Logo } from "@/components/ui/Logo";
import { RegistroForm } from "@/components/auth/RegistroForm";

const HERO_IMAGE = "/home.png";

export default async function RegistroPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const hintedRole = role === "member" || role === "recruiter" ? role : null;

  return (
    <div className="relative min-h-screen flex flex-col bg-launch-void text-launch-white overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 animate-fade-in hero-image-veil z-0"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 hero-mesh z-10 bg-black/55" />
      </div>

      <header className="relative z-20 flex items-center justify-center px-5 sm:px-8 lg:px-14 py-4 sm:py-6 animate-fade-in shrink-0">
        <Logo size="md" tone="light" />
      </header>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-16 overflow-y-auto">
        <p className="animate-fade-up text-[10px] sm:text-[11px] tracking-[0.35em] sm:tracking-[0.45em] uppercase text-sky-200/90 mb-3 sm:mb-5 text-center">
          Crie sua conta
        </p>
        <h2 className="animate-fade-up delay-100 font-display text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.03em] uppercase leading-tight text-white mb-6 sm:mb-10 text-center px-2">
          Complete seu cadastro
        </h2>

        <div className="animate-fade-up delay-200 w-full max-w-md rounded-lg border border-white/15 bg-white/8 backdrop-blur-xl p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <RegistroForm hintedRole={hintedRole} />
        </div>

        <a
          href="/"
          className="animate-fade-up delay-300 mt-6 sm:mt-8 inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-white/50 hover:text-white transition-colors"
        >
          Voltar ao início
        </a>
      </div>
    </div>
  );
}