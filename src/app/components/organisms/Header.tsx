import React from "react";
import Logo from "../atoms/Logo";
import BurgerMenu from "../molecules/BurgerMenu";

const Header = () => {
  return (
    <>
      <div className="flex justify-between px-4 items-center pt-2 backdrop-blur-3xl bg-[rgba(0,0,0,0.3)]">
        <Logo />
        <BurgerMenu/>
      </div>
    </>
  );
};

export default Header;
