import React from "react";
import { navLinks } from "../constans/constans";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex flex-row justify-between w-full font-poppins text-white header-background h-[15vh]">
      <div className="titleContainer flex p-5">
        <div className="flex items-center">
          <img src="src\assets\logo.png" className="w-60px] h-[60px] m-1" />
          <h1 className="ml-2 text-[20px]">Maciek Gaming</h1>
        </div>
      </div>
      <ul className="flex justify-center items-center mr-2">
        {navLinks.map((element, index) => {
          const { id, title, link } = element;
          return (
            <li
              key={id}
              className={`cursor-pointer text-[20px] ${
                index < navLinks.length - 1 ? "mr-10" : "mr-2"
              }`}
            >
              <Link to={link}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Header;
