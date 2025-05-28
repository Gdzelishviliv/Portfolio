"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

export const DesctopHeader = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto w-fit rounded-full border-2 border-white/10 p-1 hidden md:flex"
    >
      {["about", "skills", "projects", "contact"].map((section) => (
        <Tab key={section} setPosition={setPosition} section={section}>
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
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
  section: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer text-xs uppercase text-white mix-blend-difference md:px-5 md:py-2 md:text-base"
    >
      <Link
        to={section}
        smooth={true}
        duration={300}
        className="text-lg text-white hover:text-gray-300 transition-colors duration-200"
      >
        {children || section.charAt(0).toUpperCase() + section.slice(1)}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-10 rounded-full bg-white"
    />
  );
};
