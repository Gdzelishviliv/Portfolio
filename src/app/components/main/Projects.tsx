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
      className="flex flex-col gap-6 md:gap-8 items-center pt-20 md:pt-24 lg:pt-28 mb-8 overflow-hidden"
      id="projects"
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-white font-bold tracking-wider text-2xl sm:text-3xl md:text-4xl">
          Projects
        </h2>
        <p className="text-white/50 mt-3 max-w-md mx-auto text-sm md:text-base">
          Some of my recent work
        </p>
      </motion.div>

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
            <a href={project.href} target="_blank" rel="noopener noreferrer">
              <div
                className="text-center text-white p-4"
                style={{
                  backgroundImage: `url(${project.backgroundImage})`,
                  backgroundSize: "240px",
                  backgroundPosition: "top",
                  backgroundRepeat: "no-repeat",
                  minHeight: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-sm text-white/80">{project.description}</p>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Projects;
