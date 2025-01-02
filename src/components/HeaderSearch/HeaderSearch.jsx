import React from "react";

const HeaderSearch = () => {
  return (
    <header>
      <div id="logo-container">
        <img
          src="https://i.imgur.com/VC7hlta.png"
          alt="logo"
          className="logo"
        />
      </div>
      <div id="title-byline">
        <h2 id="page-title">Craftopia</h2>
        <h4 id="page-byline">Find Your Craft</h4>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Crafts"
          id="search"
          autoComplete="on"
        />
        <button id="search-btn">Get Craftin'</button>
      </div>
    </header>
  );
};

export default HeaderSearch;
