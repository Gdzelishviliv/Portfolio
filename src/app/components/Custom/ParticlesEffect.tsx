"use client";
import { useEffect, useState, useCallback } from "react";

const ParticlesEffect = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only render on desktop for performance
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    
    const updateShouldRender = () => {
      setShouldRender(mediaQuery.matches);
    };

    updateShouldRender();
    mediaQuery.addEventListener("change", updateShouldRender);

    return () => mediaQuery.removeEventListener("change", updateShouldRender);
  }, []);

  const initParticles = useCallback(() => {
    if (typeof window !== "undefined" && window.particlesJS) {
      window.particlesJS("bg", {
        particles: {
          number: {
            value: 35, // Reduced from 52
            density: {
              enable: true,
              value_area: 700, // Increased area = fewer particles
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.25,
            random: true,
            anim: {
              enable: false,
            },
          },
          size: {
            value: 1.2,
            random: true,
            anim: {
              enable: false,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 0.15, // Slower movement
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false },
            onclick: { enable: false },
            resize: true,
          },
        },
        retina_detect: false, // Disable for performance
      });
    }
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    // Load particles.js dynamically only when needed
    const script = document.createElement("script");
    script.src = "/particles.min.js";
    script.async = true;
    script.onload = initParticles;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const container = document.getElementById("bg");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [shouldRender, initParticles]);

  if (!shouldRender) return null;

  return (
    <div
      id="bg"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default ParticlesEffect;
