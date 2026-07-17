"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <>
      {!isLanding && <Navbar />}
      <main className="flex-1">{children}</main>
    </>
  );
}
