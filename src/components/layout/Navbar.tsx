import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { NavLinks } from "@/components/layout/NavLinks";
import { getUnreadCount } from "@/lib/store";
import { CURRENT_USER_ID, currentUser } from "@/lib/seed";

export async function Navbar() {
  const unread = getUnreadCount(CURRENT_USER_ID);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-launch-border shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="hidden md:flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
          <div className="shrink-0">
            <Logo size="sm" />
          </div>

          <form action="/vagas" method="GET" className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-launch-muted" />
              <input
                name="q"
                type="text"
                placeholder="Buscar vagas..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-launch-elevated border border-launch-border text-slate-900 placeholder:text-launch-muted/70 text-sm focus:outline-none focus:ring-2 focus:ring-launch-gold/35 transition-shadow"
              />
            </div>
          </form>

          <div className="shrink-0">
            <NavLinks unread={unread} />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="relative p-2 rounded-lg text-launch-muted hover:text-launch-gold hover:bg-launch-gold/5 transition-all"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-launch-gold" />
            </button>
            <Link href="/perfil" className="shrink-0">
              <Avatar user={currentUser} size="sm" />
            </Link>
          </div>
        </div>

        <div className="md:hidden">
          <div className="h-14 px-4 flex items-center justify-between">
            <Logo size="sm" />
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="relative p-2 rounded-lg text-launch-muted hover:text-launch-gold transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-launch-gold" />
              </button>
              <Link href="/perfil">
                <Avatar user={currentUser} size="sm" />
              </Link>
            </div>
          </div>
          <div className="px-4 pb-3">
            <form action="/vagas" method="GET">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-launch-muted" />
                <input
                  name="q"
                  type="text"
                  placeholder="Buscar vagas..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-launch-elevated border border-launch-border text-slate-900 placeholder:text-launch-muted/70 text-sm focus:outline-none focus:ring-2 focus:ring-launch-gold/35"
                />
              </div>
            </form>
          </div>
          <div className="border-t border-launch-border px-1">
            <NavLinks unread={unread} />
          </div>
        </div>
      </div>
    </header>
  );
}
