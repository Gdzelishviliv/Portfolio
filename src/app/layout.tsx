import type { Metadata } from "next";
import "./globals.css";
import ParticlesEffect from "./components/Custom/ParticlesEffect";
import Header from "./components/organisms/Header";
import Head from "next/head";
import Effect from "./components/Custom/EnteranceAnimation";

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
      <Head>
        <meta
          name="description"
          content="Welcome to my portfolio showcasing my web development and design projects. Explore my skills and experience!"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          as="style"
        />
      </Head>
      <ParticlesEffect />
      <html lang="en">
        <body className="max-w-[1920px] m-auto bg-black h-[100%] p-0 relative">
          <Header />
          <Effect/>
          {children}
        </body>
      </html>
    </>
  );
}
