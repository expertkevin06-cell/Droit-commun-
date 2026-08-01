import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import RegisterSW from "@/components/RegisterSW";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Droit Général by Kevin",
  description:
    "Recherche juridique française assistée par IA (Gemini + Perplexity) — Légifrance, Code civil, Code pénal, Code de la consommation. Fonctionne aussi hors ligne.",
  manifest: "/manifest.webmanifest",
  applicationName: "Droit Général by Kevin",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Droit Général",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1D51",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <RegisterSW />
        {children}
      </body>
    </html>
  );
}
