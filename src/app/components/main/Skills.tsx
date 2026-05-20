"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rancho } from "next/font/google";

const rancho = Rancho({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rancho",
});

const categories = [
  {
    label: "Frontend",
    color: "from-violet-500/20 to-purple-500/10 border-violet-500/20 text-violet-300",
    dot: "bg-violet-400",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML", "CSS"],
  },
  {
    label: "Backend",
    color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/20 text-cyan-300",
    dot: "bg-cyan-400",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST API", "GraphQL"],
  },
  {
    label: "Tools",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/20 text-emerald-300",
    dot: "bg-emerald-400",
    skills: ["Git", "Docker", "Figma", "VS Code", "Vercel", "Linux"],
  },
];

const Skills = () => {
  return (
    <section
      className={`${rancho.variable} flex flex-col items-center gap-6 md:gap-10 mx-4 pt-16 sm:mt-5 md:mx-8 md:mt-10 lg:mx-24 lg:mt-16`}
      id="skills"
    >
      {/* ── Heading — unchanged ── */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0)", scale: 1 }}
        exit={{ opacity: 0, clipPath: "inset(0 100% 0 0)", scale: 0.8 }}
        viewport={{ once: false, amount: 0.2 }}
        style={{
          animation: "wave 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          animationDelay: "0.8s",
        }}
      >
        <h2 className="text-white font-main font-bold tracking-wider text-2xl sm:text-3xl md:text-4xl lg:text-4xl relative overflow-hidden">
          My Skills <span className="gradient-text">&</span> Tech Stack
        </h2>
        <p className="text-white/50 mt-3 max-w-md mx-auto text-sm md:text-base">
          Technologies I work with to build modern web applications
        </p>
      </motion.div>

      {/* ── Categories ── */}
      <div className="w-full max-w-3xl flex flex-col gap-8 md:gap-10">
        {categories.map(({ label, color, dot, skills }, catIdx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: catIdx * 0.1 }}
            className="flex flex-col gap-3"
          >
            {/* Label row */}
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              <span className="text-white/35 text-[10px] uppercase tracking-[0.22em] font-medium">
                {label}
              </span>
              <span className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {skills.map((skill, i) => (
                <span
                  key={skill}
                  className={`
                    skill-badge
                    inline-flex items-center px-3 py-1.5
                    rounded-full border bg-gradient-to-br
                    text-xs sm:text-sm font-medium
                    backdrop-blur-sm
                    hover:scale-105 hover:brightness-125
                    transition-transform duration-200
                    cursor-default select-none
                    ${color}
                  `}
                  style={{ animationDelay: `${catIdx * 0.12 + i * 0.04}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes badgePop {
          from { opacity: 0; transform: scale(0.85) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
        .skill-badge {
          opacity: 0;
          animation: badgePop 0.35s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default Skills;