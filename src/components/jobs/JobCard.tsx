import { MapPin, Clock, Users, Briefcase } from "lucide-react";
import { applyToJob, createJob } from "@/lib/actions";
import { formatShortDate } from "@/lib/utils";
import type { Job } from "@/types";

const modalityColors: Record<Job["modality"], string> = {
  Remoto: "bg-emerald-500/15 text-emerald-300",
  Presencial: "bg-sky-500/15 text-sky-300",
  Híbrido: "bg-violet-500/15 text-violet-300",
};

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="w-full card-glass rounded-sm hover:border-launch-gold/25 transition-all overflow-hidden">
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div className="flex gap-3 sm:gap-4 min-w-0 flex-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-launch-elevated to-launch-ink border border-launch-border flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6 text-launch-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-launch-white text-base sm:text-lg break-words">
                {job.title}
              </h3>
              <p className="text-sm text-launch-muted break-words">{job.company}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="flex items-center gap-1 text-xs text-launch-muted">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {job.location}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${modalityColors[job.modality]}`}>
                  {job.modality}
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-launch-soft">
                  {job.type}
                </span>
              </div>
            </div>
          </div>
          {job.salary && (
            <div className="shrink-0">
              <span className="text-sm sm:text-base font-semibold text-launch-gold">{job.salary}</span>
            </div>
          )}
        </div>

        <p className="mt-4 text-sm text-launch-muted leading-relaxed whitespace-pre-wrap break-words">
          {job.description}
        </p>

        <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-4 text-xs text-launch-muted/80">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 shrink-0" />
              {formatShortDate(job.postedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 shrink-0" />
              {job.applicants} candidatos
            </span>
          </div>
          <form action={applyToJob} className="w-full md:w-auto">
            <input type="hidden" name="jobId" value={job.id} />
            <button
              type="submit"
              className="w-full md:w-auto px-5 py-3 text-sm font-semibold text-white bg-launch-gold hover:bg-launch-gold-bright rounded-full transition-all"
            >
              Candidatar-se
            </button>
          </form>
        </div>

        <details className="mt-5">
          <summary className="cursor-pointer text-sm font-medium text-launch-soft hover:text-launch-gold transition-colors">
            Requisitos e benefícios
          </summary>
          <div className="mt-4 pt-4 border-t border-launch-border space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-launch-white mb-2">Requisitos</h4>
              <ul className="space-y-2">
                {job.requirements.map((req) => (
                  <li key={req} className="flex gap-2 text-sm text-launch-muted">
                    <span className="text-launch-gold shrink-0">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-launch-white mb-2">Benefícios</h4>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="text-xs px-3 py-1 rounded-full bg-launch-gold/10 text-launch-gold-bright font-medium"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </details>
      </div>
    </article>
  );
}

export function CreateJobForm() {
  return (
    <details className="w-full card-glass rounded-sm overflow-hidden">
      <summary className="p-4 cursor-pointer text-launch-gold font-medium text-sm hover:bg-launch-gold/5 transition-colors">
        + Publicar Nova Vaga
      </summary>
      <form action={createJob} className="p-4 sm:p-5 pt-0 space-y-4 border-t border-launch-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
          <Field label="Título" name="title" required />
          <Field label="Empresa" name="company" required />
          <Field label="Localização" name="location" />
          <Field label="Faixa Salarial" name="salary" placeholder="R$ 5.000 - R$ 8.000" />
          <SelectField label="Tipo" name="type" options={["CLT", "PJ", "Estágio", "Temporário"]} />
          <SelectField label="Modalidade" name="modality" options={["Presencial", "Remoto", "Híbrido"]} />
        </div>
        <TextField label="Descrição" name="description" required />
        <TextField label="Requisitos (um por linha)" name="requirements" />
        <TextField label="Benefícios (um por linha)" name="benefits" />
        <div className="flex justify-stretch md:justify-end">
          <button
            type="submit"
            className="w-full md:w-auto px-5 py-3 text-sm font-semibold text-white bg-launch-gold hover:bg-launch-gold-bright rounded-full transition-all"
          >
            Publicar Vaga
          </button>
        </div>
      </form>
    </details>
  );
}

function Field({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-launch-muted mb-1.5">{label}</label>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-3 border border-launch-border rounded-lg text-sm bg-launch-elevated text-launch-white placeholder:text-launch-muted/50 focus:outline-none focus:ring-2 focus:ring-launch-gold/30"
      />
    </div>
  );
}

function TextField({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-launch-muted mb-1.5">{label}</label>
      <textarea
        name={name}
        required={required}
        rows={4}
        className="w-full px-3 py-3 border border-launch-border rounded-lg text-sm resize-y bg-launch-elevated text-launch-white focus:outline-none focus:ring-2 focus:ring-launch-gold/30"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-launch-muted mb-1.5">{label}</label>
      <select
        name={name}
        defaultValue={options[0]}
        className="w-full px-3 py-3 border border-launch-border rounded-lg text-sm bg-launch-elevated text-launch-white focus:outline-none focus:ring-2 focus:ring-launch-gold/30"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
