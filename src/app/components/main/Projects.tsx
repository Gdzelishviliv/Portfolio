"use client";
import React from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1,
        staggerChildren: 0.15,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.5 },
    },
  };
  return (
    <section className="flex flex-col items-center mt-2.5" id="projects">
      <motion.h1
        className="text-white font-bold text-2xl relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          clipPath: "inset(0 0 0 0)",
          scale: 1,
        }}
        exit={{
          opacity: 0,
          clipPath: "inset(0 100% 0 0)",
          scale: 0.8,
        }}
        viewport={{ once: false, amount: 0.2 }}
        style={{
          animation: "wave 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          animationDelay: "0.8s",
        }}
      >
        Projects
      </motion.h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore harum ea
        repellat est nulla dolorem modi repellendus deserunt fugiat, inventore,
        doloribus dicta labore maiores cumque corrupti cupiditate sit
        accusantium magni.
      </p>
    </section>
  );
};

export default Projects;
