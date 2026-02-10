import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import letris from "/assets/letris.webp"

import { useState, useEffect } from "react";

export const Image = {
  letris,

};

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const handleClick = () => {
    setMenuActive(!menuActive);
  };

  return <>
  <div className="navbar fixed w-full shadow-lg shadow-blue-500/50  bg-white z-5">
    <div className="container mx-auto px-14">
      <div className="navbar-box flex items-center justify-between py-6">
        <div className="logo ">
          <h1 className="text-8x1 font-bold">Peminjaman</h1>
        </div>
        <div className={`menu flex gap-10 absolute md:static left-1/2 -translate-x-1/2 md:left-0 
        md:translate-x-0 flex-col md:flex-row w-full text-center
        ${menuActive ? "top-16 opacity-100" :"-top-80 opacity-0" }
        md:w-auto py-10 md:py-0 translate-all md:translate-none bg-white md:opacity-100`}>
          <NavLink to={""}>Beranda</NavLink>
          <NavLink to={"tentang-peminjaman"}>Tentang</NavLink>
          <NavLink to={"barang-peminjaman"}>Barang</NavLink>
          <NavLink to={"kordinator-peminjaman"}>Kordinator</NavLink>
          <NavLink to={"history-peminjaman"}>History</NavLink>
        </div>
        <div className="menu-btn md:hidden block" onClick={handleClick}>
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </div>
      </div>
    </div>
  </div>
  </>;
};

export default Navbar;