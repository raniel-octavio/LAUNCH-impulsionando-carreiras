import { CreateJobForm, JobCard } from "@/components/jobs/JobCard";
import { getJobs } from "@/lib/store";

const RECRUITER_IMAGE = "/job1.png";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function VagasPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const jobs = getJobs(q);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      <div className="relative overflow-hidden rounded-sm border border-launch-border bg-launch-surface p-6 sm:p-10 animate-fade-up bg-cover bg-center" style={{ backgroundImage: `url(${RECRUITER_IMAGE})` }}>
        <div className="absolute inset-0 hero-mesh opacity-40 pointer-events-none" />
        <div className="relative">
          <p className="text-[14px] text-white tracking-[0.3em] uppercase text-launch-gold mb-2">Oportunidades</p>
          <h1 className="font-display text-2xl sm:text-4xl text-white font-bold uppercase tracking-wide">
            Vagas Launch
          </h1>
          <p className="text-launch-muted mt-1 text-white text-[17px] text-sm">{jobs.length} vagas disponíveis</p>
          <form method="GET" className="mt-5">
          <input
            name="q"
            defaultValue={q}
            placeholder="Buscar por cargo, empresa ou cidade..."
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white text-white placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-launch-gold/40 text-sm"
          />
        </form>
        </div>
      </div>

      <CreateJobForm />

      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}

      {jobs.length === 0 && (
        <p className="text-center py-12 text-launch-muted">Nenhuma vaga encontrada.</p>
      )}
    </div>
  );
}
