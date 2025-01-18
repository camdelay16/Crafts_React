import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Craftopia.svg";

const Header = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  return (
    <header>
      <div id="logo-container">
        <img
          src={Logo}
          alt="logo"
          className="logo"
        />
      </div>
      <div id="title-byline">
        <h2 id="page-title">Craftopia</h2>
        <h4 id="page-byline">Find Your Craft</h4>
      </div>
      <div className="search-container">
        {currentPath === "/search" ? (
          <Link to="/crafts">
            <button id="home-btn">Back to Crafts</button>
          </Link>
        ) : (
          <Link to="/search">
            <button id="search-btn">Search Crafts</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
