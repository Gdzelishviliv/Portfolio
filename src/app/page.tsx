import type { Metadata } from "next";
import { About, Contacts, Projects, Skills } from "./components/main";

export const metadata: Metadata = {
  description:
    "This is my portfolio website, showcasing my latest web development and design work. Learn more about my skills and projects!",
};

export default function Home() {
  return (
    <>
      <About />
      <Skills />
      <Projects />
      <Contacts />
    </>
  );
}
