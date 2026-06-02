"use client";
import React, { useEffect, useReducer } from "react";
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

type ProjectsState = {
  status: "idle" | "loading" | "success" | "error";
  projects: ProjectsProps[];
  error: string | null;
};

type ProjectsAction =
  | { type: "loading" }
  | { type: "success"; payload: ProjectsProps[] }
  | { type: "error"; payload: string };

const initialState: ProjectsState = {
  status: "idle",
  projects: [],
  error: null,
};

const projectsReducer = (state: ProjectsState, action: ProjectsAction): ProjectsState => {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading", error: null };
    case "success":
      return { status: "success", projects: action.payload, error: null };
    case "error":
      return { ...state, status: "error", error: action.payload };
    default:
      return state;
  }
};

const Projects = () => {
  const [state, dispatch] = useReducer(projectsReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: "loading" });

    fetch("/Projects.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load projects (${response.status})`);
        }
        return response.json();
      })
      .then((data) => dispatch({ type: "success", payload: data }))
      .catch((error) => {
        if (error?.name === "AbortError") return;
        dispatch({ type: "error", payload: "Failed to load projects." });
        console.error("Error fetching projects:", error);
      });

    return () => controller.abort();
  }, []);

  return (
    <section
      className={`${rancho.variable} flex flex-col gap-3 md:gap-5 lg:gap-7 items-center pt-16 pb-12 px-4 md:px-8 lg:px-12 mb-5 overflow-hidden`}
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
      {state.projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pb-6">
          {state.projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      )}

      {state.status === "loading" && (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-white/30 text-center">
            <div className="w-12 h-12 border-2 border-white/20 border-t-teal-400 rounded-full animate-spin mx-auto mb-4" />
            <p>Loading projects...</p>
          </div>
        </div>
      )}

      {state.status === "error" && (
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-white/40 text-center">{state.error}</p>
        </div>
      )}
    </section>
  );
};

export default Projects;
