import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trululu Mood Match — Descubre tu sabor",
  description:
    "Sube tu foto y descubre qué Trululu Aros eres hoy. Tu niño interior sigue aquí.",
  openGraph: {
    title: "Trululu Mood Match — Descubre tu sabor",
    description:
      "Sube tu foto y descubre qué Trululu Aros eres hoy. Tu niño interior sigue aquí.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
