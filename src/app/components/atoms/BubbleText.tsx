"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";

const TEXT =
  "a passionate Full Stack Web Developer with 2 years of experience in building dynamic and scalable web applications. I specialize in both front-end and back-end development, working with modern technologies to create seamless, user-friendly, and performance-driven solutions.";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SCRAMBLE_INTERVAL = 50; // Slower scramble rate for performance
const WORD_PAUSE_MS = 30;
const FLARE_CHANCE = 0.001; // Reduced flare chance

const rand = (str: string) => str[Math.floor(Math.random() * str.length)];

const BubbleText = () => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Precompute word indices for performance
  const wordIndices = useMemo(() => {
    const words: number[][] = [];
    let wordStart = 0;
    for (let i = 0; i <= TEXT.length; i++) {
      if (i === TEXT.length || TEXT[i] === " ") {
        if (i > wordStart)
          words.push(Array.from({ length: i - wordStart }, (_, k) => wordStart + k));
        wordStart = i + 1;
      }
    }
    return words.sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Intersection Observer for visibility
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Build spans once
    container.innerHTML = "";
    const spans: HTMLSpanElement[] = TEXT.split("").map((c) => {
      const span = document.createElement("span");
      span.textContent = c === " " ? " " : "";
      container.appendChild(span);
      return span;
    });

    const resolvedSet = new Set<number>();
    const flaringSet = new Set<number>();

    const triggerFlare = (index: number) => {
      if (TEXT[index] === " ") return;
      flaringSet.add(index);
      setTimeout(() => flaringSet.delete(index), 200);
    };

    // Schedule word reveals
    let delay = 150;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    wordIndices.forEach((indices) => {
      const shuffledIndices = [...indices].sort(() => Math.random() - 0.5);
      shuffledIndices.forEach((charIdx, i) => {
        const t = setTimeout(() => {
          resolvedSet.add(charIdx);
        }, delay + i * 6);
        timeouts.push(t);
      });
      delay += indices.length * 14 + WORD_PAUSE_MS;
    });

    // Animation loop with throttling
    let lastTime = 0;
    let rafId: number;

    const tick = (time: number) => {
      if (!isVisible) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (time - lastTime < SCRAMBLE_INTERVAL) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      lastTime = time;

      for (let i = 0; i < TEXT.length; i++) {
        const c = TEXT[i];
        const span = spans[i];

        if (c === " ") continue;

        const isResolved = resolvedSet.has(i);
        const isFlaring = flaringSet.has(i);

        if (!isResolved) {
          span.textContent = rand(CHARS);
          span.className = "";
          span.style.cssText = "color:rgb(106 17 203/0.4)";
        } else if (isFlaring) {
          span.textContent = rand(CHARS);
          span.className = "";
          span.style.cssText = "color:#fff;text-shadow:0 0 8px #feb47b";
        } else if (Math.random() < FLARE_CHANCE) {
          triggerFlare(i);
          span.textContent = rand(CHARS);
          span.className = "";
          span.style.cssText = "color:#fff;text-shadow:0 0 8px #feb47b";
        } else {
          span.textContent = c;
          if (span.className !== "gradient-text") {
            span.className = "gradient-text";
            span.style.cssText = "";
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      timeouts.forEach(clearTimeout);
    };
  }, [wordIndices, isVisible]);

  return (
    <p
      ref={containerRef}
      className="text-[15px] md:text-[17px] lg:text-lg w-full font-thin mt-2 font-mono leading-relaxed"
    />
  );
};

export default BubbleText;
