"use client";

import { usePathname } from "next/navigation";

export function AppChrome({
  children,
  navbar,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <>
      {!isLanding && navbar}
      <main className="flex-1">{children}</main>
    </>
  );
}
