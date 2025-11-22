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
  title: "Mohamed De Franceschi - Portfolio",
  description: "Portfolio interactif de Mohamed De Franceschi - Développeur Full Stack spécialisé en React, Next.js, TypeScript, Python et développement web moderne.",
  keywords: ["Mohamed De Franceschi", "Portfolio", "Développeur Full Stack", "React", "Next.js", "TypeScript", "Python", "Web Developer", "Développeur Web"],
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
    title: "Mohamed De Franceschi - Portfolio",
    description: "Portfolio interactif de Mohamed De Franceschi - Développeur Full Stack spécialisé en React, Next.js, TypeScript, Python et développement web moderne.",
    siteName: "Mohamed De Franceschi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed De Franceschi - Portfolio",
    description: "Portfolio interactif de Mohamed De Franceschi - Développeur Full Stack",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
