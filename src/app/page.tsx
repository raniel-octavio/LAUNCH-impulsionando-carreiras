import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Target,
  FileText,
  Building2,
  UserRound,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { getJobs } from "@/lib/store";

const specialties = [
  { icon: Target, label: "MATCH INTELIGENTE" },
  { icon: FileText, label: "CURRÍCULO" },
  { icon: Briefcase, label: "VAGAS" },
];

/** Futuristic / architectural — no people */
const HERO_IMAGE = "/home.png";

const ABOUT_IMAGE ="/about.png";

const MEMBERSHIP_IMAGE = "/job1.png";

const RECRUITER_IMAGE = "/job2.png";

const jobImages = [
  "/job1.png",
  "/job2.png",
  "/job3.png",
  "/job4.png",
];

export default function LandingPage() {
  const jobs = getJobs().slice(0, 4);

  return (
    <div className="bg-launch-void text-launch-white overflow-x-hidden">
      {/* ── HERO — layout equilibrado como a referência ── */}
      <section className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 animate-fade-in hero-image-veil z-0"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          />
          <div className="absolute inset-0 hero-mesh z-10 bg-black/40" />
        </div>


        {/* Nav: logo | links | CTAs — overlaid on image */}
        <header className="relative z-20 flex items-center justify-between px-5 sm:px-8 lg:px-14 py-6 animate-fade-in">
          <Logo size="md" tone="light" />
          <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.22em] uppercase text-white/85">
            <a href="#sobre" className="hover:text-white transition-colors">
              Sobre
            </a>
            <a href="#vagas" className="hover:text-white transition-colors">
              Vagas
            </a>
            <Link href="/feed" className="hover:text-white transition-colors">
              Feed
            </Link>
            <Link href="/contatos" className="hover:text-white transition-colors">
              Contatos
            </Link>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/membro"
              className="hidden sm:inline-flex text-[11px] tracking-[0.18em] uppercase text-white/80 hover:text-white transition-colors px-3 py-2"
            >
              Membro
            </Link>
            <Link
              href="/recrutador"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-white/40 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-white hover:text-slate-900 transition-all"
            >
              Recrutador
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Centered hero — bold caps like reference */}
        <div
          id="inicio"
          className="relative z-10 flex-1 mt-8 flex flex-col items-center justify-center text-center px-6 pb-28"
        >
          <p className="animate-fade-up text-[11px] tracking-[0.45em] uppercase text-sky-200/90 mb-5">
            Plataforma de talentos
          </p>
          <h2 className="animate-fade-up delay-100 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.0rem] font-extrabold tracking-[0.04em] uppercase leading-[1.08] max-w-5xl text-white">
            Lance sua carreira
            <br />
            ao próximo nível
          </h2>
          <p className="animate-fade-up delay-200 mt-7 max-w-lg text-sm sm:text-base text-white/75 leading-relaxed font-light">
            Match inteligente, currículo, mensagens e vagas — uma experiência
            moderna para candidatos e recrutadores.
          </p>
          <div className="animate-fade-up delay-300 mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/membro"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm bg-launch-gold text-white text-sm font-semibold tracking-[0.12em] uppercase hover:bg-launch-gold-bright transition-all hover:scale-[1.02] shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
            >
              Área do candidato
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/vagas"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm border border-white/50 text-sm tracking-[0.12em] uppercase text-white hover:bg-white/10 transition-all"
            >
              Ver vagas
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT — contraste sofisticado + imagem com vida ── */}
      <section
        id="sobre"
        className="relative py-20 lg:py-7 px-6 sm:px-10 lg:px-16 bg-[#f7f9fc] scroll-mt-0"
      >
        {/* Cabeçalho centralizado */}
        <div className="flex flex-col items-center">
          <a
            href="#"
            className="hover:text-launch-gold lg:py-5 transition-colors mb-2 text-[14px] font-medium"
          >
            Início
          </a>
          <p className="text-center text-[11px] tracking-[0.35em] uppercase text-launch-gold mb-10">
            Sobre Launch
          </p>
        </div>

        {/* Grid principal */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10 items-start">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase leading-tight mb-5 text-slate-900">
              Tecnologia e sofisticação para impulsionar carreiras
            </h3>
            <p className="text-launch-muted text-sm leading-relaxed">
              Unimos design equilibrado e ferramentas reais de RH: matching por
              skills, publicação de vagas, networking e comunicação direta —
              com a energia de um produto vivo.
            </p>
          </div>

          <div className="lg:border-x lg:border-launch-border lg:px-10">
            <p className="text-[11px] tracking-[0.28em] uppercase text-launch-gold mb-8">
              Nossa especialização:
            </p>
            <ul className="space-y-7">
              {specialties.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-full border border-launch-gold/40 bg-launch-gold/8 flex items-center justify-center group-hover:bg-launch-gold/15 transition-colors">
                    <Icon className="w-5 h-5 text-launch-gold" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs tracking-[0.2em] uppercase text-launch-soft group-hover:text-launch-gold transition-colors">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_20px_50px_rgba(18,32,51,0.18)]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url(${ABOUT_IMAGE})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#122033]/55 via-transparent to-transparent" />
          </div>
        </div>

        {/* Portais com faixas */}
        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/membro"
            className="group relative overflow-hidden rounded-sm p-8 min-h-[200px] flex flex-col justify-end text-white"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${MEMBERSHIP_IMAGE})` }}
            />
            <div className="absolute inset-0 bg-[#122033]/70 group-hover:bg-[#122033]/60 transition-colors" />
            <div className="relative z-10">
              <UserRound className="w-7 h-7 text-sky-300 mb-3" />
              <h4 className="font-display text-xl uppercase tracking-wide mb-2">
                Área do Membro
              </h4>
              <p className="text-sm text-white/70 mb-4 max-w-sm">
                Feed, currículo, candidaturas, contatos e mensagens.
              </p>
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-sky-200">
                Entrar{" "}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          <Link
            href="/recrutador"
            className="group relative overflow-hidden rounded-sm p-8 min-h-[200px] flex flex-col justify-end text-white"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${RECRUITER_IMAGE})` }}
            />
            <div className="absolute inset-0 bg-[#122033]/70 group-hover:bg-[#122033]/60 transition-colors" />
            <div className="relative z-10">
              <Building2 className="w-7 h-7 text-sky-300 mb-3" />
              <h4 className="font-display text-xl uppercase tracking-wide mb-2">
                Área do Recrutador
              </h4>
              <p className="text-sm text-white/70 mb-4 max-w-sm">
                Publique vagas, rode matching e fale com talentos.
              </p>
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-sky-200">
                Entrar{" "}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>


      {/* ── JOBS ── */}
      <section id="vagas" className="py-24 lg:py-5 px-4 sm:px-8 section-rich">
        <div className="flex flex-col items-center">
        <a href="#" className="hover:text-launch-white relative top-7 transition-colors text-[11px] tracking-[0.35em] uppercase text-sky-200 mb-14">
          Início
        </a>
        <p className="text-center text-[11px] tracking-[0.35em] uppercase text-sky-300 mb-14">
          Vagas em destaque
        </p>
        </div>
        <div className="max-w-7xl mx-auto flex items-stretch gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {jobs.map((job, i) => (
            <Link
              key={job.id}
              href="/vagas"
              className="job-panel snap-start shrink-0 w-[72vw] sm:w-[280px] lg:w-[300px] h-[420px] sm:h-[480px] rounded-sm relative group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${jobImages[i % jobImages.length]})` }}
              />
              <div className="relative z-10 flex flex-col h-full p-5 justify-between text-white">
                <div>
                  <h4 className="font-display text-sm sm:text-base font-bold uppercase tracking-wide leading-snug">
                    {job.title}
                  </h4>
                  <p className="mt-2 text-xs text-white/75">{job.company}</p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-vertical text-[10px] tracking-[0.25em] uppercase text-sky-200">
                    {job.modality}
                  </span>
                  <span className="text-xs text-white/70">{job.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/vagas"
            className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-white/70 hover:text-white transition-colors"
          >
            Ver todas as vagas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-launch-border bg-white py-10 px-6 flex items-center justify-between">
        <Logo size="sm" />
        <p className="absolute left-1/2 transform -translate-x-1/2 text-[11px] tracking-[0.2em] uppercase text-launch-muted">
          © {new Date().getFullYear()} Launch · Impulsionando carreiras
        </p>
      </footer>

    </div>
  );
}
