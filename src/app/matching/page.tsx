import { MatchingList } from "@/components/matching/MatchingList";

export default function MatchingPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-up">
        <p className="text-[11px] tracking-[0.3em] uppercase text-launch-gold mb-2">Inteligência</p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide">
          Ranking de Compatibilidade
        </h1>
        <p className="text-launch-muted mt-2 text-sm">
          Compare currículos com requisitos das vagas e encontre o match ideal.
        </p>
      </div>
      <MatchingList />
    </main>
  );
}
