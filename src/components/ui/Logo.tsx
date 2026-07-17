import Link from "next/link";
import { Rocket } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
  /** light = white text for dark hero overlays */
  tone?: "dark" | "light";
}

export function Logo({ size = "md", showText = true, href = "/", tone = "dark" }: LogoProps) {
  const sizes = {
    sm: { icon: "w-8 h-8", rocket: "w-4 h-4", title: "text-sm", subtitle: "text-[8px]" },
    md: { icon: "w-10 h-10", rocket: "w-5 h-5", title: "text-lg", subtitle: "text-[9px]" },
    lg: { icon: "w-14 h-14", rocket: "w-7 h-7", title: "text-2xl", subtitle: "text-[10px]" },
  };

  const s = sizes[size];
  const titleColor = tone === "light" ? "text-white" : "text-slate-900";
  const subColor = tone === "light" ? "text-white/65" : "text-launch-muted";

  return (
    <Link href={href} className="flex items-center gap-3 group">
      <div
        className={`
          ${s.icon}
          relative shrink-0
          rounded-xl
          bg-gradient-to-br from-launch-gold to-launch-gold-dim
          flex items-center justify-center
          shadow-[0_8px_24px_rgba(27,127,191,0.4)]
          group-hover:shadow-[0_10px_28px_rgba(27,127,191,0.5)]
          transition-shadow duration-500
        `}
      >
        <Rocket
          className={`${s.rocket} text-white -rotate-45 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-500`}
          strokeWidth={2.25}
        />
      </div>
      {showText && (
        <div className="hidden sm:block">
          <h1
            className={`${s.title} font-display font-bold tracking-[0.12em] uppercase ${titleColor} leading-tight group-hover:text-launch-gold-bright transition-colors`}
          >
            Launch
          </h1>
          <p className={`${s.subtitle} tracking-[0.28em] ${subColor} uppercase`}>
            Impulsionando carreiras
          </p>
        </div>
      )}
    </Link>
  );
}
