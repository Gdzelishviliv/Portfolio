"use client";
import React, { useState, useEffect } from "react";
import BurgerMenu from "../molecules/BurgerMenu";
import Logo from "../atoms/Logo";
import { DesctopHeader } from "../molecules/DesctopHeader";
import Button from "../atoms/Button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 flex justify-between mx-auto w-full max-w-[1920px] px-4 md:px-8 lg:px-24 py-3 md:py-4 items-center transition-all duration-300 ease-in-out z-50 ${
          isScrolled
            ? "backdrop-blur-md bg-black/30 border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <Logo />
        <DesctopHeader />
        <BurgerMenu />
        <Button />
      </header>
      <div id="home" className="h-16" />
    </>
  );
};

export default Header;
