"use client";

import dynamic from "next/dynamic";

export const CreativeHeroWrapper = dynamic(
  () => import("../Custom/CreativeHero").then((module) => module.CreativeHero),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[200px] md:h-[350px] lg:h-[400px] xl:h-[450px] rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm" />
    ),
  }
);