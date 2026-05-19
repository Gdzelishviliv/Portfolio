"use client";

import React, { useEffect, useRef } from "react";

const TEXT =
  "a passionate Full Stack Web Developer with 2 years of experience in building dynamic and scalable web applications. I specialize in both front-end and back-end development, working with modern technologies to create seamless, user-friendly, and performance-driven solutions.";

const CHARS        = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
const SCRAMBLE_FPS = 42;
const WORD_PAUSE_MS  = 40;
const FLARE_DURATION = 300;
const FLARE_CHANCE   = 0.0019;

const rand = (str: string) => str[Math.floor(Math.random() * str.length)];

const BubbleText = () => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Build spans once — never recreate them
    container.innerHTML = "";
    const spans: HTMLSpanElement[] = TEXT.split("").map((c) => {
      const span = document.createElement("span");
      span.textContent = c === " " ? " " : "";
      container.appendChild(span);
      return span;
    });

    const resolvedSet = new Set<number>();
    const flaringSet  = new Set<number>();

    const triggerFlare = (index: number) => {
      if (TEXT[index] === " ") return;
      flaringSet.add(index);
      setTimeout(() => flaringSet.delete(index), FLARE_DURATION);
    };

    // Build word-chunk resolve schedule
    const words: number[][] = [];
    let wordStart = 0;
    for (let i = 0; i <= TEXT.length; i++) {
      if (i === TEXT.length || TEXT[i] === " ") {
        if (i > wordStart)
          words.push(Array.from({ length: i - wordStart }, (_, k) => wordStart + k));
        wordStart = i + 1;
      }
    }

    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    let delay = 200;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    shuffledWords.forEach((wordIndices) => {
      const shuffledIndices = [...wordIndices].sort(() => Math.random() - 0.5);
      shuffledIndices.forEach((charIdx, i) => {
        const t = setTimeout(() => {
          resolvedSet.add(charIdx);
        }, delay + i * 8);
        timeouts.push(t);
      });
      delay += wordIndices.length * 18 + WORD_PAUSE_MS;
    });

    // rAF loop — mutates DOM directly, zero React re-renders
    let lastTime = 0;
    let rafId: number;

    const tick = (time: number) => {
      rafId = requestAnimationFrame(tick);
      if (time - lastTime < SCRAMBLE_FPS) return;
      lastTime = time;

      for (let i = 0; i < TEXT.length; i++) {
        const c = TEXT[i];
        const span = spans[i];

        if (c === " ") continue;

        const isResolved = resolvedSet.has(i);
        const isFlaring  = flaringSet.has(i);

        if (!isResolved) {
          span.textContent = rand(CHARS);
          span.className = "";
          span.style.cssText = "color:rgb(106 17 203/0.4)";
          continue;
        }

        if (isFlaring) {
          span.textContent = rand(CHARS);
          span.className = "";
          span.style.cssText =
            "color:rgb(255 255 255);text-shadow:0 0 10px #feb47b,0 0 20px #ff7e5f";
          continue;
        }

        if (Math.random() < FLARE_CHANCE) {
          triggerFlare(i);
          span.textContent = rand(CHARS);
          span.className = "";
          span.style.cssText =
            "color:rgb(255 255 255);text-shadow:0 0 10px #feb47b,0 0 20px #ff7e5f";
          continue;
        }

        // Resolved — apply gradient class, clear inline styles
        span.textContent = c;
        if (span.className !== "gradient-text") {
          span.className = "gradient-text";
          span.style.cssText = "";
        }
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <p
      ref={containerRef}
      className="text-[16px] md:text-[18px] lg:text-xl w-full font-thin mt-1 font-mono"
    />
  );
};

export default BubbleText;