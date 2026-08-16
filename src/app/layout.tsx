import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { AppChrome } from "@/components/layout/AppChrome";
import { Navbar } from "@/components/layout/Navbar";
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
    <html lang="pt-BR">
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}