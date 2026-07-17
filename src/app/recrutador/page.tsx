import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  MessageCircle,
  Target,
  Users,
  FileText,
  BarChart3,
} from "lucide-react";
import { CreateJobForm, JobCard } from "@/components/jobs/JobCard";
import { MatchingList } from "@/components/matching/MatchingList";
import { Avatar } from "@/components/ui/Avatar";
import { getJobs, getUsers } from "@/lib/store";
import { currentUser } from "@/lib/seed";
const RECRUITER_IMAGE = "/about.png";
const tools = [
  { href: "/vagas", label: "Publicar vagas", icon: Briefcase },
  { href: "/matching", label: "Matching", icon: Target },
  { href: "/contatos", label: "Candidatos", icon: Users },
  { href: "/mensagens", label: "Mensagens", icon: MessageCircle },
  { href: "/curriculo", label: "Currículos", icon: FileText },
  { href: "/feed", label: "Feed empresa", icon: BarChart3 },
];

export default function RecrutadorPage() {
  const jobs = getJobs().slice(0, 2);
  const candidates = getUsers().filter((u) => u.role === "candidato").length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
       <section className="relative overflow-hidden rounded-sm border border-launch-border bg-launch-surface p-6 sm:p-10 animate-fade-up bg-cover bg-center" style={{ backgroundImage: `url(${RECRUITER_IMAGE})` }}>
        <div className="absolute inset-0 hero-mesh opacity-50 pointer-events-none" />
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
          <div className="flex items-center gap-5">
            <Avatar user={currentUser} size="lg" />
            <div>
              <p className="text-[13px] tracking-[0.3em] text-white uppercase text-launch-gold mb-2">
                Portal do recrutador
              </p>
              <h1 className="font-display text-2xl text-white sm:text-4xl font-bold uppercase tracking-wide">
                {currentUser.company || "Launch"}
              </h1>
              <p className="text-sm text-white text-[17px] text-launch-muted mt-1">{currentUser.name}</p>
            </div>
          </div>
          <div className="flex gap-6 sm:gap-10">
            <div>
              <p className="font-display text-3xl font-bold text-white text-launch-gold">{jobs.length}</p>
              <p className="text-[13px] tracking-[0.4em] uppercase text-white text-launch-muted mt-1">Vagas ativas</p>
            </div>
            <div>
              <p className="font-display text-3xl text-white font-bold text-launch-gold">{candidates}</p>
              <p className="text-[13px] tracking-[0.4em] uppercase text-white text-launch-muted mt-1">Candidatos</p>
            </div>
            <div>
              <p className="font-display text-3xl text-white font-bold text-launch-gold">
                {getJobs().reduce((acc, j) => acc + j.applicants, 0)}
              </p>
              <p className="text-[13px] tracking-[0.4em] text-white uppercase text-launch-muted mt-1">Candidaturas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {tools.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group card-glass rounded-sm p-4 text-center hover:border-launch-gold/40 transition-all"
          >
            <Icon className="w-5 h-5 text-launch-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] tracking-[0.15em] uppercase text-launch-soft group-hover:text-launch-white">
              {label}
            </span>
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg uppercase tracking-wide">Gerenciar vagas</h2>
          <Link
            href="/vagas"
            className="text-xs tracking-[0.18em] uppercase text-launch-gold inline-flex items-center gap-1"
          >
            Ver todas <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <CreateJobForm />
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg uppercase tracking-wide">Matching rápido</h2>
          <Link
            href="/matching"
            className="text-xs tracking-[0.18em] uppercase text-launch-gold inline-flex items-center gap-1"
          >
            Ranking completo <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="max-h-[640px] overflow-y-auto pr-1">
          <MatchingList />
        </div>
      </section>
    </div>
  );
}
