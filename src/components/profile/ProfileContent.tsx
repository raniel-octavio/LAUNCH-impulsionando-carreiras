import Link from "next/link";
import { MapPin, Users, MessageCircle, Briefcase, Award } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { openConversation } from "@/lib/actions";
import type { User } from "@/types";
const MEMBERSHIP_IMAGE = "/job4.png";
const roleLabels: Record<User["role"], string> = {
  candidato: "Candidato",
  recrutador: "Recrutador",
  empresa: "Empresa",
};

export function ProfileContent({
  user,
  isOwnProfile,
}: {
  user: User;
  isOwnProfile?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="card-glass rounded-sm overflow-hidden">
        <div className="h-24 bg-white relative" style={{ backgroundImage: `url(${MEMBERSHIP_IMAGE})`}}>
          <div className="absolute inset-0 hero-mesh opacity-50" />
        </div>
        <div className="px-4 sm:px-6 pb-3">
          <div className="-mt-10 relative inline-block">
            <Avatar user={user} size="lg" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-xl sm:text-2xl font-bold text-launch-white uppercase tracking-wide">
                  {user.name}
                </h1>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-launch-gold/10 text-launch-gold">
                  {roleLabels[user.role]}
                </span>
              </div>
              <p className="text-sm text-launch-muted mt-1">{user.headline}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-xs text-launch-muted">
                {user.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {user.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {user.connections} conexões
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {!isOwnProfile && (
                <form action={openConversation}>
                  <input type="hidden" name="participantId" value={user.id} />
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-launch-gold hover:bg-launch-gold-bright rounded-full transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Mensagem
                  </button>
                </form>
              )}
              {isOwnProfile && (
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-launch-gold border border-launch-gold/30 rounded-full hover:bg-launch-gold/10 transition-colors"
                >
                  Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {user.about && (
        <div className="card-glass rounded-sm p-4 sm:p-6">
          <h2 className="font-semibold text-launch-white mb-3">Sobre</h2>
          <p className="text-sm text-launch-muted leading-relaxed">{user.about}</p>
        </div>
      )}

      {user.skills?.length > 0 && (
        <div className="card-glass rounded-sm p-4 sm:p-6">
          <h2 className="font-semibold text-launch-white mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-launch-gold" />
            Competências
          </h2>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="text-sm px-3 py-1.5 rounded-full bg-slate-100 text-launch-soft font-medium border border-launch-border"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {isOwnProfile && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/vagas"
            className="card-glass rounded-sm p-5 hover:border-launch-gold/30 group transition-all"
          >
            <Briefcase className="w-6 h-6 text-launch-gold mb-2" />
            <h3 className="font-semibold text-launch-white group-hover:text-launch-gold transition-colors">
              Minhas Vagas
            </h3>
            <p className="text-xs text-launch-muted mt-1">Gerencie vagas publicadas</p>
          </Link>
          <Link
            href="/mensagens"
            className="card-glass rounded-sm p-5 hover:border-launch-gold/30 group transition-all"
          >
            <MessageCircle className="w-6 h-6 text-launch-gold mb-2" />
            <h3 className="font-semibold text-launch-white group-hover:text-launch-gold transition-colors">
              Mensagens
            </h3>
            <p className="text-xs text-launch-muted mt-1">Converse com candidatos e recrutadores</p>
          </Link>
        </div>
      )}
    </div>
  );
}
