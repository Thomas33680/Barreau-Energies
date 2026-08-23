import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.barreau-energies.fr"),
  title: {
    default: "Barreau Énergies — Les systèmes techniques de votre habitat, maîtrisés",
    template: "%s | Barreau Énergies",
  },
  description:
    "Pompes à chaleur, climatisation, eau chaude et traitement de l'eau : Barreau Énergies équipe, protège, pilote et entretient les systèmes techniques de votre logement.",
  openGraph: {
    title: "Barreau Énergies",
    description:
      "Les systèmes techniques de votre habitat, maîtrisés — CLIMATE, WATER, ENERGY, HOME, CARE.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col font-sans text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
