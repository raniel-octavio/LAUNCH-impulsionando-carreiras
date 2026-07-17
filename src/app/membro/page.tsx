import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  FileText,
  MessageCircle,
  Target,
  Users,
  Sparkles,
} from "lucide-react";
import { CreatePostForm } from "@/components/feed/CreatePostForm";
import { PostCard } from "@/components/feed/PostCard";
import { Avatar } from "@/components/ui/Avatar";
import { getJobs, getPosts } from "@/lib/store";
import { currentUser } from "@/lib/seed";

const RECRUITER_IMAGE = "/about.png";
const shortcuts = [
  { href: "/curriculo", label: "Meu currículo", icon: FileText, desc: "Edite e compartilhe seu perfil" },
  { href: "/vagas", label: "Buscar vagas", icon: Briefcase, desc: "Explore oportunidades abertas" },
  { href: "/matching", label: "Meu match", icon: Target, desc: "Veja compatibilidade com vagas" },
  { href: "/mensagens", label: "Mensagens", icon: MessageCircle, desc: "Converse com recrutadores" },
  { href: "/contatos", label: "Networking", icon: Users, desc: "Amplie sua rede profissional" },
  { href: "/feed", label: "Feed completo", icon: Sparkles, desc: "Notícias e dicas da comunidade" },
];

export default function MembroPage() {
  const posts = getPosts().slice(0, 3);
  const jobs = getJobs().slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 ">
      {/* Hero banner */}
      <section className="relative overflow-hidden rounded-sm border border-launch-border bg-launch-surface p-6 sm:p-10 animate-fade-up bg-cover bg-center" style={{ backgroundImage: `url(${RECRUITER_IMAGE})` }}>
        <div className="absolute inset-0 hero-mesh opacity-60 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-6" >
          <Avatar user={currentUser} size="lg" />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] tracking-[0.3em] uppercase text-white mb-2">
              Área do membro
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide truncate">
              Olá, {currentUser.name.split(" ")[0]}
            </h1>
            <p className="text-sm text-[17px] text-white text-launch-muted mt-1">{currentUser.headline}</p>
          </div>
          <Link
            href="/perfil"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-launch-gold text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-launch-gold-bright transition-all shrink-0"
          >
            Ver perfil <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Shortcuts */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shortcuts.map(({ href, label, icon: Icon, desc }, i) => (
          <Link
            key={href}
            href={href}
            className={`group card-glass rounded-sm p-5 hover:border-launch-gold/40 transition-all duration-400 animate-fade-up delay-${(i % 3) + 1}00`}
          >
            <Icon className="w-5 h-5 text-launch-gold mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-sm uppercase tracking-wide mb-1">{label}</h3>
            <p className="text-xs text-launch-muted font-light">{desc}</p>
          </Link>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-4">
          <h2 className="font-display text-lg uppercase tracking-wide text-launch-soft">Seu feed</h2>
          <CreatePostForm />
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          <Link
            href="/feed"
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-launch-gold hover:text-launch-gold-bright"
          >
            Ver feed completo <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <aside className="space-y-4">
          <h2 className="font-display text-lg uppercase tracking-wide text-launch-soft">Vagas recentes</h2>
          {jobs.map((job) => (
            <Link
              key={job.id}
              href="/vagas"
              className="block card-glass rounded-sm p-4 hover:border-launch-gold/30 transition-all group"
            >
              <h3 className="text-sm font-semibold group-hover:text-launch-gold transition-colors">
                {job.title}
              </h3>
              <p className="text-xs text-launch-muted mt-1">
                {job.company} · {job.location}
              </p>
              <span className="inline-block mt-2 text-[10px] tracking-wider uppercase text-launch-gold">
                {job.modality}
              </span>
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
}
