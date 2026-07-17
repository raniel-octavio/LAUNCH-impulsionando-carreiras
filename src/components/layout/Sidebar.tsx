import Link from "next/link";
import { ArrowRight, TrendingUp, Users } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { getContacts } from "@/lib/utils";
import { CURRENT_USER_ID } from "@/lib/seed";

export function Sidebar() {
  const contacts = getContacts(CURRENT_USER_ID).slice(0, 3);

  const trends = ["#LaunchRH", "#VagasAbertas", "#Match", "#Carreira"];

  return (
    <aside className="w-full space-y-4">
      <section className="card-glass rounded-sm overflow-hidden">
        <div className="p-4 sm:p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-launch-white mb-4">
            <TrendingUp className="w-4 h-4 text-launch-gold shrink-0" />
            Tendências
          </h3>
          <div className="flex flex-wrap gap-2">
            {trends.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-slate-100 border border-launch-border text-xs text-launch-soft hover:border-launch-gold/40 hover:text-launch-gold transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="card-glass rounded-sm overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-launch-white">
              <Users className="w-4 h-4 text-launch-gold shrink-0" />
              Contatos
            </h3>
            <Link
              href="/contatos"
              className="flex items-center gap-1 text-xs text-launch-gold hover:text-launch-gold-bright transition-colors"
            >
              Ver todos
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {contacts.map((user) => (
              <Link
                key={user.id}
                href="/contatos"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors group"
              >
                <Avatar user={user} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-launch-white group-hover:text-launch-gold transition-colors truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-launch-muted truncate">{user.headline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
}
