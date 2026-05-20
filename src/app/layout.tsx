import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "./components/organisms/AppShell";
import { Rancho, VT323 } from "next/font/google";

const rancho = Rancho({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rancho",
  display: "swap",
  preload: true,
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Ivane Gdzelishvili | Full Stack Developer",
  description:
    "Welcome to my portfolio showcasing my web development and design projects. Explore my skills and experience in React, Next.js, TypeScript, and more!",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Web Development", "Portfolio"],
  authors: [{ name: "Ivane Gdzelishvili" }],
  openGraph: {
    title: "Ivane Gdzelishvili | Full Stack Developer",
    description: "Full Stack Web Developer portfolio showcasing web development projects and skills.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rancho.variable} ${vt323.variable}`}>
      <body className="max-w-[1920px] m-auto min-h-screen p-0 relative bg-background">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
