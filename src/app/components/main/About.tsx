"use client"
import Typewriter from "../atoms/Typewriter"
import { VT323 } from "next/font/google"
import { Rancho } from "next/font/google"
import BubbleText from "../atoms/BubbleText"
import { CreativeHero } from "../Custom/CreativeHero"

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
  return (
    <>
      <section
        id="about"
        className={`${rancho.variable} ${vt323.variable} mx-4 pt-16 relative md:mx-8 md:mt-12 lg:mx-24 lg:mt-16`}
      >
        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col gap-8 md:hidden">
          <div className="flex flex-col">
            <h1 className="text-white tracking-widest font-main text-2xl sm:text-3xl">
              Hi I<span className="gradient-text">&apos;</span>m
            </h1>
            <h2 className="gradient-text font-secondary text-2xl/[20px] sm:text-3xl/[30px] mt-1">
              Ivane
              <br /> Gdzelishvili
            </h2>
            <Typewriter />
            <BubbleText />
          </div>
          <div className="w-full">
            <CreativeHero />
          </div>
        </div>

        {/* Tablet and Desktop Layout - Side by Side */}
        <div className="hidden md:flex md:gap-8 lg:gap-12 xl:gap-16">
          <div className="flex flex-col md:flex-1 lg:max-w-md xl:max-w-lg">
            <h1 className="text-white tracking-widest font-main text-3xl lg:text-4xl xl:text-5xl">
              Hi I<span className="gradient-text">&apos;</span>m
            </h1>
            <h2 className="gradient-text font-secondary text-3xl/[30px] lg:text-4xl/[35px] xl:text-5xl/[45px] mt-1">
              Ivane
              <br /> Gdzelishvili
            </h2>
            <Typewriter />
            <BubbleText />
          </div>
          <div className="md:flex-1 lg:flex-1 xl:flex-1 flex justify-center items-start">
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <CreativeHero />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
