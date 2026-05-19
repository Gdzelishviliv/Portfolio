import type { Metadata } from "next";
import "./globals.css";
import AppShell from "./components/organisms/AppShell";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Welcome to my portfolio showcasing my web development and design projects. Explore my skills and experience!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-[1920px] m-auto min-h-screen p-0 relative">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
