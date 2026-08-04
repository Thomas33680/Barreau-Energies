import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCallBar } from "@/components/StickyCallBar";
import { MotionProvider } from "@/components/motion/MotionProvider";
import ChatBarreauEnergies from "@/components/ChatBarreauEnergies";
import { siteConfig } from "@/lib/site-config";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Barreau Énergies installe et entretient vos climatisations réversibles, pompes à chaleur air/eau, chauffe-eaux et adoucisseurs d'eau à Parigné-l'Évêque, Le Mans et alentours.",
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "fr_FR",
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
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-16 lg:pb-0">
        <MotionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyCallBar />
          <ChatBarreauEnergies />
        </MotionProvider>
      </body>
    </html>
  );
}
