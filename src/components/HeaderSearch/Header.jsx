import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Craftopia.svg";
import { AuthedUserContext } from "../../App";
import "./Header.css";

const Header = (props) => {
  const { setToggle, handleSignout } = props;
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const user = useContext(AuthedUserContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      <div
        className={`hamburger-menu ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <nav className={`navLinks ${isOpen ? "open" : ""}`}>
        {user ? (
          <>
            <Link
              to="/"
              onClick={toggleMenu}
            >
              <button className="navLinkButton">Dashboard</button>
            </Link>
            <Link
              to="/crafts"
              onClick={toggleMenu}
            >
              <button
                className="navLinkButton"
                id="home-btn"
              >
                Crafts
              </button>
            </Link>
            <Link
              to="/search"
              onClick={toggleMenu}
            >
              <button
                className="navLinkButton"
                id="search-btn"
              >
                Search Crafts
              </button>
            </Link>
            <Link
              to="/"
              onClick={toggleMenu}
            >
              <button
                className="navLinkButton"
                onClick={handleSignout}
              >
                Sign out
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              onClick={toggleMenu}
            >
              <button className="navLinkButton">Home</button>
            </Link>
            <Link
              to="/signin"
              onClick={toggleMenu}
            >
              <button className="navLinkButton">Sign In</button>
            </Link>
            <Link
              to="/crafts"
              onClick={toggleMenu}
            >
              <button
                className="navLinkButton"
                id="home-btn"
              >
                Browse Crafts
              </button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
