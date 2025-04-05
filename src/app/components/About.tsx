import React from "react";
import ProfileImg from "../../../public/assets/profile.jpg";
import Image from "next/image";

const About = () => {
  return (
    <>
      <div className="mx-[16px] mt-[20px] relative">
        <div className="flex flex-col">
          <h1 className="text-white text-[24px]">
            Hi I<span className="gradient-text">’</span>m
          </h1>
          <h2 className="gradient-text text-[23px] mt-[20px]">
            Ivane
            <br /> Gdzelishvili
          </h2>
          <p className="text-white text-[14px] mt-[20px] min-w-[200px] max-w-[220px]">
            a passionate Full Stack Web Developer with 2 years of experience in
            building dynamic and scalable web applications. I specialize in both
            front-end and back-end development, working with modern technologies
            to create seamless, user-friendly, and performance-driven solutions.
          </p>
        </div>
        <div className="w-fit absolute right-0 top-[-25px] z-[-1]">
          <Image
            className="rounded-4xl"
            src={ProfileImg}
            alt="Profile Image"
            width={200}
            height={200}
          />
        </div>
      </div>
    </>
  );
};

export default About;
