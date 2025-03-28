import type { Metadata } from "next";
import "./globals.css";
import ParticlesEffect from "./components/ParticlesEffect";

export const metadata: Metadata = {
  title: "Portfolio"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
   <ParticlesEffect />
   <html lang="en">
    <body>
      {children}
    </body>
   </html>
   </>
  );
}
