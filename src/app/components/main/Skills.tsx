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
      <motion.h1
        className="text-white font-main font-bold tracking-wider text-2xl sm:text-3xl md:text-4xl lg:text-4xl relative overflow-hidden"
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
        My Skills <span className="gradient-text">&</span> Tech Stack
      </motion.h1>
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
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
      </div>
    </section>
  );
};

export default Skills;
