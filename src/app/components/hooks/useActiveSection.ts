"use client";

import { useEffect, useState } from "react";

export function useActiveSection(
  sectionIds: readonly string[],
  offset = 150
) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;

      for (const section of sectionIds) {
        const element = document.getElementById(section);
        if (!element) {
          continue;
        }

        const rect = element.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection((current) => (current === section ? current : section));
          break;
        }
      }
    };

    const handleScroll = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [offset, sectionIds]);

  return activeSection;
}