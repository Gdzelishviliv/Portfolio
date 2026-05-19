"use client";
import Typewriter from "../atoms/Typewriter"
import { VT323 } from "next/font/google"
import { Rancho } from "next/font/google"
import BubbleText from "../atoms/BubbleText"
import { CreativeHeroWrapper } from "../atoms/CreativeHeroWrapper"
import { useMediaQuery } from "../hooks/useMediaQuery"

const vt323 = Rancho({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rancho",
})

const rancho = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
})

const About = () => {
  const isMd = useMediaQuery("(min-width: 768px)");

  return (
    <section
      id="about"
      className={`${rancho.variable} ${vt323.variable} px-4 pt-8 pb-4 relative md:px-8 md:pt-12 lg:px-24 lg:pt-16`}
    >
      {/* Shared components — rendered once */}
      <div className="flex flex-col gap-6  md:flex-row md:items-center md:gap-8 lg:gap-12 xl:gap-16">
        
        {/* Text block */}
        <div className={`flex flex-col ${isMd ? "md:flex-1 lg:max-w-md xl:max-w-lg" : "items-center text-center"}`}>
          <h1 className={`text-white tracking-widest font-main ${isMd ? "text-3xl lg:text-4xl xl:text-5xl" : "text-xl"}`}>
            Hi I<span className="gradient-text">&apos;</span>m
          </h1>
          <h2 className={`gradient-text font-secondary mt-1 ${isMd ? "text-3xl/[30px] lg:text-4xl/[35px] xl:text-5xl/[45px]" : "text-2xl leading-tight"}`}>
            {isMd ? (
              <>Ivane<br />Gdzelishvili</>
            ) : (
              "Ivane Gdzelishvili"
            )}
          </h2>
          <Typewriter />
          <BubbleText />
        </div>

        {/* Image block */}
        <div className={`flex justify-center items-start ${isMd ? "md:flex-1" : "w-full max-w-[280px] mx-auto"}`}>
          <div className={`w-full ${isMd ? "max-w-md lg:max-w-lg xl:max-w-xl" : "max-w-[280px]"}`}>
            <CreativeHeroWrapper />
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;