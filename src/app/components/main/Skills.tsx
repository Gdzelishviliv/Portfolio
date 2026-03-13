import React from "react";
import { Backend_skill, Frontend_skill, Full_stack } from "../../constants";
import SkillsDataProvider from "../sub/SkillsDataProvider";
import { motion } from "framer-motion";
import { Rancho } from "next/font/google";

const rancho = Rancho({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rancho",
});

const Skills = () => {
  return (
    <section
      className={`${rancho.variable} flex flex-col items-center gap-3 md:gap-5 lg:gap-7 mx-[16px] pt-16 sm:mt-5 md:mx-8 md:mt-10 lg:mx-24 lg:mt-16`}
      id="skills"
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, }}
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
        <h2 className="text-white font-main font-bold tracking-wider text-2xl sm:text-3xl md:text-4xl lg:text-4xl relative overflow-hidden">My Skills <span className="gradient-text">&</span> Tech Stack</h2>
        <p className="text-white/50 mt-3 max-w-md mx-auto text-sm md:text-base">
          Technologies I work with to build modern web applications
        </p>
      </motion.div>
      {/* <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
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
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
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
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {Full_stack.map((image, index) => (
          <SkillsDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index}
          />
        ))}
      </div> */}
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
