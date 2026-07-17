"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  Target,
  FileText,
  Users,
  MessageCircle,
  User,
  Building2,
  UserRound,
} from "lucide-react";

interface NavLinksProps {
  unread: number;
}

const navItems = [
  { href: "/feed", label: "Feed", icon: Home },
  { href: "/membro", label: "Membro", icon: UserRound },
  { href: "/recrutador", label: "Recrutador", icon: Building2 },
  { href: "/vagas", label: "Vagas", icon: Briefcase },
  { href: "/matching", label: "Match", icon: Target },
  { href: "/curriculo", label: "Currículo", icon: FileText },
  { href: "/contatos", label: "Contatos", icon: Users },
  { href: "/mensagens", label: "Mensagens", icon: MessageCircle },
  { href: "/perfil", label: "Perfil", icon: User },
];

export function NavLinks({ unread }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          const showBadge = href === "/mensagens" && unread > 0;

          return (
            <Link
              key={href}
              href={href}
              className={`
                relative flex items-center gap-1.5
                px-2.5 lg:px-3 py-2 rounded-lg
                text-[11px] lg:text-xs font-medium tracking-wide
                transition-all duration-300
                ${
                  isActive
                    ? "bg-launch-gold/15 text-launch-gold"
                    : "text-launch-muted hover:text-launch-white hover:bg-slate-100"
                }
              `}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden xl:block">{label}</span>
              {showBadge && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-launch-gold text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <nav className="md:hidden flex items-center justify-between w-full py-2 overflow-x-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          const showBadge = href === "/mensagens" && unread > 0;

          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center justify-center gap-1 min-w-[52px] px-1.5 py-2"
            >
              <Icon
                className={`w-4.5 h-4.5 ${isActive ? "text-launch-gold" : "text-launch-muted"}`}
              />
              <span
                className={`text-[9px] font-medium ${isActive ? "text-launch-gold" : "text-launch-muted"}`}
              >
                {label}
              </span>
              {showBadge && (
                <span className="absolute top-1 right-1 min-w-[14px] h-3.5 px-0.5 bg-launch-gold text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-launch-gold" />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
