"use client";

import dynamic from "next/dynamic";
import Header from "./Header";
import FloatingCVButton from "../atoms/FloatingCvButton";
import Footer from "./Footer";

const ParticlesEffect = dynamic(() => import("../Custom/ParticlesEffect"), {
  ssr: false,
  loading: () => null,
});

const Effect = dynamic(() => import("../Custom/EnteranceAnimation"), {
  ssr: false,
  loading: () => null,
});

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      <ParticlesEffect />
      <Header />
      <Effect />
      {children}
      <FloatingCVButton />
      <Footer />
    </>
  );
}