import React from "react";
import { Backend_skill, Frontend_skill, Full_stack } from "../../constants";
import SkillsDataProvider from "../sub/SkillsDataProvider";
import { motion } from "framer-motion";

const Skills = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.8,
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
      className="flex flex-col items-center gap-3"
      id="skills"
      style={{ transform: "scale(0.9)" }}
    >
      <motion.h1
        className="text-white font-bold text-2xl flex gap-2"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        animate="visible"
      >
        {[
          "Skills",
          <span key="amp" className="gradient-text">
            &
          </span>,
          "Tech-Stack",
        ].map((word, i) => (
          <motion.span key={i} variants={item}>
            {word}
          </motion.span>
        ))}
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
