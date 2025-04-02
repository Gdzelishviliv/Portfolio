import React from "react";
import Logo from "../atoms/Logo";

const Header = () => {
  return <>
    <div className="flex justify-between">
        <Logo/>
        <h1 className="text-white">barioo</h1>
    </div>
  </>;
};

export default Header;
