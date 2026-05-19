import Typewriter from "../atoms/Typewriter"
import { VT323 } from "next/font/google"
import { Rancho } from "next/font/google"
import BubbleText from "../atoms/BubbleText"
import { CreativeHeroWrapper } from "../atoms/CreativeHeroWrapper"

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
        className={`${rancho.variable} ${vt323.variable} px-4 pt-8 pb-4 relative md:px-8 md:pt-12 lg:px-24 lg:pt-16`}
      >
        <div className="flex flex-col gap-6 md:hidden">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-white tracking-widest font-main text-xl">
              Hi I<span className="gradient-text">&apos;</span>m
            </h1>
            <h2 className="gradient-text font-secondary text-2xl leading-tight mt-1">
              Ivane Gdzelishvili
            </h2>
            <div className="mt-2">
              <Typewriter />
            </div>
          </div>
          <div className="w-full max-w-[280px] mx-auto">
            <CreativeHeroWrapper />
          </div>
          <div className="mt-2">
            <BubbleText />
          </div>
        </div>
        <div className="hidden md:flex md:gap-8 lg:gap-12 xl:gap-16 items-center">
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
              <CreativeHeroWrapper />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
