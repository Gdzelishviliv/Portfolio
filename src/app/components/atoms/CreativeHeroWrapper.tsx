"use client";

import dynamic from "next/dynamic";

export const CreativeHeroWrapper = dynamic(
  () => import("../Custom/VSCodeHero").then((module) => module.VSCodeHero),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[320px] sm:h-[370px] md:h-[400px] lg:h-[440px] rounded-lg border border-white/10 bg-[#1e1e2e]" />
    ),
  }
);
