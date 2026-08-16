// components/layout/AppChrome.tsx
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

  const isAuthRoute = pathname === "/login" || pathname === "/registro";
  const isLanding = pathname === "/" || isAuthRoute;

  return (
    <>
      {!isLanding && navbar}
      <main className="flex-1">{children}</main>
    </>
  );
}