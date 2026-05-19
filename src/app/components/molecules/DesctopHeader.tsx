"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";

const SECTIONS = ["about", "skills", "projects", "contact"] as const;

export const DesctopHeader = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const activeSection = useActiveSection(SECTIONS);

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
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
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({
  children,
  setPosition,
  section,
  isActive,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
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

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className={`relative z-10 block cursor-pointer uppercase text-sm font-medium transition-all duration-200 md:px-4 md:py-2 rounded-full ${
        isActive ? "text-white nav-active-rgb" : "text-gray-300 hover:text-white"
      }`}
    >
      <a
        href={`#${section}`}
        className="block"
        aria-current={isActive ? "page" : undefined}
      >
        {children || section.charAt(0).toUpperCase() + section.slice(1)}
      </a>
    </li>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-9 rounded-full bg-white/10 backdrop-blur-sm"
    />
  );
};
