import { getJobs, getUsers } from "@/lib/store";
import Link from "next/link";

export function MatchingList() {
  const jobs = getJobs();
  const users = getUsers();

  const rankings = jobs.map((job) => {
    const candidates = users
      .filter((u) => u.role === "candidato")
      .map((user) => {
        const matched = job.requirements.filter((req) =>
          user.skills?.some(
            (skill) =>
              req.toLowerCase().includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(req.toLowerCase())
          )
        );
        const score = Math.round((matched.length / job.requirements.length) * 100);
        return { user, score, matched };
      })
      .filter((c) => c.matched.length > 0)
      .sort((a, b) => b.score - a.score);

    return { job, candidates };
  });

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="space-y-6">
      {rankings.map(({ job, candidates }) => (
        <div key={job.id} className="card-glass rounded-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-launch-elevated to-launch-surface border-b border-launch-gold/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-display text-lg sm:text-xl font-bold break-words leading-tight uppercase tracking-wide">
                  {job.title}
                </h2>
                <p className="text-sm text-launch-muted mt-1 break-words">{job.company}</p>
              </div>
              <div className="sm:text-right">
                <div className="text-[11px] uppercase tracking-widest text-launch-gold">Matches</div>
                <div className="text-2xl sm:text-3xl font-bold leading-none text-launch-white">
                  {candidates.length}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4 space-y-3">
            {candidates.slice(0, 10).map((candidate, index) => (
              <Link key={candidate.user.id} href={`/curriculo/${candidate.user.id}`} className="group block">
                <div className="rounded-sm border border-launch-border bg-launch-elevated/50 p-3 sm:p-4 hover:border-launch-gold/40 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="w-6 shrink-0 text-xs font-bold text-launch-muted">#{index + 1}</div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-launch-gold to-launch-gold-dim text-white text-sm flex items-center justify-center font-semibold shrink-0">
                        {getInitials(candidate.user.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm sm:text-base text-launch-white break-words leading-tight group-hover:text-launch-gold transition-colors">
                          {candidate.user.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {candidate.matched.slice(0, 4).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded-full bg-slate-100 text-launch-soft text-[11px] sm:text-xs break-words"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="md:text-right shrink-0">
                      <div
                        className={`text-lg sm:text-xl font-bold ${
                          candidate.score >= 80
                            ? "text-emerald-400"
                            : candidate.score >= 60
                              ? "text-amber-400"
                              : "text-rose-400"
                        }`}
                      >
                        {candidate.score}%
                      </div>
                      <div className="text-[11px] text-launch-muted">Compatibilidade</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          candidate.score >= 80
                            ? "bg-emerald-400"
                            : candidate.score >= 60
                              ? "bg-amber-400"
                              : "bg-rose-400"
                        }`}
                        style={{ width: `${candidate.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
