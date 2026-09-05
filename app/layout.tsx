import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohamed De Franceschi — Développeur à la recherche d'un stage 2027",
  description: "Étudiant en Master 2 informatique à l'Université de Haute-Alsace, je recherche un stage de développement de 5 à 6 mois à partir de février 2027 : full stack, web, logiciel, mobile ou jeu vidéo. Portfolio, projets et compétences techniques.",
  keywords: ["Mohamed De Franceschi", "Portfolio", "stage informatique", "stage développeur 2027", "stage Master 2", "alternance", "Développeur Full Stack", "React", "Next.js", "TypeScript", "Unreal Engine 5", "Unity", "Kotlin", "Université de Haute-Alsace", "Mulhouse", "Développeur Web"],
  authors: [{ name: "Mohamed De Franceschi" }],
  creator: "Mohamed De Franceschi",
  publisher: "Mohamed De Franceschi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/log.png",
  },
  metadataBase: new URL("https://www.moha-df.fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.moha-df.fr",
    title: "Mohamed De Franceschi — Développeur à la recherche d'un stage 2027",
    description: "Étudiant en Master 2 informatique à l'Université de Haute-Alsace, je recherche un stage de développement de 5 à 6 mois à partir de février 2027 : full stack, web, logiciel, mobile ou jeu vidéo. Portfolio, projets et compétences techniques.",
    siteName: "Mohamed De Franceschi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed De Franceschi — Développeur à la recherche d'un stage 2027",
    description: "Développeur full stack — stage recherché de février à août 2027.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
