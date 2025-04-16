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
    <section
      className="flex flex-col items-center mt-2.5"
      id="projects"
    >
      <motion.h1
        className="text-white font-bold text-2xl"
        variants={container}
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
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
