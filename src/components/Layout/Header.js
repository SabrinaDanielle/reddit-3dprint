/* eslint-disable arrow-body-style */
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="block navbar is-black ">
      <nav className="navbar" />
      <div className="navbar-center" />
      <Link to="/">
        <h1 className="is-active button title is-inverted is-white">
          3dPrinting Reddit Posts{"  "}
        </h1>
      </Link>
    </header>
  );
};

export default Header;
