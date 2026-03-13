"use client";
import React from "react";
import { Backend_skill, Frontend_skill, Full_stack } from "../../constants";
import { motion } from "framer-motion";
import Image from "next/image";

interface SkillItem {
  skill_name: string;
  Image: string;
  width: number;
  height: number;
}

interface SkillCategoryProps {
  title: string;
  skills: SkillItem[];
  accentColor: string;
}

const SkillCard = ({ skill, index }: { skill: SkillItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      whileHover={{ 
        y: -4, 
        transition: { duration: 0.2 } 
      }}
      className="group relative flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        <Image
          src={skill.Image}
          width={48}
          height={48}
          alt={skill.skill_name}
          className="object-contain transition-transform duration-300 group-hover:scale-110"
          style={{ width: "auto", height: "auto", maxWidth: "48px", maxHeight: "48px" }}
        />
      </div>
      <span className="text-xs text-white/60 group-hover:text-white/90 transition-colors duration-300 text-center font-medium">
        {skill.skill_name}
      </span>
    </motion.div>
  );
};

const SkillCategory = ({ title, skills, accentColor }: SkillCategoryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-1 h-6 rounded-full ${accentColor}`} />
        <h3 className="text-sm uppercase tracking-widest text-white/50 font-medium">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {skills.map((skill, index) => (
          <SkillCard key={skill.skill_name} skill={skill} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section
      className="relative px-4 md:px-8 lg:px-24 pt-24 pb-16"
      id="skills"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-teal-400/80 mb-3">
            Expertise
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Skills <span className="gradient-text">&</span> Tech Stack
          </h2>
          <p className="text-white/50 max-w-2xl text-base md:text-lg leading-relaxed">
            Technologies and tools I use to bring products to life, from frontend interfaces to backend systems.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          <SkillCategory
            title="Frontend"
            skills={Frontend_skill}
            accentColor="bg-teal-400"
          />
          <SkillCategory
            title="Backend"
            skills={Backend_skill}
            accentColor="bg-orange-400"
          />
          <SkillCategory
            title="Tools & Other"
            skills={Full_stack}
            accentColor="bg-blue-400"
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
