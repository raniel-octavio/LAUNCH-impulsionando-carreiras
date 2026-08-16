import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { AppChrome } from "@/components/layout/AppChrome";
import { Navbar } from "@/components/layout/Navbar";
import { SupabaseAuthProvider } from "@/components/providers/SupabaseAuthProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Launch - Impulsionando carreiras",
  description:
    "Plataforma moderna de recrutamento com match de vagas, currículo, mensagens e networking profissional.",
};

// app/layout.tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <html lang="pt-BR">
      <body>
        {children}
        {modal}
=======
    <html lang="pt-BR" className={`${outfit.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-launch-void text-launch-white">
        <SupabaseAuthProvider>
          <AppChrome navbar={<Navbar />}>{children}</AppChrome>
          {modal}
        </SupabaseAuthProvider>
>>>>>>> a70221ea12e3549842bbcfa6703497876882ef4a
      </body>
    </html>
  );
}