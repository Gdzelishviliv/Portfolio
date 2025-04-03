"use client";

import Head from "next/head";
import About from "./components/About";

export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="This is my portfolio website, showcasing my latest web development and design work. Learn more about my skills and projects!"
        />
      </Head>
      <About/>
    </>
  );
}
