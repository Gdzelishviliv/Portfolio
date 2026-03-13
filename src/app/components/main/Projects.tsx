"use client";
import React, { useEffect, useState } from "react";
import { Rancho } from "next/font/google";
import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCards, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-cards";
import { ProjectsProps } from "@/app/types/projects";
import ProjectCard from "../molecules/ProjectCard";

const rancho = Rancho({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rancho",
})

const Projects = () => {
  const [projects, setProjects] = useState<ProjectsProps[]>([]);

  useEffect(() => {
    fetch("/Projects.json")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <section
      className={`${rancho.variable} flex flex-col gap-3 md:gap-5 lg:gap-7 items-center pt-16 mb-5 overflow-hidden`}
      id="projects"
    >
      <motion.div
        className="text-center"
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
        <h2 className="text-white font-main font-bold tracking-wider text-2xl sm:text-3xl md:text-4xl lg:text-4xl relative overflow-hidden">
          Projects
        </h2>
        <p className="text-white/50 mt-3 max-w-md mx-auto text-sm md:text-base">
          A collection of projects that showcase my skills and passion for building great digital experiences.
        </p>
      </motion.div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pb-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-white/30 text-center">
              <div className="w-12 h-12 border-2 border-white/20 border-t-teal-400 rounded-full animate-spin mx-auto mb-4" />
              <p>Loading projects...</p>
            </div>
          </div>
        )}
    </section>
  );
};

export default Projects;
