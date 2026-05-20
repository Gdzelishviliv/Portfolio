"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";

const SECTIONS = ["about", "skills", "projects", "contact"] as const;

export const DesctopHeader = () => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const activeSection = useActiveSection(SECTIONS);

  return (
    <>
      <style>{`
        @keyframes navRgb {
          0%   { color: #79b8ff; }
          25%  { color: #f97583; }
          50%  { color: #ffab70; }
          75%  { color: #9ecbff; }
          100% { color: #79b8ff; }
        }
        @keyframes navBg {
          0%   { background-color: #79b8ff18; }
          25%  { background-color: #f9758318; }
          50%  { background-color: #ffab7018; }
          75%  { background-color: #9ecbff18; }
          100% { background-color: #79b8ff18; }
        }
        @keyframes navGlow {
          0%   { box-shadow: 0 0 8px 1px #79b8ff44; }
          25%  { box-shadow: 0 0 8px 1px #f9758344; }
          50%  { box-shadow: 0 0 8px 1px #ffab7044; }
          75%  { box-shadow: 0 0 8px 1px #9ecbff44; }
          100% { box-shadow: 0 0 8px 1px #79b8ff44; }
        }
        .nav-rgb-text {
          animation: navRgb 3s linear infinite, navBg 3s linear infinite, navGlow 3s linear infinite;
          font-weight: 600;
          border-radius: 9999px;
        }
        .nav-rgb-cursor {
          animation: navGlow 3s linear infinite;
          background: rgba(255,255,255,0.06) !important;
        }
      `}</style>

      <ul
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
        className="relative mx-auto w-fit rounded-full border-2 border-white/10 p-1 hidden md:flex gap-1"
      >
        {SECTIONS.map((section) => (
          <Tab
            key={section}
            setPosition={setPosition}
            section={section}
            isActive={activeSection === section}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Tab>
        ))}
        <Cursor position={position} activeSection={activeSection} />
      </ul>
    </>
  );
};

const Tab = ({
  children,
  setPosition,
  section,
  isActive,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
  section: string;
  isActive: boolean;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ left: ref.current.offsetLeft, width, opacity: 1 });
      }}
      className={`relative z-10 block cursor-pointer uppercase text-sm transition-colors duration-200 md:px-4 md:py-2 ${
        isActive
          ? "nav-rgb-text"
          : "font-medium text-gray-300 hover:text-white rounded-full"
      }`}
    >
      <a
        href={`#${section}`}
        className="block"
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </a>
    </li>
  );
};
const Cursor = ({
  position,
  activeSection,
}: {
  position: { left: number; width: number; opacity: number };
  activeSection: string | null;
}) => {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{
        left: { type: "spring", stiffness: 380, damping: 30 },
        width: { type: "spring", stiffness: 380, damping: 30 },
        opacity: { duration: 0.15, ease: "easeInOut" },
      }}
      className={`absolute z-0 h-9 rounded-full backdrop-blur-sm ${activeSection ? "nav-rgb-cursor" : "bg-white/10"
        }`}
    />
  );
};