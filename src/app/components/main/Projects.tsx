"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { ProjectsProps } from "@/app/types/projects";

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
      className="flex flex-col items-center mt-5 mb-5 overflow-hidden"
      id="projects"
    >
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
      <Swiper
        effect={"cards"}
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[EffectCards, Autoplay]}
        className="mySwiper mt-4"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div
              className="text-center text-white"
              style={{
                backgroundImage: `url(${project.backgroundImage})`,
                backgroundSize: "240px",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2 className="font-bold text-lg mt-8">{project.title}</h2>
              <p className="text-sm">{project.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Projects;
