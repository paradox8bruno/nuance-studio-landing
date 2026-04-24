import type { Metadata } from "next";
import { EB_Garamond, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TrackingScripts } from "@/site/components/tracking/TrackingScripts";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nuance-studio-landing.vercel.app"),
  title: {
    default: "Ensaio Fotográfico Profissional - Nuance Studio",
    template: "%s | Nuance Studio",
  },
  description:
    "Fotos profissionais de autoridade para advogados. Sem fotógrafo, sem ensaio presencial. Resultado em 24h. Você só paga se aprovar.",
  openGraph: {
    title: "Ensaio Fotográfico Profissional - Nuance Studio",
    description:
      "Fotos profissionais de autoridade para advogados. Sem fotógrafo, sem ensaio presencial. Resultado em 24h. Você só paga se aprovar.",
    url: "/",
    siteName: "Nuance Studio",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} ${garamond.variable}`}
    >
      <body>
        <TrackingScripts />
        {children}
      </body>
    </html>
  );
}
