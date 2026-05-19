"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

export const DesctopHeader = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "contact"];
      
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {["about", "skills", "projects", "contact"].map((section) => (
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
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className={`relative z-10 block cursor-pointer uppercase text-sm font-medium transition-all duration-200 md:px-4 md:py-2 rounded-full ${
        isActive 
          ? "text-white nav-active-rgb" 
          : "text-gray-300 hover:text-white"
      }`}
    >
      <Link
        to={section}
        smooth={true}
        duration={300}
        className="block"
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
      className="absolute z-0 h-9 rounded-full bg-white/10 backdrop-blur-sm"
    />
  );
};
