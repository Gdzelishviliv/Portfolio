import type { Metadata } from "next";
import "./globals.css";
import ParticlesEffect from "./components/Custom/ParticlesEffect";
import Header from "./components/organisms/Header";

export const metadata: Metadata = {
  title: "Portfolio",
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
        <body className="max-w-[1920px] m-auto">
          <Header />
          {children}
        </body>
      </html>
    </>
  );
}
