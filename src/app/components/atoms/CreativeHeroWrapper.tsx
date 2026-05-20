"use client";

import dynamic from "next/dynamic";

export const CreativeHeroWrapper = dynamic(
  () => import("../Custom/VSCodeHero").then((module) => module.VSCodeHero),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[280px] md:h-[380px] lg:h-[420px] xl:h-[460px] rounded-lg border border-white/10 bg-[#1e1e2e]" />
    ),
  }
);
