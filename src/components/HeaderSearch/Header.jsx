import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Craftopia.svg";
import { AuthedUserContext } from "../../App";

const Header = (props) => {
  const { setToggle, handleSignout } = props;
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const user = useContext(AuthedUserContext);

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
        {user ? (
          <>
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/crafts">
              <button id="home-btn">Crafts</button>
            </Link>
            <Link to="/search">
              <button id="search-btn">Search Crafts</button>
            </Link>
            <Link to="/">
              <button onClick={handleSignout}>Sign out</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin">
              <button>Sign In</button>
            </Link>
            <Link to="/crafts">
              <button id="home-btn">Browse Crafts</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
