import type { Metadata } from "next";
import "./globals.css";
import "./mobile.css";
import { SilkBackground } from "@/components/silk-background";
import { LanguageProvider } from "@/components/language-provider";

export const metadata: Metadata = {
  title: "Rodrigo Tabaldi — Engenheiro de Software",
  description:
    "Portfólio de Rodrigo Tabaldi, engenheiro de software com foco em Backend, APIs e Full Stack. C#, .NET, Python, React, TypeScript e PostgreSQL.",
  openGraph: {
    title: "Rodrigo Tabaldi — Backend, APIs e Full Stack",
    description: "Desenvolvedor de software. Projetos, tecnologias e contato.",
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <SilkBackground />
        <LanguageProvider>
          <div className="site-content">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
