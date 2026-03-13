"use client";
import React from "react";
import { Backend_skill, Frontend_skill, Full_stack } from "../../constants";
import SkillsDataProvider from "../sub/SkillsDataProvider";
import { motion } from "framer-motion";

const Skills = () => {
  return (
    <section
      className="flex flex-col items-center gap-6 md:gap-8 mx-4 pt-20 md:mx-8 md:pt-24 lg:mx-24 lg:pt-28"
      id="skills"
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-white font-bold tracking-wider text-2xl sm:text-3xl md:text-4xl">
          My Skills <span className="gradient-text">&</span> Tech Stack
        </h2>
        <p className="text-white/50 mt-3 max-w-md mx-auto text-sm md:text-base">
          Technologies I work with to build modern web applications
        </p>
      </motion.div>

      <div className="w-full max-w-4xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4 text-center">
            Frontend
          </p>
          <div className="flex flex-row justify-center flex-wrap gap-5 items-center">
            {Frontend_skill.map((image, index) => (
              <SkillsDataProvider
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4 text-center">
            Backend
          </p>
          <div className="flex flex-row justify-center flex-wrap gap-5 items-center">
            {Backend_skill.map((image, index) => (
              <SkillsDataProvider
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4 text-center">
            Tools
          </p>
          <div className="flex flex-row justify-center flex-wrap gap-5 items-center">
            {Full_stack.map((image, index) => (
              <SkillsDataProvider
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
